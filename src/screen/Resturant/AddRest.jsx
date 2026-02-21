import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantAPI } from '../services/api';
import './RestaurantPremium.css';

const AddRest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantName: '',
    location: '',
    contactNumber: '',
    ownerName: '',
    ownerContactNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await restaurantAPI.register(formData);
      alert('✨ Restaurant registered successfully! Please login with your credentials.');
      navigate('/restaurant/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register restaurant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-restaurant-theme">
      <header className="premium-header">
        <div className="premium-header-content">
          <div className="premium-logo">
            <span className="premium-logo-icon">🌊</span>
            <span className="premium-logo-text">Webpont Resturants</span>
          </div>
          <nav className="premium-nav">
            {/* <a href="/restaurant/all" className="premium-nav-link">Restaurants</a>
            <a href="/restaurant/all-menus" className="premium-nav-link">Menus</a> */}
            <a href="/addrest" className="premium-nav-link active">Register</a>
            <a href="/restaurant/login" className="premium-nav-link">Login</a>
          </nav>
        </div>
      </header>

      <div style={{ minHeight: '100vh', padding: 'var(--space-xl) 0' }}>
        <div className="premium-form-container">
          <div className="premium-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 className="premium-form-title">Register Your Restaurant</h1>
            <p className="premium-form-subtitle">Join the Oceanic Bites family</p>
            
            {error && (
              <div style={{ 
                background: 'rgba(255, 107, 107, 0.1)', 
                border: '1px solid var(--coral-reef)',
                borderRadius: 'var(--radius-full)',
                padding: 'var(--space-md)',
                marginBottom: 'var(--space-lg)',
                textAlign: 'center',
                color: 'var(--coral-reef)'
              }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="premium-form-group">
                <label className="premium-label">Restaurant Name</label>
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  className="premium-input"
                  placeholder="e.g., Sunset Beach Cafe"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="premium-input"
                  placeholder="e.g., Palm Beach, Florida"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-label">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="premium-input"
                  placeholder="e.g., +1 234 567 890"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="premium-form-group">
                  <label className="premium-label">Owner Name</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="premium-input"
                    placeholder="Owner name"
                    required
                  />
                </div>

                <div className="premium-form-group">
                  <label className="premium-label">Owner Mobile</label>
                  <input
                    type="tel"
                    name="ownerContactNumber"
                    value={formData.ownerContactNumber}
                    onChange={handleChange}
                    className="premium-input"
                    placeholder="Owner's mobile (password)"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="premium-btn premium-btn-primary"
                disabled={loading}
                style={{ width: '100%', marginTop: 'var(--space-xl)' }}
              >
                {loading ? 'Registering...' : 'Register Restaurant'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
              <p style={{ color: 'rgba(240,247,255,0.6)' }}>
                Already registered?{' '}
                <a href="/restaurant/login" style={{ color: 'var(--coral-reef)', textDecoration: 'none' }}>
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="premium-footer">
        <div className="premium-footer-content">
          <div className="premium-footer-section">
            <h3>About Webpoint Sri Lanka</h3>
            <p>Websites and Software Developing experiences since 2020.</p>
          </div>
          <div className="premium-footer-section">
            <h3>Quick Links</h3>
            <p><a href="/addrest" style={{ color: 'rgba(240,247,255,0.7)', textDecoration: 'none' }}>Register</a></p>
            <p><a href="/restaurant/login" style={{ color: 'rgba(240,247,255,0.7)', textDecoration: 'none' }}>Login</a></p>
          </div>
          <div className="premium-footer-section">
            <h3>Contact</h3>
            <p>📍 Malabe, Colombo</p>
            <p>📞 +94 (70) 731-2180</p>
          </div>
        </div>
        <div className="premium-footer-bottom">
          <p>© 2026 Webpoint Sri Lanka. All rights reserved.</p>
        </div>
      </footer>

      <div className="premium-bottom-nav">
        <div className="premium-bottom-nav-items">
          {/* <a href="/restaurant/all" className="premium-bottom-nav-item">
            <span>🏖️</span>
            <span>Restaurants</span>
          </a>
          <a href="/restaurant/all-menus" className="premium-bottom-nav-item">
            <span>🍽️</span>
            <span>Menus</span>
          </a> */}
          <a href="/addrest" className="premium-bottom-nav-item active">
            <span>➕</span>
            <span>Add</span>
          </a>
          <a href="/restaurant/login" className="premium-bottom-nav-item">
            <span>🔑</span>
            <span>Login</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddRest;