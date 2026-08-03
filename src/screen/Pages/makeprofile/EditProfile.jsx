import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css';
import { FaStore, FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaImage, FaInfoCircle, FaBriefcase } from 'react-icons/fa';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/qrprofiles/${id}`);
      if (response.data.success) {
        const profile = response.data.data;
        setFormData({
          businessName: profile.businessName || '',
          contactDetails: {
            phone: profile.contactDetails?.phone || '',
            email: profile.contactDetails?.email || '',
            website: profile.contactDetails?.website || '',
            socialMedia: {
              facebook: profile.contactDetails?.socialMedia?.facebook || '',
              instagram: profile.contactDetails?.socialMedia?.instagram || '',
              twitter: profile.contactDetails?.socialMedia?.twitter || '',
              linkedin: profile.contactDetails?.socialMedia?.linkedin || ''
            }
          },
          companyAddress: {
            street: profile.companyAddress?.street || '',
            city: profile.companyAddress?.city || '',
            state: profile.companyAddress?.state || '',
            zipCode: profile.companyAddress?.zipCode || '',
            country: profile.companyAddress?.country || ''
          },
          companyLogo: profile.companyLogo || '',
          productDetails: profile.productDetails || '',
          businessBio: profile.businessBio || '',
          category: profile.category || 'other'
        });
        setPreviewImage(profile.companyLogo || null);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Failed to fetch profile details');
    } finally {
      setLoading(false);
    }
  };

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
    setSubmitting(true);

    try {
      const response = await axios.put(`http://localhost:3000/api/qrprofiles/${id}`, formData);
      
      if (response.data.success) {
        alert('Profile updated successfully!');
        navigate(`/profile/${id}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-wrapper">
        <div className="edit-profile-header">
          <h1>Edit QR Profile</h1>
          <p>Update your business information</p>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
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
                    className="file-input"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="upload-button">
                    Change Logo
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
            <button type="button" onClick={() => navigate(`/profile/${id}`)} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn-submit">
              {submitting ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;