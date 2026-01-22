import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddShopStyle.css';
import api from './services/api';

const AddShop = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

    setIsLoading(true);
    setIsError(false);
    setMessage('');

    try {
      // const response = await axios.post('https://webpoint.lk/api/v1/shop/', formData);

      const response = await api.post('/shop/', formData);
      
      setMessage('Shop registered successfully!');
      setFormData({
        shopname: '',
        owner: '',
        address: '',
        phone1: '',
        phone2: '',
        opentime: '',
        closetime: '',
        verifycode: ''
      });
      
      // Redirect to shop details after 1.5 seconds
      setTimeout(() => navigate('/Shop-List'), 1500);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.error || 'Failed to register shop');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shop-registration-container">
      <button
        type="button"
        className="shop-members-button"
        onClick={() => navigate('/Shop-List')}
      >
        View Shops
      </button>
      
      <h1 className="registration-title">Register New Shop</h1>
      
      <form onSubmit={handleSubmit} className="registration-form">
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
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register Shop'}
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

export default AddShop;