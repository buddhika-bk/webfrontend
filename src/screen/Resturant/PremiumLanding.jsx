import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantPremium.css';

// Import your video file (you'll need to add a video file to your public folder)
// For demo purposes, we're using a placeholder video URL
// Replace with your actual video file path

const PremiumLanding = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays on load
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="premium-theme">
      {/* Premium Header */}
      <header className="premium-header">
        <div className="premium-header-content">
          <div className="premium-logo">
            <span className="premium-logo-icon">🌊</span>
            <span className="premium-logo-text">OCEANIC BITES</span>
          </div>
          <nav className="premium-nav">
            <a href="/restaurant/all" className="premium-nav-link">Restaurants</a>
            <a href="/restaurant/all-menus" className="premium-nav-link">Menus</a>
            <a href="/addrest" className="premium-nav-link">Register</a>
            <a href="/about" className="premium-nav-link">About</a>
          </nav>
        </div>
      </header>

      {/* Video Landing Section */}
      <div className="premium-landing">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="premium-video-background"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        >
          {/* Replace with your actual video file */}
          <source src="/videos/ocean-wave.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div className="premium-video-overlay"></div>

        {/* Content */}
        <div className="premium-landing-content">
          <h1 className="premium-landing-title">
            <span className="premium-landing-title-line1">Welcome to</span>
            <span className="premium-landing-title-line2">Oceanic Bites</span>
          </h1>
          <p className="premium-landing-subtitle">
            Experience the finest coastal cuisine, where every dish tells a story of the sea
          </p>
          <div className="premium-landing-buttons">
            <button 
              onClick={() => navigate('/restaurant/all')}
              className="premium-btn premium-btn-primary"
            >
              Explore Restaurants
            </button>
            <button 
              onClick={() => navigate('/addrest')}
              className="premium-btn premium-btn-secondary"
            >
              Register Your Restaurant
            </button>
          </div>
        </div>
      </div>

      {/* Premium Footer */}
      <footer className="premium-footer">
        <div className="premium-footer-content">
          <div className="premium-footer-section">
            <h3>About Oceanic Bites</h3>
            <p>Curating the finest beachfront dining experiences since 2024. Each restaurant in our collection offers a unique taste of coastal paradise.</p>
            <div className="premium-footer-social">
              <a href="#" className="premium-social-icon">📱</a>
              <a href="#" className="premium-social-icon">📘</a>
              <a href="#" className="premium-social-icon">📷</a>
              <a href="#" className="premium-social-icon">🐦</a>
            </div>
          </div>
          <div className="premium-footer-section">
            <h3>Quick Links</h3>
            <p><a href="/restaurant/all" style={{ color: 'inherit', textDecoration: 'none' }}>All Restaurants</a></p>
            <p><a href="/restaurant/all-menus" style={{ color: 'inherit', textDecoration: 'none' }}>Browse Menus</a></p>
            <p><a href="/addrest" style={{ color: 'inherit', textDecoration: 'none' }}>Partner With Us</a></p>
            <p><a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a></p>
          </div>
          <div className="premium-footer-section">
            <h3>Contact</h3>
            <p>📍 123 Coastal Highway</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ hello@oceanicbites.com</p>
          </div>
        </div>
        <div className="premium-footer-bottom">
          <p>© 2024 Oceanic Bites. All rights reserved. Crafted with 🌊 by the sea</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="premium-bottom-nav">
        <div className="premium-bottom-nav-items">
          <a href="/restaurant/all" className="premium-bottom-nav-item">
            <span>🏖️</span>
            <span>Restaurants</span>
          </a>
          <a href="/restaurant/all-menus" className="premium-bottom-nav-item">
            <span>🍽️</span>
            <span>Menus</span>
          </a>
          <a href="/addrest" className="premium-bottom-nav-item">
            <span>➕</span>
            <span>Add</span>
          </a>
          <a href="/about" className="premium-bottom-nav-item">
            <span>ℹ️</span>
            <span>About</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PremiumLanding;