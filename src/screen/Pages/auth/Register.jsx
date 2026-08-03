import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import '../auth/Login.css'; // shared auth CSS
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  const [userType, setUserType] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    personalDetails: { firstName: '', lastName: '', phoneNumber: '' },
    businessDetails: { companyName: '', contactPerson: '', businessPhone: '', industry: '' }
  });

  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section) {
      setFormData(prev => ({ ...prev, [section]: { ...prev[section], [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert('Passwords do not match');
    if (formData.password.length < 6) return alert('Password must be at least 6 characters');

    setLoading(true);
    const submitData = {
      email: formData.email,
      password: formData.password,
      userType,
      ...(userType === 'personal'
        ? { personalDetails: formData.personalDetails }
        : { businessDetails: formData.businessDetails })
    };

    const result = await register(submitData);
    if (result.success) {
      navigate(userType === 'personal' ? '/personal/dashboard' : '/business/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        {/* Left Panel */}
        <div className="auth-panel-left">
          <div className="auth-brand">
            <div className="auth-brand-icon">⚡</div>
            <h2>WebPoint Lanka (PVT) Ltd</h2>
            <p>Create your account and get started in minutes</p>
          </div>
          <div className="auth-features">
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Personal or Business accounts</span>
            </div>
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Full dashboard access from day one</span>
            </div>
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Free to get started</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="auth-panel-right register-panel-right">
          <div className="auth-form-box register-form-box">
            <div className="auth-form-header">
              <h1>Create Account</h1>
              <p>Join WebPoint Lanka (PVT) Ltd today</p>
            </div>

            {/* Type Selector */}
            <div className="reg-type-selector">
              <button
                type="button"
                className={`reg-type-btn ${userType === 'personal' ? 'active' : ''}`}
                onClick={() => setUserType('personal')}
              >
                <span>👤</span> Personal
              </button>
              <button
                type="button"
                className={`reg-type-btn ${userType === 'business' ? 'active' : ''}`}
                onClick={() => setUserType('business')}
              >
                <span>🏢</span> Business
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label>Email Address</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">✉</span>
                  <input type="email" name="email" value={formData.email}
                    onChange={handleChange} required placeholder="you@example.com" />
                </div>
              </div>

              {userType === 'personal' && (
                <>
                  <div className="reg-row">
                    <div className="auth-field">
                      <label>First Name</label>
                      <div className="auth-input-wrap">
                        <span className="auth-input-icon">👤</span>
                        <input type="text" name="firstName"
                          value={formData.personalDetails.firstName}
                          onChange={(e) => handleChange(e, 'personalDetails')}
                          required placeholder="John" />
                      </div>
                    </div>
                    <div className="auth-field">
                      <label>Last Name</label>
                      <div className="auth-input-wrap">
                        <span className="auth-input-icon">👤</span>
                        <input type="text" name="lastName"
                          value={formData.personalDetails.lastName}
                          onChange={(e) => handleChange(e, 'personalDetails')}
                          required placeholder="Doe" />
                      </div>
                    </div>
                  </div>
                  <div className="auth-field">
                    <label>Phone Number</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">📞</span>
                      <input type="tel" name="phoneNumber"
                        value={formData.personalDetails.phoneNumber}
                        onChange={(e) => handleChange(e, 'personalDetails')}
                        placeholder="+94 XX XXX XXXX" />
                    </div>
                  </div>
                </>
              )}

              {userType === 'business' && (
                <>
                  <div className="auth-field">
                    <label>Company Name</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">🏢</span>
                      <input type="text" name="companyName"
                        value={formData.businessDetails.companyName}
                        onChange={(e) => handleChange(e, 'businessDetails')}
                        required placeholder="Your Company Ltd." />
                    </div>
                  </div>
                  <div className="auth-field">
                    <label>Contact Person</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">👤</span>
                      <input type="text" name="contactPerson"
                        value={formData.businessDetails.contactPerson}
                        onChange={(e) => handleChange(e, 'businessDetails')}
                        required placeholder="Full Name" />
                    </div>
                  </div>
                  <div className="reg-row">
                    <div className="auth-field">
                      <label>Business Phone</label>
                      <div className="auth-input-wrap">
                        <span className="auth-input-icon">📞</span>
                        <input type="tel" name="businessPhone"
                          value={formData.businessDetails.businessPhone}
                          onChange={(e) => handleChange(e, 'businessDetails')}
                          placeholder="+94 XX XXX XXXX" />
                      </div>
                    </div>
                    <div className="auth-field">
                      <label>Industry</label>
                      <div className="auth-input-wrap">
                        <span className="auth-input-icon">🏭</span>
                        <select name="industry"
                          value={formData.businessDetails.industry}
                          onChange={(e) => handleChange(e, 'businessDetails')}
                          className="auth-select">
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
                </>
              )}

              <div className="reg-row">
                <div className="auth-field">
                  <label>Password</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">🔒</span>
                    <input type="password" name="password" value={formData.password}
                      onChange={handleChange} required placeholder="Min 6 characters" />
                  </div>
                </div>
                <div className="auth-field">
                  <label>Confirm Password</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">🔒</span>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword}
                      onChange={handleChange} required placeholder="Repeat password" />
                  </div>
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner"></span> : 'Create Account'}
              </button>

              <p className="auth-switch">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;