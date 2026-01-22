import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateShopStyle.css';
import api from './services/api';

const UpdateShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopname: '',
    owner: '',
    address: '',
    phone1: '',
    phone2: '',
    opentime: '',
    closetime: '',
    verifycode: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        // const response = await axios.get(`https://webpoint.lk/api/v1/shop/${id}`);
        const response = await api.get(`/shop/${id}`);
        const shopData = response.data;
        
        setFormData({
          shopname: shopData.shopname || '',
          owner: shopData.owner || '',
          address: shopData.address || '',
          phone1: shopData.phone1 || '',
          phone2: shopData.phone2 || '',
          opentime: shopData.opentime || '',
          closetime: shopData.closetime || '',
          verifycode: shopData.verifycode || ''
        });
        setLoading(false);
      } catch (err) {
        setIsError(true);
        setMessage(err.response?.data?.error || 'Failed to fetch shop details');
        setLoading(false);
      }
    };
    fetchShop();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.shopname || !formData.owner || !formData.phone1 || !formData.verifycode) {
      setIsError(true);
      setMessage('Shop name, owner, primary phone, and verification code are required');
      return;
    }

    try {
      // await axios.put(`https://webpoint.lk/api/v1/shop/${id}`, formData);
      await api.put(`/shop/${id}`, formData);
      setMessage('Shop updated successfully!');
      setIsError(false);
      setTimeout(() => navigate('/shop-list'), 1500);
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.error || 'Failed to update shop');
    }
  };

  if (loading) return <div className="loading">Loading shop data...</div>;

  return (
    <div className="shop-update-container">
      <button
        className="back-button"
        onClick={() => navigate('/shop-list')}
      >
        Back to Shop List
      </button>
      
      <h1 className="title">Update Shop Details</h1>
      
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="shopname">Shop Name *</label>
            <input
              type="text"
              id="shopname"
              name="shopname"
              value={formData.shopname}
              onChange={handleChange}
              required
              minLength={2}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="owner">Owner Name *</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              required
              minLength={3}
            />
          </div>
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone1">Primary Phone *</label>
            <input
              type="tel"
              id="phone1"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              required
              pattern="[0-9]{10,15}"
              title="Please enter a valid phone number (10-15 digits)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone2">Secondary Phone</label>
            <input
              type="tel"
              id="phone2"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
              pattern="[0-9]{10,15}"
              title="Please enter a valid phone number (10-15 digits)"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="opentime">Opening Time</label>
            <input
              type="time"
              id="opentime"
              name="opentime"
              value={formData.opentime}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="closetime">Closing Time</label>
            <input
              type="time"
              id="closetime"
              name="closetime"
              value={formData.closetime}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="verifycode">Verification Code *</label>
          <input
            type="text"
            id="verifycode"
            name="verifycode"
            value={formData.verifycode}
            onChange={handleChange}
            required
            minLength={4}
            placeholder="Enter verification code"
          />
        </div>
        
        <div className="shop-id-display">
          <span className="label">Shop ID:</span>
          <span className="id-value">{id}</span>
        </div>
        
        <button type="submit" className="submit-btn">
          Update Shop
        </button>
        
        {message && (
          <div className={`message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateShop;