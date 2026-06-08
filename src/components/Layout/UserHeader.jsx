import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './UserHeader.css';

const UserHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (user?.userType === 'personal') return '/personal/dashboard';
    if (user?.userType === 'business') return '/business/dashboard';
    if (user?.userType === 'admin')    return '/admin/dashboard';
    return '/';
  };

  const getDisplayName = () => {
    if (user?.userType === 'personal') {
      const first = user?.personalDetails?.firstName || '';
      const last  = user?.personalDetails?.lastName  || '';
      return `${first} ${last}`.trim() || user?.email || 'User';
    }
    if (user?.userType === 'business') {
      return user?.businessDetails?.companyName || user?.email || 'Business';
    }
    return user?.email || 'Admin';
  };

  const getAvatarLetter = () => getDisplayName().charAt(0).toUpperCase();

  const getTypeBadgeStyle = () => {
    if (user?.userType === 'business') return { background: 'rgba(245,158,11,.12)', color: '#d97706' };
    if (user?.userType === 'admin')    return { background: 'rgba(139,92,246,.12)', color: '#7c3aed' };
    return { background: 'rgba(14,165,233,.12)', color: '#0369a1' };
  };

  const navLinks = [
    { label: 'Home',     path: '/home'    },
    { label: 'Services', path: '/service' },
    { label: 'About',    path: '/about'   },
    { label: 'Contact',  path: '/contact' },
  ];

  return (
    <header className="uh-header">
      <div className="uh-content">

        {/* ── Logo ── */}
        <Link to={getDashboardLink()} className="uh-logo">
          <span className="uh-logo-icon"></span>
          <span className="uh-logo-text">WebPoint</span>
          <span className="uh-logo-dot">.lk</span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="uh-nav">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className="uh-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── User Section ── */}
        <div className="uh-user-section">
          <div className="uh-user-chip">
            <div className="uh-avatar">{getAvatarLetter()}</div>
            <div className="uh-user-details">
              <span className="uh-user-name">{getDisplayName()}</span>
              <span className="uh-user-type" style={getTypeBadgeStyle()}>
                {user?.userType === 'personal' ? 'Personal'
                  : user?.userType === 'business' ? 'Business'
                  : 'Admin'}
              </span>
            </div>
          </div>
          <button className="uh-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className={`uh-mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div className={`uh-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="uh-mobile-nav">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className="uh-mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="uh-mobile-user">
          <div className="uh-user-chip">
            <div className="uh-avatar">{getAvatarLetter()}</div>
            <div className="uh-user-details">
              <span className="uh-user-name">{getDisplayName()}</span>
              <span className="uh-user-type" style={getTypeBadgeStyle()}>
                {user?.userType === 'personal' ? 'Personal'
                  : user?.userType === 'business' ? 'Business'
                  : 'Admin'}
              </span>
            </div>
          </div>
          <button className="uh-logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;