import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuAPI, getCurrentRestaurant, isAuthenticated } from '../services/api';
import './RestaurantPremium.css';

const AddMenuItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodName: '',
    image: '',
    price: '',
    ingredients: '',
    discount: '',
    specialOffers: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check authentication
  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/restaurant/login');
    }
  }, [navigate]);

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
      const restaurant = getCurrentRestaurant();
      if (!restaurant) {
        navigate('/restaurant/login');
        return;
      }

      const ingredientsArray = formData.ingredients
        .split(',')
        .map(item => item.trim())
        .filter(item => item);

      const menuData = {
        restaurantId: restaurant.restaurantId,
        foodName: formData.foodName,
        image: formData.image || null,
        price: parseFloat(formData.price),
        ingredients: ingredientsArray,
        discount: formData.discount ? parseFloat(formData.discount) : 0,
        specialOffers: formData.specialOffers || null
      };

      await menuAPI.add(menuData);
      alert('✨ Menu item added successfully!');
      navigate('/restaurant/menu');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentRestaurant');
    navigate('/restaurant/login');
  };

  return (
    <div className="premium-restaurant-theme">
      <header className="premium-header">
        <div className="premium-header-content">
          <div className="premium-logo">
            <span className="premium-logo-icon">🌊</span>
            <span className="premium-logo-text">Wepoint Resturants</span>
          </div>
          <nav className="premium-nav">
            <button onClick={handleLogout} className="premium-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              🚪 Logout
            </button>
          </nav>
        </div>
      </header>

      <div style={{ minHeight: '100vh', padding: 'var(--space-xl) 0' }}>
        <div className="premium-form-container">
          <button 
            onClick={() => navigate('/restaurant/menu')}
            className="premium-btn premium-btn-secondary"
            style={{ marginBottom: 'var(--space-lg)' }}
          >
            ← Back to Menu
          </button>

          <div className="premium-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 className="premium-form-title">Add New Dish</h1>
            <p className="premium-form-subtitle">Share your culinary creation</p>
            
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
                <label className="premium-label">Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleChange}
                  className="premium-input"
                  placeholder="e.g., Grilled Lobster"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-label">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="premium-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="premium-form-group">
                  <label className="premium-label">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="premium-input"
                    placeholder="29.99"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="premium-form-group">
                  <label className="premium-label">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="premium-input"
                    placeholder="10"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="premium-form-group">
                <label className="premium-label">Ingredients (comma separated)</label>
                <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  className="premium-input"
                  placeholder="lobster, butter, garlic, lemon"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-label">Special Offers</label>
                <textarea
                  name="specialOffers"
                  value={formData.specialOffers}
                  onChange={handleChange}
                  className="premium-input premium-textarea"
                  placeholder="e.g., Free coconut water with this dish"
                  rows="3"
                />
              </div>

              <button 
                type="submit" 
                className="premium-btn premium-btn-primary"
                disabled={loading}
                style={{ width: '100%', marginTop: 'var(--space-xl)' }}
              >
                {loading ? 'Adding...' : 'Add to Menu'}
              </button>
            </form>
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
            <p><a href="#" style={{ color: 'rgba(240,247,255,0.7)', textDecoration: 'none' }}>All Restaurants</a></p>
            <p><a href="#" style={{ color: 'rgba(240,247,255,0.7)', textDecoration: 'none' }}>Browse Menus</a></p>
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
          <a href="#" className="premium-bottom-nav-item">
            <span>🏖️</span>
            <span>Restaurants</span>
          </a>
          <a href="#" className="premium-bottom-nav-item">
            <span>🍽️</span>
            <span>Menus</span>
          </a>
          <button onClick={handleLogout} className="premium-bottom-nav-item" style={{ background: 'none', border: 'none' }}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItem;