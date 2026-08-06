import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './Auth.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData.email, formData.password);
    if (result.success) {
      const userType = result.user.userType;
      if (userType === 'personal') navigate('/personal/dashboard');
      else if (userType === 'business') navigate('/business/dashboard');
      else if (userType === 'admin') navigate('/admin/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className={styles.authPage}>
      {/* Navigation Bar - Matching Home Page */}
      

      <div className={styles.authSplit}>
        {/* Left Panel - Branding */}
        <div className={styles.authPanelLeft}>
          <div className={styles.authBrand}>
            <div className={styles.authBrandIcon}>◆</div>
            <h2>WebPoint Lanka (PVT) Ltd</h2>
            <p>The smart way to manage your business online</p>
          </div>
          <div className={styles.authFeatures}>
            <div className={styles.authFeatureItem}>
              <span className={styles.featureCheck}>✓</span>
              <span>Manage personal & business accounts</span>
            </div>
            <div className={styles.authFeatureItem}>
              <span className={styles.featureCheck}>✓</span>
              <span>Digital solutions for your brand</span>
            </div>
            <div className={styles.authFeatureItem}>
              <span className={styles.featureCheck}>✓</span>
              <span>Secure & fast access anytime</span>
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
                <span>✦ Welcome Back</span>
              </div>
              <h1>Sign In to Your Account</h1>
              <p>Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div className={styles.authField}>
                <label>Email Address</label>
                <div className={styles.authInputWrap}>
                  <span className={styles.authInputIcon}>✉</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className={styles.authField}>
                <div className={styles.authLabelRow}>
                  <label>Password</label>
                  <Link to="/forgot-password" className={styles.authForgot}>Forgot password?</Link>
                </div>
                <div className={styles.authInputWrap}>
                  <span className={styles.authInputIcon}>🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className={styles.authTogglePw}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              {error && <div className={styles.authError}>{error}</div>}

              <button type="submit" className={styles.authSubmitBtn} disabled={loading}>
                {loading ? <span className={styles.authSpinner}></span> : 'Sign In'}
              </button>

              <div className={styles.authDivider}><span>or</span></div>

              <p className={styles.authSwitch}>
                Don't have an account? <Link to="/register">Create one free</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;