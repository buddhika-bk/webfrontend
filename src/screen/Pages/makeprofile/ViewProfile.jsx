import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ViewProfile.css';
import { 
  FaStore, FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, 
  FaInfoCircle, FaBriefcase, FaDownload, FaFacebook, 
  FaInstagram, FaTwitter, FaLinkedin, FaEye, FaCalendarAlt,
  FaShareAlt, FaHeart, FaRegHeart, FaStar, 
  FaPrint, FaCopy, FaCheck, FaMoon, FaSun,
  FaWhatsapp, FaTelegram, FaBuilding, FaUserTie,
  FaClock, FaAward, FaShieldAlt, FaRocket
} from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (location.state?.profile) {
      setProfile(location.state.profile);
      setLoading(false);
      return;
    }

    if (id) {
      fetchProfile();
    }
  }, [id, location.state]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/qrprofiles/${id}`);
      if (response.data.success) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleDownloadQR = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/qrprofiles/${id}/download`);
      if (response.data.success) {
        const link = document.createElement('a');
        link.href = response.data.qrCodeData;
        link.download = `qr-code-${profile.businessName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading QR:', error);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: profile.businessName,
        text: `Check out ${profile.businessName}'s profile!`,
        url: window.location.href,
      });
    } else {
      handleCopyLink();
    }
  };

  const handleEdit = () => {
    navigate(`/edit-profile/${id}`);
  };

  if (loading) {
    return (
      <div className="view-profile-container">
        <div className="loading-wrapper">
          <div className="premium-loader">
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
          </div>
          <p className="loading-text">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="view-profile-container">
        <div className="error-wrapper">
          <div className="error-icon">🔍</div>
          <h2>Profile Not Found</h2>
          <p>The profile you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/')} className="premium-btn primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`view-profile-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Theme Toggle - Top Right */}
      <div className="theme-toggle-wrapper">
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? <FaSun /> : <FaMoon />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      <div className="view-profile-wrapper">
        {/* ===== HERO SECTION ===== */}
        <div className="hero-section">
          <div className="hero-background">
            <div className="hero-gradient"></div>
            <div className="hero-pattern"></div>
            <div className="hero-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
            </div>
          </div>
          
          <div className="hero-content">
            <div className="hero-left">
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar">
                  {profile.companyLogo ? (
                    <img src={profile.companyLogo} alt={profile.businessName} />
                  ) : (
                    <div className="avatar-placeholder">
                      <FaStore size={56} />
                    </div>
                  )}
                </div>
                <div className="avatar-status online">
                  <span></span>
                </div>
              </div>

              <div className="hero-text">
                <div className="business-name-wrapper">
                  <h1>{profile.businessName}</h1>
                  <span className={`category-badge ${profile.category}`}>
                    {profile.category}
                  </span>
                </div>
                
                <p className="business-tagline">{profile.businessBio}</p>

                <div className="hero-stats">
                  <div className="stat-item">
                    <FaEye className="stat-icon" />
                    <div>
                      <span className="stat-number">{profile.views || 0}</span>
                      <label>Views</label>
                    </div>
                  </div>
                  <div className="stat-item">
                    <FaCalendarAlt className="stat-icon" />
                    <div>
                      <span className="stat-number">{new Date(profile.createdAt).toLocaleDateString()}</span>
                      <label>Joined</label>
                    </div>
                  </div>
                  <div className="stat-item">
                    <FaStar className="stat-icon" />
                    <div>
                      <span className="stat-number">4.8</span>
                      <label>Rating</label>
                    </div>
                  </div>
                  <div className="stat-item">
                    <FaAward className="stat-icon" />
                    <div>
                      <span className="stat-number">Premium</span>
                      <label>Status</label>
                    </div>
                  </div>
                </div>

                <div className="hero-actions">
                  <button onClick={handleEdit} className="premium-btn primary">
                    <FaUserTie /> Edit Profile
                  </button>
                  <button onClick={handleShare} className="premium-btn secondary">
                    <FaShareAlt /> Share
                  </button>
                  <button onClick={() => setLiked(!liked)} className="premium-btn icon-btn">
                    {liked ? <FaHeart className="liked" /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="qr-card">
                <div className="qr-container">
                  {profile.qrCodeData ? (
                    <div className="qr-wrapper">
                      <img src={profile.qrCodeData} alt="QR Code" className="qr-image" />
                      <div className="qr-overlay">
                        <span>Scan Me</span>
                      </div>
                    </div>
                  ) : (
                    <div className="qr-placeholder">
                      <div className="qr-loading"></div>
                      <p>Generating QR...</p>
                    </div>
                  )}
                </div>
                <div className="qr-actions">
                  <button onClick={handleDownloadQR} className="qr-btn download">
                    <FaDownload /> Download
                  </button>
                  <button onClick={handleCopyLink} className="qr-btn copy">
                    {copied ? <FaCheck /> : <FaCopy />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
                <p className="qr-hint">
                  <FaRocket /> Scan to view on your phone
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="main-content">
          {/* Quick Actions Bar */}
          <div className="quick-actions-bar">
            <button className="quick-action">
              <FaWhatsapp className="action-icon whatsapp" />
              <span>WhatsApp</span>
            </button>
            <button className="quick-action">
              <FaTelegram className="action-icon telegram" />
              <span>Telegram</span>
            </button>
            <button className="quick-action">
              <FaPrint className="action-icon print" />
              <span>Print</span>
            </button>
            <button className="quick-action" onClick={handleShare}>
              <FaShareAlt className="action-icon share" />
              <span>Share</span>
            </button>
            <button className="quick-action" onClick={handleCopyLink}>
              <FaCopy className="action-icon copy" />
              <span>Copy Link</span>
            </button>
          </div>

          {/* Details Grid */}
          <div className="details-grid">
            {/* Contact Information */}
            <div className="info-card premium-card">
              <div className="card-header">
                <h3><FaPhone /> Contact Information</h3>
                <span className="card-badge">Reach us</span>
              </div>
              <div className="card-body">
                <div className="contact-grid">
                  <div className="contact-item">
                    <div className="contact-icon-wrapper phone">
                      <FaPhone />
                    </div>
                    <div className="contact-info">
                      <label>Phone Number</label>
                      <p>{profile.contactDetails.phone}</p>
                      <a href={`tel:${profile.contactDetails.phone}`} className="contact-action">
                        Call Now →
                      </a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon-wrapper email">
                      <FaEnvelope />
                    </div>
                    <div className="contact-info">
                      <label>Email Address</label>
                      <p>{profile.contactDetails.email}</p>
                      <a href={`mailto:${profile.contactDetails.email}`} className="contact-action">
                        Send Email →
                      </a>
                    </div>
                  </div>

                  {profile.contactDetails.website && (
                    <div className="contact-item full-width">
                      <div className="contact-icon-wrapper website">
                        <FaGlobe />
                      </div>
                      <div className="contact-info">
                        <label>Website</label>
                        <p>
                          <a href={profile.contactDetails.website} target="_blank" rel="noopener noreferrer">
                            {profile.contactDetails.website}
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Media */}
                {(profile.contactDetails.socialMedia?.facebook || 
                  profile.contactDetails.socialMedia?.instagram || 
                  profile.contactDetails.socialMedia?.twitter || 
                  profile.contactDetails.socialMedia?.linkedin) && (
                  <div className="social-section">
                    <label>Connect with us</label>
                    <div className="social-icons">
                      {profile.contactDetails.socialMedia.facebook && (
                        <a href={profile.contactDetails.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                          <FaFacebook />
                        </a>
                      )}
                      {profile.contactDetails.socialMedia.instagram && (
                        <a href={profile.contactDetails.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                          <FaInstagram />
                        </a>
                      )}
                      {profile.contactDetails.socialMedia.twitter && (
                        <a href={profile.contactDetails.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                          <FaTwitter />
                        </a>
                      )}
                      {profile.contactDetails.socialMedia.linkedin && (
                        <a href={profile.contactDetails.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                          <FaLinkedin />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Business Bio */}
            <div className="info-card premium-card">
              <div className="card-header">
                <h3><FaInfoCircle /> About Business</h3>
                <span className="card-badge">Story</span>
              </div>
              <div className="card-body">
                <p className="bio-text">{profile.businessBio}</p>
                <div className="business-tags">
                  <span className="tag"><FaShieldAlt /> Trusted</span>
                  <span className="tag"><FaAward /> Certified</span>
                  <span className="tag"><FaClock /> Established</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="info-card premium-card">
              <div className="card-header">
                <h3><FaMapMarkerAlt /> Location</h3>
                <span className="card-badge">Visit us</span>
              </div>
              <div className="card-body">
                <div className="address-details">
                  <p className="address-line"><FaBuilding className="address-icon" /> {profile.companyAddress.street}</p>
                  <p className="address-line">{profile.companyAddress.city}, {profile.companyAddress.state} {profile.companyAddress.zipCode}</p>
                  <p className="address-line country">{profile.companyAddress.country}</p>
                </div>
                <button className="map-btn">
                  <FaMapMarkerAlt /> View on Google Maps
                </button>
              </div>
            </div>

            {/* Products & Services */}
            <div className="info-card premium-card">
              <div className="card-header">
                <h3><FaBriefcase /> Products & Services</h3>
                <span className="card-badge">Offerings</span>
              </div>
              <div className="card-body">
                <p className="product-text">{profile.productDetails}</p>
                <div className="product-features">
                  <div className="feature">
                    <FaRocket className="feature-icon" />
                    <span>Quality Products</span>
                  </div>
                  <div className="feature">
                    <FaShieldAlt className="feature-icon" />
                    <span>Trusted Service</span>
                  </div>
                  <div className="feature">
                    <FaAward className="feature-icon" />
                    <span>Professional Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;