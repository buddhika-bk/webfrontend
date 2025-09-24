import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ShopListStyle.css';

const ShopList = () => {
  const [shopList, setShopList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedShop, setExpandedShop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://173.214.164.88:3000/api/v1/shop/get');
        setShopList(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch shops');
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shop?')) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/v1/shop/${id}`);
      setShopList(prev => prev.filter(shop => shop._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete shop');
    }
  };

  const toggleExpand = (id) => {
    if (expandedShop === id) {
      setExpandedShop(null);
    } else {
      setExpandedShop(id);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not specified';
    
    // Handle both "HH:MM" format and full timestamp
    if (timeString.includes(':')) {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    }
    
    return timeString;
  };

  // Function to copy shop ID to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Shop ID copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  if (loading) return <div className="loading">Loading shops...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="shop-list-container">
      <div className="header-section">
        <h1 className="title">Shop Details</h1>
        <button
          className="add-shop-button"
          onClick={() => navigate('/add-shop')}
        >
          Add New Shop
        </button>
      </div>
      
      {shopList.length === 0 ? (
        <div className="no-shops">
          <p>No shops found. Would you like to add one?</p>
          <button
            className="add-first-shop-button"
            onClick={() => navigate('/add-shop')}
          >
            Add Your First Shop
          </button>
        </div>
      ) : (
        <div className="shops-grid">
          {shopList.map(shop => (
            <div key={shop._id} className="shop-card">
              <div className="shop-card-header">
                <h3 className="shop-name">{shop.shopname}</h3>
                <button 
                  className="expand-btn"
                  onClick={() => toggleExpand(shop._id)}
                  aria-label={expandedShop === shop._id ? 'Collapse details' : 'Expand details'}
                >
                  {expandedShop === shop._id ? '▲' : '▼'}
                </button>
              </div>
              
              <div className="shop-basic-info">
                <p className="shop-owner">
                  <span className="label">Owner:</span> {shop.owner}
                </p>
                <p className="shop-phone">
                  <span className="label">Primary Phone:</span> {shop.phone1}
                </p>
                <p className="shop-id">
                  <span className="label">Shop ID:</span> 
                  <span className="id-value">{shop._id}</span>
                  <button 
                    className="copy-id-btn"
                    onClick={() => copyToClipboard(shop._id)}
                    title="Copy Shop ID"
                  >
                    📋
                  </button>
                </p>
              </div>

              {expandedShop === shop._id && (
                <div className="shop-details-expanded">
                  <div className="detail-row">
                    <span className="label">Shop ID:</span>
                    <span className="value id-value-expanded">
                      {shop._id}
                      <button 
                        className="copy-id-btn"
                        onClick={() => copyToClipboard(shop._id)}
                        title="Copy Shop ID"
                      >
                        📋
                      </button>
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Address:</span>
                    <span className="value">{shop.address || 'Not specified'}</span>
                  </div>
                  
                  {shop.phone2 && (
                    <div className="detail-row">
                      <span className="label">Secondary Phone:</span>
                      <span className="value">{shop.phone2}</span>
                    </div>
                  )}
                  
                  <div className="detail-row">
                    <span className="label">Business Hours:</span>
                    <span className="value">
                      {formatTime(shop.opentime)} - {formatTime(shop.closetime)}
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Verification Code:</span>
                    <span className="value verify-code">{shop.verifycode}</span>
                  </div>
                  
                  <div className="card-actions">
                    <button 
                      className="update-btn"
                      onClick={() => navigate(`/update-shop/${shop._id}`)}
                    >
                      Update
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(shop._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
              
              {expandedShop !== shop._id && (
                <div className="card-actions-collapsed">
                  <button 
                    className="update-btn"
                    onClick={() => navigate(`/update-shop/${shop._id}`)}
                  >
                    Update
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(shop._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopList;