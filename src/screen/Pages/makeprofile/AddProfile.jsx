import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProfile.css';
import { FaStore, FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaImage, FaInfoCircle, FaBriefcase } from 'react-icons/fa';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';

const AddProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactDetails: {
      phone: '',
      email: '',
      website: '',
      socialMedia: {
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: ''
      }
    },
    companyAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    companyLogo: '',
    productDetails: '',
    businessBio: '',
    category: 'other'
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'contactDetails' && child === 'socialMedia') {
        setFormData(prev => ({
          ...prev,
          contactDetails: {
            ...prev.contactDetails,
            socialMedia: {
              ...prev.contactDetails.socialMedia,
              [e.target.dataset.social]: value
            }
          }
        }));
      } else if (parent === 'contactDetails') {
        setFormData(prev => ({
          ...prev,
          contactDetails: {
            ...prev.contactDetails,
            [child]: value
          }
        }));
      } else if (parent === 'companyAddress') {
        setFormData(prev => ({
          ...prev,
          companyAddress: {
            ...prev.companyAddress,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({
          ...prev,
          companyLogo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/qrprofiles', formData);
      
      if (response.data.success) {
        // Navigate to view profile page with the new profile data
        navigate(`/profile/${response.data.data._id}`, { 
          state: { profile: response.data.data }
        });
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert(error.response?.data?.message || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-profile-container">
      <div className="add-profile-wrapper">
        <div className="add-profile-header">
          <h1>Create QR Profile</h1>
          <p>Fill in the details to generate your professional QR code profile</p>
        </div>

        <form onSubmit={handleSubmit} className="add-profile-form">
          <div className="form-grid">
            {/* Business Name */}
            <div className="form-group full-width">
              <label>
                <FaStore className="input-icon" />
                Business Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Enter your business name"
                required
                className="form-input"
              />
            </div>

            {/* Contact Details */}
            <div className="form-section">
              <h3>Contact Details</h3>
              <div className="form-group">
                <label>
                  <FaPhone className="input-icon" />
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="contactDetails.phone"
                  value={formData.contactDetails.phone}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 8900"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaEnvelope className="input-icon" />
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="contactDetails.email"
                  value={formData.contactDetails.email}
                  onChange={handleInputChange}
                  placeholder="business@example.com"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaGlobe className="input-icon" />
                  Website
                </label>
                <input
                  type="url"
                  name="contactDetails.website"
                  value={formData.contactDetails.website}
                  onChange={handleInputChange}
                  placeholder="https://www.example.com"
                  className="form-input"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="form-section">
              <h3>Social Media</h3>
              <div className="form-group">
                <label>
                  <FiFacebook className="input-icon" />
                  Facebook
                </label>
                <input
                  type="url"
                  name="contactDetails.socialMedia.facebook"
                  data-social="facebook"
                  value={formData.contactDetails.socialMedia.facebook}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/yourpage"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  <FiInstagram className="input-icon" />
                  Instagram
                </label>
                <input
                  type="url"
                  name="contactDetails.socialMedia.instagram"
                  data-social="instagram"
                  value={formData.contactDetails.socialMedia.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/yourpage"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  <FiTwitter className="input-icon" />
                  Twitter
                </label>
                <input
                  type="url"
                  name="contactDetails.socialMedia.twitter"
                  data-social="twitter"
                  value={formData.contactDetails.socialMedia.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/yourpage"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  <FiLinkedin className="input-icon" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="contactDetails.socialMedia.linkedin"
                  data-social="linkedin"
                  value={formData.contactDetails.socialMedia.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/company/yourpage"
                  className="form-input"
                />
              </div>
            </div>

            {/* Company Address */}
            <div className="form-section full-width">
              <h3>
                <FaMapMarkerAlt className="section-icon" />
                Company Address <span className="required">*</span>
              </h3>
              <div className="address-grid">
                <div className="form-group">
                  <label>Street Address <span className="required">*</span></label>
                  <input
                    type="text"
                    name="companyAddress.street"
                    value={formData.companyAddress.street}
                    onChange={handleInputChange}
                    placeholder="123 Business St"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>City <span className="required">*</span></label>
                  <input
                    type="text"
                    name="companyAddress.city"
                    value={formData.companyAddress.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>State <span className="required">*</span></label>
                  <input
                    type="text"
                    name="companyAddress.state"
                    value={formData.companyAddress.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Zip Code <span className="required">*</span></label>
                  <input
                    type="text"
                    name="companyAddress.zipCode"
                    value={formData.companyAddress.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Country <span className="required">*</span></label>
                  <input
                    type="text"
                    name="companyAddress.country"
                    value={formData.companyAddress.country}
                    onChange={handleInputChange}
                    placeholder="United States"
                    required
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Company Logo */}
            <div className="form-section full-width">
              <h3>
                <FaImage className="section-icon" />
                Company Logo <span className="required">*</span>
              </h3>
              <div className="logo-upload-container">
                <div className="logo-preview">
                  {previewImage ? (
                    <img src={previewImage} alt="Company Logo" />
                  ) : (
                    <div className="logo-placeholder">
                      <FaImage size={48} />
                      <span>Upload Logo</span>
                    </div>
                  )}
                </div>
                <div className="upload-button-wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                    className="file-input"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="upload-button">
                    Choose Logo Image
                  </label>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="form-section full-width">
              <h3>
                <FaBriefcase className="section-icon" />
                Product Details <span className="required">*</span>
              </h3>
              <div className="form-group">
                <textarea
                  name="productDetails"
                  value={formData.productDetails}
                  onChange={handleInputChange}
                  placeholder="Describe your products and services in detail..."
                  required
                  className="form-textarea"
                  rows="4"
                />
              </div>
            </div>

            {/* Business Bio */}
            <div className="form-section full-width">
              <h3>
                <FaInfoCircle className="section-icon" />
                Business Bio <span className="required">*</span>
              </h3>
              <div className="form-group">
                <textarea
                  name="businessBio"
                  value={formData.businessBio}
                  onChange={handleInputChange}
                  placeholder="Tell us about your business story, mission, and values..."
                  required
                  className="form-textarea"
                  rows="4"
                />
              </div>
            </div>

            {/* Category */}
            <div className="form-group full-width">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="retail">Retail</option>
                <option value="restaurant">Restaurant</option>
                <option value="service">Service</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Creating...' : 'Create Profile & Generate QR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfile;