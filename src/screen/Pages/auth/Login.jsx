import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="auth-page">
      <div className="auth-split">
        {/* Left Panel */}
        <div className="auth-panel-left">
          <div className="auth-brand">
            <div className="auth-brand-icon">⚡</div>
            <h2>WebPoint Lanka (PVT) Ltd</h2>
            <p>The smart way to manage your business online</p>
          </div>
          <div className="auth-features">
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Manage personal & business accounts</span>
            </div>
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Digital solutions for your brand</span>
            </div>
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Secure & fast access anytime</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="auth-panel-right">
          <div className="auth-form-box">
            <div className="auth-form-header">
              <h1>Welcome back</h1>
              <p>Sign in to continue to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label>Email Address</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">✉</span>
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

              <div className="auth-field">
                <div className="auth-label-row">
                  <label>Password</label>
                  <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
                </div>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">🔒</span>
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
                    className="auth-toggle-pw"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner"></span> : 'Sign In'}
              </button>

              <div className="auth-divider"><span>or</span></div>

              <p className="auth-switch">
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