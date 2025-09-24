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

  // Smooth scroll function for anchor links
  const smoothScroll = (targetId) => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      closeMobileNav();
    }
  };

  // Handle anchor link clicks
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    
    // If we're not on home page, navigate to home first
    if (window.location.pathname !== '/home') {
      navigate('/home');
      // Wait for navigation then scroll
      setTimeout(() => {
        smoothScroll(targetId);
      }, 100);
    } else {
      smoothScroll(targetId);
    }
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
            <li><a href="#home" onClick={(e) => handleAnchorClick(e, '#home')}>Home</a></li>
            <li><a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>Services</a></li>
            <li><a href="#pos-system" onClick={(e) => handleAnchorClick(e, '#pos-system')}>POS System</a></li>
            <li><a href="#packages" onClick={(e) => handleAnchorClick(e, '#packages')}>Packages</a></li>
            <li><a href="#why-choose-us" onClick={(e) => handleAnchorClick(e, '#why-choose-us')}>Why Choose Us</a></li>
            <li><a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>Contact</a></li>
          </ul>
        </nav>
        
        {/* Desktop Buttons */}
        <div className="header-buttons">
          <button className="login-btn">Login</button>
          <button 
            className="primary-button"
            onClick={() => navigate('/add-shop')}
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
          <li><a href="#home" onClick={(e) => handleAnchorClick(e, '#home')}>Home</a></li>
          <li><a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>Services</a></li>
          <li><a href="#pos-system" onClick={(e) => handleAnchorClick(e, '#pos-system')}>POS System</a></li>
          <li><a href="#packages" onClick={(e) => handleAnchorClick(e, '#packages')}>Packages</a></li>
          <li><a href="#why-choose-us" onClick={(e) => handleAnchorClick(e, '#why-choose-us')}>Why Choose Us</a></li>
          <li><a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>Contact</a></li>
          <li className="mobile-nav-buttons">
            <button className="login-btn" onClick={closeMobileNav}>Login</button>
            <button 
              className="primary-button"
              onClick={() => {
                navigate('/add-shop');
                closeMobileNav();
              }}
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