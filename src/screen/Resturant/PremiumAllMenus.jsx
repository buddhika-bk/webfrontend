import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuAPI, restaurantAPI, setCurrentRestaurant } from '../services/api';
import './RestaurantPremium.css';

const PremiumAllMenus = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    foodName: '',
    image: '',
    price: '',
    ingredients: '',
    discount: '',
    specialOffers: ''
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [menuResponse, restaurantResponse] = await Promise.all([
        menuAPI.getAll(),
        restaurantAPI.getAll()
      ]);
      
      setMenuItems(menuResponse.data);
      setRestaurants(restaurantResponse.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await menuAPI.delete(id);
        await fetchAllData();
      } catch (err) {
        setError('Failed to delete menu item');
      }
    }
  };

  const handleEdit = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setEditFormData({
      foodName: menuItem.foodName || '',
      image: menuItem.image || '',
      price: menuItem.price || '',
      ingredients: Array.isArray(menuItem.ingredients) 
        ? menuItem.ingredients.join(', ')
        : menuItem.ingredients || '',
      discount: menuItem.discount || '',
      specialOffers: menuItem.specialOffers || ''
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

      await menuAPI.update(selectedMenuItem._id, updateData);
      setShowEditModal(false);
      await fetchAllData();
    } catch (err) {
      setError('Failed to update menu item');
    }
  };

  const handleManageRestaurantMenu = (restaurantId) => {
    setCurrentRestaurant(restaurantId);
    navigate('/restaurant/menu');
  };

  const getRestaurantName = (restaurantId) => {
    const restaurant = restaurants.find(r => r.restaurantId === restaurantId);
    return restaurant ? restaurant.restaurantName : 'Unknown Restaurant';
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.foodName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (Array.isArray(item.ingredients) && item.ingredients.some(ing => 
                           ing.toLowerCase().includes(searchTerm.toLowerCase())
                         )) ||
                         getRestaurantName(item.restaurantId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRestaurant = selectedRestaurant === 'all' || item.restaurantId === selectedRestaurant;
    
    return matchesSearch && matchesRestaurant;
  });

  // Natural food images
  const foodImages = [
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
            <a href="/premium/restaurants" className="premium-nav-link">Restaurants</a>
            <a href="/premium/menus" className="premium-nav-link active">Menus</a>
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
              Coastal Menus
            </h1>
            <p style={{ color: 'rgba(240, 247, 255, 0.8)', marginBottom: 'var(--space-xl)' }}>
              Explore our curated collection of ocean-inspired dishes
            </p>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
              <div style={{ flex: 2, minWidth: '250px' }}>
                <div className="premium-search-container" style={{ margin: 0 }}>
                  <span className="premium-search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search dishes, ingredients, or restaurants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="premium-search-input"
                  />
                </div>
              </div>
              
              <div style={{ flex: 1, minWidth: '200px' }}>
                <select
                  value={selectedRestaurant}
                  onChange={(e) => setSelectedRestaurant(e.target.value)}
                  className="premium-filter"
                >
                  <option value="all">All Restaurants</option>
                  {restaurants.map(restaurant => (
                    <option key={restaurant._id} value={restaurant.restaurantId}>
                      {restaurant.restaurantName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="premium-stats">
              <div className="premium-stat-card">
                <span className="premium-stat-icon">🍽️</span>
                <div>
                  <div className="premium-stat-number">{menuItems.length}</div>
                  <div className="premium-stat-label">Dishes</div>
                </div>
              </div>
              <div className="premium-stat-card">
                <span className="premium-stat-icon">🏖️</span>
                <div>
                  <div className="premium-stat-number">{restaurants.length}</div>
                  <div className="premium-stat-label">Restaurants</div>
                </div>
              </div>
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

          {/* Menu Items Grid */}
          {filteredMenuItems.length === 0 ? (
            <div className="premium-empty-state">
              <div className="premium-empty-icon">🍽️</div>
              <h2 className="premium-empty-title">No Menu Items Found</h2>
              <p className="premium-empty-text">
                {searchTerm || selectedRestaurant !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Start by adding menu items to your restaurants'}
              </p>
            </div>
          ) : (
            <div className="premium-menu-grid">
              {filteredMenuItems.map((item, index) => (
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
                    <p className="premium-menu-restaurant">
                      <span>🏖️</span> {getRestaurantName(item.restaurantId)}
                    </p>
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
                        onClick={() => handleManageRestaurantMenu(item.restaurantId)}
                        className="premium-action-btn premium-action-btn-primary"
                        style={{ flex: 1 }}
                      >
                        🍽️ Full Menu
                      </button>
                      <button 
                        onClick={() => handleEdit(item)}
                        className="premium-action-btn premium-action-btn-secondary"
                        style={{ flex: 1 }}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
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
          <a href="/premium/restaurants" className="premium-bottom-nav-item">
            <span>🏖️</span>
            <span>Restaurants</span>
          </a>
          <a href="/premium/menus" className="premium-bottom-nav-item active">
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

export default PremiumAllMenus;