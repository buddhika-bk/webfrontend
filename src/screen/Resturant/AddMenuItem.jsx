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
    specialOffers: '',
    currency: 'USD' // Default currency
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Currency symbols for display
  const currencySymbols = {
    USD: '$',
    LKR: 'Rs.'
  };

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.match('image.*')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear any previous errors
      setError('');
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    document.getElementById('image-upload').value = '';
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

      // Create FormData object for multipart/form-data
      const formDataToSend = new FormData();
      
      // Append all form fields
      formDataToSend.append('restaurantId', restaurant.restaurantId);
      formDataToSend.append('foodName', formData.foodName);
      formDataToSend.append('price', parseFloat(formData.price));
      formDataToSend.append('currency', formData.currency);
      formDataToSend.append('ingredients', JSON.stringify(ingredientsArray));
      formDataToSend.append('discount', formData.discount ? parseFloat(formData.discount) : 0);
      formDataToSend.append('specialOffers', formData.specialOffers || '');
      
      // Append image if selected
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      } else if (formData.image) {
        // If URL is provided instead of file upload
        formDataToSend.append('imageUrl', formData.image);
      }

      // You'll need to update your menuAPI.add method to handle FormData
      await menuAPI.add(formDataToSend);
      
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
            
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                <label className="premium-label">Food Image</label>
                
                {/* Image Upload Area */}
                <div className="image-upload-container">
                  {!imagePreview ? (
                    <div 
                      className="image-upload-placeholder"
                      onClick={() => document.getElementById('image-upload').click()}
                      style={{
                        border: '2px dashed var(--sky-blue)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-xl)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>📸</div>
                      <p style={{ color: 'var(--pearl-white)', marginBottom: 'var(--space-sm)' }}>
                        Click to upload an image
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  ) : (
                    <div className="image-preview-container" style={{ position: 'relative' }}>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{
                          width: '100%',
                          maxHeight: '300px',
                          objectFit: 'cover',
                          borderRadius: 'var(--radius-md)'
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        style={{
                          position: 'absolute',
                          top: 'var(--space-sm)',
                          right: 'var(--space-sm)',
                          background: 'rgba(0,0,0,0.5)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '36px',
                          height: '36px',
                          color: 'white',
                          fontSize: '1.2rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>

                {/* OR Divider */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-md)',
                  margin: 'var(--space-lg) 0'
                }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>OR</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                </div>

                {/* Image URL Input */}
                <label className="premium-label" style={{ marginTop: 'var(--space-md)' }}>Image URL (optional)</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="premium-input"
                  placeholder="https://example.com/image.jpg"
                  disabled={selectedImage}
                />
                <p style={{ 
                  color: 'rgba(255,255,255,0.3)', 
                  fontSize: '0.8rem', 
                  marginTop: 'var(--space-xs)' 
                }}>
                  You can either upload an image or provide a URL
                </p>
              </div>

              {/* Price and Currency Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-md)' }}>
                <div className="premium-form-group">
                  <label className="premium-label">Price</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute',
                      left: 'var(--space-md)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--pearl-white)',
                      fontSize: '1.1rem',
                      fontWeight: '500'
                    }}>
                      {currencySymbols[formData.currency]}
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="premium-input"
                      placeholder={formData.currency === 'USD' ? '29.99' : '3500.00'}
                      step="0.01"
                      min="0"
                      required
                      style={{ paddingLeft: '3rem' }}
                    />
                  </div>
                </div>

                <div className="premium-form-group">
                  <label className="premium-label">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="premium-input"
                    style={{ appearance: 'auto' }}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="LKR">LKR (Rs.)</option>
                  </select>
                </div>
              </div>

              {/* Discount Section with Currency Context */}
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
                {formData.price && formData.discount && (
                  <p style={{
                    color: 'var(--seafoam-green)',
                    fontSize: '0.9rem',
                    marginTop: 'var(--space-xs)'
                  }}>
                    After discount: {currencySymbols[formData.currency]}
                    {(parseFloat(formData.price) * (1 - parseFloat(formData.discount) / 100)).toFixed(2)}
                  </p>
                )}
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