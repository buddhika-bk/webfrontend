import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './EditProfile.css';

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName:   user?.personalDetails?.firstName   || '',
      lastName:    user?.personalDetails?.lastName    || '',
      phoneNumber: user?.personalDetails?.phoneNumber || '',
      address: {
        street:  user?.personalDetails?.address?.street  || '',
        city:    user?.personalDetails?.address?.city    || '',
        country: user?.personalDetails?.address?.country || '',
        zipCode: user?.personalDetails?.address?.zipCode || '',
      },
    },
    profile: {
      preferences: {
        language: user?.profile?.preferences?.language || 'en',
        timezone: user?.profile?.preferences?.timezone || 'Asia/Colombo',
        notifications: {
          email: user?.profile?.preferences?.notifications?.email !== false,
          sms:   user?.profile?.preferences?.notifications?.sms || false,
        },
      },
    },
  });

  const handleChange = (e, section, subSection = null) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (section === 'personalDetails' && name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          address: { ...prev.personalDetails.address, [field]: val },
        },
      }));
    } else if (subSection) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subSection]: { ...prev[section][subSection], [name]: val },
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [name]: val },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const result = await updateProfile(formData);
    setMessage(result.success
      ? { type: 'success', text: 'Profile updated successfully!' }
      : { type: 'error', text: result.error });
    setLoading(false);
    setTimeout(() => setMessage(''), 3500);
  };

  return (
    <div className="ep-root">
      {message && (
        <div className={`ep-alert ep-alert--${message.type}`}>
          <span className="ep-alert-icon">{message.type === 'success' ? '✓' : '✕'}</span>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="ep-form">
        {/* Personal */}
        <div className="ep-section">
          <div className="ep-section-head">
            <span className="ep-section-icon">👤</span>
            <div>
              <h3 className="ep-section-title">Personal Information</h3>
              <p className="ep-section-sub">Your name and contact details</p>
            </div>
          </div>
          <div className="ep-fields">
            <div className="ep-row">
              <div className="ep-field">
                <label>First Name</label>
                <input type="text" name="firstName"
                  value={formData.personalDetails.firstName}
                  onChange={e => handleChange(e, 'personalDetails')}
                  placeholder="John" />
              </div>
              <div className="ep-field">
                <label>Last Name</label>
                <input type="text" name="lastName"
                  value={formData.personalDetails.lastName}
                  onChange={e => handleChange(e, 'personalDetails')}
                  placeholder="Doe" />
              </div>
            </div>
            <div className="ep-field">
              <label>Phone Number</label>
              <input type="tel" name="phoneNumber"
                value={formData.personalDetails.phoneNumber}
                onChange={e => handleChange(e, 'personalDetails')}
                placeholder="+94 XX XXX XXXX" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="ep-section">
          <div className="ep-section-head">
            <span className="ep-section-icon">📍</span>
            <div>
              <h3 className="ep-section-title">Address</h3>
              <p className="ep-section-sub">Your location information</p>
            </div>
          </div>
          <div className="ep-fields">
            <div className="ep-field">
              <label>Street Address</label>
              <input type="text" name="address.street"
                value={formData.personalDetails.address.street}
                onChange={e => handleChange(e, 'personalDetails')}
                placeholder="123 Main Street" />
            </div>
            <div className="ep-row">
              <div className="ep-field">
                <label>City</label>
                <input type="text" name="address.city"
                  value={formData.personalDetails.address.city}
                  onChange={e => handleChange(e, 'personalDetails')}
                  placeholder="Colombo" />
              </div>
              <div className="ep-field">
                <label>ZIP Code</label>
                <input type="text" name="address.zipCode"
                  value={formData.personalDetails.address.zipCode}
                  onChange={e => handleChange(e, 'personalDetails')}
                  placeholder="00100" />
              </div>
            </div>
            <div className="ep-field">
              <label>Country</label>
              <input type="text" name="address.country"
                value={formData.personalDetails.address.country}
                onChange={e => handleChange(e, 'personalDetails')}
                placeholder="Sri Lanka" />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="ep-section">
          <div className="ep-section-head">
            <span className="ep-section-icon">⚙️</span>
            <div>
              <h3 className="ep-section-title">Preferences</h3>
              <p className="ep-section-sub">Language, timezone & notifications</p>
            </div>
          </div>
          <div className="ep-fields">
            <div className="ep-row">
              <div className="ep-field">
                <label>Language</label>
                <select name="language"
                  value={formData.profile.preferences.language}
                  onChange={e => handleChange(e, 'profile', 'preferences')}>
                  <option value="en">English</option>
                  <option value="si">Sinhala</option>
                  <option value="ta">Tamil</option>
                </select>
              </div>
              <div className="ep-field">
                <label>Timezone</label>
                <select name="timezone"
                  value={formData.profile.preferences.timezone}
                  onChange={e => handleChange(e, 'profile', 'preferences')}>
                  <option value="Asia/Colombo">Asia/Colombo</option>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="Asia/Dubai">Asia/Dubai</option>
                </select>
              </div>
            </div>

            <div className="ep-toggles">
              <label className="ep-toggle-row">
                <div className="ep-toggle-info">
                  <span className="ep-toggle-title">Email Notifications</span>
                  <span className="ep-toggle-desc">Receive updates via email</span>
                </div>
                <label className="ep-switch">
                  <input type="checkbox" name="email"
                    checked={formData.profile.preferences.notifications.email}
                    onChange={e => handleChange(e, 'profile', 'preferences')} />
                  <span className="ep-switch-track" />
                </label>
              </label>
              <label className="ep-toggle-row">
                <div className="ep-toggle-info">
                  <span className="ep-toggle-title">SMS Notifications</span>
                  <span className="ep-toggle-desc">Receive updates via text message</span>
                </div>
                <label className="ep-switch">
                  <input type="checkbox" name="sms"
                    checked={formData.profile.preferences.notifications.sms}
                    onChange={e => handleChange(e, 'profile', 'preferences')} />
                  <span className="ep-switch-track" />
                </label>
              </label>
            </div>
          </div>
        </div>

        <div className="ep-footer">
          <button type="submit" className="ep-save-btn" disabled={loading}>
            {loading
              ? <><span className="ep-spinner" /> Saving…</>
              : <><span>✓</span> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;