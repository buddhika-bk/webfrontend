import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  menuAPI, 
  reviewAPI, 
  getCurrentRestaurant, 
  getRestaurantId,
  clearAuth,
  isAuthenticated 
} from '../services/api';
import './RestaurantPremium.css';

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Edit states
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    foodName: '',
    image: '',
    price: '',
    ingredients: '',
    discount: '',
    specialOffers: ''
  });

  // Stats
  const [stats, setStats] = useState({
    totalItems: 0,
    totalReviews: 0,
    averageRating: 0
  });

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      console.log('Not authenticated, redirecting to login');
      navigate('/restaurant/login');
      return;
    }

    // Get current restaurant
    const currentRestaurant = getCurrentRestaurant();
    console.log('Current restaurant from storage:', currentRestaurant);
    
    if (!currentRestaurant) {
      console.log('No restaurant data found');
      clearAuth();
      navigate('/restaurant/login');
      return;
    }
    
    setRestaurant(currentRestaurant);
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const restaurantId = getRestaurantId();
      console.log('Fetching data for restaurantId:', restaurantId);
      
      if (!restaurantId) {
        throw new Error('No restaurant ID found');
      }

      // Fetch menu items
      console.log('Fetching menu items...');
      const menuResponse = await menuAPI.getByRestaurant(restaurantId);
      console.log('Menu response:', menuResponse.data);
      const menuData = menuResponse.data || [];
      setMenuItems(menuData);

      // Fetch reviews
      console.log('Fetching reviews...');
      const reviewsResponse = await reviewAPI.getByRestaurant(restaurantId);
      console.log('Reviews response:', reviewsResponse.data);
      const reviewsData = reviewsResponse.data || [];
      setReviews(reviewsData);

      // Calculate stats
      const avgRating = reviewsData.length > 0 
        ? (reviewsData.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewsData.length).toFixed(1)
        : 0;

      setStats({
        totalItems: menuData.length,
        totalReviews: reviewsData.length,
        averageRating: avgRating
      });

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.error || err.message || 'Failed to fetch data');
      
      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        clearAuth();
        navigate('/restaurant/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/restaurant/login');
  };

  // Navigate to customer view
  const handleCustomerView = () => {
    const restaurantId = getRestaurantId();
    if (restaurantId) {
      navigate(`/restaurant/customer/menu/${restaurantId}`);
    } else {
      setError('Restaurant ID not found');
    }
  };

  // Navigate to customer landing page (optional)
  const handleCustomerLanding = () => {
    const restaurantId = getRestaurantId();
    if (restaurantId) {
      navigate(`#`);
    } else {
      setError('Restaurant ID not found');
    }
  };

  // Menu functions
  const handleDeleteMenuItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await menuAPI.delete(id);
        setSuccess('Menu item deleted successfully');
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete menu item');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const handleEditMenuItem = (item) => {
    setEditingItem(item);
    setEditFormData({
      foodName: item.foodName || '',
      image: item.image || '',
      price: item.price || '',
      ingredients: Array.isArray(item.ingredients) 
        ? item.ingredients.join(', ')
        : item.ingredients || '',
      discount: item.discount || '',
      specialOffers: item.specialOffers || ''
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredientsArray = editFormData.ingredients
        .split(',')
        .map(item => item.trim())
        .filter(item => item);

      const updateData = {
        foodName: editFormData.foodName,
        image: editFormData.image || null,
        price: parseFloat(editFormData.price),
        ingredients: ingredientsArray,
        discount: editFormData.discount ? parseFloat(editFormData.discount) : 0,
        specialOffers: editFormData.specialOffers || null
      };

      await menuAPI.update(editingItem._id, updateData);
      setEditingItem(null);
      setSuccess('Menu item updated successfully');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update menu item');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Review functions
  const handleDeleteReview = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewAPI.delete(id);
        setSuccess('Review deleted successfully');
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete review');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getFoodItemName = (menuItemId) => {
    const item = menuItems.find(item => item._id === menuItemId);
    return item ? item.foodName : 'Unknown dish';
  };

  // Food images for menu items
  const foodImages = [
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

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
      {/* Premium Header */}
      <header className="premium-header">
        <div className="premium-header-content">
          <div className="premium-logo">
            <span className="premium-logo-icon">🌊</span>
            <span className="premium-logo-text"> Webpoint Resturants</span>
          </div>
          <nav className="premium-nav">
            <span className="premium-nav-link" style={{ color: 'var(--coral-reef)' }}>
              👤 {restaurant?.ownerName || 'Owner'}
            </span>
            <span className="premium-nav-link" style={{ color: 'var(--pearl-white)' }}>
              🏪 {restaurant?.restaurantName || 'Restaurant'}
            </span>
            <button onClick={handleLogout} className="premium-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              🚪 Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ minHeight: '100vh', padding: 'var(--space-xl) 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--space-xl)' }}>
          
          {/* Welcome Section */}
          <div className="premium-card" style={{ marginBottom: 'var(--space-xl)' }}>
            <h1 style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: 'var(--pearl-white)',
              marginBottom: 'var(--space-sm)'
            }}>
              Welcome back, {restaurant?.ownerName}!
            </h1>
            <p style={{ color: 'var(--coral-reef)', fontSize: '1.2rem', marginBottom: 'var(--space-lg)' }}>
              📍 {restaurant?.location || 'Location not set'} | 📞 {restaurant?.contactNumber || 'Contact not set'}
            </p>
            
            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: 'var(--space-md)', 
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-xl)'
            }}>
              <button 
                onClick={handleCustomerView}
                className="premium-btn premium-btn-primary"
                style={{ minWidth: '200px' }}
              >
                👀 View Menu as Customer
              </button>
              <button 
                onClick={handleCustomerLanding}
                className="premium-btn premium-btn-secondary"
                style={{ minWidth: '200px' }}
              >
                🏖️ View Landing Page
              </button>
            </div>
            
            {/* Stats Cards */}
            <div className="premium-stats">
              <div className="premium-stat-card">
                <span className="premium-stat-icon">🍽️</span>
                <div>
                  <div className="premium-stat-number">{stats.totalItems}</div>
                  <div className="premium-stat-label">Menu Items</div>
                </div>
              </div>
              <div className="premium-stat-card">
                <span className="premium-stat-icon">⭐</span>
                <div>
                  <div className="premium-stat-number">{stats.totalReviews}</div>
                  <div className="premium-stat-label">Reviews</div>
                </div>
              </div>
              <div className="premium-stat-card">
                <span className="premium-stat-icon">📊</span>
                <div>
                  <div className="premium-stat-number">{stats.averageRating}</div>
                  <div className="premium-stat-label">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div style={{ 
              background: 'rgba(168, 230, 207, 0.1)', 
              border: '1px solid var(--seafoam)',
              borderRadius: 'var(--radius-full)',
              padding: 'var(--space-md)',
              marginBottom: 'var(--space-lg)',
              textAlign: 'center',
              color: 'var(--seafoam)'
            }}>
              {success}
            </div>
          )}

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

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('menu')}
              className={`premium-btn ${activeTab === 'menu' ? 'premium-btn-primary' : 'premium-btn-secondary'}`}
            >
              🍽️ Menu Items ({menuItems.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`premium-btn ${activeTab === 'reviews' ? 'premium-btn-primary' : 'premium-btn-secondary'}`}
            >
              ⭐ Reviews ({reviews.length})
            </button>
            <button
              onClick={() => navigate('/restaurant/menu/add')}
              className="premium-btn premium-btn-primary"
              style={{ marginLeft: 'auto' }}
            >
              + Add New Item
            </button>
          </div>

          {/* Menu Items Tab */}
          {activeTab === 'menu' && (
            <div>
              {menuItems.length === 0 ? (
                <div className="premium-empty-state">
                  <div className="premium-empty-icon">🍽️</div>
                  <h2 className="premium-empty-title">No Menu Items Yet</h2>
                  <p className="premium-empty-text">Start adding delicious dishes to your menu!</p>
                  <button 
                    onClick={() => navigate('/restaurant/menu/add')}
                    className="premium-btn premium-btn-primary"
                  >
                    Add First Item
                  </button>
                </div>
              ) : (
                <div className="premium-menu-grid">
                  {menuItems.map((item, index) => (
                    <div key={item._id} className="premium-menu-item">
                      <div className="premium-menu-image">
                        <img 
                          src={item.image || foodImages[index % foodImages.length]} 
                          alt={item.foodName}
                        />
                        {item.discount > 0 && (
                          <div className="premium-menu-discount">
                            -{item.discount}%
                          </div>
                        )}
                      </div>
                      <div className="premium-menu-content">
                        <h3 className="premium-menu-title">{item.foodName}</h3>
                        <div className="premium-menu-price">
                          {item.discount > 0 ? (
                            <>
                              <span className="premium-price-original">${item.price}</span>
                              <span className="premium-price-current">
                                ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="premium-price-current">${item.price}</span>
                          )}
                        </div>
                        <p className="premium-menu-ingredients">
                          {Array.isArray(item.ingredients) 
                            ? item.ingredients.join(' · ')
                            : item.ingredients}
                        </p>
                        {item.specialOffers && (
                          <div className="premium-menu-offer">
                            🎁 {item.specialOffers}
                          </div>
                        )}
                        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-lg)' }}>
                          <button 
                            onClick={() => handleEditMenuItem(item)}
                            className="premium-action-btn premium-action-btn-secondary"
                            style={{ flex: 1 }}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteMenuItem(item._id)}
                            className="premium-action-btn premium-action-btn-danger"
                            style={{ flex: 1 }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              {reviews.length === 0 ? (
                <div className="premium-empty-state">
                  <div className="premium-empty-icon">⭐</div>
                  <h2 className="premium-empty-title">No Reviews Yet</h2>
                  <p className="premium-empty-text">Customers haven't reviewed your restaurant yet</p>
                </div>
              ) : (
                <div className="premium-grid" style={{ gridTemplateColumns: '1fr' }}>
                  {reviews.map((review) => (
                    <div key={review._id} className="premium-card" style={{ padding: 'var(--space-lg)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                        <div>
                          <h3 style={{ 
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '1.4rem',
                            color: 'var(--pearl-white)',
                            marginBottom: 'var(--space-xs)'
                          }}>
                            {review.customerName || 'Anonymous'}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <span style={{ color: 'var(--coral-reef)', fontSize: '1.2rem' }}>
                              {getRatingStars(review.rating)}
                            </span>
                            <span style={{ color: 'rgba(240,247,255,0.5)', fontSize: '0.9rem' }}>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteReview(review._id)}
                          className="premium-action-btn premium-action-btn-danger"
                          style={{ padding: 'var(--space-xs) var(--space-md)' }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                      
                      {review.comment && (
                        <p style={{ 
                          color: 'rgba(240,247,255,0.9)', 
                          lineHeight: '1.6',
                          marginBottom: 'var(--space-md)',
                          padding: 'var(--space-md)',
                          background: 'rgba(26, 59, 90, 0.3)',
                          borderRadius: 'var(--radius-md)',
                          fontStyle: 'italic'
                        }}>
                          "{review.comment}"
                        </p>
                      )}
                      
                      {review.menuItemId && (
                        <div style={{ 
                          display: 'inline-block',
                          background: 'rgba(255, 127, 107, 0.1)',
                          border: '1px solid var(--coral-reef)',
                          borderRadius: 'var(--radius-full)',
                          padding: 'var(--space-xs) var(--space-md)',
                          fontSize: '0.9rem',
                          color: 'var(--coral-reef)'
                        }}>
                          🍽️ Reviewed dish: {getFoodItemName(review.menuItemId)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="premium-modal-overlay">
          <div className="premium-modal">
            <h2 className="premium-modal-title">Edit Menu Item</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="premium-form-group">
                <label className="premium-label">Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  value={editFormData.foodName}
                  onChange={handleEditChange}
                  className="premium-input"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-label">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={editFormData.image}
                  onChange={handleEditChange}
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
                    value={editFormData.price}
                    onChange={handleEditChange}
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
                    value={editFormData.discount}
                    onChange={handleEditChange}
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
                  value={editFormData.ingredients}
                  onChange={handleEditChange}
                  className="premium-input"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-label">Special Offers</label>
                <textarea
                  name="specialOffers"
                  value={editFormData.specialOffers}
                  onChange={handleEditChange}
                  className="premium-input premium-textarea"
                  rows="3"
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
                <button 
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="premium-btn premium-btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="premium-btn premium-btn-primary"
                  style={{ flex: 2 }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Premium Footer */}
      <footer className="premium-footer">
        <div className="premium-footer-content">
          <div className="premium-footer-section">
            <h3>About Webpoint Sri Lanka</h3>
            <p>Websites and Software Developing experiences since 2020.</p>
          </div>
          <div className="premium-footer-section">
            <h3>Quick Links</h3>
            <p><a href="#" style={{ color: 'rgba(240,247,255,0.7)', textDecoration: 'none' }}>All Restaurants</a></p>
            <p><a href="#" style={{ color: 'rgba(240,247,255,0.7)', textDecoration: 'none' }}>Reviews</a></p>
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
          <button onClick={() => setActiveTab('menu')} className={`premium-bottom-nav-item ${activeTab === 'menu' ? 'active' : ''}`}>
            <span>🍽️</span>
            <span>Menu</span>
          </button>
          <button onClick={() => setActiveTab('reviews')} className={`premium-bottom-nav-item ${activeTab === 'reviews' ? 'active' : ''}`}>
            <span>⭐</span>
            <span>Reviews</span>
          </button>
          <button onClick={() => navigate('/restaurant/menu/add')} className="premium-bottom-nav-item">
            <span>➕</span>
            <span>Add</span>
          </button>
          <button onClick={handleCustomerView} className="premium-bottom-nav-item">
            <span>👀</span>
            <span>View</span>
          </button>
          <button onClick={handleLogout} className="premium-bottom-nav-item">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;