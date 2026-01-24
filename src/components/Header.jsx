// components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  // Navigation function for page navigation
  const handleNavigation = (path) => {
    navigate(path);
    closeMobileNav();
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo">
          <h1 onClick={() => navigate('/home')} style={{cursor: 'pointer'}}>WebPoint<span>.lk</span></h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="main-nav">
          <ul>
            <li><a onClick={() => handleNavigation('/home')}>Home</a></li>
            <li><a onClick={() => handleNavigation('/service')}>Services</a></li>
            <li><a onClick={() => handleNavigation('/about')}>About</a></li>
            <li><a onClick={() => handleNavigation('/contact')}>Contact</a></li>
          </ul>
        </nav>
        
        {/* Desktop Buttons */}
        <div className="header-buttons">
          <button className="login-btn">Login</button>
          <button 
            className="primary-button"
            onClick={() => navigate('/systems')}
          >
            Get Started
          </button>
        </div>
        
        {/* Mobile Toggle Button */}
        <button 
          className={`mobile-nav-toggle ${isMobileNavOpen ? 'active' : ''}`}
          aria-label="Toggle navigation"
          onClick={toggleMobileNav}
        >
          <span className="hamburger"></span>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileNavOpen ? 'active' : ''}`}>
        <ul>
          <li><a onClick={() => handleNavigation('/home')}>Home</a></li>
          <li><a onClick={() => handleNavigation('/service')}>Services</a></li>
          <li><a onClick={() => handleNavigation('/about')}>About</a></li>
          <li><a onClick={() => handleNavigation('/contact')}>Contact</a></li>
          <li className="mobile-nav-buttons">
            <button className="login-btn" onClick={closeMobileNav}>Login</button>
            <button 
              className="primary-button"
              onClick={() => handleNavigation('/systems')}
            >
              Get Started
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;