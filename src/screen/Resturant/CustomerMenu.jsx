import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { menuAPI, restaurantAPI } from '../services/api';
import styles from './CustomerMenu.module.css';

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

  // Sample reviews data
  const [reviews] = useState([
    {
      id: 1,
      user: 'Sophie Bennett',
      rating: 5,
      date: '2 days ago',
      comment: 'Absolutely divine! The seafood platter was fresh and perfectly cooked.',
      avatar: 'https://images.unsplash.com/photo-1494790108777-28666c5f0f0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      dish: 'Grilled Lobster'
    },
    {
      id: 2,
      user: 'Michael Chen',
      rating: 4,
      date: '1 week ago',
      comment: 'Excellent service and beautiful presentation.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      dish: 'Tropical Cocktail'
    },
    {
      id: 3,
      user: 'Isabella Rossi',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Hidden gem by the coast! Will definitely come back.',
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
      
      let restaurantData = null;
      try {
        const restaurantResponse = await restaurantAPI.getById(restaurantId);
        restaurantData = restaurantResponse.data;
      } catch (err) {
        try {
          const allRestaurantsResponse = await restaurantAPI.getAll();
          const found = allRestaurantsResponse.data.find(
            r => r.restaurantId === restaurantId || r._id === restaurantId
          );
          if (found) restaurantData = found;
        } catch (secondErr) {
          console.error('Both fetch attempts failed:', secondErr);
        }
      }

      if (!restaurantData) {
        throw new Error('Restaurant not found');
      }

      setRestaurant(restaurantData);

      let menuData = [];
      try {
        const menuResponse = await menuAPI.getByRestaurant(restaurantId);
        menuData = menuResponse.data;
      } catch (err) {
        if (restaurantData._id) {
          try {
            const menuResponse = await menuAPI.getByRestaurant(restaurantData._id);
            menuData = menuResponse.data;
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

  const handleViewAllReviews = () => {
    navigate(`/restaurant/customer/reviews/${restaurantId}`);
  };

  const handleViewRestaurants = () => {
    navigate('/restaurant/all');
  };

  // Hero images
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
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
      <span key={i} className={`${styles.star} ${i < rating ? styles.filled : ''}`}>★</span>
    ));
  };

  if (loading) {
    return (
      <div className={styles.customerMenu}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.customerMenu}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`${styles.heroSlide} ${index === activeImageIndex ? styles.active : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className={styles.heroOverlay}></div>
        
        <div className={styles.heroContent}>
          {restaurant && (
            <div className={styles.restaurantInfo}>
              <h1 className={styles.restaurantName}>{restaurant.restaurantName}</h1>
              <p className={styles.restaurantLocation}>
                <span className={styles.locationIcon}>📍</span>
                {restaurant.location}
              </p>
              <div className={styles.heroActions}>
                <button onClick={handleViewReviews} className={`${styles.btn} ${styles.btnOutline}`}>
                  <span className={styles.btnIcon}>⭐</span>
                  <span>Reviews ({reviews.length})</span>
                </button>
                <button onClick={handleAddReview} className={`${styles.btn} ${styles.btnPrimary}`}>
                  <span className={styles.btnIcon}>✍️</span>
                  <span>Write Review</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.heroIndicators}>
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === activeImageIndex ? styles.active : ''}`}
              onClick={() => setActiveImageIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Search and Filter */}
          <div className={styles.searchSection}>
            <div className={styles.searchWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button 
                  className={styles.searchClear}
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
            
            <div className={styles.categoryFilter}>
              {categories.map(category => (
                <button
                  key={category}
                  className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* Menu Grid - Compact Cards */}
          {restaurant && (
            <>
              {filteredItems.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🍽️</div>
                  <h3 className={styles.emptyTitle}>
                    {searchTerm ? 'No Dishes Found' : 'Menu Coming Soon'}
                  </h3>
                  <p className={styles.emptyText}>
                    {searchTerm ? 'Try different keywords' : 'Check back later for delicious dishes'}
                  </p>
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className={styles.emptyBtn}>
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className={styles.menuStats}>
                    <span className={styles.statsCount}>{filteredItems.length} dishes</span>
                    <span className={styles.statsSeparator}>•</span>
                    <span className={styles.statsCategory}>
                      {selectedCategory === 'all' ? 'All Menu' : selectedCategory}
                    </span>
                  </div>

                  <div className={styles.menuGrid}>
                    {filteredItems.map((item, index) => (
                      <div key={item._id} className={styles.menuCard}>
                        <div className={styles.cardImage}>
                          <img 
                            src={item.image || foodImages[index % foodImages.length]} 
                            alt={item.foodName}
                          />
                          {item.discount > 0 && (
                            <div className={styles.discountBadge}>-{item.discount}%</div>
                          )}
                        </div>
                        
                        <div className={styles.cardContent}>
                          <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>{item.foodName}</h3>
                            <div className={styles.cardPrice}>
                              {item.discount > 0 ? (
                                <>
                                  <span className={styles.priceOriginal}>${item.price}</span>
                                  <span className={styles.priceCurrent}>
                                    ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <span className={styles.priceCurrent}>${item.price}</span>
                              )}
                            </div>
                          </div>
                          
                          <p className={styles.cardIngredients}>
                            {Array.isArray(item.ingredients) 
                              ? item.ingredients.join(' · ')
                              : item.ingredients}
                          </p>
                          
                          {item.specialOffers && (
                            <div className={styles.cardOffer}>
                              <span className={styles.offerIcon}>🎁</span>
                              <span className={styles.offerText}>{item.specialOffers}</span>
                            </div>
                          )}
                          
                          <div className={styles.cardFooter}>
                            <button className={`${styles.btnCard} ${styles.btnPrimary}`}>
                              <span>Add to Cart</span>
                              <span className={styles.btnCardIcon}>🛒</span>
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

          {/* Reviews Preview Section */}
          {restaurant && reviews.length > 0 && (
            <section className={styles.reviewsPreview}>
              <div className={styles.reviewsHeader}>
                <div>
                  <h2 className={styles.reviewsTitle}>Recent Reviews</h2>
                  <p className={styles.reviewsSubtitle}>What guests are saying</p>
                </div>
                <button onClick={handleViewAllReviews} className={styles.viewAllBtn}>
                  <span>View All</span>
                  <span className={styles.viewAllIcon}>→</span>
                </button>
              </div>

              <div className={styles.reviewsGrid}>
                {reviews.slice(0, 3).map(review => (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewer}>
                        <img src={review.avatar} alt={review.user} className={styles.reviewerAvatar} />
                        <div>
                          <h4 className={styles.reviewerName}>{review.user}</h4>
                          <div className={styles.reviewRating}>
                            {renderStars(review.rating)}
                            <span className={styles.reviewDate}>{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <span className={styles.reviewDish}>{review.dish}</span>
                    </div>
                    <p className={styles.reviewComment}>"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2026 Webpoint.lk. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation - Updated with Menu, Add Review, View Reviews */}
      <nav className={styles.mobileBottomNav}>
        <button 
          onClick={handleGoBack}
          className={styles.bottomNavItem}
        >
          <span className={styles.bottomNavIcon}>←</span>
          <span className={styles.bottomNavLabel}>Back</span>
        </button>
        <button 
          onClick={handleAddReview}
          className={styles.bottomNavItem}
        >
          <span className={styles.bottomNavIcon}>✍️</span>
          <span className={styles.bottomNavLabel}>Add Review</span>
        </button>
        <button 
          onClick={handleViewReviews}
          className={styles.bottomNavItem}
        >
          <span className={styles.bottomNavIcon}>⭐</span>
          <span className={styles.bottomNavLabel}>Reviews</span>
        </button>
        <button 
          onClick={handleViewRestaurants}
          className={styles.bottomNavItem}
        >
          <span className={styles.bottomNavIcon}>🏖️</span>
          <span className={styles.bottomNavLabel}>Restaurants</span>
        </button>
      </nav>
    </div>
  );
};

export default CustomerMenu;