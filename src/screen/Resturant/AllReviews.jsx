import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reviewAPI, restaurantAPI } from '../services/api';
import './RestaurantPremium.css';

const AllReviews = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [restaurantId]);

  const fetchReviews = async () => {
    try {
      const restaurantResponse = await restaurantAPI.getById(restaurantId);
      setRestaurant(restaurantResponse.data);

      const response = await reviewAPI.getByRestaurant(restaurantId);
      setReviews(response.data.reviews || []);
    } catch (err) {
      setError('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Delete this review?')) {
      try {
        await reviewAPI.delete(reviewId);
        await fetchReviews();
      } catch (err) {
        setError('Failed to delete review');
      }
    }
  };

  const renderStars = (vote) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < vote ? 'filled' : ''}`}>★</span>
    ));
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.reviewVote, 0) / reviews.length).toFixed(1)
    : '0.0';

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
            <span className="premium-logo-text">Resturant</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ minHeight: '100vh', padding: 'var(--space-xl) 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 var(--space-xl)' }}>
          <button 
            onClick={() => navigate(`/restaurant/customer/menu/${restaurantId}`)}
            className="premium-btn premium-btn-secondary"
            style={{ marginBottom: 'var(--space-lg)' }}
          >
            ← Back to Menu
          </button>

          {/* Header Section */}
          <div className="premium-card" style={{ marginBottom: 'var(--space-xl)' }}>
            <h1 style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'var(--pearl-white)',
              marginBottom: 'var(--space-md)'
            }}>
              ⭐ Reviews for {restaurant?.restaurantName}
            </h1>
            
            {/* Average Rating */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
              <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--coral-reef)' }}>
                {averageRating}
              </div>
              <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', margin: 'var(--space-sm) 0' }}>
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
              <div style={{ color: 'rgba(240,247,255,0.7)' }}>
                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </div>
            </div>

            <button 
              onClick={() => navigate(`/restaurant/customer/review/add/${restaurantId}`)}
              className="premium-btn premium-btn-primary"
              style={{ width: '100%' }}
            >
              ✍️ Write a Review
            </button>
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

          {reviews.length === 0 ? (
            <div className="premium-empty-state">
              <div className="premium-empty-icon">🌊</div>
              <h2 className="premium-empty-title">No Reviews Yet</h2>
              <p className="premium-empty-text">Be the first to share your experience!</p>
              <button 
                onClick={() => navigate(`/restaurant/customer/review/add/${restaurantId}`)}
                className="premium-btn premium-btn-primary"
              >
                Write First Review
              </button>
            </div>
          ) : (
            <div className="reviews-container">
              {reviews.map((review) => (
                <div key={review._id} className="premium-card" style={{ marginBottom: 'var(--space-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {renderStars(review.reviewVote)}
                    </div>
                    <span style={{ color: 'rgba(240,247,255,0.5)', fontSize: '0.9rem' }}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {review.message && (
                    <p style={{ 
                      color: 'var(--pearl-white)', 
                      fontStyle: 'italic',
                      lineHeight: '1.8',
                      marginBottom: 'var(--space-md)'
                    }}>
                      "{review.message}"
                    </p>
                  )}
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => handleDeleteReview(review._id)}
                      className="premium-action-btn premium-action-btn-danger"
                      style={{ padding: 'var(--space-xs) var(--space-lg)' }}
                    >
                      🗑️ Delete
                    </button>
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
            <h3>Contact</h3>
            <p>📍 123 Coastal Highway</p>
            <p>📞 +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="premium-footer-bottom">
          <p>© 2024 Oceanic Bites. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AllReviews;