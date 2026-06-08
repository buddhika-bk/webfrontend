import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
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
    let score = 0;
    if (pw.length >= 6)  score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw))   score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const pwStrength   = strength(formData.newPassword);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][pwStrength];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#10b981', '#0ea5e9', '#0369a1'][pwStrength];

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
    <div className="rp-field">
      <label>{label}</label>
      <div className="rp-input-wrap">
        <input
          type={showPw[pwKey] ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={handleChange}
          required
          placeholder="••••••••"
        />
        <button type="button" className="rp-eye" onClick={() => toggle(pwKey)}>
          {showPw[pwKey] ? '🙈' : '👁'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="rp-root">
      <div className="rp-card">
        <div className="rp-card-head">
          <div className="rp-head-icon">⚿</div>
          <div>
            <h2 className="rp-head-title">Change Password</h2>
            <p className="rp-head-sub">Keep your account secure with a strong password</p>
          </div>
        </div>

        {message && (
          <div className={`rp-alert rp-alert--${message.type}`}>
            <span>{message.type === 'success' ? '✓' : '✕'}</span>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="rp-form">
          <Field label="Current Password"  name="currentPassword"  pwKey="cur" value={formData.currentPassword} />

          <div className="rp-divider" />

          <Field label="New Password"      name="newPassword"      pwKey="nw"  value={formData.newPassword} />

          {/* Strength bar */}
          {formData.newPassword && (
            <div className="rp-strength">
              <div className="rp-strength-bar">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="rp-strength-seg"
                    style={{ background: i <= pwStrength ? strengthColor : '#e2e8f0' }} />
                ))}
              </div>
              <span className="rp-strength-label" style={{ color: strengthColor }}>
                {strengthLabel}
              </span>
            </div>
          )}

          <Field label="Confirm New Password" name="confirmPassword" pwKey="cf" value={formData.confirmPassword} />

          <div className="rp-tips">
            {[
              { rule: formData.newPassword.length >= 6,                    text: 'At least 6 characters' },
              { rule: /[A-Z]/.test(formData.newPassword) && /[a-z]/.test(formData.newPassword), text: 'Uppercase & lowercase letters' },
              { rule: /\d/.test(formData.newPassword),                     text: 'At least one number' },
            ].map((r, i) => (
              <div key={i} className={`rp-tip ${r.rule ? 'met' : ''}`}>
                <span className="rp-tip-dot" />
                {r.text}
              </div>
            ))}
          </div>

          <button type="submit" className="rp-submit-btn" disabled={loading}>
            {loading ? <><span className="rp-spinner" /> Updating…</> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;