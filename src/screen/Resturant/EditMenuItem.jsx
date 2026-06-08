import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { menuAPI,  isUserAuthenticated } from '../services/api';
import './RestaurantPremium.css';

const EditMenuItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    foodName: '',
    image: '',
    price: '',
    ingredients: '',
    discount: '',
    specialOffers: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/restaurant/login');
      return;
    }
    fetchMenuItem();
  }, [id, navigate]);

  const fetchMenuItem = async () => {
    try {
      const response = await menuAPI.getById(id);
      const item = response.data;
      
      setFormData({
        foodName: item.foodName || '',
        image: item.image || '',
        price: item.price || '',
        ingredients: Array.isArray(item.ingredients) 
          ? item.ingredients.join(', ')
          : item.ingredients || '',
        discount: item.discount || '',
        specialOffers: item.specialOffers || ''
      });
    } catch (err) {
      setError('Failed to fetch menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const ingredientsArray = formData.ingredients
        .split(',')
        .map(item => item.trim())
        .filter(item => item);

      const updateData = {
        foodName: formData.foodName,
        image: formData.image || null,
        price: parseFloat(formData.price),
        ingredients: ingredientsArray,
        discount: formData.discount ? parseFloat(formData.discount) : 0,
        specialOffers: formData.specialOffers || null
      };

      await menuAPI.update(id, updateData);
      alert('✅ Menu item updated successfully!');
      navigate('/restaurant/menu');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update menu item');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentRestaurant');
    navigate('/restaurant/login');
  };

  if (loading) {
    return (
      <div className="premium-restaurant-theme">
        <div className="premium-loading">
          <div className="premium-loading-spinner"></div>
        </div>
      </div>
    );
  }

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
            <h1 className="premium-form-title">Edit Dish</h1>
            <p className="premium-form-subtitle">Update your culinary creation</p>
            
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
                  placeholder="https://..."
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
                  rows="3"
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
                <button 
                  type="button"
                  onClick={() => navigate('/restaurant/menu')}
                  className="premium-btn premium-btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="premium-btn premium-btn-primary"
                  disabled={saving}
                  style={{ flex: 2 }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="premium-footer">
        <div className="premium-footer-content">
          <div className="premium-footer-section">
            <h3>About Webpoint Sri Lanka</h3>
            <p>Website and Software Developing experiences since 2020.</p>
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
          {/* <a href="/restaurant/all" className="premium-bottom-nav-item">
            <span>🏖️</span>
            <span>Restaurants</span>
          </a>
          <a href="/restaurant/all-menus" className="premium-bottom-nav-item">
            <span>🍽️</span>
            <span>Menus</span>
          </a> */}
          <button onClick={handleLogout} className="premium-bottom-nav-item" style={{ background: 'none', border: 'none' }}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMenuItem;