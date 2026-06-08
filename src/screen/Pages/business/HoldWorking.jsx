import React, { useState, useEffect } from 'react';
import { packagesAPI } from '../../services/api';
import './HoldWorking.css';

export default function HoldWorking() {
  const [packages, setPackages] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState('all');
  const [selected, setSelected] = useState(null);
  const [toast,    setToast]    = useState(null);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  const load = async () => {
    try {
      setLoading(true);
      const res = await packagesAPI.getMyPackages();
      // Only show packages with hold info
      const onHold = (res.data.packages || []).filter(p => p.holdInfo?.isOnHold);
      setPackages(onHold);
    } catch {
      showToast('Failed to load hold items', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const statusBadge = (status) => {
    const map = {
      'on-hold':         { label: 'On Hold',          color: '#475569', bg: '#f1f5f9' },
      'pending-approval':{ label: 'Pending Approval',  color: '#d97706', bg: '#fffbeb' },
      'client-review':   { label: 'Client Review',     color: '#0369a1', bg: '#e0f2fe' },
      'resumed':         { label: 'Resumed',           color: '#059669', bg: '#ecfdf5' },
    };
    return map[status] || map['on-hold'];
  };

  const priorityBadge = (priority) => {
    const map = {
      high:   { label: 'High Priority',   color: '#dc2626', bg: '#fef2f2' },
      medium: { label: 'Medium Priority', color: '#d97706', bg: '#fffbeb' },
      low:    { label: 'Low Priority',    color: '#059669', bg: '#ecfdf5' },
    };
    return map[priority] || map.medium;
  };

  const filtered = packages.filter(pkg => {
    if (filter === 'all') return true;
    return pkg.holdInfo?.status === filter;
  });

  const counts = {
    'on-hold':          packages.filter(p => p.holdInfo?.status === 'on-hold').length,
    'pending-approval': packages.filter(p => p.holdInfo?.status === 'pending-approval').length,
    'client-review':    packages.filter(p => p.holdInfo?.status === 'client-review').length,
  };

  if (loading) return (
    <div className="hw-loading"><div className="hw-spinner" /><p>Loading on-hold projects…</p></div>
  );

  return (
    <div className="hw-root">
      {toast && (
        <div className={`hw-toast hw-toast--${toast.type}`}>
          <span>{toast.type === 'success' ? '✓' : '✕'}</span>{toast.msg}
        </div>
      )}

      <div className="hw-page-head">
        <h1 className="hw-title">On Hold Projects</h1>
        <p className="hw-sub">View projects that are temporarily paused</p>
      </div>

      {/* Filters */}
      <div className="hw-filters">
        {[
          { id: 'all',              label: 'All Projects' },
          { id: 'on-hold',          label: 'On Hold' },
          { id: 'pending-approval', label: 'Pending Approval' },
          { id: 'client-review',    label: 'Client Review' },
        ].map(f => (
          <button key={f.id} className={`hw-filter-btn ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="hw-stats">
        {[
          { label: 'On Hold',          val: counts['on-hold'],          icon: '⏸', color: '#475569', bg: '#f1f5f9' },
          { label: 'Pending Approval', val: counts['pending-approval'], icon: '⏳', color: '#d97706', bg: '#fffbeb' },
          { label: 'Client Review',    val: counts['client-review'],    icon: '👀', color: '#0369a1', bg: '#e0f2fe' },
        ].map((s, i) => (
          <div className="hw-stat" key={i} style={{ '--acc': s.color, '--sbg': s.bg }}>
            <div className="hw-stat-icon">{s.icon}</div>
            <div>
              <p className="hw-stat-label">{s.label}</p>
              <p className="hw-stat-val">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="hw-empty">
          <span>⏸</span>
          <h3>{filter === 'all' ? 'No on-hold projects' : `No ${filter.replace('-', ' ')} projects`}</h3>
          <p>Projects placed on hold by WebPoint will appear here.</p>
        </div>
      ) : (
        <div className="hw-list">
          {filtered.map((pkg, i) => {
            const sb = statusBadge(pkg.holdInfo?.status);
            const pb = priorityBadge(pkg.holdInfo?.priority);
            return (
              <div className="hw-card" key={pkg._id} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="hw-card-head">
                  <div className="hw-card-left">
                    <div className="hw-doc-icon">📋</div>
                    <div>
                      <h3 className="hw-card-title">{pkg.title}</h3>
                      {pkg.description && <p className="hw-card-desc">{pkg.description}</p>}
                    </div>
                  </div>
                  <div className="hw-badges">
                    <span className="hw-badge" style={{ color: pb.color, background: pb.bg }}>{pb.label}</span>
                    <span className="hw-badge" style={{ color: sb.color, background: sb.bg }}>{sb.label}</span>
                  </div>
                </div>

                <div className="hw-details-row">
                  {pkg.holdInfo?.reason && (
                    <div className="hw-detail-item">
                      <span className="hw-detail-label">Reason</span>
                      <span className="hw-detail-val">{pkg.holdInfo.reason}</span>
                    </div>
                  )}
                  {pkg.holdInfo?.holdDate && (
                    <div className="hw-detail-item">
                      <span className="hw-detail-label">Hold Date</span>
                      <span className="hw-detail-val">{new Date(pkg.holdInfo.holdDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {pkg.holdInfo?.expectedResumeDate && (
                    <div className="hw-detail-item">
                      <span className="hw-detail-label">Expected Resume</span>
                      <span className="hw-detail-val">{new Date(pkg.holdInfo.expectedResumeDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {/* Progress */}
                <div className="hw-progress">
                  <div className="hw-progress-row">
                    <span>Overall Progress</span>
                    <span style={{ fontWeight: 600, color: '#0ea5e9' }}>{pkg.progress}%</span>
                  </div>
                  <div className="hw-bar-track">
                    <div className="hw-bar-fill" style={{ width: `${pkg.progress}%` }} />
                  </div>
                </div>

                {/* Tasks */}
                {pkg.tasks?.length > 0 && (
                  <div className="hw-tasks">
                    <h4>Tasks Status</h4>
                    <ul>
                      {pkg.tasks.map((t, j) => (
                        <li key={j}>
                          <span className="hw-task-dot" style={{ color: t.completed === 100 ? '#10b981' : '#0ea5e9' }}>
                            {t.completed === 100 ? '✓' : '•'}
                          </span>
                          <span className="hw-task-name">{t.name}</span>
                          <span className="hw-task-pct">{t.completed}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Admin notes */}
                {pkg.holdInfo?.adminNotes && (
                  <div className="hw-admin-note">
                    <span>📌 Admin Note:</span> {pkg.holdInfo.adminNotes}
                  </div>
                )}

                <div className="hw-actions">
                  <button className="hw-btn hw-btn--outline" onClick={() => setSelected(pkg)}>View Details</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="hw-overlay" onClick={() => setSelected(null)}>
          <div className="hw-modal" onClick={e => e.stopPropagation()}>
            <div className="hw-modal-head">
              <h2>{selected.title}</h2>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="hw-modal-body">
              <div className="hw-ms">
                <h3>Project Information</h3>
                <div className="hw-info-rows">
                  {[
                    { label: 'Status',          val: statusBadge(selected.holdInfo?.status).label },
                    { label: 'Priority',         val: priorityBadge(selected.holdInfo?.priority).label },
                    { label: 'Hold Date',        val: selected.holdInfo?.holdDate ? new Date(selected.holdInfo.holdDate).toLocaleDateString() : '—' },
                    { label: 'Expected Resume',  val: selected.holdInfo?.expectedResumeDate ? new Date(selected.holdInfo.expectedResumeDate).toLocaleDateString() : '—' },
                  ].map((r, i) => (
                    <div className="hw-info-row" key={i}>
                      <span>{r.label}</span><strong>{r.val}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {selected.holdInfo?.reason && (
                <div className="hw-ms">
                  <h3>Reason for Hold</h3>
                  <p className="hw-modal-text">{selected.holdInfo.reason}</p>
                </div>
              )}

              {selected.tasks?.length > 0 && (
                <div className="hw-ms">
                  <h3>Tasks Status</h3>
                  {selected.tasks.map((t, i) => (
                    <div className="hw-modal-task" key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.83rem', marginBottom: 4 }}>
                        <span>{t.name}</span><span style={{ color: '#0ea5e9', fontWeight: 600 }}>{t.completed}%</span>
                      </div>
                      <div className="hw-bar-track" style={{ height: 5 }}>
                        <div style={{ width: `${t.completed}%`, height: '100%', background: 'linear-gradient(90deg,#0ea5e9,#0369a1)', borderRadius: 4 }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selected.holdInfo?.adminNotes && (
                <div className="hw-ms">
                  <h3>Admin Notes</h3>
                  <p className="hw-modal-text">{selected.holdInfo.adminNotes}</p>
                </div>
              )}
            </div>
            <div className="hw-modal-foot">
              <button className="hw-close-btn" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}