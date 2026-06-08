import React, { useState, useEffect } from 'react';
import { packagesAPI } from '../../services/api';
import './Progress.css';

export default function Progress() {
  const [packages, setPackages] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);
  const [toast,    setToast]    = useState(null);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  const load = async () => {
    try {
      setLoading(true);
      const res = await packagesAPI.getMyPackages();
      // Only show packages that are active/in-progress/pending with some activity
      const relevant = (res.data.packages || []).filter(p =>
        ['active', 'in-progress', 'pending', 'completed'].includes(p.status)
      );
      setPackages(relevant);
    } catch {
      showToast('Failed to load projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const getStatusColor = (progress) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 50) return '#0ea5e9';
    if (progress >= 20) return '#f59e0b';
    return '#ef4444';
  };

  const getStatusText = (progress) => {
    if (progress >= 80) return { label: 'On Track',         cls: 'on-track' };
    if (progress >= 50) return { label: 'In Progress',      cls: 'in-progress' };
    if (progress >= 20) return { label: 'Behind Schedule',  cls: 'behind-schedule' };
    return                     { label: 'Critical',         cls: 'critical' };
  };

  const getDaysRemaining = (date) => {
    if (!date) return null;
    const diff = new Date(date) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const overallProgress = packages.length > 0
    ? Math.round(packages.reduce((s, p) => s + (p.progress || 0), 0) / packages.length)
    : 0;

  const completedTasks = packages.reduce((s, p) =>
    s + (p.tasks || []).filter(t => t.completed === 100).length, 0);

  if (loading) return (
    <div className="pr-loading"><div className="pr-spinner" /><p>Loading projects…</p></div>
  );

  return (
    <div className="pr-root">
      {toast && (
        <div className={`pr-toast pr-toast--${toast.type}`}>
          <span>{toast.type === 'success' ? '✓' : '✕'}</span>{toast.msg}
        </div>
      )}

      <div className="pr-page-head">
        <h1 className="pr-title">Project Progress</h1>
        <p className="pr-sub">Track the progress of all your active projects</p>
      </div>

      {/* Overall stats */}
      <div className="pr-stats">
        <div className="pr-stat pr-stat--main">
          <div className="pr-stat-left">
            <span className="pr-stat-icon">📊</span>
            <div>
              <p className="pr-stat-label">Overall Progress</p>
              <p className="pr-stat-val">{overallProgress}% Complete</p>
            </div>
          </div>
          <div className="pr-overall-bar-wrap">
            <div className="pr-overall-bar">
              <div style={{ width: `${overallProgress}%`, height: '100%', background: getStatusColor(overallProgress), borderRadius: 8, transition: 'width .6s' }} />
            </div>
          </div>
        </div>
        {[
          { icon: '🚀', label: 'Active Projects',  val: packages.length },
          { icon: '✅', label: 'Completed Tasks',   val: completedTasks },
        ].map((s, i) => (
          <div className="pr-stat" key={i}>
            <span className="pr-stat-icon">{s.icon}</span>
            <div>
              <p className="pr-stat-label">{s.label}</p>
              <p className="pr-stat-val">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      {packages.length === 0 ? (
        <div className="pr-empty">
          <span>📈</span>
          <h3>No active projects</h3>
          <p>Your project progress will appear here once work begins.</p>
        </div>
      ) : (
        <div className="pr-list">
          {packages.map(pkg => {
            const st       = getStatusText(pkg.progress || 0);
            const color    = getStatusColor(pkg.progress || 0);
            const deadline = pkg.deadline || pkg.expiryDate;
            const daysLeft = getDaysRemaining(deadline);

            return (
              <div className="pr-card" key={pkg._id}>
                <div className="pr-card-head">
                  <div className="pr-card-info">
                    <h3>{pkg.projectTitle || pkg.title}</h3>
                    {pkg.clientName && <p className="pr-client">{pkg.clientName}</p>}
                    <span className="pr-cat-badge">{pkg.category}</span>
                  </div>
                  <div className="pr-card-dates">
                    {pkg.startDate && <span>Started: {new Date(pkg.startDate).toLocaleDateString()}</span>}
                    {deadline && <span>Deadline: {new Date(deadline).toLocaleDateString()}</span>}
                  </div>
                </div>

                {/* Main progress */}
                <div className="pr-progress-section">
                  <div className="pr-progress-row">
                    <span className="pr-progress-label">Overall Progress</span>
                    <span className="pr-progress-pct" style={{ color }}>{pkg.progress || 0}%</span>
                  </div>
                  <div className="pr-bar-track">
                    <div className="pr-bar-fill" style={{ width: `${pkg.progress || 0}%`, background: color }} />
                  </div>
                  <div className="pr-progress-footer">
                    <span className={`pr-status-badge pr-status-badge--${st.cls}`}>{st.label}</span>
                    {daysLeft !== null && (
                      <span className="pr-days-left" style={{ color: daysLeft < 7 ? '#ef4444' : '#64748b' }}>
                        {daysLeft > 0 ? `${daysLeft} days remaining` : daysLeft === 0 ? 'Due today' : `${Math.abs(daysLeft)} days overdue`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tasks */}
                {pkg.tasks?.length > 0 && (
                  <div className="pr-tasks-section">
                    <h4>Task Breakdown</h4>
                    <div className="pr-tasks-list">
                      {pkg.tasks.map((task, i) => (
                        <div className="pr-task" key={i}>
                          <div className="pr-task-info">
                            <span className="pr-task-name">{task.name}</span>
                            <span className="pr-task-pct" style={{ color: getStatusColor(task.completed) }}>{task.completed}%</span>
                          </div>
                          <div className="pr-task-bar">
                            <div style={{ width: `${task.completed}%`, height: '100%', background: `linear-gradient(90deg,#0ea5e9,#0369a1)`, borderRadius: 4, transition: 'width .5s' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent updates */}
                {pkg.recentUpdates?.length > 0 && (
                  <div className="pr-updates-section">
                    <h4>Recent Updates</h4>
                    <ul className="pr-updates-list">
                      {pkg.recentUpdates.slice(0, 4).map((u, i) => (
                        <li key={i}><span className="pr-update-dot">✓</span>{u}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Progress notes from admin */}
                {pkg.progressNotes?.length > 0 && (
                  <div className="pr-notes-section">
                    <h4>Admin Updates</h4>
                    {pkg.progressNotes.slice(-3).map((n, i) => (
                      <div className="pr-note" key={i}>
                        <span className="pr-note-dot">✓</span>
                        <div>
                          <p className="pr-note-text">{n.note}</p>
                          <span className="pr-note-date">{new Date(n.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button className="pr-detail-btn" onClick={() => setSelected(pkg)}>
                  View Detailed Report
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="pr-overlay" onClick={() => setSelected(null)}>
          <div className="pr-modal" onClick={e => e.stopPropagation()}>
            <div className="pr-modal-head">
              <h2>{selected.projectTitle || selected.title}</h2>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="pr-modal-body">
              {/* Info */}
              <div className="pr-ms">
                <h3>Project Information</h3>
                <div className="pr-info-grid">
                  {[
                    { label: 'Category',   val: selected.category },
                    { label: 'Status',     val: selected.status },
                    { label: 'Progress',   val: `${selected.progress}%` },
                    selected.startDate && { label: 'Start Date', val: new Date(selected.startDate).toLocaleDateString() },
                    (selected.deadline || selected.expiryDate) && { label: 'Deadline', val: new Date(selected.deadline || selected.expiryDate).toLocaleDateString() },
                  ].filter(Boolean).map((r, i) => (
                    <div key={i} className="pr-info-item">
                      <span>{r.label}</span><strong>{r.val}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="pr-ms">
                <h3>Progress Timeline</h3>
                <div className="pr-modal-bar-track">
                  <div style={{ width: `${selected.progress}%`, height: '100%', background: getStatusColor(selected.progress), borderRadius: 10, transition: 'width .6s' }} />
                </div>
                <p style={{ textAlign: 'center', marginTop: 10, fontWeight: 700, color: getStatusColor(selected.progress) }}>{selected.progress}% Complete</p>
              </div>

              {/* Tasks */}
              {selected.tasks?.length > 0 && (
                <div className="pr-ms">
                  <h3>Task Details</h3>
                  <table className="pr-tasks-table">
                    <thead><tr><th>Task Name</th><th>Progress</th><th>Status</th></tr></thead>
                    <tbody>
                      {selected.tasks.map((t, i) => (
                        <tr key={i}>
                          <td>{t.name}</td>
                          <td>
                            <div className="pr-table-bar">
                              <div style={{ width: `${t.completed}%`, height: '100%', background: 'linear-gradient(90deg,#0ea5e9,#0369a1)', borderRadius: 4 }} />
                            </div>
                          </td>
                          <td><span className={`pr-task-status ${t.completed === 100 ? 'completed' : 'in-progress'}`}>{t.completed === 100 ? 'Completed' : `${t.completed}%`}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* All updates */}
              {(selected.recentUpdates?.length > 0 || selected.progressNotes?.length > 0) && (
                <div className="pr-ms">
                  <h3>All Updates</h3>
                  {selected.progressNotes?.map((n, i) => (
                    <div className="pr-note" key={`note-${i}`}>
                      <span className="pr-note-dot">✓</span>
                      <div><p className="pr-note-text">{n.note}</p><span className="pr-note-date">{new Date(n.updatedAt).toLocaleDateString()}</span></div>
                    </div>
                  ))}
                  {selected.recentUpdates?.map((u, i) => (
                    <div className="pr-note" key={`update-${i}`}>
                      <span className="pr-note-dot">•</span>
                      <p className="pr-note-text">{u}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="pr-modal-foot">
              <button className="pr-close-btn" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}