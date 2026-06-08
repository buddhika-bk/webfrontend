import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuAPI, getCurrentRestaurant, isRestaurantAuthenticated, clearRestaurantAuth } from '../services/api';
import styles from './AddMenuItem.module.css';

const AddMenuItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodName: '',
    image: '',
    price: '',
    ingredients: '',
    discount: '',
    specialOffers: '',
    currency: 'USD'
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currencySymbols = {
    USD: '$',
    LKR: 'Rs.'
  };

  useEffect(() => {
    // Check if restaurant is authenticated - FIXED
    if (!isRestaurantAuthenticated()) {
      navigate('/restaurant/login');
      return;
    }

    const currentRestaurant = getCurrentRestaurant();
    if (!currentRestaurant) {
      clearRestaurantAuth(); // FIXED: using clearRestaurantAuth instead of clearAuth
      navigate('/restaurant/login');
      return;
    }

    setRestaurant(currentRestaurant);
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
      if (!file.type.match('image.*')) {
        setError('Please select a valid image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

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

      const formDataToSend = new FormData();

      formDataToSend.append('restaurantId', restaurant.restaurantId);
      formDataToSend.append('foodName', formData.foodName);
      formDataToSend.append('price', parseFloat(formData.price));
      formDataToSend.append('currency', formData.currency);
      formDataToSend.append('ingredients', JSON.stringify(ingredientsArray));
      formDataToSend.append('discount', formData.discount ? parseFloat(formData.discount) : 0);
      formDataToSend.append('specialOffers', formData.specialOffers || '');

      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      } else if (formData.image) {
        formDataToSend.append('imageUrl', formData.image);
      }

      await menuAPI.add(formDataToSend);

      alert('✨ Menu item added successfully!');
      navigate('/restaurant/dashboard', { state: { activeTab: 'menu' } });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearRestaurantAuth(); // FIXED: using clearRestaurantAuth instead of clearAuth
    navigate('/restaurant/login');
  };

  const handleCustomerView = () => {
    if (restaurant?.restaurantId) {
      navigate(`/restaurant/customer/menu/${restaurant.restaurantId}`);
    }
  };

  if (loading) {
    return (
      <div className={styles.addMenuContainer}>
        <div className={styles.loadingScreen}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Adding your dish...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.addMenuDashboard}>
      {/* Desktop Sidebar - Matching Dashboard */}
      <aside className={styles.addMenuSidebar}>
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
            onClick={() => navigate('/restaurant/dashboard')}
            className={styles.navItem}
          >
            <span className={styles.navIcon}>🍽️</span>
            <span className={styles.navLabel}>Menu</span>
          </button>
          <button
            onClick={() => navigate('/restaurant/dashboard')}
            className={styles.navItem}
          >
            <span className={styles.navIcon}>⭐</span>
            <span className={styles.navLabel}>Reviews</span>
          </button>
          <button
            onClick={() => navigate('/restaurant/menu/add')}
            className={`${styles.navItem} ${styles.active}`}
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
          {/* Mobile header content */}
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenuDropdown}>
            <button
              onClick={() => {
                navigate('/restaurant/dashboard');
                setIsMobileMenuOpen(false);
              }}
              className={styles.mobileMenuItem}
            >
              <span className={styles.mobileMenuIcon}>🍽️</span>
              <span className={styles.mobileMenuLabel}>Menu</span>
            </button>
            <button
              onClick={() => {
                navigate('/restaurant/dashboard');
                setIsMobileMenuOpen(false);
              }}
              className={styles.mobileMenuItem}
            >
              <span className={styles.mobileMenuIcon}>⭐</span>
              <span className={styles.mobileMenuLabel}>Reviews</span>
            </button>
            <button
              onClick={() => {
                navigate('/restaurant/menu/add');
                setIsMobileMenuOpen(false);
              }}
              className={`${styles.mobileMenuItem} ${styles.active}`}
            >
              <span className={styles.mobileMenuIcon}>➕</span>
              <span className={styles.mobileMenuLabel}>Add Menu Item</span>
            </button>
            <div className={styles.mobileMenuDivider}></div>
            <button onClick={handleCustomerView} className={styles.mobileMenuItem}>
              <span className={styles.mobileMenuIcon}>👀</span>
              <span className={styles.mobileMenuLabel}>Customer View</span>
            </button>
            <button onClick={handleLogout} className={`${styles.mobileMenuItem} ${styles.logout}`}>
              <span className={styles.mobileMenuIcon}>🚪</span>
              <span className={styles.mobileMenuLabel}>Logout</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Header with Back Button */}
          <div className={styles.pageHeader}>
            <button
              className={styles.mobileMenuToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
            <button
              onClick={() => navigate('/restaurant/dashboard', { state: { activeTab: 'menu' } })}
              className={styles.backButton}
            >
              <span className={styles.backIcon}>←</span>
              <span>Back to Menu</span>
            </button>
            <h1 className={styles.pageTitle}>Add New Dish</h1>
            <p className={styles.pageSubtitle}>Share your culinary creation with your customers</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`${styles.message} ${styles.error}`}>
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Add Menu Form */}
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Food Name */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Food Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="e.g., Grilled Lobster"
                  required
                />
              </div>

              {/* Image Upload Section */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Food Image</label>

                {!imagePreview ? (
                  <div
                    className={styles.uploadArea}
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    <div className={styles.uploadIcon}>📸</div>
                    <p className={styles.uploadText}>Click to upload an image</p>
                    <p className={styles.uploadHint}>PNG, JPG, GIF up to 5MB</p>
                  </div>
                ) : (
                  <div className={styles.previewContainer}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className={styles.imagePreview}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className={styles.removeImageBtn}
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

                {/* OR Divider */}
                <div className={styles.divider}>
                  <span className={styles.dividerLine}></span>
                  <span className={styles.dividerText}>OR</span>
                  <span className={styles.dividerLine}></span>
                </div>

                {/* Image URL Input */}
                <label className={styles.formLabel}>Image URL (optional)</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="https://example.com/image.jpg"
                  disabled={selectedImage}
                />
                <p className={styles.inputHint}>
                  You can either upload an image or provide a URL
                </p>
              </div>

              {/* Price and Currency */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Price <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.priceInputWrapper}>
                    <span className={styles.currencySymbol}>
                      {currencySymbols[formData.currency]}
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`${styles.formInput} ${styles.priceInput}`}
                      placeholder={formData.currency === 'USD' ? '29.99' : '3500.00'}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className={styles.formSelect}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="LKR">LKR (Rs.)</option>
                  </select>
                </div>
              </div>

              {/* Discount */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="10"
                  min="0"
                  max="100"
                />
                {formData.price && formData.discount && (
                  <p className={styles.discountPreview}>
                    After discount: {currencySymbols[formData.currency]}
                    {(parseFloat(formData.price) * (1 - parseFloat(formData.discount) / 100)).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Ingredients */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Ingredients <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="lobster, butter, garlic, lemon"
                  required
                />
                <p className={styles.inputHint}>Separate ingredients with commas</p>
              </div>

              {/* Special Offers */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Special Offers</label>
                <textarea
                  name="specialOffers"
                  value={formData.specialOffers}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder="e.g., Free coconut water with this dish"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'Adding to Menu...' : 'Add to Menu'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className={styles.mobileBottomNav}>
        <button
          onClick={() => navigate('/restaurant/dashboard', { state: { activeTab: 'menu' } })}
          className={styles.mobileBottomItem}
        >
          <span className={styles.mobileBottomIcon}>🍽️</span>
          <span className={styles.mobileBottomLabel}>Menu</span>
        </button>
        <button
          onClick={() => navigate('/restaurant/dashboard', { state: { activeTab: 'reviews' } })}
          className={styles.mobileBottomItem}
        >
          <span className={styles.mobileBottomIcon}>⭐</span>
          <span className={styles.mobileBottomLabel}>Reviews</span>
        </button>
        <button
          onClick={() => navigate('/restaurant/menu/add')}
          className={`${styles.mobileBottomItem} ${styles.active} ${styles.addItem}`}
        >
          <span className={`${styles.mobileBottomIcon} ${styles.addIcon}`}>+</span>
          <span className={styles.mobileBottomLabel}>Add</span>
        </button>
      </nav>
    </div>
  );
};

export default AddMenuItem;