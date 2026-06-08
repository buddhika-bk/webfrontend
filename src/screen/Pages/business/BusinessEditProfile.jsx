import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './BusinessEditProfile.css';

const BusinessEditProfile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    businessDetails: {
      companyName:    user?.businessDetails?.companyName    || '',
      contactPerson:  user?.businessDetails?.contactPerson  || '',
      businessPhone:  user?.businessDetails?.businessPhone  || '',
      industry:       user?.businessDetails?.industry       || '',
      website:        user?.businessDetails?.website        || '',
      businessAddress: {
        street:  user?.businessDetails?.businessAddress?.street  || '',
        city:    user?.businessDetails?.businessAddress?.city    || '',
        country: user?.businessDetails?.businessAddress?.country || '',
        zipCode: user?.businessDetails?.businessAddress?.zipCode || '',
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        businessDetails: {
          ...prev.businessDetails,
          businessAddress: { ...prev.businessDetails.businessAddress, [field]: value },
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        businessDetails: { ...prev.businessDetails, [name]: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const result = await updateProfile(formData);
    setMessage(result.success
      ? { type: 'success', text: 'Business profile updated successfully!' }
      : { type: 'error',   text: result.error });
    setLoading(false);
    setTimeout(() => setMessage(''), 3500);
  };

  return (
    <div className="bep-root">
      {message && (
        <div className={`bep-alert bep-alert--${message.type}`}>
          <span>{message.type === 'success' ? '✓' : '✕'}</span>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bep-form">

        {/* Company Info */}
        <div className="bep-section">
          <div className="bep-section-head">
            <span className="bep-section-icon">🏢</span>
            <div>
              <h3 className="bep-section-title">Company Information</h3>
              <p className="bep-section-sub">Your business identity and contact details</p>
            </div>
          </div>
          <div className="bep-fields">
            <div className="bep-field">
              <label>Company Name</label>
              <div className="bep-input-wrap">
                <span className="bep-input-icon">🏢</span>
                <input type="text" name="companyName"
                  value={formData.businessDetails.companyName}
                  onChange={handleChange} required placeholder="Your Company Ltd." />
              </div>
            </div>
            <div className="bep-field">
              <label>Contact Person</label>
              <div className="bep-input-wrap">
                <span className="bep-input-icon">👤</span>
                <input type="text" name="contactPerson"
                  value={formData.businessDetails.contactPerson}
                  onChange={handleChange} required placeholder="Full Name" />
              </div>
            </div>
            <div className="bep-row">
              <div className="bep-field">
                <label>Business Phone</label>
                <div className="bep-input-wrap">
                  <span className="bep-input-icon">📞</span>
                  <input type="tel" name="businessPhone"
                    value={formData.businessDetails.businessPhone}
                    onChange={handleChange} placeholder="+94 XX XXX XXXX" />
                </div>
              </div>
              <div className="bep-field">
                <label>Industry</label>
                <div className="bep-input-wrap">
                  <span className="bep-input-icon">🏭</span>
                  <select name="industry"
                    value={formData.businessDetails.industry}
                    onChange={handleChange} className="bep-select">
                    <option value="">Select Industry</option>
                    <option value="technology">Technology</option>
                    <option value="retail">Retail</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="services">Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bep-field">
              <label>Website</label>
              <div className="bep-input-wrap">
                <span className="bep-input-icon">🌐</span>
                <input type="url" name="website"
                  value={formData.businessDetails.website}
                  onChange={handleChange} placeholder="https://yourcompany.com" />
              </div>
            </div>
          </div>
        </div>

        {/* Business Address */}
        <div className="bep-section">
          <div className="bep-section-head">
            <span className="bep-section-icon">📍</span>
            <div>
              <h3 className="bep-section-title">Business Address</h3>
              <p className="bep-section-sub">Your company's physical location</p>
            </div>
          </div>
          <div className="bep-fields">
            <div className="bep-field">
              <label>Street Address</label>
              <div className="bep-input-wrap">
                <span className="bep-input-icon">📍</span>
                <input type="text" name="address.street"
                  value={formData.businessDetails.businessAddress.street}
                  onChange={handleChange} placeholder="123 Business Park" />
              </div>
            </div>
            <div className="bep-row">
              <div className="bep-field">
                <label>City</label>
                <div className="bep-input-wrap">
                  <span className="bep-input-icon">🏙</span>
                  <input type="text" name="address.city"
                    value={formData.businessDetails.businessAddress.city}
                    onChange={handleChange} placeholder="Colombo" />
                </div>
              </div>
              <div className="bep-field">
                <label>ZIP Code</label>
                <div className="bep-input-wrap">
                  <span className="bep-input-icon">📮</span>
                  <input type="text" name="address.zipCode"
                    value={formData.businessDetails.businessAddress.zipCode}
                    onChange={handleChange} placeholder="00100" />
                </div>
              </div>
            </div>
            <div className="bep-field">
              <label>Country</label>
              <div className="bep-input-wrap">
                <span className="bep-input-icon">🌍</span>
                <input type="text" name="address.country"
                  value={formData.businessDetails.businessAddress.country}
                  onChange={handleChange} placeholder="Sri Lanka" />
              </div>
            </div>
          </div>
        </div>

        <div className="bep-footer">
          <button type="submit" className="bep-save-btn" disabled={loading}>
            {loading
              ? <><span className="bep-spinner" /> Saving…</>
              : <><span>✓</span> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessEditProfile;