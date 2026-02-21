import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reviewAPI, restaurantAPI } from '../services/api';
import './RestaurantPremium.css';

const AddReview = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(''); // Changed from message to comment
  const [customerName, setCustomerName] = useState(''); // Added customer name field
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantId]);

  const fetchRestaurant = async () => {
    try {
      const response = await restaurantAPI.getById(restaurantId);
      setRestaurant(response.data);
    } catch (err) {
      setError('Failed to fetch restaurant details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Using correct field names based on your backend schema
      const reviewData = {
        restaurantId,
        rating: rating, // Changed from reviewVote to rating
        comment: comment || null, // Changed from message to comment
        customerName: customerName || 'Anonymous' // Added customer name
      };
      
      console.log('Submitting review:', reviewData);
      
      await reviewAPI.add(reviewData);

      alert('✨ Review added successfully! Thank you for your feedback.');
      navigate(`/restaurant/customer/reviews/${restaurantId}`);
    } catch (err) {
      console.error('Review submission error:', err);
      setError(err.response?.data?.error || 'Failed to add review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!restaurant) {
    return (
      <div className="premium-restaurant-theme">
        <div className="premium-loading">
          {/* <div className="premium-loading-spinner"></div> */}
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
            <button 
              onClick={() => navigate(`/restaurant/customer/menu/${restaurantId}`)}
              className="premium-nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ← Back to Menu
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ minHeight: '100vh', padding: 'var(--space-xl) 0' }}>
        <div className="premium-form-container">
          <div className="premium-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 className="premium-form-title">Share Your Experience</h1>
            <p className="premium-form-subtitle">at {restaurant.restaurantName}</p>

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
              {/* Customer Name Field */}
              <div className="premium-form-group">
                <label className="premium-label">Your Name (optional)</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="premium-input"
                  placeholder="Enter your name"
                />
              </div>

              {/* Star Rating */}
              <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                <label className="premium-label" style={{ justifyContent: 'center' }}>
                  How many stars would you give?
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', marginTop: 'var(--space-md)' }}>
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                          style={{ display: 'none' }}
                        />
                        <span
                          style={{
                            fontSize: '40px',
                            cursor: 'pointer',
                            color: ratingValue <= (hover || rating) ? '#FFD700' : 'rgba(255,255,255,0.3)',
                            transition: 'all 0.3s ease',
                            textShadow: ratingValue <= (hover || rating) ? '0 0 20px rgba(255,215,0,0.5)' : 'none'
                          }}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(0)}
                        >
                          ★
                        </span>
                      </label>
                    );
                  })}
                </div>
                {rating > 0 && (
                  <p style={{ color: 'var(--coral-reef)', marginTop: 'var(--space-sm)' }}>
                    You selected {rating} {rating === 1 ? 'star' : 'stars'}
                  </p>
                )}
              </div>

              {/* Review Comment */}
              <div className="premium-form-group">
                <label className="premium-label">Your Review (optional)</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="premium-input premium-textarea"
                  placeholder="Tell us about your dining experience..."
                  rows="5"
                />
              </div>

              <div style={{ 
                textAlign: 'center', 
                margin: 'var(--space-xl) 0',
                padding: 'var(--space-lg)',
                background: 'rgba(59, 123, 176, 0.1)',
                borderRadius: 'var(--radius-full)',
                fontStyle: 'italic',
                color: 'var(--pearl-white)',
                border: '1px solid rgba(59, 123, 176, 0.3)'
              }}>
                <p>"Your feedback helps us create better experiences!" 🌊</p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                <button 
                  type="button"
                  onClick={() => navigate(`/restaurant/customer/menu/${restaurantId}`)}
                  className="premium-btn premium-btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="premium-btn premium-btn-primary"
                  disabled={loading}
                  style={{ flex: 2 }}
                >
                  {loading ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
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
          <a href="/restaurant/all" className="premium-bottom-nav-item">
            <span>🏖️</span>
            <span>Restaurants</span>
          </a>
          <a href="/restaurant/all-menus" className="premium-bottom-nav-item">
            <span>🍽️</span>
            <span>Menus</span>
          </a>
          <button 
            onClick={() => navigate(`/restaurant/customer/menu/${restaurantId}`)}
            className="premium-bottom-nav-item"
          >
            <span>←</span>
            <span>Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;