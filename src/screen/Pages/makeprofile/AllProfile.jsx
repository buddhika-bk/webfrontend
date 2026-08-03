import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AllProfile.css';
import { FaStore, FaEye, FaTrash, FaEdit, FaQrcode, FaSearch, FaFilter } from 'react-icons/fa';

const AllProfile = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/qrprofiles');
      if (response.data.success) {
        setProfiles(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      alert('Failed to fetch profiles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/qrprofiles/${id}`);
      setProfiles(profiles.filter(profile => profile._id !== id));
      alert('Profile deleted successfully');
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-profile/${id}`);
  };

  const handleView = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleDownloadQR = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/qrprofiles/${id}/download`);
      if (response.data.success) {
        // Create a download link
        const link = document.createElement('a');
        link.href = response.data.qrCodeData;
        link.download = `qr-code-${id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading QR:', error);
      alert('Failed to download QR code');
    }
  };

  // Filter profiles
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.contactDetails.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.contactDetails.phone.includes(searchTerm);
    const matchesCategory = filterCategory === 'all' || profile.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(profiles.map(p => p.category))];

  if (loading) {
    return (
      <div className="all-profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-profile-container">
      <div className="all-profile-wrapper">
        <div className="all-profile-header">
          <h1>QR Profiles</h1>
          <p>Manage all your QR code profiles</p>
        </div>

        {/* Search and Filter */}
        <div className="filter-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by business name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-box">
            <FaFilter className="filter-icon" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-label">Total Profiles</span>
            <span className="stat-value">{profiles.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Filtered</span>
            <span className="stat-value">{filteredProfiles.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Views</span>
            <span className="stat-value">
              {profiles.reduce((sum, p) => sum + (p.views || 0), 0)}
            </span>
          </div>
        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length === 0 ? (
          <div className="empty-state">
            <FaStore size={64} className="empty-icon" />
            <h3>No profiles found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="profiles-grid">
            {filteredProfiles.map((profile) => (
              <div key={profile._id} className="profile-card">
                <div className="card-header">
                  <div className="logo-container">
                    {profile.companyLogo ? (
                      <img src={profile.companyLogo} alt={profile.businessName} />
                    ) : (
                      <div className="no-logo">
                        <FaStore size={32} />
                      </div>
                    )}
                  </div>
                  <div className="card-badge">
                    {profile.category}
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="business-name">{profile.businessName}</h3>
                  <p className="business-bio">{profile.businessBio?.substring(0, 100)}...</p>
                  <div className="contact-info">
                    <p><strong>Email:</strong> {profile.contactDetails.email}</p>
                    <p><strong>Phone:</strong> {profile.contactDetails.phone}</p>
                    <p><strong>Location:</strong> {profile.companyAddress.city}, {profile.companyAddress.country}</p>
                  </div>
                  <div className="card-stats">
                    <span>👁️ {profile.views || 0} views</span>
                    <span>📅 {new Date(profile.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button onClick={() => handleView(profile._id)} className="action-btn view-btn">
                    <FaEye /> View
                  </button>
                  <button onClick={() => handleEdit(profile._id)} className="action-btn edit-btn">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDownloadQR(profile._id)} className="action-btn qr-btn">
                    <FaQrcode /> QR
                  </button>
                  <button onClick={() => handleDelete(profile._id)} className="action-btn delete-btn">
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProfile;