import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantAPI, setRestaurantAuth } from '../services/api';
import './RestaurantPremium.css';

const PremiumAllRestaurants = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    restaurantName: '',
    location: '',
    contactNumber: '',
    ownerName: '',
    ownerContactNumber: ''
  });

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const fetchAllRestaurants = async () => {
    try {
      const response = await restaurantAPI.getAll();
      setRestaurants(response.data);
    } catch (err) {
      setError('Failed to fetch restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, restaurantId) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await restaurantAPI.delete(id);
        await fetchAllRestaurants();
      } catch (err) {
        setError('Failed to delete restaurant');
      }
    }
  };

  const handleEdit = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setEditFormData({
      restaurantName: restaurant.restaurantName || '',
      location: restaurant.location || '',
      contactNumber: restaurant.contactNumber || '',
      ownerName: restaurant.ownerName || '',
      ownerContactNumber: restaurant.ownerContactNumber || ''
    });
    setShowEditModal(true);
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
      await restaurantAPI.update(selectedRestaurant._id, editFormData);
      setShowEditModal(false);
      await fetchAllRestaurants();
    } catch (err) {
      setError('Failed to update restaurant');
    }
  };

  const handleManageMenu = (restaurant) => {
    // FIXED: Using setRestaurantAuth instead of setCurrentRestaurant
    // Store the restaurant data in localStorage for menu management
    const restaurantData = {
      restaurantId: restaurant.restaurantId || restaurant._id,
      restaurantName: restaurant.restaurantName,
      location: restaurant.location,
      ownerName: restaurant.ownerName,
      ownerContactNumber: restaurant.ownerContactNumber,
      contactNumber: restaurant.contactNumber
    };
    
    // You might need a token here - for now, we'll just store the restaurant data
    localStorage.setItem('currentRestaurant', JSON.stringify(restaurantData));
    localStorage.setItem('authToken', restaurant.restaurantId || restaurant._id);
    
    navigate('/restaurant/menu');
  };

  const handleViewAsCustomer = (restaurantId) => {
    navigate(`/restaurant/customer/menu/${restaurantId}`);
  };

  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.restaurantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.ownerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Natural images for restaurants
  const restaurantImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
            <span className="premium-logo-text">OCEANIC BITES</span>
          </div>
          <nav className="premium-nav">
            <a href="/premium" className="premium-nav-link">Home</a>
            <a href="/premium/restaurants" className="premium-nav-link active">Restaurants</a>
            <a href="/premium/menus" className="premium-nav-link">Menus</a>
            <a href="/addrest" className="premium-nav-link">Register</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ minHeight: '100vh', padding: 'var(--space-xl) 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--space-xl)' }}>
          {/* Header Section */}
          <div className="premium-card" style={{ marginBottom: 'var(--space-xl)' }}>
            <h1 style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--pearl-white)',
              marginBottom: 'var(--space-md)'
            }}>
              Coastal Restaurants
            </h1>
            <p style={{ color: 'rgba(240, 247, 255, 0.8)', marginBottom: 'var(--space-xl)' }}>
              Discover exceptional dining experiences by the sea
            </p>

            {/* Search Bar */}
            <div className="premium-search-container">
              <span className="premium-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, location, or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="premium-search-input"
              />
            </div>

            {/* Stats */}
            <div className="premium-stats">
              <div className="premium-stat-card">
                <span className="premium-stat-icon">🏖️</span>
                <div>
                  <div className="premium-stat-number">{restaurants.length}</div>
                  <div className="premium-stat-label">Restaurants</div>
                </div>
              </div>
              <button 
                onClick={() => navigate('/addrest')}
                className="premium-btn premium-btn-primary"
              >
                + Add Restaurant
              </button>
            </div>
          </div>

          {/* Error Message */}
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

          {/* Restaurants Grid */}
          {filteredRestaurants.length === 0 ? (
            <div className="premium-empty-state">
              <div className="premium-empty-icon">🏝️</div>
              <h2 className="premium-empty-title">No Restaurants Found</h2>
              <p className="premium-empty-text">
                {searchTerm ? 'Try a different search term' : 'Start by adding your first restaurant'}
              </p>
              {!searchTerm && (
                <button 
                  onClick={() => navigate('/addrest')}
                  className="premium-btn premium-btn-primary"
                >
                  Add Your First Restaurant
                </button>
              )}
            </div>
          ) : (
            <div className="premium-grid">
              {filteredRestaurants.map((restaurant, index) => (
                <div key={restaurant._id} className="premium-restaurant-card">
                  <div className="premium-restaurant-image">
                    <img 
                      src={restaurantImages[index % restaurantImages.length]} 
                      alt={restaurant.restaurantName}
                    />
                    <div className="premium-restaurant-badge">
                      {restaurant.restaurantId}
                    </div>
                  </div>
                  <div className="premium-restaurant-content">
                    <h2 className="premium-restaurant-title">{restaurant.restaurantName}</h2>
                    <p className="premium-restaurant-location">
                      <span>📍</span> {restaurant.location}
                    </p>
                    <div className="premium-restaurant-details">
                      <p className="premium-restaurant-detail">
                        <span>📞</span> {restaurant.contactNumber}
                      </p>
                      <p className="premium-restaurant-detail">
                        <span>👤</span> {restaurant.ownerName}
                      </p>
                      <p className="premium-restaurant-detail">
                        <span>📱</span> {restaurant.ownerContactNumber}
                      </p>
                    </div>
                    <div className="premium-restaurant-actions">
                      <button 
                        onClick={() => handleManageMenu(restaurant)}
                        className="premium-action-btn premium-action-btn-primary"
                      >
                        🍽️ Menu
                      </button>
                      <button 
                        onClick={() => handleViewAsCustomer(restaurant.restaurantId)}
                        className="premium-action-btn premium-action-btn-secondary"
                      >
                        👀 View
                      </button>
                      <button 
                        onClick={() => handleEdit(restaurant)}
                        className="premium-action-btn premium-action-btn-secondary"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(restaurant._id, restaurant.restaurantId)}
                        className="premium-action-btn premium-action-btn-danger"
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
      </div>

      {/* Premium Footer */}
      <footer className="premium-footer">
        <div className="premium-footer-content">
          <div className="premium-footer-section">
            <h3>About Oceanic Bites</h3>
            <p>Curating the finest coastal dining experiences since 2024.</p>
          </div>
          <div className="premium-footer-section">
            <h3>Quick Links</h3>
            <p><a href="/premium/restaurants" style={{ color: 'rgba(240,247,255,0.7)', textDecoration: 'none' }}>All Restaurants</a></p>
            <p><a href="/premium/menus" style={{ color: 'rgba(240,247,255,0.7)', textDecoration: 'none' }}>Browse Menus</a></p>
          </div>
          <div className="premium-footer-section">
            <h3>Contact</h3>
            <p>📍 123 Coastal Highway</p>
            <p>📞 +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="premium-footer-bottom">
          <p>© 2024 Oceanic Bites. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="premium-bottom-nav">
        <div className="premium-bottom-nav-items">
          <a href="/premium" className="premium-bottom-nav-item">
            <span>🏠</span>
            <span>Home</span>
          </a>
          <a href="/premium/restaurants" className="premium-bottom-nav-item active">
            <span>🏖️</span>
            <span>Restaurants</span>
          </a>
          <a href="/premium/menus" className="premium-bottom-nav-item">
            <span>🍽️</span>
            <span>Menus</span>
          </a>
          <a href="/addrest" className="premium-bottom-nav-item">
            <span>➕</span>
            <span>Add</span>
          </a>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="premium-modal-overlay">
          <div className="premium-modal">
            <h2 className="premium-modal-title">Edit Restaurant</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="premium-form-group">
                <label className="premium-label">Restaurant Name</label>
                <input
                  type="text"
                  name="restaurantName"
                  value={editFormData.restaurantName}
                  onChange={handleEditChange}
                  className="premium-input"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={editFormData.location}
                  onChange={handleEditChange}
                  className="premium-input"
                  required
                />
              </div>

              <div className="premium-form-group">
                <label className="premium-label">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={editFormData.contactNumber}
                  onChange={handleEditChange}
                  className="premium-input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="premium-form-group">
                  <label className="premium-label">Owner Name</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={editFormData.ownerName}
                    onChange={handleEditChange}
                    className="premium-input"
                    required
                  />
                </div>

                <div className="premium-form-group">
                  <label className="premium-label">Owner Contact</label>
                  <input
                    type="tel"
                    name="ownerContactNumber"
                    value={editFormData.ownerContactNumber}
                    onChange={handleEditChange}
                    className="premium-input"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
                <button 
                  type="button"
                  onClick={() => setShowEditModal(false)}
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
    </div>
  );
};

export default PremiumAllRestaurants;