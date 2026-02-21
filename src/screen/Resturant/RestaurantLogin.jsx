import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantAPI, setAuthToken, setCurrentRestaurant } from '../services/api';
import './RestaurantPremium.css';

const RestaurantLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      console.log('🔐 Login attempt with:', { 
        ownerName: formData.ownerName, 
        ownerContactNumber: '***' 
      });
      
      const response = await restaurantAPI.login(formData);
      console.log('✅ Login response:', response.data);
      
      const { token, restaurant } = response.data;
      
      // Validate we have the necessary data
      if (!restaurant) {
        throw new Error('No restaurant data received');
      }
      
      // Ensure we have restaurantId
      if (!restaurant.restaurantId && restaurant._id) {
        restaurant.restaurantId = restaurant._id;
      }
      
      console.log('🏪 Restaurant data to store:', restaurant);
      
      // Store auth data
      setAuthToken(token);
      setCurrentRestaurant(restaurant);
      
      // Verify storage
      const storedRestaurant = localStorage.getItem('currentRestaurant');
      console.log('💾 Stored restaurant:', storedRestaurant);
      
      // Navigate to dashboard
      navigate('/restaurant/dashboard');
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.response?.data?.error || err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-restaurant-theme">
      {/* Premium Header */}
      <header className="premium-header">
        <div className="premium-header-content">
          <div className="premium-logo">
            <span className="premium-logo-icon">🌊</span>
            <span className="premium-logo-text">Webpont Resturants</span>
          </div>
          <nav className="premium-nav">
            {/* <a href="/restaurant/all" className="premium-nav-link">Restaurants</a>
            <a href="/restaurant/all-menus" className="premium-nav-link">Menus</a>
            <a href="/addrest" className="premium-nav-link">Register</a> */}
            <a href="/addrest" className="premium-nav-link active">Register</a>
            <a href="/restaurant/login" className="premium-nav-link active">Login</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ minHeight: '100vh', padding: 'var(--space-xl) 0' }}>
        <div className="premium-form-container">
          <div className="premium-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h1 className="premium-form-title">Restaurant Login</h1>
            <p className="premium-form-subtitle">Access your restaurant dashboard</p>
            
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
                <label className="premium-label">Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="premium-input"
                  placeholder="Enter owner name"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-label">Mobile Number</label>
                <input
                  type="tel"
                  name="ownerContactNumber"
                  value={formData.ownerContactNumber}
                  onChange={handleChange}
                  className="premium-input"
                  placeholder="Enter registered mobile number"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="premium-btn premium-btn-primary"
                disabled={loading}
                style={{ width: '100%', marginTop: 'var(--space-xl)' }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
              <p style={{ color: 'rgba(240,247,255,0.6)' }}>
                New restaurant?{' '}
                <a href="/addrest" style={{ color: 'var(--coral-reef)', textDecoration: 'none' }}>
                  Register here
                </a>
              </p>
            </div>

            {/* Test Credentials (Remove in production) */}
            <div style={{ 
              marginTop: 'var(--space-xl)', 
              padding: 'var(--space-md)',
              background: 'rgba(59, 123, 176, 0.1)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--caribbean-blue)'
            }}>
              <p style={{ color: 'var(--caribbean-blue)', fontSize: '0.9rem', marginBottom: 'var(--space-sm)' }}>
                🔑 Test Credentials:
              </p>
              <p style={{ color: 'rgba(240,247,255,0.7)', fontSize: '0.8rem' }}>
                Owner: Test Owner<br/>
                Mobile: 1234567890
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Footer */}
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

      {/* Mobile Bottom Navigation */}
      <div className="premium-bottom-nav">
        <div className="premium-bottom-nav-items">
          {/* <a href="/restaurant/all" className="premium-bottom-nav-item">
            <span>🏖️</span>
            <span>Restaurants</span>
          </a>
          <a href="/restaurant/all-menus" className="premium-bottom-nav-item">
            <span>🍽️</span>
            <span>Menus</span>
          </a>*/}
          <a href="/addrest" className="premium-bottom-nav-item">
            <span>➕</span>
            <span>Add</span>
          </a> 
          <a href="/restaurant/login" className="premium-bottom-nav-item active">
            <span>🔑</span>
            <span>Login</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin;