import React, { useState, useEffect } from 'react';
import { packagesAPI } from '../../services/api';
import './BusinessMyPackages.css';

const STATUS_MAP = {
  active:       { label: 'Active',       color: '#10b981', bg: '#ecfdf5' },
  'in-progress':{ label: 'In Progress',  color: '#0ea5e9', bg: '#e0f2fe' },
  pending:      { label: 'Pending',      color: '#f59e0b', bg: '#fffbeb' },
  completed:    { label: 'Completed',    color: '#8b5cf6', bg: '#f5f3ff' },
  expired:      { label: 'Expired',      color: '#ef4444', bg: '#fef2f2' },
  cancelled:    { label: 'Cancelled',    color: '#64748b', bg: '#f1f5f9' },
};

const CAT_ICONS = { pos:'🛒', website:'🌐', software:'💻', marketing:'📱', financial:'💰', design:'🎨', cloud:'☁️', consulting:'🎯', other:'📦' };

export default function BusinessMyPackages() {
  const [packages,  setPackages]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [selected,  setSelected]  = useState(null);
  const [toast,     setToast]     = useState(null);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  const load = async () => {
    try {
      setLoading(true);
      const res = await packagesAPI.getMyPackages();
      setPackages(res.data.packages || []);
    } catch {
      showToast('Failed to load packages', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const getDaysRemaining = (date) => {
    if (!date) return null;
    const diff = new Date(date) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const totals = {
    active:     packages.filter(p => p.status === 'active').length,
    inProgress: packages.filter(p => p.status === 'in-progress').length,
    pending:    packages.filter(p => p.status === 'pending').length,
    investment: packages.reduce((s, p) => s + (p.price?.amount || 0), 0),
  };

  if (loading) return (
    <div className="bmp-loading"><div className="bmp-spinner" /><p>Loading packages…</p></div>
  );

  return (
    <div className="bmp-root">
      {toast && (
        <div className={`bmp-toast bmp-toast--${toast.type}`}>
          <span>{toast.type === 'success' ? '✓' : '✕'}</span>{toast.msg}
        </div>
      )}

      <div className="bmp-page-head">
        <div>
          <h1 className="bmp-title">My Business Packages</h1>
          <p className="bmp-sub">Track all your subscribed business packages</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bmp-stats">
        {[
          { icon: '📦', label: 'Active Packages', val: totals.active,   color: '#10b981', bg: '#ecfdf5' },
          { icon: '🔄', label: 'In Progress',      val: totals.inProgress, color: '#0ea5e9', bg: '#e0f2fe' },
          { icon: '⏳', label: 'Pending',           val: totals.pending, color: '#f59e0b', bg: '#fffbeb' },
          { icon: '💰', label: 'Total Investment',  val: `LKR ${totals.investment.toLocaleString()}`, color: '#8b5cf6', bg: '#f5f3ff' },
        ].map((s, i) => (
          <div className="bmp-stat" key={i} style={{ '--acc': s.color, '--sbg': s.bg }}>
            <div className="bmp-stat-icon">{s.icon}</div>
            <div>
              <p className="bmp-stat-label">{s.label}</p>
              <p className="bmp-stat-val">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      {packages.length === 0 ? (
        <div className="bmp-empty">
          <span>📦</span>
          <h3>No packages yet</h3>
          <p>Contact WebPoint to subscribe to a business service package.</p>
        </div>
      ) : (
        <div className="bmp-grid">
          {packages.map(pkg => {
            const s    = STATUS_MAP[pkg.status] || STATUS_MAP.pending;
            const days = getDaysRemaining(pkg.expiryDate);
            return (
              <div className="bmp-card" key={pkg._id}>
                <div className="bmp-card-head">
                  <div className="bmp-cat-icon">{CAT_ICONS[pkg.category] || '📦'}</div>
                  <div className="bmp-card-info">
                    <h3 className="bmp-card-name">{pkg.title}</h3>
                    <span className="bmp-status-badge" style={{ color: s.color, background: s.bg }}>{s.label}</span>
                  </div>
                </div>

                <div className="bmp-details">
                  <div className="bmp-detail-row">
                    <span>Price</span>
                    <span style={{ color: '#0ea5e9', fontWeight: 700 }}>
                      {pkg.price?.currency || 'LKR'} {(pkg.price?.amount || 0).toLocaleString()}
                      <span style={{ fontSize: '.72rem', color: '#94a3b8', marginLeft: 4 }}>/{pkg.price?.billingCycle || 'one-time'}</span>
                    </span>
                  </div>
                  {pkg.startDate && (
                    <div className="bmp-detail-row">
                      <span>Start Date</span>
                      <span>{new Date(pkg.startDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {pkg.expiryDate && (
                    <div className="bmp-detail-row">
                      <span>Expiry Date</span>
                      <span>{new Date(pkg.expiryDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {pkg.status === 'active' && days !== null && (
                    <div className="bmp-detail-row">
                      <span>Days Remaining</span>
                      <span style={{ color: days < 30 ? '#ef4444' : '#10b981', fontWeight: 600 }}>{days} days</span>
                    </div>
                  )}
                </div>

                {/* Progress */}
                <div className="bmp-progress">
                  <div className="bmp-progress-row">
                    <span>Completion Progress</span><span style={{ fontWeight: 600, color: '#0ea5e9' }}>{pkg.progress}%</span>
                  </div>
                  <div className="bmp-bar-track">
                    <div className="bmp-bar-fill" style={{ width: `${pkg.progress}%` }} />
                  </div>
                </div>

                {/* Features */}
                {pkg.features?.length > 0 && (
                  <div className="bmp-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {pkg.features.slice(0, 4).map((f, i) => (
                        <li key={i}><span>✓</span>{f}</li>
                      ))}
                      {pkg.features.length > 4 && (
                        <li className="bmp-more">+{pkg.features.length - 4} more features</li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="bmp-actions">
                  <button className="bmp-btn bmp-btn--outline" onClick={() => setSelected(pkg)}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="bmp-overlay" onClick={() => setSelected(null)}>
          <div className="bmp-modal" onClick={e => e.stopPropagation()}>
            <div className="bmp-modal-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '1.5rem' }}>{CAT_ICONS[selected.category] || '📦'}</span>
                <h2>{selected.title}</h2>
              </div>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="bmp-modal-body">
              {/* Info */}
              <div className="bmp-ms">
                <h3>Package Information</h3>
                <div className="bmp-info-grid">
                  {[
                    { label: 'Status',   val: <span className="bmp-status-badge" style={{ color: STATUS_MAP[selected.status]?.color, background: STATUS_MAP[selected.status]?.bg }}>{STATUS_MAP[selected.status]?.label}</span> },
                    { label: 'Price',    val: `${selected.price?.currency || 'LKR'} ${(selected.price?.amount || 0).toLocaleString()} / ${selected.price?.billingCycle || 'one-time'}` },
                    selected.startDate  && { label: 'Start Date',  val: new Date(selected.startDate).toLocaleDateString() },
                    selected.expiryDate && { label: 'Expiry Date', val: new Date(selected.expiryDate).toLocaleDateString() },
                  ].filter(Boolean).map((r, i) => (
                    <div className="bmp-info-item" key={i}>
                      <label>{r.label}</label><span>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="bmp-ms">
                <h3>Progress Overview</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div className="bmp-bar-track" style={{ flex: 1, height: 10 }}>
                    <div style={{ width: `${selected.progress}%`, height: '100%', background: 'linear-gradient(90deg,#0ea5e9,#0369a1)', borderRadius: 10, transition: 'width .6s' }} />
                  </div>
                  <span style={{ fontWeight: 700, color: '#0ea5e9', whiteSpace: 'nowrap' }}>{selected.progress}%</span>
                </div>
              </div>

              {/* All features */}
              {selected.features?.length > 0 && (
                <div className="bmp-ms">
                  <h3>All Features</h3>
                  <ul className="bmp-features-full">
                    {selected.features.map((f, i) => (
                      <li key={i}><span>✓</span>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Progress notes */}
              {selected.progressNotes?.length > 0 && (
                <div className="bmp-ms">
                  <h3>Admin Updates</h3>
                  {selected.progressNotes.slice(-5).map((n, i) => (
                    <div className="bmp-note" key={i}>
                      <span>✓</span>
                      <div><p>{n.note}</p><small>{new Date(n.updatedAt).toLocaleDateString()}</small></div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bmp-ms">
                <h3>Support Information</h3>
                <div className="bmp-support-box">
                  <p>📞 Priority Support: 24/7 dedicated support line</p>
                  <p>📧 Email Support: support@webpoint.lk</p>
                  <p>💬 Live Chat: Available during business hours</p>
                </div>
              </div>
            </div>
            <div className="bmp-modal-foot">
              <button className="bmp-close-btn" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}