import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userAPI } from '../../services/api';
import './AdminUserDetails.css';

const AdminUserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    userType: '',
    isActive: true,
    personalDetails: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: {
        street: '',
        city: '',
        country: '',
        zipCode: ''
      }
    },
    businessDetails: {
      companyName: '',
      contactPerson: '',
      businessPhone: '',
      industry: '',
      website: '',
      businessAddress: {
        street: '',
        city: '',
        country: '',
        zipCode: ''
      }
    },
    profile: {
      preferences: {
        language: 'en',
        timezone: 'Asia/Colombo',
        notifications: {
          email: true,
          sms: false
        }
      }
    }
  });

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUserById(id);
      const userData = response.data.user;
      setUser(userData);
      setEditFormData({
        userType: userData.userType,
        isActive: userData.isActive,
        personalDetails: userData.personalDetails || {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: { street: '', city: '', country: '', zipCode: '' }
        },
        businessDetails: userData.businessDetails || {
          companyName: '',
          contactPerson: '',
          businessPhone: '',
          industry: '',
          website: '',
          businessAddress: { street: '', city: '', country: '', zipCode: '' }
        },
        profile: userData.profile || {
          preferences: {
            language: 'en',
            timezone: 'Asia/Colombo',
            notifications: { email: true, sms: false }
          }
        }
      });
    } catch (err) {
      setError('Failed to fetch user details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e, section = null, subSection = null) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (subSection) {
      setEditFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subSection]: {
            ...prev[section][subSection],
            [name]: val
          }
        }
      }));
    } else if (section === 'personalDetails' && name.includes('address.')) {
      const addressField = name.split('.')[1];
      setEditFormData(prev => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          address: {
            ...prev.personalDetails.address,
            [addressField]: val
          }
        }
      }));
    } else if (section === 'businessDetails' && name.includes('address.')) {
      const addressField = name.split('.')[1];
      setEditFormData(prev => ({
        ...prev,
        businessDetails: {
          ...prev.businessDetails,
          businessAddress: {
            ...prev.businessDetails.businessAddress,
            [addressField]: val
          }
        }
      }));
    } else if (section) {
      setEditFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: val
        }
      }));
    } else {
      setEditFormData(prev => ({
        ...prev,
        [name]: val
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updateData = {
        userType: editFormData.userType,
        isActive: editFormData.isActive,
        personalDetails: editFormData.personalDetails,
        businessDetails: editFormData.businessDetails,
        profile: editFormData.profile
      };
      
      await userAPI.updateUser(id, updateData);
      setSuccess('User updated successfully!');
      setIsEditing(false);
      fetchUserDetails();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update user');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    try {
      await userAPI.updateUser(id, { isActive: !user.isActive });
      setSuccess(`User ${!user.isActive ? 'activated' : 'deactivated'} successfully!`);
      fetchUserDetails();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update user status');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm(`Are you sure you want to delete user ${user?.email}? This action cannot be undone.`)) {
      try {
        await userAPI.deleteUser(id);
        setSuccess('User deleted successfully!');
        setTimeout(() => navigate('/admin/users'), 2000);
      } catch (err) {
        setError('Failed to delete user');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && !user) {
    return (
      <div className="admin-user-details">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="admin-user-details">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Error Loading User</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/admin/users')} className="back-btn">
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-user-details">
      <div className="user-details-header">
        <button onClick={() => navigate('/admin/users')} className="back-button">
          ← Back to Users
        </button>
        <h1>User Details</h1>
        <div className="header-actions">
          {!isEditing && (
            <>
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                ✏️ Edit Profile
              </button>
              <button onClick={handleToggleStatus} className={`status-toggle-btn ${user?.isActive ? 'deactivate' : 'activate'}`}>
                {user?.isActive ? '🔒 Deactivate User' : '✅ Activate User'}
              </button>
              <button onClick={handleDeleteUser} className="delete-user-btn">
                🗑️ Delete User
              </button>
            </>
          )}
          {isEditing && (
            <>
              <button onClick={handleSave} className="save-btn" disabled={loading}>
                💾 Save Changes
              </button>
              <button onClick={() => setIsEditing(false)} className="cancel-btn">
                ✕ Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {success && (
        <div className="alert-message success">
          <span>✓</span>
          <span>{success}</span>
        </div>
      )}
      
      {error && (
        <div className="alert-message error">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      <div className="user-details-content">
        {/* User Information Card */}
        <div className="detail-card">
          <div className="card-header">
            <h2>Account Information</h2>
            <div className={`user-status-badge ${user?.isActive ? 'active' : 'inactive'}`}>
              {user?.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
          
          <div className="info-grid">
            <div className="info-item">
              <label>User ID:</label>
              <p>{user?._id}</p>
            </div>
            <div className="info-item">
              <label>Email Address:</label>
              <p>{user?.email}</p>
            </div>
            <div className="info-item">
              <label>User Type:</label>
              {isEditing ? (
                <select
                  name="userType"
                  value={editFormData.userType}
                  onChange={(e) => handleEditChange(e)}
                  className="edit-select"
                >
                  <option value="personal">Personal</option>
                  <option value="business">Business</option>
                  <option value="admin">Admin</option>
                </select>
              ) : (
                <p className={`user-type ${user?.userType}`}>
                  {user?.userType?.charAt(0).toUpperCase() + user?.userType?.slice(1)}
                </p>
              )}
            </div>
            <div className="info-item">
              <label>Email Verified:</label>
              <p>{user?.isEmailVerified ? '✓ Yes' : '✗ No'}</p>
            </div>
            <div className="info-item">
              <label>Member Since:</label>
              <p>{formatDate(user?.createdAt)}</p>
            </div>
            <div className="info-item">
              <label>Last Login:</label>
              <p>{user?.lastLogin ? formatDate(user?.lastLogin) : 'Never'}</p>
            </div>
          </div>
        </div>

        {/* Personal/Business Details Card */}
        {user?.userType === 'personal' && (
          <div className="detail-card">
            <div className="card-header">
              <h2>Personal Information</h2>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>First Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.personalDetails.firstName}
                    onChange={(e) => handleEditChange(e, 'personalDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.personalDetails?.firstName || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>Last Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.personalDetails.lastName}
                    onChange={(e) => handleEditChange(e, 'personalDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.personalDetails?.lastName || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>Phone Number:</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={editFormData.personalDetails.phoneNumber}
                    onChange={(e) => handleEditChange(e, 'personalDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.personalDetails?.phoneNumber || 'Not provided'}</p>
                )}
              </div>
            </div>
            
            <h3 className="sub-section-title">Address</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Street:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.street"
                    value={editFormData.personalDetails.address.street}
                    onChange={(e) => handleEditChange(e, 'personalDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.personalDetails?.address?.street || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>City:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.city"
                    value={editFormData.personalDetails.address.city}
                    onChange={(e) => handleEditChange(e, 'personalDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.personalDetails?.address?.city || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>Country:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.country"
                    value={editFormData.personalDetails.address.country}
                    onChange={(e) => handleEditChange(e, 'personalDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.personalDetails?.address?.country || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>Zip Code:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.zipCode"
                    value={editFormData.personalDetails.address.zipCode}
                    onChange={(e) => handleEditChange(e, 'personalDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.personalDetails?.address?.zipCode || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {user?.userType === 'business' && (
          <div className="detail-card">
            <div className="card-header">
              <h2>Business Information</h2>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>Company Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="companyName"
                    value={editFormData.businessDetails.companyName}
                    onChange={(e) => handleEditChange(e, 'businessDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.businessDetails?.companyName || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>Contact Person:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="contactPerson"
                    value={editFormData.businessDetails.contactPerson}
                    onChange={(e) => handleEditChange(e, 'businessDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.businessDetails?.contactPerson || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>Business Phone:</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="businessPhone"
                    value={editFormData.businessDetails.businessPhone}
                    onChange={(e) => handleEditChange(e, 'businessDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.businessDetails?.businessPhone || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>Industry:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="industry"
                    value={editFormData.businessDetails.industry}
                    onChange={(e) => handleEditChange(e, 'businessDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.businessDetails?.industry || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>Website:</label>
                {isEditing ? (
                  <input
                    type="url"
                    name="website"
                    value={editFormData.businessDetails.website}
                    onChange={(e) => handleEditChange(e, 'businessDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.businessDetails?.website || 'Not provided'}</p>
                )}
              </div>
            </div>
            
            <h3 className="sub-section-title">Business Address</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Street:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.street"
                    value={editFormData.businessDetails.businessAddress.street}
                    onChange={(e) => handleEditChange(e, 'businessDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.businessDetails?.businessAddress?.street || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>City:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.city"
                    value={editFormData.businessDetails.businessAddress.city}
                    onChange={(e) => handleEditChange(e, 'businessDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.businessDetails?.businessAddress?.city || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>Country:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.country"
                    value={editFormData.businessDetails.businessAddress.country}
                    onChange={(e) => handleEditChange(e, 'businessDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.businessDetails?.businessAddress?.country || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>Zip Code:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.zipCode"
                    value={editFormData.businessDetails.businessAddress.zipCode}
                    onChange={(e) => handleEditChange(e, 'businessDetails')}
                    className="edit-input"
                  />
                ) : (
                  <p>{user?.businessDetails?.businessAddress?.zipCode || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Preferences Card */}
        <div className="detail-card">
          <div className="card-header">
            <h2>User Preferences</h2>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <label>Language:</label>
              {isEditing ? (
                <select
                  name="language"
                  value={editFormData.profile.preferences.language}
                  onChange={(e) => handleEditChange(e, 'profile', 'preferences')}
                  className="edit-select"
                >
                  <option value="en">English</option>
                  <option value="si">Sinhala</option>
                  <option value="ta">Tamil</option>
                </select>
              ) : (
                <p>{user?.profile?.preferences?.language || 'en'}</p>
              )}
            </div>
            <div className="info-item">
              <label>Timezone:</label>
              {isEditing ? (
                <select
                  name="timezone"
                  value={editFormData.profile.preferences.timezone}
                  onChange={(e) => handleEditChange(e, 'profile', 'preferences')}
                  className="edit-select"
                >
                  <option value="Asia/Colombo">Asia/Colombo</option>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="Asia/Dubai">Asia/Dubai</option>
                </select>
              ) : (
                <p>{user?.profile?.preferences?.timezone || 'Asia/Colombo'}</p>
              )}
            </div>
            <div className="info-item">
              <label>Email Notifications:</label>
              {isEditing ? (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="email"
                    checked={editFormData.profile.preferences.notifications.email}
                    onChange={(e) => handleEditChange(e, 'profile', 'preferences')}
                  />
                  Receive email notifications
                </label>
              ) : (
                <p>{user?.profile?.preferences?.notifications?.email ? '✓ Enabled' : '✗ Disabled'}</p>
              )}
            </div>
            <div className="info-item">
              <label>SMS Notifications:</label>
              {isEditing ? (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="sms"
                    checked={editFormData.profile.preferences.notifications.sms}
                    onChange={(e) => handleEditChange(e, 'profile', 'preferences')}
                  />
                  Receive SMS notifications
                </label>
              ) : (
                <p>{user?.profile?.preferences?.notifications?.sms ? '✓ Enabled' : '✗ Disabled'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetails;