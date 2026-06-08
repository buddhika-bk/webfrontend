// components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate  = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMobileNav  = () => setIsMobileNavOpen(prev => !prev);
  const closeMobileNav   = () => setIsMobileNavOpen(false);

  const handleNavigation = (path) => { navigate(path); closeMobileNav(); };
  const handleLogin      = () => { navigate('/login');    closeMobileNav(); };
  const handleRegister   = () => { navigate('/register'); closeMobileNav(); };

  const handleLogout = () => {
    logout();
    navigate('/home');
    closeMobileNav();
  };

  const handleDashboard = () => {
    if (user?.userType === 'personal') navigate('/personal/dashboard');
    else if (user?.userType === 'business') navigate('/business/dashboard');
    else if (user?.userType === 'admin')    navigate('/admin/dashboard');
    closeMobileNav();
  };

  // Helpers for the user chip
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

  const typeLabel = user?.userType === 'personal' ? 'Personal'
    : user?.userType === 'business' ? 'Business'
    : 'Admin';

  return (
    <header className="main-header">
      <div className="header-content">

        {/* ── Logo ── */}
        <div className="logo">
          <h1 onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
            WebPoint<span>.lk</span>
          </h1>
        </div>

        {/* ── Desktop Navigation ── */}
        <nav className="main-nav">
          <ul>
            <li><a onClick={() => handleNavigation('/home')}>Home</a></li>
            <li><a onClick={() => handleNavigation('/service')}>Services</a></li>
            <li><a onClick={() => handleNavigation('/about')}>About</a></li>
            <li><a onClick={() => handleNavigation('/contact')}>Contact</a></li>
          </ul>
        </nav>

        {/* ── Desktop Buttons / User Section ── */}
        <div className="header-buttons">
          {!isAuthenticated ? (
            <>
              <button className="login-btn" onClick={handleLogin}>Login</button>
              <button className="primary-button" onClick={handleRegister}>Get Started</button>
            </>
          ) : (
            /* ── Authenticated: user chip + logout (matches image) ── */
            <div className="header-user-section">
              <button className="header-user-chip" onClick={handleDashboard} title="Go to Dashboard">
                <div className="header-avatar">{getAvatarLetter()}</div>
                <div className="header-user-info">
                  <span className="header-user-name">{getDisplayName()}</span>
                  <span className="header-user-type" style={getTypeBadgeStyle()}>
                    {typeLabel}
                  </span>
                </div>
              </button>
              <button className="header-logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className={`mobile-nav-toggle ${isMobileNavOpen ? 'active' : ''}`}
          aria-label="Toggle navigation"
          onClick={toggleMobileNav}
        >
          <span className="hamburger" />
        </button>
      </div>

      {/* ── Mobile Navigation ── */}
      <nav className={`mobile-nav ${isMobileNavOpen ? 'active' : ''}`}>
        <ul>
          <li><a onClick={() => handleNavigation('/home')}>Home</a></li>
          <li><a onClick={() => handleNavigation('/service')}>Services</a></li>
          <li><a onClick={() => handleNavigation('/about')}>About</a></li>
          <li><a onClick={() => handleNavigation('/contact')}>Contact</a></li>
          <li className="mobile-nav-buttons">
            {!isAuthenticated ? (
              <>
                <button className="login-btn" onClick={handleLogin}>Login</button>
                <button className="primary-button" onClick={handleRegister}>Get Started</button>
              </>
            ) : (
              <div className="mobile-user-section">
                {/* User chip in mobile menu */}
                <div className="header-user-chip mobile-chip" onClick={handleDashboard}>
                  <div className="header-avatar">{getAvatarLetter()}</div>
                  <div className="header-user-info">
                    <span className="header-user-name">{getDisplayName()}</span>
                    <span className="header-user-type" style={getTypeBadgeStyle()}>
                      {typeLabel}
                    </span>
                  </div>
                </div>
                <button className="header-logout-btn full-width" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;