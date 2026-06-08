import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import BusinessEditProfile from './BusinessEditProfile';
import BusinessResetPassword from './BusinessResetPassword';
import BusinessServicePackages from './BusinessServicePackages';
import Agreement from './Agreement';
import Progress from './Progress';
import Payment from './Payment';
import HoldWorking from './HoldWorking';
import Message from './Message';
import BusinessMyPackages from './BusinessMyPackages';
import { packagesAPI, chatAPI } from '../../services/api';
import './BusinessDashboard.css';

const BusinessDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview',         label: 'Overview',        icon: '▦' },
    { id: 'edit-profile',     label: 'Edit Profile',    icon: '✎' },
    { id: 'reset-password',   label: 'Change Password', icon: '⚿' },
    { id: 'service-packages', label: 'Services',        icon: '◈' },
    { id: 'my-packages',      label: 'My Packages',     icon: '❐' },
    { id: 'agreement',        label: 'Agreements',      icon: '📋' },
    { id: 'progress',         label: 'Progress',        icon: '◉' },
    { id: 'payment',          label: 'Payments',        icon: '💳' },
    { id: 'hold-working',     label: 'On Hold',         icon: '⏸' },
    { id: 'messages',         label: 'Messages',        icon: '✉' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':         return <BusinessOverview user={user} setActiveTab={setActiveTab} />;
      case 'edit-profile':     return <BusinessEditProfile />;
      case 'reset-password':   return <BusinessResetPassword />;
      case 'service-packages': return <BusinessServicePackages />;
      case 'my-packages':      return <BusinessMyPackages />;
      case 'agreement':        return <Agreement />;
      case 'progress':         return <Progress />;
      case 'payment':          return <Payment />;
      case 'hold-working':     return <HoldWorking />;
      case 'messages':         return <Message />;
      default:                 return <BusinessOverview user={user} setActiveTab={setActiveTab} />;
    }
  };

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="bd-shell">
      {/* ── Sidebar ── */}
      <aside className="bd-sidebar">
        <div className="bd-sidebar-profile">
          <div className="bd-avatar">
            {user?.businessDetails?.companyName?.charAt(0)?.toUpperCase() || 'B'}
          </div>
          <div className="bd-sidebar-name">
            <span className="bd-sidebar-company">
              {user?.businessDetails?.companyName || 'Business'}
            </span>
            <span className="bd-sidebar-badge">Business</span>
          </div>
        </div>

        <nav className="bd-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`bd-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="bd-nav-icon">{tab.icon}</span>
              <span className="bd-nav-label">{tab.label}</span>
              {activeTab === tab.id && <span className="bd-nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="bd-sidebar-footer">
          <span className="bd-sidebar-email">{user?.email}</span>
          <span className="bd-sidebar-since">
            Since {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="bd-main">
        <header className="bd-topbar">
          <div className="bd-topbar-left">
            <span className="bd-topbar-icon">{currentTab?.icon}</span>
            <h1 className="bd-topbar-title">{currentTab?.label}</h1>
          </div>
          <div className="bd-topbar-right">
            <div className="bd-topbar-date">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </header>

        <div className="bd-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

/* ── Business Overview ─────────────────────────── */
const BusinessOverview = ({ user, setActiveTab }) => {
  const [packages,  setPackages]  = useState([]);
  const [convData,  setConvData]  = useState(null);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, convRes] = await Promise.all([
          packagesAPI.getMyPackages().catch(() => ({ data: { packages: [] } })),
          chatAPI.getConversation().catch(() => ({ data: { conversation: null } }))
        ]);
        setPackages(pkgRes.data.packages || []);
        setConvData(convRes.data.conversation || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Real computed stats
  const activeProjects    = packages.filter(p => p.status === 'active' || p.status === 'in-progress').length;
  const completedProjects = packages.filter(p => p.status === 'completed').length;
  const unreadMessages    = convData?.unreadByUser || 0;

  // Total investment from all packages
  const totalInvestment = packages.reduce((sum, p) => sum + (p.price?.amount || 0), 0);
  const totalStr = totalInvestment >= 1000
    ? `LKR ${(totalInvestment / 1000).toFixed(0)}K`
    : `LKR ${totalInvestment.toLocaleString()}`;

  // Pending invoices across all packages
  const pendingInvoices = packages.flatMap(p => p.invoices || [])
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue').length;

  // Pending agreements
  const pendingAgreements = packages.flatMap(p => p.agreements || [])
    .filter(ag => ag.status === 'pending').length;

  // On-hold projects
  const onHoldProjects = packages.filter(p => p.holdInfo?.isOnHold).length;

  const stats = [
    { label: 'Active Projects',  value: loading ? '—' : String(activeProjects),    icon: '◈', color: '#0ea5e9', bg: '#f0f9ff' },
    { label: 'Unread Messages',  value: loading ? '—' : String(unreadMessages),    icon: '✉', color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Completed',        value: loading ? '—' : String(completedProjects), icon: '✓', color: '#10b981', bg: '#ecfdf5' },
    { label: 'Total Investment', value: loading ? '—' : totalStr,                  icon: '💳', color: '#f59e0b', bg: '#fffbeb' },
  ];

  const quickActions = [
    { label: 'Browse Services', tab: 'service-packages', icon: '◈' },
    { label: 'My Packages',     tab: 'my-packages',      icon: '❐' },
    { label: 'Agreements',      tab: 'agreement',        icon: '📋' },
    { label: 'Track Progress',  tab: 'progress',         icon: '◉' },
    { label: 'Payments',        tab: 'payment',          icon: '💳' },
    { label: 'Edit Profile',    tab: 'edit-profile',     icon: '✎' },
  ];

  const companyInfo = [
    { label: 'Company Name',   val: user?.businessDetails?.companyName   || '—' },
    { label: 'Contact Person', val: user?.businessDetails?.contactPerson || '—' },
    { label: 'Business Email', val: user?.email                          || '—' },
    { label: 'Phone',          val: user?.businessDetails?.businessPhone || 'Not provided' },
    { label: 'Industry',       val: user?.businessDetails?.industry      || 'Not provided' },
    { label: 'Member Since',   val: new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
  ];

  return (
    <div className="bov-root">
      {/* Hero */}
      <div className="bov-hero">
        <div className="bov-hero-glow" />
        <div className="bov-hero-text">
          <p className="bov-hero-sub">Good {getGreeting()},</p>
          <h2 className="bov-hero-name">
            {user?.businessDetails?.companyName || 'Business'} 🏢
          </h2>
          <p className="bov-hero-desc">Here's a summary of your WebPoint business account.</p>
        </div>
        <div className="bov-hero-avatar">
          {user?.businessDetails?.companyName?.charAt(0)?.toUpperCase() || 'B'}
        </div>
      </div>

      {/* Stats */}
      <div className="bov-stats">
        {stats.map((s, i) => (
          <div className="bov-stat" key={i}
            style={{ '--accent': s.color, '--bg': s.bg, animationDelay: `${i * 0.07}s` }}>
            <div className="bov-stat-icon-wrap">
              <span className="bov-stat-icon">{s.icon}</span>
            </div>
            <div>
              <p className="bov-stat-label">{s.label}</p>
              <p className="bov-stat-value">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Alert banners for pending items */}
      {!loading && (pendingInvoices > 0 || pendingAgreements > 0 || onHoldProjects > 0) && (
        <div className="bov-alerts">
          {pendingInvoices > 0 && (
            <button className="bov-alert bov-alert--warn" onClick={() => setActiveTab('payment')}>
              <span>⚠️</span>
              <span>{pendingInvoices} unpaid invoice{pendingInvoices > 1 ? 's' : ''} — Pay now</span>
              <span>→</span>
            </button>
          )}
          {pendingAgreements > 0 && (
            <button className="bov-alert bov-alert--info" onClick={() => setActiveTab('agreement')}>
              <span>📋</span>
              <span>{pendingAgreements} agreement{pendingAgreements > 1 ? 's' : ''} awaiting your signature</span>
              <span>→</span>
            </button>
          )}
          {onHoldProjects > 0 && (
            <button className="bov-alert bov-alert--gray" onClick={() => setActiveTab('hold-working')}>
              <span>⏸</span>
              <span>{onHoldProjects} project{onHoldProjects > 1 ? 's' : ''} on hold</span>
              <span>→</span>
            </button>
          )}
        </div>
      )}

      {/* Bottom grid */}
      <div className="bov-bottom">
        {/* Company info */}
        <div className="bov-card bov-company-card">
          <div className="bov-card-header">
            <span className="bov-card-title">Company Information</span>
          </div>
          <div className="bov-company-rows">
            {companyInfo.map((r, i) => (
              <div className="bov-company-row" key={i}>
                <span className="bov-company-label">{r.label}</span>
                <span className="bov-company-val">{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bov-card bov-actions-card">
          <div className="bov-card-header">
            <span className="bov-card-title">Quick Actions</span>
          </div>
          <div className="bov-actions-grid">
            {quickActions.map((a, i) => (
              <button key={i} className="bov-action-btn" onClick={() => setActiveTab(a.tab)}>
                <span className="bov-action-icon">{a.icon}</span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent packages */}
      {!loading && packages.length > 0 && (
        <div className="bov-card">
          <div className="bov-card-header">
            <span className="bov-card-title">Active Packages</span>
          </div>
          <div className="bov-packages-list">
            {packages
              .filter(p => p.status !== 'cancelled' && p.status !== 'expired')
              .slice(0, 4)
              .map(pkg => {
                const statusColor = {
                  active:       '#10b981',
                  'in-progress':'#0ea5e9',
                  pending:      '#f59e0b',
                  completed:    '#8b5cf6',
                  expired:      '#ef4444',
                }[pkg.status] || '#64748b';

                const statusBg = {
                  active:       '#ecfdf5',
                  'in-progress':'#e0f2fe',
                  pending:      '#fffbeb',
                  completed:    '#f5f3ff',
                  expired:      '#fef2f2',
                }[pkg.status] || '#f1f5f9';

                const pendingInv = (pkg.invoices || []).filter(inv => inv.status === 'pending' || inv.status === 'overdue').length;
                const pendingAg  = (pkg.agreements || []).filter(ag => ag.status === 'pending').length;

                return (
                  <div className="bov-pkg-item" key={pkg._id}>
                    <div className="bov-pkg-left">
                      <div className="bov-pkg-progress-col">
                        <div className="bov-pkg-bar-track">
                          <div
                            className="bov-pkg-bar-fill"
                            style={{ width: `${pkg.progress || 0}%`, background: statusColor }}
                          />
                        </div>
                        <span className="bov-pkg-pct">{pkg.progress || 0}%</span>
                      </div>
                      <div className="bov-pkg-info">
                        <p className="bov-pkg-name">{pkg.title}</p>
                        <p className="bov-pkg-meta">
                          {pkg.price?.currency || 'LKR'} {(pkg.price?.amount || 0).toLocaleString()}
                          {pkg.expiryDate && ` · Expires ${new Date(pkg.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                        </p>
                        {(pendingInv > 0 || pendingAg > 0) && (
                          <div className="bov-pkg-alerts">
                            {pendingInv > 0 && (
                              <span className="bov-pkg-alert bov-pkg-alert--warn">
                                {pendingInv} invoice{pendingInv > 1 ? 's' : ''} unpaid
                              </span>
                            )}
                            {pendingAg > 0 && (
                              <span className="bov-pkg-alert bov-pkg-alert--info">
                                {pendingAg} agreement{pendingAg > 1 ? 's' : ''} pending
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="bov-pkg-badge" style={{ color: statusColor, background: statusBg }}>
                      {pkg.status}
                    </span>
                  </div>
                );
              })}
            {packages.filter(p => p.status !== 'cancelled' && p.status !== 'expired').length > 4 && (
              <button className="bov-view-all-btn" onClick={() => setActiveTab('my-packages')}>
                View all {packages.length} packages →
              </button>
            )}
          </div>

          {packages.filter(p => p.status !== 'cancelled' && p.status !== 'expired').length === 0 && (
            <div className="bov-empty-packages">
              <span>📦</span>
              <p>No active packages. <button onClick={() => setActiveTab('service-packages')}>Browse Services →</button></p>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!loading && packages.length === 0 && (
        <div className="bov-card bov-empty-card">
          <span className="bov-empty-icon">📦</span>
          <h3>No packages yet</h3>
          <p>Browse our business services to get started.</p>
          <button className="bov-action-btn" style={{ margin: '0 auto' }} onClick={() => setActiveTab('service-packages')}>
            <span>◈</span><span>Browse Services</span>
          </button>
        </div>
      )}
    </div>
  );
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
};

export default BusinessDashboard;