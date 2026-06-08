import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { userAPI } from '../../services/api';
import '../auth/Login.css';
import './ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setMessage({ type: 'error', text: 'Passwords do not match' });
    }
    if (formData.password.length < 6) {
      return setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
    }
    setLoading(true);
    setMessage(null);
    try {
      await userAPI.resetPassword(token, formData.password);
      setSubmitted(true);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to reset password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-panel-left">
          <div className="auth-brand">
            <div className="auth-brand-icon">🔐</div>
            <h2>Reset Password</h2>
            <p>Set a new strong password for your account</p>
          </div>
          <div className="auth-features">
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Use at least 6 characters</span>
            </div>
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Mix letters, numbers & symbols</span>
            </div>
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Don't reuse old passwords</span>
            </div>
          </div>
        </div>

        <div className="auth-panel-right">
          <div className="auth-form-box">
            {submitted ? (
              <div className="auth-success-box">
                <span className="auth-success-icon">✅</span>
                <h2>Password Reset!</h2>
                <p>Your password has been successfully updated.</p>
                <p style={{color: '#64748b', fontSize: '0.9rem', marginTop: '8px'}}>
                  You can now sign in with your new password.
                </p>
                <Link to="/login" className="auth-back-link">Go to Login</Link>
              </div>
            ) : (
              <>
                <div className="auth-form-header">
                  <h1>New Password</h1>
                  <p>Enter and confirm your new password below</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                  <div className="auth-field">
                    <label>New Password</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">🔒</span>
                      <input
                        type={showPw ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Min 6 characters"
                      />
                      <button type="button" className="auth-toggle-pw" onClick={() => setShowPw(!showPw)}>
                        {showPw ? '🙈' : '👁'}
                      </button>
                    </div>
                  </div>

                  <div className="auth-field">
                    <label>Confirm New Password</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">🔒</span>
                      <input
                        type={showPw ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Repeat new password"
                      />
                    </div>
                  </div>

                  {message && <div className="auth-error">{message.text}</div>}

                  <button type="submit" className="auth-submit-btn" disabled={loading}>
                    {loading ? <span className="auth-spinner"></span> : 'Reset Password'}
                  </button>

                  <p className="auth-switch">
                    <Link to="/login">Back to Login</Link>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;