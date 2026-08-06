import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './Auth.module.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  const [userType, setUserType] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    personalDetails: { firstName: '', lastName: '', phoneNumber: '' },
    businessDetails: { companyName: '', contactPerson: '', businessPhone: '', industry: '' }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className={styles.authPage}>
      
      <div className={styles.authSplit}>
        {/* Left Panel - Branding */}
        <div className={styles.authPanelLeft}>
          <div className={styles.authBrand}>
            <div className={styles.authBrandIcon}>◆</div>
            <h2>WebPoint Lanka (PVT) Ltd</h2>
            <p>Create your account and get started in minutes</p>
          </div>
          <div className={styles.authFeatures}>
            <div className={styles.authFeatureItem}>
              <span className={styles.featureCheck}>✓</span>
              <span>Personal or Business accounts</span>
            </div>
            <div className={styles.authFeatureItem}>
              <span className={styles.featureCheck}>✓</span>
              <span>Full dashboard access from day one</span>
            </div>
            <div className={styles.authFeatureItem}>
              <span className={styles.featureCheck}>✓</span>
              <span>Free to get started</span>
            </div>
          </div>
          <div className={styles.authTrustBadges}>
            <span>⚡ 24/7 Support</span>
            <span>🔒 Secure Login</span>
            <span>⭐ 100% Satisfaction</span>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className={styles.authPanelRight}>
          <div className={styles.authFormBox}>
            <div className={styles.authFormHeader}>
              <div className={styles.authBadge}>
                <span>✦ Create Account</span>
              </div>
              <h1>Join WebPoint Lanka</h1>
              <p>Start your digital journey today</p>
            </div>

            {/* Type Selector */}
            <div className={styles.regTypeSelector}>
              <button
                type="button"
                className={`${styles.regTypeBtn} ${userType === 'personal' ? styles.active : ''}`}
                onClick={() => setUserType('personal')}
              >
                <span>👤</span> Personal
              </button>
              <button
                type="button"
                className={`${styles.regTypeBtn} ${userType === 'business' ? styles.active : ''}`}
                onClick={() => setUserType('business')}
              >
                <span>🏢</span> Business
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div className={styles.authField}>
                <label>Email Address</label>
                <div className={styles.authInputWrap}>
                  <span className={styles.authInputIcon}>✉</span>
                  <input type="email" name="email" value={formData.email}
                    onChange={handleChange} required placeholder="you@example.com" />
                </div>
              </div>

              {userType === 'personal' && (
                <>
                  <div className={styles.regRow}>
                    <div className={styles.authField}>
                      <label>First Name</label>
                      <div className={styles.authInputWrap}>
                        <span className={styles.authInputIcon}>👤</span>
                        <input type="text" name="firstName"
                          value={formData.personalDetails.firstName}
                          onChange={(e) => handleChange(e, 'personalDetails')}
                          required placeholder="John" />
                      </div>
                    </div>
                    <div className={styles.authField}>
                      <label>Last Name</label>
                      <div className={styles.authInputWrap}>
                        <span className={styles.authInputIcon}>👤</span>
                        <input type="text" name="lastName"
                          value={formData.personalDetails.lastName}
                          onChange={(e) => handleChange(e, 'personalDetails')}
                          required placeholder="Doe" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.authField}>
                    <label>Phone Number</label>
                    <div className={styles.authInputWrap}>
                      <span className={styles.authInputIcon}>📞</span>
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
                  <div className={styles.authField}>
                    <label>Company Name</label>
                    <div className={styles.authInputWrap}>
                      <span className={styles.authInputIcon}>🏢</span>
                      <input type="text" name="companyName"
                        value={formData.businessDetails.companyName}
                        onChange={(e) => handleChange(e, 'businessDetails')}
                        required placeholder="Your Company Ltd." />
                    </div>
                  </div>
                  <div className={styles.authField}>
                    <label>Contact Person</label>
                    <div className={styles.authInputWrap}>
                      <span className={styles.authInputIcon}>👤</span>
                      <input type="text" name="contactPerson"
                        value={formData.businessDetails.contactPerson}
                        onChange={(e) => handleChange(e, 'businessDetails')}
                        required placeholder="Full Name" />
                    </div>
                  </div>
                  <div className={styles.regRow}>
                    <div className={styles.authField}>
                      <label>Business Phone</label>
                      <div className={styles.authInputWrap}>
                        <span className={styles.authInputIcon}>📞</span>
                        <input type="tel" name="businessPhone"
                          value={formData.businessDetails.businessPhone}
                          onChange={(e) => handleChange(e, 'businessDetails')}
                          placeholder="+94 XX XXX XXXX" />
                      </div>
                    </div>
                    <div className={styles.authField}>
                      <label>Industry</label>
                      <div className={styles.authInputWrap}>
                        <span className={styles.authInputIcon}>🏭</span>
                        <select name="industry"
                          value={formData.businessDetails.industry}
                          onChange={(e) => handleChange(e, 'businessDetails')}
                          className={styles.authSelect}>
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

              <div className={styles.regRow}>
                <div className={styles.authField}>
                  <label>Password</label>
                  <div className={styles.authInputWrap}>
                    <span className={styles.authInputIcon}>🔒</span>
                    <input type="password" name="password" value={formData.password}
                      onChange={handleChange} required placeholder="Min 6 characters" />
                  </div>
                </div>
                <div className={styles.authField}>
                  <label>Confirm Password</label>
                  <div className={styles.authInputWrap}>
                    <span className={styles.authInputIcon}>🔒</span>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword}
                      onChange={handleChange} required placeholder="Repeat password" />
                  </div>
                </div>
              </div>

              {error && <div className={styles.authError}>{error}</div>}

              <button type="submit" className={styles.authSubmitBtn} disabled={loading}>
                {loading ? <span className={styles.authSpinner}></span> : 'Create Account'}
              </button>

              <p className={styles.authSwitch}>
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