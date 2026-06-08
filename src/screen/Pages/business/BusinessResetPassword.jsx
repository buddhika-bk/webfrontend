import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './BusinessResetPassword.css';

const BusinessResetPassword = () => {
  const { updatePassword } = useAuth();
  const [loading, setLoading]   = useState(false);
  const [message, setMessage]   = useState('');
  const [showPw, setShowPw]     = useState({ cur: false, nw: false, cf: false });
  const [formData, setFormData] = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const toggle = key => setShowPw(p => ({ ...p, [key]: !p[key] }));

  const strength = (pw) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 6)  s++;
    if (pw.length >= 10) s++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
    if (/\d/.test(pw))   s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const pwStr   = strength(formData.newPassword);
  const strLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][pwStr];
  const strColor = ['', '#ef4444', '#f59e0b', '#10b981', '#0ea5e9', '#0369a1'][pwStr];

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword)
      return setMessage({ type: 'error', text: 'New passwords do not match' });
    if (formData.newPassword.length < 6)
      return setMessage({ type: 'error', text: 'Password must be at least 6 characters' });

    setLoading(true); setMessage('');
    const result = await updatePassword(formData.currentPassword, formData.newPassword);
    setMessage(result.success
      ? { type: 'success', text: 'Password updated successfully!' }
      : { type: 'error',   text: result.error });
    if (result.success) setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setLoading(false);
    setTimeout(() => setMessage(''), 3500);
  };

  const Field = ({ label, name, pwKey, value }) => (
    <div className="brp-field">
      <label>{label}</label>
      <div className="brp-input-wrap">
        <span className="brp-input-icon">🔒</span>
        <input
          type={showPw[pwKey] ? 'text' : 'password'}
          name={name} value={value} onChange={handleChange}
          required placeholder="••••••••"
        />
        <button type="button" className="brp-eye" onClick={() => toggle(pwKey)}>
          {showPw[pwKey] ? '🙈' : '👁'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="brp-root">
      <div className="brp-card">
        <div className="brp-card-head">
          <div className="brp-head-icon">⚿</div>
          <div>
            <h2 className="brp-head-title">Change Password</h2>
            <p className="brp-head-sub">Keep your business account secure</p>
          </div>
        </div>

        {message && (
          <div className={`brp-alert brp-alert--${message.type}`}>
            <span>{message.type === 'success' ? '✓' : '✕'}</span>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="brp-form">
          <Field label="Current Password"      name="currentPassword"  pwKey="cur" value={formData.currentPassword} />
          <div className="brp-divider" />
          <Field label="New Password"           name="newPassword"      pwKey="nw"  value={formData.newPassword} />

          {formData.newPassword && (
            <div className="brp-strength">
              <div className="brp-strength-bar">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="brp-strength-seg"
                    style={{ background: i <= pwStr ? strColor : '#e2e8f0' }} />
                ))}
              </div>
              <span className="brp-strength-label" style={{ color: strColor }}>{strLabel}</span>
            </div>
          )}

          <Field label="Confirm New Password"   name="confirmPassword"  pwKey="cf"  value={formData.confirmPassword} />

          <div className="brp-tips">
            {[
              { rule: formData.newPassword.length >= 6, text: 'At least 6 characters' },
              { rule: /[A-Z]/.test(formData.newPassword) && /[a-z]/.test(formData.newPassword), text: 'Uppercase & lowercase letters' },
              { rule: /\d/.test(formData.newPassword), text: 'At least one number' },
              { rule: /[^A-Za-z0-9]/.test(formData.newPassword), text: 'At least one special character' },
            ].map((r, i) => (
              <div key={i} className={`brp-tip ${r.rule ? 'met' : ''}`}>
                <span className="brp-tip-dot" />
                {r.text}
              </div>
            ))}
          </div>

          <div className="brp-security-box">
            <span className="brp-security-icon">🔐</span>
            <div className="brp-security-tips">
              <p className="brp-security-title">Security Tips</p>
              {['Never share your password', 'Use a unique password for each account', 'Change password regularly'].map((t, i) => (
                <p key={i} className="brp-security-tip">✓ {t}</p>
              ))}
            </div>
          </div>

          <button type="submit" className="brp-submit-btn" disabled={loading}>
            {loading ? <><span className="brp-spinner" /> Updating…</> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessResetPassword;