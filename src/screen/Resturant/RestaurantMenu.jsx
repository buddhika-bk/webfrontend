import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuAPI, getCurrentRestaurant, isRestaurantAuthenticated } from '../services/api';
import './RestaurantPremium.css';

const RestaurantMenu = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is authenticated - FIXED: using isRestaurantAuthenticated
    if (!isRestaurantAuthenticated()) {
      navigate('/restaurant/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const restaurantData = getCurrentRestaurant();
      if (!restaurantData) {
        navigate('/restaurant/login');
        return;
      }

      setRestaurant(restaurantData);

      // Fetch menu items for this specific restaurant
      const menuResponse = await menuAPI.getByRestaurant(restaurantData.restaurantId);
      setMenuItems(menuResponse.data);
    } catch (err) {
      setError('Failed to fetch menu items');
      console.error('Error fetching menu:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await menuAPI.delete(id);
        await fetchData(); // Refresh the list
      } catch (err) {
        setError('Failed to delete menu item');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/restaurant/menu/edit/${id}`);
  };

  const handleAddItem = () => {
    navigate('/restaurant/menu/add');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentRestaurant');
    navigate('/restaurant/login');
  };

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
      <header className="premium-header">
        <div className="premium-header-content">
          <div className="premium-logo">
            <span className="premium-logo-icon">🌊</span>
            <span className="premium-logo-text">Wepoint Resturants</span>
          </div>
          <nav className="premium-nav">
            <a href="/restaurant/dashboard" className="premium-nav-link">🏖️ Dashboad</a>
            
            <span className="premium-nav-link" style={{ color: 'var(--coral-reef)' }}>
              👤 {restaurant?.ownerName}
            </span>
            <button onClick={handleLogout} className="premium-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              🚪 Logout
            </button>
          </nav>
        </div>
      </header>

      <div style={{ minHeight: '100vh', padding: 'var(--space-xl) 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--space-xl)' }}>
          <div className="premium-card" style={{ marginBottom: 'var(--space-xl)' }}>
            <h1 style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: 'var(--pearl-white)',
              marginBottom: 'var(--space-sm)'
            }}>
              {restaurant?.restaurantName}
            </h1>
            <p style={{ color: 'var(--coral-reef)', marginBottom: 'var(--space-lg)' }}>
              📍 {restaurant?.location}
            </p>
            
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={handleAddItem}
                className="premium-btn premium-btn-primary"
              >
                + Add New Item
              </button>
            </div>
          </div>

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

          {menuItems.length === 0 ? (
            <div className="premium-empty-state">
              <div className="premium-empty-icon">🍽️</div>
              <h2 className="premium-empty-title">No Menu Items Yet</h2>
              <p className="premium-empty-text">Start adding delicious dishes to your menu!</p>
              <button 
                onClick={handleAddItem}
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
                        onClick={() => handleEdit(item._id)}
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
          <button onClick={handleLogout} className="premium-bottom-nav-item" style={{ background: 'none', border: 'none' }}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;