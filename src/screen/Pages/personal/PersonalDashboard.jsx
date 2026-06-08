import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import EditProfile from './EditProfile';
import ResetPasswordPage from './ResetPasswordPage';
import ServicePackages from './ServicePackages';
import MyPackages from './MyPackages';
import Message from './Message';
import { packagesAPI, chatAPI } from '../../services/api';
import './PersonalDashboard.css';

const PersonalDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview',         label: 'Overview',        icon: '▦' },
    { id: 'edit-profile',     label: 'Edit Profile',    icon: '✎' },
    { id: 'reset-password',   label: 'Change Password', icon: '⚿' },
    { id: 'service-packages', label: 'Services',        icon: '◈' },
    { id: 'my-packages',      label: 'My Packages',     icon: '❐' },
    { id: 'messages',         label: 'Messages',        icon: '✉' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':         return <Overview user={user} setActiveTab={setActiveTab} />;
      case 'edit-profile':     return <EditProfile />;
      case 'reset-password':   return <ResetPasswordPage />;
      case 'service-packages': return <ServicePackages />;
      case 'my-packages':      return <MyPackages />;
      case 'messages':         return <Message />;
      default:                 return <Overview user={user} setActiveTab={setActiveTab} />;
    }
  };

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="pd-shell">
      {/* ── Sidebar ── */}
      <aside className="pd-sidebar">
        <div className="pd-sidebar-profile">
          <div className="pd-avatar">
            {user?.personalDetails?.firstName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="pd-sidebar-name">
            <span className="pd-sidebar-fullname">
              {user?.personalDetails?.firstName} {user?.personalDetails?.lastName}
            </span>
            <span className="pd-sidebar-badge">Personal</span>
          </div>
        </div>

        <nav className="pd-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`pd-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="pd-nav-icon">{tab.icon}</span>
              <span className="pd-nav-label">{tab.label}</span>
              {activeTab === tab.id && <span className="pd-nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="pd-sidebar-footer">
          <span className="pd-sidebar-email">{user?.email}</span>
          <span className="pd-sidebar-since">
            Since {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="pd-main">
        <header className="pd-topbar">
          <div className="pd-topbar-left">
            <span className="pd-topbar-icon">{currentTab?.icon}</span>
            <h1 className="pd-topbar-title">{currentTab?.label}</h1>
          </div>
          <div className="pd-topbar-right">
            <div className="pd-topbar-date">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </header>

        <div className="pd-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

/* ── Overview ──────────────────────────────────────── */
const Overview = ({ user, setActiveTab }) => {
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
  const activePackages   = packages.filter(p => p.status === 'active' || p.status === 'in-progress').length;
  const completedPackages= packages.filter(p => p.status === 'completed').length;
  const inProgressPackages= packages.filter(p => p.status === 'in-progress').length;
  const unreadMessages   = convData?.unreadByUser || 0;

  const stats = [
    { label: 'Active Packages', value: loading ? '—' : String(activePackages),    icon: '❐', color: '#0ea5e9', bg: '#f0f9ff' },
    { label: 'Unread Messages', value: loading ? '—' : String(unreadMessages),    icon: '✉', color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Completed',       value: loading ? '—' : String(completedPackages), icon: '✓', color: '#10b981', bg: '#ecfdf5' },
    { label: 'In Progress',     value: loading ? '—' : String(inProgressPackages),icon: '◌', color: '#f59e0b', bg: '#fffbeb' },
  ];

  const quickActions = [
    { label: 'Browse Services', tab: 'service-packages', icon: '◈' },
    { label: 'My Packages',     tab: 'my-packages',      icon: '❐' },
    { label: 'Edit Profile',    tab: 'edit-profile',     icon: '✎' },
    { label: 'Change Password', tab: 'reset-password',   icon: '⚿' },
  ];

  return (
    <div className="ov-root">
      {/* Hero */}
      <div className="ov-hero">
        <div className="ov-hero-glow" />
        <div className="ov-hero-text">
          <p className="ov-hero-sub">Good {getGreeting()},</p>
          <h2 className="ov-hero-name">
            {user?.personalDetails?.firstName || 'User'} 👋
          </h2>
          <p className="ov-hero-desc">Here's a summary of your WebPoint account.</p>
        </div>
        <div className="ov-hero-avatar">
          {user?.personalDetails?.firstName?.charAt(0)?.toUpperCase() || 'U'}
        </div>
      </div>

      {/* Stats */}
      <div className="ov-stats">
        {stats.map((s, i) => (
          <div className="ov-stat" key={i}
            style={{ '--accent': s.color, '--bg': s.bg, animationDelay: `${i * 0.07}s` }}>
            <div className="ov-stat-icon-wrap">
              <span className="ov-stat-icon">{s.icon}</span>
            </div>
            <div>
              <p className="ov-stat-label">{s.label}</p>
              <p className="ov-stat-value">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom two-col */}
      <div className="ov-bottom">
        {/* Profile info */}
        <div className="ov-card ov-profile-card">
          <div className="ov-card-header">
            <span className="ov-card-title">Profile Information</span>
          </div>
          <div className="ov-profile-rows">
            {[
              {
                label: 'Full Name',
                val: `${user?.personalDetails?.firstName || ''} ${user?.personalDetails?.lastName || ''}`.trim() || '—'
              },
              { label: 'Email',        val: user?.email || '—' },
              { label: 'Phone',        val: user?.personalDetails?.phoneNumber || 'Not provided' },
              { label: 'Member Since', val: new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
            ].map((r, i) => (
              <div className="ov-profile-row" key={i}>
                <span className="ov-profile-label">{r.label}</span>
                <span className="ov-profile-val">{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="ov-card ov-actions-card">
          <div className="ov-card-header">
            <span className="ov-card-title">Quick Actions</span>
          </div>
          <div className="ov-actions-grid">
            {quickActions.map((a, i) => (
              <button key={i} className="ov-action-btn" onClick={() => setActiveTab(a.tab)}>
                <span className="ov-action-icon">{a.icon}</span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent packages */}
      {!loading && packages.length > 0 && (
        <div className="ov-card">
          <div className="ov-card-header" style={{ marginBottom: 16 }}>
            <span className="ov-card-title">Recent Packages</span>
          </div>
          <div className="ov-packages-list">
            {packages.slice(0, 3).map(pkg => {
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

              return (
                <div className="ov-pkg-item" key={pkg._id}>
                  <div className="ov-pkg-left">
                    <div className="ov-pkg-bar-wrap">
                      <div
                        className="ov-pkg-bar-fill"
                        style={{ width: `${pkg.progress || 0}%`, background: statusColor }}
                      />
                    </div>
                    <div>
                      <p className="ov-pkg-name">{pkg.title}</p>
                      <p className="ov-pkg-meta">
                        {pkg.price?.currency || 'LKR'} {(pkg.price?.amount || 0).toLocaleString()}
                        {pkg.expiryDate && ` · Expires ${new Date(pkg.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="ov-pkg-pct">{pkg.progress || 0}%</span>
                    <span className="ov-pkg-badge" style={{ color: statusColor, background: statusBg }}>
                      {pkg.status}
                    </span>
                  </div>
                </div>
              );
            })}
            {packages.length > 3 && (
              <button className="ov-view-all-btn" onClick={() => setActiveTab('my-packages')}>
                View all {packages.length} packages →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Empty state if no packages */}
      {!loading && packages.length === 0 && (
        <div className="ov-card ov-empty-card">
          <span className="ov-empty-icon">📦</span>
          <h3>No packages yet</h3>
          <p>Browse our services and subscribe to get started.</p>
          <button className="ov-action-btn" style={{ margin: '0 auto' }} onClick={() => setActiveTab('service-packages')}>
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

export default PersonalDashboard;