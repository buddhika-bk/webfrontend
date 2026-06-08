import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userAPI } from '../../services/api';
import '../auth/Login.css';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await userAPI.forgotPassword(email);
      setSubmitted(true);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to send reset email' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-panel-left">
          <div className="auth-brand">
            <div className="auth-brand-icon">🔒</div>
            <h2>Account Recovery</h2>
            <p>We'll help you get back into your account safely</p>
          </div>
          <div className="auth-features">
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Secure password reset link</span>
            </div>
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Link expires in 1 hour for safety</span>
            </div>
            <div className="auth-feature-item">
              <span className="feature-check">✓</span>
              <span>Check spam if email doesn't arrive</span>
            </div>
          </div>
        </div>

        <div className="auth-panel-right">
          <div className="auth-form-box">
            {submitted ? (
              <div className="auth-success-box">
                <span className="auth-success-icon">📬</span>
                <h2>Check Your Inbox</h2>
                <p>We sent a reset link to</p>
                <strong>{email}</strong>
                <p style={{marginTop: '12px', color: '#64748b', fontSize: '0.9rem'}}>
                  Follow the link in the email to reset your password. Check your spam folder if you don't see it.
                </p>
                <Link to="/login" className="auth-back-link">Back to Login</Link>
              </div>
            ) : (
              <>
                <div className="auth-form-header">
                  <h1>Forgot Password?</h1>
                  <p>Enter your email and we'll send you a reset link</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                  <div className="auth-field">
                    <label>Email Address</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">✉</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {message && <div className="auth-error">{message.text}</div>}

                  <button type="submit" className="auth-submit-btn" disabled={loading}>
                    {loading ? <span className="auth-spinner"></span> : 'Send Reset Link'}
                  </button>

                  <p className="auth-switch">
                    Remembered it? <Link to="/login">Back to Login</Link>
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

export default ForgotPassword;