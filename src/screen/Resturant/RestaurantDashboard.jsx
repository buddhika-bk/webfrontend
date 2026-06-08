import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  menuAPI, 
  reviewAPI, 
  getCurrentRestaurant, 
  getRestaurantId,
  clearRestaurantAuth,
  isRestaurantAuthenticated 
} from '../services/api';
import styles from './RestaurantDashboard.module.css';

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    averageRating: 0,
    totalOrders: 124,
    revenue: 5280,
    growth: '+12.5%'
  });

  useEffect(() => {
    // FIXED: Use isRestaurantAuthenticated instead of isAuthenticated
    if (!isRestaurantAuthenticated()) {
      navigate('/restaurant/login');
      return;
    }

    const currentRestaurant = getCurrentRestaurant();
    if (!currentRestaurant) {
      clearRestaurantAuth(); // FIXED: Use clearRestaurantAuth instead of clearAuth
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
      
      if (!restaurantId) {
        throw new Error('No restaurant ID found');
      }

      const menuResponse = await menuAPI.getByRestaurant(restaurantId);
      const menuData = menuResponse.data || [];
      setMenuItems(menuData);

      const reviewsResponse = await reviewAPI.getByRestaurant(restaurantId);
      const reviewsData = reviewsResponse.data || [];
      setReviews(reviewsData);

      const avgRating = reviewsData.length > 0 
        ? (reviewsData.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewsData.length).toFixed(1)
        : 0;

      setStats(prev => ({
        ...prev,
        totalItems: menuData.length,
        totalReviews: reviewsData.length,
        averageRating: avgRating
      }));

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.error || err.message || 'Failed to fetch data');
      
      if (err.response?.status === 401) {
        clearRestaurantAuth(); // FIXED: Use clearRestaurantAuth instead of clearAuth
        navigate('/restaurant/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearRestaurantAuth(); // FIXED: Use clearRestaurantAuth instead of clearAuth
    navigate('/restaurant/login');
  };

  const handleCustomerView = () => {
    const restaurantId = getRestaurantId();
    if (restaurantId) {
      navigate(`/restaurant/customer/menu/${restaurantId}`);
    } else {
      setError('Restaurant ID not found');
    }
  };

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const foodImages = [
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.loadingScreen}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Desktop Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🌊</span>
            <span className={styles.logoText}>Webpoint</span>
          </div>
          <div className={styles.restaurantBadge}>
            <span className={styles.badgeIcon}>🏪</span>
            <span className={styles.badgeText}>{restaurant?.restaurantName || 'Restaurant'}</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`${styles.navItem} ${activeTab === 'menu' ? styles.active : ''}`}
          >
            <span className={styles.navIcon}>🍽️</span>
            <span className={styles.navLabel}>Menu</span>
            <span className={styles.navBadge}>{menuItems.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`${styles.navItem} ${activeTab === 'reviews' ? styles.active : ''}`}
          >
            <span className={styles.navIcon}>⭐</span>
            <span className={styles.navLabel}>Reviews</span>
            <span className={styles.navBadge}>{reviews.length}</span>
          </button>
          <button 
            onClick={() => navigate('/restaurant/menu/add')}
            className={`${styles.navItem} ${styles.addItem}`}
          >
            <span className={styles.navIcon}>➕</span>
            <span className={styles.navLabel}>Add Menu Item</span>
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleCustomerView} className={`${styles.footerBtn} ${styles.viewBtn}`}>
            <span>👀</span>
            <span>Customer View</span>
          </button>
          <button onClick={handleLogout} className={`${styles.footerBtn} ${styles.logoutBtn}`}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className={styles.mobileHeader}>
        <div className={styles.mobileHeaderContent}>
          <button 
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          <div className={styles.mobileLogo}>
            <span className={styles.mobileLogoIcon}>🌊</span>
            <span className={styles.mobileLogoText}>Webpoint</span>
          </div>
          <div className={styles.mobileProfile}>
            <span className={styles.profileInitial}>
              {restaurant?.ownerName?.charAt(0) || 'O'}
            </span>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <button 
              onClick={() => {
                setActiveTab('menu');
                setIsMobileMenuOpen(false);
              }}
              className={`${styles.mobileMenuItem} ${activeTab === 'menu' ? styles.active : ''}`}
            >
              <span>🍽️</span>
              <span>Menu ({menuItems.length})</span>
            </button>
            <button 
              onClick={() => {
                setActiveTab('reviews');
                setIsMobileMenuOpen(false);
              }}
              className={`${styles.mobileMenuItem} ${activeTab === 'reviews' ? styles.active : ''}`}
            >
              <span>⭐</span>
              <span>Reviews ({reviews.length})</span>
            </button>
            <button 
              onClick={() => {
                navigate('/restaurant/menu/add');
                setIsMobileMenuOpen(false);
              }}
              className={styles.mobileMenuItem}
            >
              <span>➕</span>
              <span>Add Menu Item</span>
            </button>
            <div className={styles.mobileMenuDivider}></div>
            <button onClick={handleCustomerView} className={styles.mobileMenuItem}>
              <span>👀</span>
              <span>Customer View</span>
            </button>
            <button onClick={handleLogout} className={`${styles.mobileMenuItem} ${styles.logout}`}>
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Welcome Section */}
          <div className={styles.welcomeSection}>
            <div className={styles.welcomeHeader}>
              <div className={styles.welcomeHeaderLeft}>
                <div>
                  <h1 className={styles.welcomeTitle}>
                    Welcome back, <span className={styles.highlight}>{restaurant?.ownerName}</span>
                  </h1>
                  <p className={styles.welcomeSubtitle}>
                    Here's what's happening with your restaurant today
                  </p>
                </div>
              </div>
              <div className={styles.restaurantInfo}>
                <span className={styles.infoItem}>📍 {restaurant?.location || 'Location not set'}</span>
                <span className={styles.infoItem}>📞 {restaurant?.contactNumber || 'Contact not set'}</span>
                <span className={`${styles.infoItem} ${styles.customerView}`} onClick={handleCustomerView}>
                  👁️ Customer View
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>🍽️</div>
                <div className={styles.statDetails}>
                  <span className={styles.statValue}>{stats.totalItems}</span>
                  <span className={styles.statLabel}>Menu Items</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>⭐</div>
                <div className={styles.statDetails}>
                  <span className={styles.statValue}>{stats.averageRating}</span>
                  <span className={styles.statLabel}>Avg Rating</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📝</div>
                <div className={styles.statDetails}>
                  <span className={styles.statValue}>{stats.totalReviews}</span>
                  <span className={styles.statLabel}>Reviews</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>💰</div>
                <div className={styles.statDetails}>
                  <span className={styles.statValue}>{formatCurrency(stats.revenue)}</span>
                  <span className={styles.statLabel}>Revenue</span>
                </div>
              </div>
            </div>

            {/* Growth Indicator */}
            <div className={styles.growthIndicator}>
              <span className={styles.growthIcon}>📈</span>
              <span className={styles.growthText}>{stats.growth} growth this month</span>
            </div>
          </div>

          {/* Messages */}
          {success && (
            <div className={`${styles.message} ${styles.success}`}>
              <span>✓</span>
              <span>{success}</span>
            </div>
          )}
          {error && (
            <div className={`${styles.message} ${styles.error}`}>
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {/* Menu Tab */}
            {activeTab === 'menu' && (
              <div className={styles.menuTab}>
                <div className={styles.tabHeader}>
                  <h2 className={styles.tabTitle}>Your Menu Items</h2>
                  <button 
                    onClick={() => navigate('/restaurant/menu/add')}
                    className={`${styles.addButton} ${styles.desktopOnly}`}
                  >
                    <span>➕</span>
                    <span>Add New Item</span>
                  </button>
                </div>

                {menuItems.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🍽️</div>
                    <h3 className={styles.emptyTitle}>No Menu Items Yet</h3>
                    <p className={styles.emptyText}>Start adding delicious dishes to your menu!</p>
                    <button 
                      onClick={() => navigate('/restaurant/menu/add')}
                      className={styles.emptyButton}
                    >
                      Add First Item
                    </button>
                  </div>
                ) : (
                  <div className={styles.menuGrid}>
                    {menuItems.map((item, index) => (
                      <div key={item._id} className={styles.menuCard}>
                        <div className={styles.menuCardImage}>
                          <img 
                            src={item.image || foodImages[index % foodImages.length]} 
                            alt={item.foodName}
                          />
                          {item.discount > 0 && (
                            <div className={styles.discountBadge}>
                              -{item.discount}%
                            </div>
                          )}
                        </div>
                        <div className={styles.menuCardContent}>
                          <div className={styles.menuCardHeader}>
                            <h3 className={styles.menuCardTitle}>{item.foodName}</h3>
                            <div className={styles.menuCardPrice}>
                              {item.discount > 0 ? (
                                <>
                                  <span className={styles.originalPrice}>${item.price}</span>
                                  <span className={styles.currentPrice}>
                                    ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <span className={styles.currentPrice}>${item.price}</span>
                              )}
                            </div>
                          </div>
                          <p className={styles.menuCardIngredients}>
                            {Array.isArray(item.ingredients) 
                              ? item.ingredients.join(' · ')
                              : item.ingredients}
                          </p>
                          {item.specialOffers && (
                            <div className={styles.specialOffer}>
                              🎁 {item.specialOffers}
                            </div>
                          )}
                          <div className={styles.menuCardActions}>
                            <button 
                              onClick={() => handleEditMenuItem(item)}
                              className={`${styles.actionBtn} ${styles.editBtn}`}
                            >
                              ✏️ Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteMenuItem(item._id)}
                              className={`${styles.actionBtn} ${styles.deleteBtn}`}
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
              <div className={styles.reviewsTab}>
                <div className={styles.tabHeader}>
                  <h2 className={styles.tabTitle}>Customer Reviews</h2>
                  <div className={styles.ratingSummary}>
                    <span className={styles.ratingAverage}>{stats.averageRating}</span>
                    <span className={styles.ratingStars}>
                      {getRatingStars(Math.round(parseFloat(stats.averageRating)))}
                    </span>
                    <span className={styles.ratingCount}>({stats.totalReviews} reviews)</span>
                  </div>
                </div>

                {reviews.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>⭐</div>
                    <h3 className={styles.emptyTitle}>No Reviews Yet</h3>
                    <p className={styles.emptyText}>Customers haven't reviewed your restaurant yet</p>
                  </div>
                ) : (
                  <div className={styles.reviewsList}>
                    {reviews.map((review) => (
                      <div key={review._id} className={styles.reviewCard}>
                        <div className={styles.reviewCardHeader}>
                          <div className={styles.reviewerInfo}>
                            <div className={styles.reviewerAvatar}>
                              {review.customerName?.charAt(0) || 'A'}
                            </div>
                            <div>
                              <h4 className={styles.reviewerName}>
                                {review.customerName || 'Anonymous'}
                              </h4>
                              <div className={styles.reviewMeta}>
                                <span className={styles.reviewRating}>
                                  {getRatingStars(review.rating)}
                                </span>
                                <span className={styles.reviewDate}>
                                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleDeleteReview(review._id)}
                            className={styles.deleteReviewBtn}
                            title="Delete review"
                          >
                            🗑️
                          </button>
                        </div>
                        
                        {review.comment && (
                          <p className={styles.reviewComment}>{review.comment}</p>
                        )}
                        
                        {review.menuItemId && (
                          <div className={styles.reviewedDish}>
                            <span className={styles.dishIcon}>🍽️</span>
                            <span className={styles.dishName}>{getFoodItemName(review.menuItemId)}</span>
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
      </main>

      {/* Edit Modal */}
      {editingItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Edit Menu Item</h2>
              <button 
                className={styles.modalClose}
                onClick={() => setEditingItem(null)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  value={editFormData.foodName}
                  onChange={handleEditChange}
                  className={styles.formInput}
                  required
                  placeholder="e.g., Grilled Salmon"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={editFormData.image}
                  onChange={handleEditChange}
                  className={styles.formInput}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditChange}
                    className={styles.formInput}
                    step="0.01"
                    min="0"
                    required
                    placeholder="29.99"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={editFormData.discount}
                    onChange={handleEditChange}
                    className={styles.formInput}
                    min="0"
                    max="100"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ingredients</label>
                <input
                  type="text"
                  name="ingredients"
                  value={editFormData.ingredients}
                  onChange={handleEditChange}
                  className={styles.formInput}
                  required
                  placeholder="salmon, rice, vegetables"
                />
                <span className={styles.inputHint}>Separate ingredients with commas</span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Special Offers</label>
                <textarea
                  name="specialOffers"
                  value={editFormData.specialOffers}
                  onChange={handleEditChange}
                  className={styles.formTextarea}
                  rows="3"
                  placeholder="e.g., Free drink with this meal"
                />
              </div>

              <div className={styles.modalActions}>
                <button 
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className={styles.mobileBottomNav}>
        <button 
          onClick={() => setActiveTab('menu')}
          className={`${styles.bottomNavItem} ${activeTab === 'menu' ? styles.active : ''}`}
        >
          <span className={styles.bottomNavIcon}>🍽️</span>
          <span className={styles.bottomNavLabel}>Menu</span>
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`${styles.bottomNavItem} ${activeTab === 'reviews' ? styles.active : ''}`}
        >
          <span className={styles.bottomNavIcon}>⭐</span>
          <span className={styles.bottomNavLabel}>Reviews</span>
        </button>
        <button 
          onClick={() => navigate('/restaurant/menu/add')}
          className={`${styles.bottomNavItem} ${styles.addNavItem}`}
        >
          <span className={`${styles.bottomNavIcon} ${styles.addIcon}`}>+</span>
          <span className={styles.bottomNavLabel}>Add</span>
        </button>
      </nav>
    </div>
  );
};

export default RestaurantDashboard;