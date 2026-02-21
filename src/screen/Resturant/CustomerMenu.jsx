import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { menuAPI, restaurantAPI } from '../services/api';

const CustomerMenu = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Sample reviews data - in real app, this would come from API
  const [reviews] = useState([
    {
      id: 1,
      user: 'Sophie Bennett',
      rating: 5,
      date: '2 days ago',
      comment: 'Absolutely divine! The seafood platter was fresh and perfectly cooked. The ocean view made it even more special.',
      avatar: 'https://images.unsplash.com/photo-1494790108777-28666c5f0f0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      dish: 'Grilled Lobster'
    },
    {
      id: 2,
      user: 'Michael Chen',
      rating: 4,
      date: '1 week ago',
      comment: 'Excellent service and beautiful presentation. The tropical cocktails are a must-try!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      dish: 'Tropical Cocktail'
    },
    {
      id: 3,
      user: 'Isabella Rossi',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Hidden gem by the coast! The pasta with fresh seafood was incredible. Will definitely come back.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      dish: 'Seafood Pasta'
    }
  ]);

  useEffect(() => {
    if (restaurantId) {
      fetchData();
    } else {
      setError('Restaurant ID is missing');
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Fetching data for restaurant ID:', restaurantId);
      
      let restaurantData = null;
      try {
        const restaurantResponse = await restaurantAPI.getById(restaurantId);
        restaurantData = restaurantResponse.data;
        console.log('Restaurant found by _id:', restaurantData);
      } catch (err) {
        console.log('Failed to fetch by _id, trying by restaurantId...');
        try {
          const allRestaurantsResponse = await restaurantAPI.getAll();
          const found = allRestaurantsResponse.data.find(
            r => r.restaurantId === restaurantId || r._id === restaurantId
          );
          if (found) {
            restaurantData = found;
            console.log('Restaurant found in all restaurants:', restaurantData);
          }
        } catch (secondErr) {
          console.error('Both fetch attempts failed:', secondErr);
        }
      }

      if (!restaurantData) {
        throw new Error('Restaurant not found');
      }

      setRestaurant(restaurantData);

      console.log('Fetching menu items...');
      let menuData = [];
      try {
        const menuResponse = await menuAPI.getByRestaurant(restaurantId);
        menuData = menuResponse.data;
        console.log('Menu items found:', menuData.length);
      } catch (err) {
        console.log('Failed to fetch menu by restaurantId, trying with _id...');
        if (restaurantData._id) {
          try {
            const menuResponse = await menuAPI.getByRestaurant(restaurantData._id);
            menuData = menuResponse.data;
            console.log('Menu items found with _id:', menuData.length);
          } catch (secondErr) {
            console.error('Both menu fetch attempts failed:', secondErr);
          }
        }
      }

      setMenuItems(menuData || []);

    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError(err.message || 'Failed to load restaurant menu');
    } finally {
      setLoading(false);
    }
  };

  const handleViewReviews = () => {
    navigate(`/restaurant/customer/reviews/${restaurantId}`);
  };

  const handleAddReview = () => {
    navigate(`/restaurant/customer/review/add/${restaurantId}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Hero images for background slideshow
  const heroImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ];

  // Food images for menu items
  const foodImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const categories = ['all', ...new Set(menuItems.map(item => item.category || 'Main Course'))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.foodName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(item.ingredients) && item.ingredients.some(ing => 
        ing.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    const matchesCategory = selectedCategory === 'all' || (item.category || 'Main Course') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`premium-review-star ${i < rating ? 'filled' : ''}`}>★</span>
    ));
  };

  if (loading) {
    return (
      <div className="premium-menu-page">
        <div className="premium-loading">
          <div className="premium-loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-menu-page">
      {/* Hero Section with Video/Slideshow Background */}
      <section className="premium-menu-hero">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`premium-hero-slide ${index === activeImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="premium-hero-overlay"></div>
        
        <div className="premium-hero-content">
          {/* <button onClick={handleGoBack} className="premium-hero-back">
            <span className="premium-back-icon">←</span>
            <span>Back to Restaurants</span>
          </button> */}
          
          {restaurant && (
            <div className="premium-hero-text">
              <h1 className="premium-hero-title">
                <span className="premium-title-line">{restaurant.restaurantName}</span>
                <span className="premium-title-wave"></span>
              </h1>
              <p className="premium-hero-location">{restaurant.location}</p>
              <div className="premium-hero-actions">
                <button onClick={handleViewReviews} className="premium-hero-btn premium-hero-btn-reviews">
                  <span className="premium-btn-icon">⭐</span>
                  <span>Guest Reviews</span>
                  <span className="premium-btn-badge">{reviews.length}</span>
                </button>
                <button onClick={handleAddReview} className="premium-hero-btn premium-hero-btn-write">
                  <span className="premium-btn-icon">✍️</span>
                  <span>Write a Review</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="premium-hero-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`premium-indicator ${index === activeImageIndex ? 'active' : ''}`}
              onClick={() => setActiveImageIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="premium-menu-main">
        <div className="premium-menu-container">
          {/* Search and Filter Section */}
          <div className="premium-menu-toolbar">
            <div className="premium-search-wrapper">
              <span className="premium-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search dishes by name or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="premium-search-field"
              />
              {searchTerm && (
                <button 
                  className="premium-search-clear"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
            
            <div className="premium-category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`premium-category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All Dishes' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="premium-error-message">
              <span className="premium-error-icon">⚠️</span>
              <p>{error}</p>
              <button onClick={handleGoBack} className="premium-error-btn">Go Back</button>
            </div>
          )}

          {/* Menu Items Grid */}
          {restaurant && (
            <>
              {filteredItems.length === 0 ? (
                <div className="premium-empty-menu">
                  <div className="premium-empty-wave">🌊</div>
                  <h2 className="premium-empty-title">
                    {searchTerm ? 'No Dishes Found' : 'Menu is Being Prepared'}
                  </h2>
                  <p className="premium-empty-text">
                    {searchTerm 
                      ? 'Try searching with different keywords' 
                      : 'This restaurant hasn\'t added any menu items yet'}
                  </p>
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="premium-empty-btn"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="premium-menu-stats">
                    <span className="premium-stats-count">
                      <span className="premium-count-number">{filteredItems.length}</span>
                      <span className="premium-count-label">exquisite dishes</span>
                    </span>
                    <span className="premium-stats-separator">•</span>
                    <span className="premium-stats-category">
                      {selectedCategory === 'all' ? 'Full Menu' : selectedCategory}
                    </span>
                  </div>

                  <div className="premium-menu-grid">
                    {filteredItems.map((item, index) => (
                      <div key={item._id} className="premium-menu-card">
                        <div className="premium-card-media">
                          <img 
                            src={item.image || foodImages[index % foodImages.length]} 
                            alt={item.foodName}
                            className="premium-card-image"
                          />
                          {item.discount > 0 && (
                            <div className="premium-card-discount">
                              <span className="premium-discount-value">-{item.discount}%</span>
                            </div>
                          )}
                          <div className="premium-card-overlay">
                            <button className="premium-card-quickview">
                              <span className="premium-quickview-icon">👁️</span>
                              <span>Quick View</span>
                            </button>
                          </div>
                        </div>
                        
                        <div className="premium-card-content">
                          <div className="premium-card-header">
                            <h3 className="premium-card-title">{item.foodName}</h3>
                            <div className="premium-card-price">
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
                          </div>
                          
                          <div className="premium-card-ingredients">
                            {Array.isArray(item.ingredients) 
                              ? item.ingredients.map((ing, i) => (
                                  <span key={i} className="premium-ingredient-tag">{ing}</span>
                                ))
                              : <span className="premium-ingredient-tag">{item.ingredients}</span>}
                          </div>
                          
                          {item.specialOffers && (
                            <div className="premium-card-offer">
                              <span className="premium-offer-icon">🎁</span>
                              <span className="premium-offer-text">{item.specialOffers}</span>
                            </div>
                          )}
                          
                          <div className="premium-card-footer">
                            <button className="premium-card-btn premium-btn-primary">
                              <span className="premium-btn-text">Add to Cart</span>
                              <span className="premium-btn-icon">🛒</span>
                            </button>
                            <button className="premium-card-btn premium-btn-favorite">
                              <span className="premium-favorite-icon">♡</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Reviews Section - Integrated Below Menu */}
          {restaurant && (
            <section className="premium-reviews-section">
              <div className="premium-reviews-header">
                <div className="premium-reviews-title-wrapper">
                  <h2 className="premium-reviews-title">
                    <span className="premium-title-icon">🌊</span>
                    <span>Ocean of Reviews</span>
                  </h2>
                  <p className="premium-reviews-subtitle">
                    What our guests are saying about their dining experience
                  </p>
                </div>
                <button onClick={handleAddReview} className="premium-reviews-write-btn">
                  <span className="premium-write-icon">✍️</span>
                  <span>Write a Review</span>
                </button>
              </div>

              <div className="premium-reviews-grid">
                {reviews.map(review => (
                  <div key={review.id} className="premium-review-card">
                    <div className="premium-review-card-inner">
                      <div className="premium-review-header">
                        <div className="premium-reviewer">
                          <div className="premium-reviewer-avatar">
                            <img src={review.avatar} alt={review.user} />
                          </div>
                          <div className="premium-reviewer-info">
                            <h4 className="premium-reviewer-name">{review.user}</h4>
                            <div className="premium-review-rating">
                              {renderStars(review.rating)}
                              <span className="premium-review-date">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="premium-review-dish-badge">
                          {review.dish}
                        </div>
                      </div>
                      
                      <p className="premium-review-comment">"{review.comment}"</p>
                      
                      <div className="premium-review-footer">
                        <button className="premium-review-helpful">
                          <span className="premium-helpful-icon">👍</span>
                          <span>Helpful</span>
                        </button>
                        <button className="premium-review-share">
                          <span className="premium-share-icon">↗️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="premium-reviews-footer">
                <button onClick={handleViewReviews} className="premium-view-all-reviews">
                  <span>View All Reviews</span>
                  <span className="premium-view-all-icon">→</span>
                </button>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="premium-footer premium-menu-footer">
        <div className="premium-footer-bottom">
          <p>© 2026 Webpoint.lk. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="premium-bottom-nav">
        <div className="premium-bottom-nav-items">
          <a href="/restaurant/all" className="premium-bottom-nav-item">
            <span className="premium-nav-icon">🏖️</span>
            <span className="premium-nav-label">Restaurants</span>
          </a>
          <a href="/restaurant/all-menus" className="premium-bottom-nav-item active">
            <span className="premium-nav-icon">🍽️</span>
            <span className="premium-nav-label">Menus</span>
          </a>
          <button onClick={handleAddReview} className="premium-bottom-nav-item">
            <span className="premium-nav-icon">✍️</span>
            <span className="premium-nav-label">Review</span>
          </button>
          <button onClick={handleGoBack} className="premium-bottom-nav-item">
            <span className="premium-nav-icon">←</span>
            <span className="premium-nav-label">Back</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        /* ========================================
           PREMIUM MENU PAGE - REDESIGNED
           Deep Ocean Theme - Enhanced Elegance
           ======================================== */

        /* Import Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Josefin+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

        /* ========================================
           CSS Variables
           ======================================== */
        .premium-menu-page {
          --abyss-black: #0A1922;
          --deep-sea: #0F2A3F;
          --ocean-depths: #1A3B5A;
          --tropical-water: #2C5F8A;
          --caribbean-blue: #3B7BB0;
          --coral-reef: #FF7F6B;
          --sunset-glow: #FFB86B;
          --pearl-white: #F0F7FF;
          --seafoam: #A8E6CF;
          
          --gradient-deep: linear-gradient(145deg, #0A1922 0%, #1A3B5A 100%);
          --gradient-ocean: linear-gradient(135deg, #1A3B5A 0%, #2C5F8A 100%);
          --gradient-sunset: linear-gradient(135deg, #FF7F6B 0%, #FFB86B 100%);
          
          --shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 8px 30px rgba(0, 0, 0, 0.4);
          --shadow-lg: 0 15px 40px rgba(0, 0, 0, 0.5);
          --shadow-glow: 0 0 30px rgba(255, 127, 107, 0.3);
          --shadow-card: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
          
          --space-xs: 6px;
          --space-sm: 12px;
          --space-md: 20px;
          --space-lg: 32px;
          --space-xl: 48px;
          --space-xxl: 64px;
          
          --radius-sm: 8px;
          --radius-md: 16px;
          --radius-lg: 24px;
          --radius-xl: 32px;
          --radius-full: 9999px;
          
          --transition-smooth: all 0.4s cubic-bezier(0.65, 0, 0.35, 1);
          --transition-bounce: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          
          font-family: 'Josefin Sans', sans-serif;
          color: var(--pearl-white);
          min-height: 100vh;
          background: var(--abyss-black);
          position: relative;
          overflow-x: hidden;
        }

        /* Hide default header and footer */
        .premium-menu-page .main-header,
        .premium-menu-page .main-footer,
        .premium-menu-page header:not(.premium-header),
        .premium-menu-page footer:not(.premium-footer) {
          display: none !important;
        }

        /* ========================================
           Hero Section
           ======================================== */
        .premium-menu-hero {
          position: relative;
          height: 85vh;
          min-height: 600px;
          overflow: hidden;
        }

        .premium-hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 2s ease-in-out;
          transform: scale(1.05);
        }

        .premium-hero-slide.active {
          opacity: 1;
          transform: scale(1);
        }

        .premium-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 50%, rgba(10, 25, 34, 0.4) 0%, rgba(10, 25, 34, 0.8) 100%);
          z-index: 1;
        }

        .premium-hero-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 var(--space-xl);
          text-align: center;
        }

        .premium-hero-back {
          position: absolute;
          top: var(--space-xl);
          left: var(--space-xl);
          background: rgba(26, 59, 90, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 127, 107, 0.3);
          border-radius: var(--radius-full);
          padding: var(--space-sm) var(--space-lg);
          color: var(--pearl-white);
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          cursor: pointer;
          transition: var(--transition-smooth);
          font-size: 0.95rem;
          letter-spacing: 1px;
        }

        .premium-hero-back:hover {
          background: rgba(255, 127, 107, 0.2);
          border-color: var(--coral-reef);
          transform: translateX(-5px);
        }

        .premium-back-icon {
          font-size: 1.2rem;
        }

        .premium-hero-text {
          animation: heroFadeIn 1.5s ease-out;
        }

        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .premium-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          margin-bottom: var(--space-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
        }

        .premium-title-line {
          background: linear-gradient(135deg, var(--pearl-white), var(--coral-reef));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(255, 127, 107, 0.3);
        }

        .premium-title-wave {
          font-size: 1.2em;
          animation: waveFloat 4s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes waveFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          75% { transform: translateY(10px) rotate(-5deg); }
        }

        .premium-hero-location {
          font-size: 1.3rem;
          color: rgba(240, 247, 255, 0.9);
          margin-bottom: var(--space-xl);
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
        }

        .premium-hero-location::before,
        .premium-hero-location::after {
          content: '🌊';
          font-size: 1rem;
          opacity: 0.5;
        }

        .premium-hero-location::after {
          content: '🌊';
        }

        .premium-hero-actions {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        .premium-hero-btn {
          padding: var(--space-md) var(--space-xl);
          border-radius: var(--radius-full);
          border: none;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          transition: var(--transition-bounce);
          position: relative;
          overflow: hidden;
        }

        .premium-hero-btn-reviews {
          background: rgba(26, 59, 90, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 127, 107, 0.5);
          color: var(--pearl-white);
        }

        .premium-hero-btn-reviews:hover {
          background: rgba(255, 127, 107, 0.2);
          border-color: var(--coral-reef);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 127, 107, 0.3);
        }

        .premium-hero-btn-write {
          background: var(--gradient-sunset);
          color: var(--abyss-black);
          box-shadow: 0 5px 20px rgba(255, 127, 107, 0.4);
        }

        .premium-hero-btn-write:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 40px rgba(255, 127, 107, 0.6);
        }

        .premium-btn-badge {
          background: var(--pearl-white);
          color: var(--coral-reef);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          margin-left: var(--space-xs);
        }

        .premium-hero-indicators {
          position: absolute;
          bottom: var(--space-xl);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: var(--space-sm);
          z-index: 3;
        }

        .premium-indicator {
          width: 40px;
          height: 4px;
          border-radius: var(--radius-full);
          background: rgba(240, 247, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: var(--transition-smooth);
          padding: 0;
        }

        .premium-indicator.active {
          background: var(--coral-reef);
          width: 60px;
          box-shadow: 0 0 20px var(--coral-reef);
        }

        /* ========================================
           Main Content Container
           ======================================== */
        .premium-menu-main {
          position: relative;
          z-index: 10;
          background: var(--abyss-black);
        }

        .premium-menu-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: var(--space-xxl) var(--space-xl);
        }

        /* ========================================
           Search and Filter Toolbar
           ======================================== */
        .premium-menu-toolbar {
          margin-bottom: var(--space-xl);
        }

        .premium-search-wrapper {
          position: relative;
          max-width: 600px;
          margin: 0 auto var(--space-xl);
        }

        .premium-search-field {
          width: 100%;
          padding: var(--space-lg) var(--space-xl);
          padding-left: 70px;
          background: rgba(26, 59, 90, 0.2);
          border: 1px solid rgba(59, 123, 176, 0.3);
          border-radius: var(--radius-full);
          color: var(--pearl-white);
          font-size: 1.1rem;
          backdrop-filter: blur(10px);
          transition: var(--transition-smooth);
        }

        .premium-search-field:focus {
          outline: none;
          border-color: var(--coral-reef);
          background: rgba(26, 59, 90, 0.4);
          box-shadow: 0 0 0 4px rgba(255, 127, 107, 0.1);
        }

        .premium-search-icon {
          position: absolute;
          left: var(--space-lg);
          top: 50%;
          transform: translateY(-50%);
          color: var(--coral-reef);
          font-size: 1.4rem;
          filter: drop-shadow(0 0 10px rgba(255, 127, 107, 0.5));
        }

        .premium-search-clear {
          position: absolute;
          right: var(--space-lg);
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(240, 247, 255, 0.5);
          font-size: 1.2rem;
          cursor: pointer;
          padding: var(--space-xs);
          border-radius: 50%;
          transition: var(--transition-smooth);
        }

        .premium-search-clear:hover {
          color: var(--coral-reef);
          background: rgba(255, 127, 107, 0.1);
        }

        .premium-category-filter {
          display: flex;
          gap: var(--space-sm);
          justify-content: center;
          flex-wrap: wrap;
        }

        .premium-category-btn {
          padding: var(--space-sm) var(--space-xl);
          border-radius: var(--radius-full);
          background: rgba(26, 59, 90, 0.2);
          border: 1px solid rgba(59, 123, 176, 0.3);
          color: rgba(240, 247, 255, 0.7);
          font-size: 0.95rem;
          letter-spacing: 1px;
          cursor: pointer;
          transition: var(--transition-smooth);
          backdrop-filter: blur(5px);
        }

        .premium-category-btn:hover {
          background: rgba(255, 127, 107, 0.1);
          border-color: var(--coral-reef);
          color: var(--pearl-white);
        }

        .premium-category-btn.active {
          background: var(--gradient-sunset);
          border-color: transparent;
          color: var(--abyss-black);
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(255, 127, 107, 0.4);
        }

        /* ========================================
           Menu Stats
           ======================================== */
        .premium-menu-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
          margin-bottom: var(--space-xl);
          color: rgba(240, 247, 255, 0.7);
        }

        .premium-stats-count {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }

        .premium-count-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--coral-reef);
          font-family: 'Cormorant Garamond', serif;
        }

        .premium-count-label {
          font-size: 1rem;
          letter-spacing: 1px;
        }

        .premium-stats-separator {
          color: var(--coral-reef);
          font-size: 1.5rem;
        }

        .premium-stats-category {
          font-size: 1.1rem;
          font-style: italic;
          background: rgba(255, 127, 107, 0.1);
          padding: var(--space-xs) var(--space-lg);
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 127, 107, 0.3);
        }

        /* ========================================
           Menu Grid - Redesigned Cards
           ======================================== */
        .premium-menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--space-xl);
          margin-bottom: var(--space-xxl);
        }

        .premium-menu-card {
          background: rgba(26, 59, 90, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 123, 176, 0.2);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: var(--transition-smooth);
          position: relative;
          box-shadow: var(--shadow-card);
        }

        .premium-menu-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(255, 127, 107, 0.4);
          box-shadow: 0 30px 50px -20px rgba(255, 127, 107, 0.3);
        }

        .premium-card-media {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .premium-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .premium-menu-card:hover .premium-card-image {
          transform: scale(1.15);
        }

        .premium-card-discount {
          position: absolute;
          top: var(--space-md);
          right: var(--space-md);
          background: var(--gradient-sunset);
          color: var(--abyss-black);
          padding: var(--space-xs) var(--space-md);
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.9rem;
          z-index: 2;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .premium-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 25, 34, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-smooth);
          backdrop-filter: blur(5px);
        }

        .premium-menu-card:hover .premium-card-overlay {
          opacity: 1;
        }

        .premium-card-quickview {
          background: var(--gradient-sunset);
          border: none;
          border-radius: var(--radius-full);
          padding: var(--space-sm) var(--space-xl);
          color: var(--abyss-black);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          transform: translateY(20px);
          transition: var(--transition-bounce);
          cursor: pointer;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }

        .premium-menu-card:hover .premium-card-quickview {
          transform: translateY(0);
        }

        .premium-card-quickview:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 127, 107, 0.5);
        }

        .premium-card-content {
          padding: var(--space-xl);
        }

        .premium-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-md);
        }

        .premium-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          color: var(--pearl-white);
          margin: 0;
          line-height: 1.3;
          flex: 1;
        }

        .premium-card-price {
          text-align: right;
          margin-left: var(--space-md);
        }

        .premium-price-original {
          color: rgba(240, 247, 255, 0.4);
          text-decoration: line-through;
          font-size: 0.9rem;
          display: block;
        }

        .premium-price-current {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--coral-reef);
          text-shadow: 0 0 20px rgba(255, 127, 107, 0.3);
          line-height: 1;
        }

        .premium-card-ingredients {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-xs);
          margin-bottom: var(--space-md);
        }

        .premium-ingredient-tag {
          background: rgba(59, 123, 176, 0.15);
          border: 1px solid rgba(59, 123, 176, 0.3);
          border-radius: var(--radius-full);
          padding: 4px var(--space-sm);
          font-size: 0.8rem;
          color: rgba(240, 247, 255, 0.8);
          letter-spacing: 0.5px;
        }

        .premium-card-offer {
          background: rgba(255, 127, 107, 0.1);
          border: 1px solid var(--coral-reef);
          border-radius: var(--radius-full);
          padding: var(--space-sm) var(--space-lg);
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
          color: var(--coral-reef);
          font-size: 0.9rem;
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 127, 107, 0.3); }
          50% { box-shadow: 0 0 20px rgba(255, 127, 107, 0.5); }
        }

        .premium-card-footer {
          display: flex;
          gap: var(--space-sm);
          margin-top: var(--space-lg);
        }

        .premium-card-btn {
          flex: 1;
          padding: var(--space-md);
          border-radius: var(--radius-full);
          border: none;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          transition: var(--transition-bounce);
        }

        .premium-btn-primary {
          background: var(--gradient-sunset);
          color: var(--abyss-black);
          box-shadow: 0 5px 15px rgba(255, 127, 107, 0.3);
        }

        .premium-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 127, 107, 0.5);
        }

        .premium-btn-favorite {
          background: rgba(26, 59, 90, 0.3);
          border: 1px solid rgba(255, 127, 107, 0.3);
          color: var(--coral-reef);
          width: 50px;
          flex: 0 0 auto;
          padding: var(--space-md) 0;
        }

        .premium-btn-favorite:hover {
          background: rgba(255, 127, 107, 0.2);
          border-color: var(--coral-reef);
          transform: scale(1.1);
        }

        .premium-favorite-icon {
          font-size: 1.2rem;
          transition: var(--transition-smooth);
        }

        .premium-btn-favorite:hover .premium-favorite-icon {
          transform: scale(1.2);
          color: var(--coral-reef);
        }

        /* ========================================
           Reviews Section
           ======================================== */
        .premium-reviews-section {
          margin-top: var(--space-xxl);
          padding-top: var(--space-xxl);
          border-top: 1px solid rgba(59, 123, 176, 0.3);
          position: relative;
        }

        .premium-reviews-section::before {
          content: '';
          position: absolute;
          top: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: var(--gradient-sunset);
          border-radius: var(--radius-full);
        }

        .premium-reviews-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--space-xl);
          flex-wrap: wrap;
          gap: var(--space-lg);
        }

        .premium-reviews-title-wrapper {
          flex: 1;
        }

        .premium-reviews-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          color: var(--pearl-white);
          margin-bottom: var(--space-xs);
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .premium-title-icon {
          font-size: 2rem;
          animation: wave 3s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }

        .premium-reviews-subtitle {
          color: rgba(240, 247, 255, 0.6);
          font-size: 1.1rem;
          letter-spacing: 1px;
        }

        .premium-reviews-write-btn {
          background: transparent;
          border: 2px solid var(--coral-reef);
          border-radius: var(--radius-full);
          padding: var(--space-md) var(--space-xl);
          color: var(--coral-reef);
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          transition: var(--transition-bounce);
        }

        .premium-reviews-write-btn:hover {
          background: var(--coral-reef);
          color: var(--abyss-black);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 127, 107, 0.4);
        }

        .premium-reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-lg);
          margin-bottom: var(--space-xl);
        }

        .premium-review-card {
          background: rgba(26, 59, 90, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 123, 176, 0.2);
          border-radius: var(--radius-lg);
          transition: var(--transition-smooth);
        }

        .premium-review-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 127, 107, 0.3);
          box-shadow: var(--shadow-glow);
        }

        .premium-review-card-inner {
          padding: var(--space-xl);
        }

        .premium-review-header {
          margin-bottom: var(--space-lg);
        }

        .premium-reviewer {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-sm);
        }

        .premium-reviewer-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--coral-reef);
          box-shadow: 0 0 20px rgba(255, 127, 107, 0.3);
        }

        .premium-reviewer-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .premium-reviewer-info {
          flex: 1;
        }

        .premium-reviewer-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: var(--pearl-white);
          margin-bottom: 4px;
        }

        .premium-review-rating {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }

        .premium-review-star {
          color: rgba(240, 247, 255, 0.3);
          font-size: 1rem;
        }

        .premium-review-star.filled {
          color: var(--coral-reef);
          text-shadow: 0 0 10px rgba(255, 127, 107, 0.5);
        }

        .premium-review-date {
          color: rgba(240, 247, 255, 0.5);
          font-size: 0.8rem;
          margin-left: var(--space-sm);
        }

        .premium-review-dish-badge {
          background: rgba(59, 123, 176, 0.2);
          border: 1px solid rgba(59, 123, 176, 0.3);
          border-radius: var(--radius-full);
          padding: 4px var(--space-sm);
          font-size: 0.8rem;
          color: var(--caribbean-blue);
          display: inline-block;
        }

        .premium-review-comment {
          color: rgba(240, 247, 255, 0.9);
          line-height: 1.8;
          font-size: 1rem;
          margin-bottom: var(--space-lg);
          font-style: italic;
        }

        .premium-review-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-md);
          border-top: 1px solid rgba(59, 123, 176, 0.2);
        }

        .premium-review-helpful {
          background: none;
          border: none;
          color: rgba(240, 247, 255, 0.5);
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          cursor: pointer;
          transition: var(--transition-smooth);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-full);
        }

        .premium-review-helpful:hover {
          color: var(--coral-reef);
          background: rgba(255, 127, 107, 0.1);
        }

        .premium-review-share {
          background: none;
          border: none;
          color: rgba(240, 247, 255, 0.5);
          cursor: pointer;
          transition: var(--transition-smooth);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .premium-review-share:hover {
          color: var(--coral-reef);
          background: rgba(255, 127, 107, 0.1);
          transform: rotate(90deg);
        }

        .premium-reviews-footer {
          text-align: center;
        }

        .premium-view-all-reviews {
          background: transparent;
          border: 2px solid rgba(59, 123, 176, 0.3);
          border-radius: var(--radius-full);
          padding: var(--space-md) var(--space-xxl);
          color: var(--pearl-white);
          font-size: 1rem;
          letter-spacing: 1px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: var(--space-md);
          transition: var(--transition-smooth);
        }

        .premium-view-all-reviews:hover {
          border-color: var(--coral-reef);
          color: var(--coral-reef);
          transform: translateX(5px);
        }

        .premium-view-all-icon {
          font-size: 1.2rem;
          transition: transform var(--transition-smooth);
        }

        .premium-view-all-reviews:hover .premium-view-all-icon {
          transform: translateX(5px);
        }

        /* ========================================
           Empty States
           ======================================== */
        .premium-empty-menu {
          text-align: center;
          padding: var(--space-xxl);
          background: rgba(26, 59, 90, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 123, 176, 0.2);
          border-radius: var(--radius-xl);
          margin: var(--space-xl) 0;
        }

        .premium-empty-wave {
          font-size: 6rem;
          margin-bottom: var(--space-xl);
          animation: floatWave 4s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes floatWave {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(5deg); }
          75% { transform: translateY(15px) rotate(-5deg); }
        }

        .premium-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          color: var(--pearl-white);
          margin-bottom: var(--space-md);
        }

        .premium-empty-text {
          color: rgba(240, 247, 255, 0.6);
          margin-bottom: var(--space-xl);
          font-size: 1.1rem;
        }

        .premium-empty-btn {
          background: var(--gradient-sunset);
          border: none;
          border-radius: var(--radius-full);
          padding: var(--space-md) var(--space-xl);
          color: var(--abyss-black);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-bounce);
        }

        .premium-empty-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 127, 107, 0.4);
        }

        .premium-error-message {
          text-align: center;
          padding: var(--space-xl);
          background: rgba(255, 107, 107, 0.1);
          border: 1px solid var(--coral-reef);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-xl);
        }

        .premium-error-icon {
          font-size: 2rem;
          margin-bottom: var(--space-md);
          display: block;
        }

        .premium-error-btn {
          background: var(--gradient-sunset);
          border: none;
          border-radius: var(--radius-full);
          padding: var(--space-sm) var(--space-xl);
          color: var(--abyss-black);
          font-weight: 600;
          cursor: pointer;
          margin-top: var(--space-md);
          transition: var(--transition-bounce);
        }

        /* ========================================
           Loading
           ======================================== */
        .premium-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: var(--abyss-black);
        }

        .premium-loading-spinner {
          width: 70px;
          height: 70px;
          border: 3px solid rgba(255, 127, 107, 0.1);
          border-top: 3px solid var(--coral-reef);
          border-right: 3px solid var(--coral-reef);
          border-radius: 50%;
          animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
          box-shadow: 0 0 30px rgba(255, 127, 107, 0.3);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* ========================================
           Footer
           ======================================== */
        .premium-menu-footer {
          margin-top: var(--space-xxl);
          position: relative;
        }

        .premium-footer-waves {
          position: absolute;
          top: -150px;
          left: 0;
          width: 100%;
          line-height: 0;
          pointer-events: none;
        }

        .premium-footer-waves svg {
          width: 100%;
          height: auto;
        }

        .premium-footer-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: var(--space-xl) var(--space-xl) var(--space-lg);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-xl);
        }

        .premium-footer-logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        .premium-footer-logo .premium-logo-icon {
          font-size: 2rem;
        }

        .premium-footer-logo .premium-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          background: linear-gradient(135deg, var(--pearl-white), var(--coral-reef));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .premium-footer-description {
          color: rgba(240, 247, 255, 0.6);
          line-height: 1.8;
        }

        .premium-footer-links h3,
        .premium-footer-contact h3 {
          font-family: 'Cormorant Garamond', serif;
          color: var(--coral-reef);
          margin-bottom: var(--space-md);
          font-size: 1.2rem;
        }

        .premium-footer-links ul,
        .premium-footer-contact ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .premium-footer-links li,
        .premium-footer-contact li {
          margin-bottom: var(--space-sm);
          color: rgba(240, 247, 255, 0.6);
        }

        .premium-footer-links a {
          color: rgba(240, 247, 255, 0.6);
          text-decoration: none;
          transition: var(--transition-smooth);
        }

        .premium-footer-links a:hover {
          color: var(--coral-reef);
          padding-left: var(--space-xs);
        }

        .premium-contact-icon {
          margin-right: var(--space-xs);
        }

        .premium-footer-bottom {
          text-align: center;
          padding: var(--space-lg) var(--space-xl);
          border-top: 1px solid rgba(59, 123, 176, 0.2);
          color: rgba(240, 247, 255, 0.4);
          font-size: 0.9rem;
        }

        /* ========================================
           Mobile Bottom Navigation
           ======================================== */
        .premium-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(10, 25, 34, 0.9);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 127, 107, 0.2);
          padding: var(--space-sm) var(--space-md);
          z-index: 1000;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.3);
        }

        .premium-bottom-nav-items {
          display: flex;
          justify-content: space-around;
          align-items: center;
          max-width: 500px;
          margin: 0 auto;
        }

        .premium-bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: rgba(240, 247, 255, 0.5);
          text-decoration: none;
          font-size: 0.7rem;
          padding: var(--space-sm);
          border-radius: var(--radius-lg);
          transition: var(--transition-smooth);
          background: none;
          border: none;
          cursor: pointer;
          width: auto;
        }

        .premium-nav-icon {
          font-size: 1.4rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          transition: var(--transition-bounce);
        }

        .premium-bottom-nav-item.active {
          color: var(--coral-reef);
        }

        .premium-bottom-nav-item.active .premium-nav-icon {
          transform: translateY(-3px);
          filter: drop-shadow(0 5px 10px rgba(255, 127, 107, 0.5));
        }

        .premium-nav-label {
          font-size: 0.65rem;
          letter-spacing: 0.5px;
        }

        /* ========================================
           Responsive Design
           ======================================== */
        @media (max-width: 1024px) {
          .premium-menu-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .premium-reviews-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .premium-bottom-nav {
            display: block;
          }
          
          .premium-menu-hero {
            height: 70vh;
          }
          
          .premium-hero-back {
            top: var(--space-md);
            left: var(--space-md);
            padding: var(--space-xs) var(--space-md);
            font-size: 0.8rem;
          }
          
          .premium-hero-actions {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
          
          .premium-hero-btn {
            width: 100%;
            justify-content: center;
          }
          
          .premium-menu-container {
            padding: var(--space-xl) var(--space-md);
          }
          
          .premium-category-filter {
            overflow-x: auto;
            padding-bottom: var(--space-sm);
            justify-content: flex-start;
            -webkit-overflow-scrolling: touch;
          }
          
          .premium-category-btn {
            white-space: nowrap;
          }
          
          .premium-menu-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
            margin-bottom: var(--space-xl);
          }
          
          .premium-reviews-grid {
            grid-template-columns: 1fr;
          }
          
          .premium-reviews-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .premium-reviews-write-btn {
            width: 100%;
            justify-content: center;
          }
          
          .premium-footer-waves {
            top: -80px;
          }
          
          .premium-footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .premium-footer-logo {
            justify-content: center;
          }
          
          .premium-menu-footer {
            margin-bottom: 70px;
          }
        }

        @media (max-width: 480px) {
          .premium-menu-hero {
            height: 60vh;
            min-height: 500px;
          }
          
          .premium-hero-title {
            font-size: 2.5rem;
            flex-direction: column;
            gap: var(--space-xs);
          }
          
          .premium-hero-location {
            font-size: 1rem;
          }
          
          .premium-menu-stats {
            flex-direction: column;
            gap: var(--space-sm);
          }
          
          .premium-stats-separator {
            display: none;
          }
          
          .premium-card-header {
            flex-direction: column;
            gap: var(--space-sm);
          }
          
          .premium-card-price {
            text-align: left;
            margin-left: 0;
          }
          
          .premium-card-footer {
            flex-direction: column;
          }
          
          .premium-btn-favorite {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerMenu;