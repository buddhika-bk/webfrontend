import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeStyle.css';

const Home = () => {
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Mobile navigation functions
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  // Smooth scroll function for anchor links
  const smoothScroll = (targetId) => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      closeMobileNav();
    }
  };

  // Handle anchor link clicks
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    smoothScroll(targetId);
  };

  const features = [
    {
      title: "Web Design",
      description: "Professional website design services tailored for your business needs.",
      icon: "💻"
    },
    {
      title: "Mobile Applications",
      description: "Custom mobile apps for iOS and Android to reach your customers anywhere.",
      icon: "📱"
    },
    {
      title: "Software Development",
      description: "Custom software solutions to streamline your business operations.",
      icon: "⚙️"
    },
    {
      title: "E-Commerce Solutions",
      description: "Complete online store setup with payment integration and inventory management.",
      icon: "🛒"
    }
  ];

  const packages = [
    {
      name: "Basic",
      price: "LKR 25,000",
      features: ["5 Page Website", "Responsive Design", "Contact Form", "1 Month Free Support"],
      recommended: false
    },
    {
      name: "Professional",
      price: "LKR 40,000",
      features: ["10 Page Website", "CMS Integration", "SEO Basic", "3 Months Free Support", "Mobile Friendly"],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "LKR 75,000",
      features: ["25 Pages", "E-Commerce Functionality", "Advanced SEO", "5 Months Free Support", "Custom Design"],
      recommended: false
    }
  ];

  const whyChooseUsFeatures = [
    {
      title: "Expertise and Experience",
      description: "With years of experience in CMS website design, our team brings expertise and proficiency to every project. We have a proven track record of delivering high-quality websites that exceed client expectations.",
      icon: "🎯"
    },
    {
      title: "Creative Design",
      description: "We believe in the power of creativity to make your website stand out. Our talented designers craft visually stunning and engaging designs that capture attention and leave a lasting impression on visitors.",
      icon: "🎨"
    },
    {
      title: "Seamless User Experience",
      description: "User experience is at the forefront of our design philosophy. We focus on creating intuitive navigation, clear calls-to-action, and fast-loading pages to ensure a seamless and enjoyable browsing experience.",
      icon: "⚡"
    },
    {
      title: "Responsive Support",
      description: "Our dedicated support team is here to assist you every step of the way. Whether you have questions, need technical assistance, or want to make updates to your website, we're always available to provide prompt support.",
      icon: "🔧"
    },
    {
      title: "Proven Results",
      description: "We have a history of delivering results for our clients. Our CMS websites are designed to drive traffic, generate leads, and increase conversions, helping you achieve your business objectives.",
      icon: "📈"
    },
    {
      title: "Affordable Pricing",
      description: "We understand the importance of affordability for businesses of all sizes. That's why we offer competitive pricing options without compromising on quality. You get excellent value for your investment.",
      icon: "💲"
    }
  ];

  return (
    <div className="home-container">
      {/* Updated Header with Modern Mobile Navigation */}
<header className="main-header">
  <div className="header-content">
    <div className="logo">
      <h1>WebPoint<span>.lk</span></h1>
    </div>
    
    {/* Desktop Navigation */}
    <nav className="main-nav">
      <ul>
        <li><a href="#home" onClick={(e) => handleAnchorClick(e, '#home')}>Home</a></li>
        <li><a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>Services</a></li>
        <li><a href="#pos-system" onClick={(e) => handleAnchorClick(e, '#pos-system')}>POS System</a></li>
        <li><a href="#packages" onClick={(e) => handleAnchorClick(e, '#packages')}>Packages</a></li>
        <li><a href="#why-choose-us" onClick={(e) => handleAnchorClick(e, '#why-choose-us')}>Why Choose Us</a></li>
        <li><a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>Contact</a></li>
      </ul>
    </nav>
    
    {/* Desktop Buttons */}
    <div className="header-buttons">
      <button className="login-btn">Login</button>
      <button 
        className="primary-button"
        onClick={() => navigate('/add-shop')}
      >
        Get Started
      </button>
    </div>
    
    {/* Modern Mobile Navigation Toggle Button */}
    <button 
      className={`mobile-nav-toggle ${isMobileNavOpen ? 'active' : ''}`}
      aria-label="Toggle navigation"
      onClick={toggleMobileNav}
    >
      <span className="hamburger-line line-1"></span>
      <span className="hamburger-line line-2"></span>
      <span className="hamburger-line line-3"></span>
    </button>
  </div>
  
  {/* Modern Mobile Navigation Menu */}
  <div className={`mobile-nav-overlay ${isMobileNavOpen ? 'active' : ''}`} onClick={closeMobileNav}></div>
  <nav className={`mobile-nav ${isMobileNavOpen ? 'active' : ''}`}>
    <div className="mobile-nav-header">
      <div className="mobile-logo">
        <h2>WebPoint<span>.lk</span></h2>
      </div>
      <button className="mobile-close-btn" onClick={closeMobileNav}>
        <span className="close-icon">×</span>
      </button>
    </div>
    
    <div className="mobile-nav-content">
      <ul className="mobile-nav-list">
        <li className="mobile-nav-item">
          <a href="#home" onClick={(e) => handleAnchorClick(e, '#home')} className="mobile-nav-link">
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
            <span className="nav-arrow">›</span>
          </a>
        </li>
        <li className="mobile-nav-item">
          <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')} className="mobile-nav-link">
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Services</span>
            <span className="nav-arrow">›</span>
          </a>
        </li>
        <li className="mobile-nav-item">
          <a href="#pos-system" onClick={(e) => handleAnchorClick(e, '#pos-system')} className="mobile-nav-link">
            <span className="nav-icon">💳</span>
            <span className="nav-text">POS System</span>
            <span className="nav-arrow">›</span>
          </a>
        </li>
        <li className="mobile-nav-item">
          <a href="#packages" onClick={(e) => handleAnchorClick(e, '#packages')} className="mobile-nav-link">
            <span className="nav-icon">📦</span>
            <span className="nav-text">Packages</span>
            <span className="nav-arrow">›</span>
          </a>
        </li>
        <li className="mobile-nav-item">
          <a href="#why-choose-us" onClick={(e) => handleAnchorClick(e, '#why-choose-us')} className="mobile-nav-link">
            <span className="nav-icon">⭐</span>
            <span className="nav-text">Why Choose Us</span>
            <span className="nav-arrow">›</span>
          </a>
        </li>
        <li className="mobile-nav-item">
          <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')} className="mobile-nav-link">
            <span className="nav-icon">📞</span>
            <span className="nav-text">Contact</span>
            <span className="nav-arrow">›</span>
          </a>
        </li>
      </ul>
      
      <div className="mobile-nav-footer">
        <div className="mobile-user-info">
          <div className="user-avatar">👤</div>
          <div className="user-text">
            <p className="user-greeting">Welcome to WebPoint</p>
            <p className="user-subtitle">Get started with your digital journey</p>
          </div>
        </div>
        
        <div className="mobile-nav-buttons">
          <button 
            className="mobile-login-btn"
            onClick={closeMobileNav}
          >
            <span className="btn-icon">🔑</span>
            Login Account
          </button>
          <button 
            className="mobile-primary-btn"
            onClick={() => {
              navigate('/add-shop');
              closeMobileNav();
            }}
          >
            <span className="btn-icon">🚀</span>
            Get Started Free
          </button>
        </div>
        
        <div className="mobile-contact-info">
          <p className="contact-text">Need help? Contact us:</p>
          <p className="contact-phone">📞 +94 77 123 4567</p>
          <p className="contact-email">✉️ hello@webpoint.lk</p>
        </div>
      </div>
    </div>
  </nav>
</header>

     {/* Hero Section */}
<section className="hero-section" id="home">
  <div className="hero-background">
    <div className="hero-particles" id="particles-js"></div>
    <div className="hero-gradient"></div>
  </div>
  
  <div className="hero-content">
    <div className="hero-text">
      <div className="hero-badge">
        <span>🚀 Trusted by 100+ Sri Lankan Businesses</span>
      </div>
      
      <h1 className="hero-title">
        <span className="title-line">Elevate Your</span>
        <span className="title-line highlight-container">
          <span className="highlight-text">Online Presence</span>
          <span className="highlight-underline"></span>
        </span>
        <span className="title-line">in Sri Lanka</span>
      </h1>
      
      <p className="hero-description">
        We deliver cutting-edge web design, mobile applications, and custom software solutions 
        that drive growth for Sri Lankan businesses. Transform your digital footprint today.
      </p>
      
      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-number" data-count="250">20+</div>
          <div className="stat-label">Projects Delivered</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" data-count="98">100%</div>
          <div className="stat-label">Client Satisfaction</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" data-count="5">6+</div>
          <div className="stat-label">Years Experience</div>
        </div>
      </div>
      
      <div className="hero-buttons">
        <button 
          className="primary-button animated-button"
          onClick={() => navigate('/AddShop')}
        >
          <span className="button-text">Get Started - It's Free</span>
          <span className="button-icon">🚀</span>
        </button>
        <button className="secondary-button video-button">
          <span className="play-icon">▶</span>
          Watch Demo Video
        </button>
      </div>
      
      <div className="hero-clients">
        <p>Trusted by leading Sri Lankan brands:</p>
        <div className="client-logos">
          <span>🏢</span>
          <span>🏪</span>
          <span>🏨</span>
          <span>🏭</span>
          <span>🛍️</span>
        </div>
      </div>
    </div>
    
    <div className="hero-visual">
      <div className="floating-platform">
        <div className="platform-base">
          <div className="browser-window">
            <div className="browser-header">
              <div className="browser-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="browser-content">
              <div className="website-preview"></div>
            </div>
          </div>
          
          <div className="mobile-device">
            <div className="mobile-screen">
              <div className="app-preview"></div>
            </div>
          </div>
        </div>
        
        <div className="floating-element element-1">
          <span className="spanicon">💻</span>
          <div className="tooltip">Web Design</div>
        </div>
        <div className="floating-element element-2">
          <span className="spanicon">📱</span>
          <div className="tooltip">Mobile Apps</div>
        </div>
        <div className="floating-element element-3">
          <span className="spanicon">🛒</span>
          <div className="tooltip">E-Commerce</div>
        </div>
        <div className="floating-element element-4">
          <span className="spanicon">📊</span>
          <div className="tooltip">POS Systems</div>
        </div>
      </div>
    </div>
  </div>
  
  <div className="scroll-indicator">
    <div className="scroll-arrow"></div>
  </div>
</section>

      {/* Modern Services Section */}
<section className="services-section" id="services">
  <div className="section-container">
    <div className="section-header">
      <div className="section-badge">
        <span>✨ Our Expertise</span>
      </div>
      <h2 className="section-title">Transform Your Digital Presence</h2>
      <p className="section-subtitle">
        Comprehensive digital solutions tailored for Sri Lankan businesses to thrive in the digital era
      </p>
    </div>
    
    <div className="services-grid">
      {features.map((service, index) => (
        <div 
          key={index} 
          className="service-card"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <div className="card-background"></div>
          <div className="card-content">
            <div className="service-icon-wrapper">
              <div className="icon-background"></div>
              <div className="service-icon">{service.icon}</div>
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <div className="service-features">
              {service.features?.map((feature, idx) => (
                <span key={idx} className="feature-tag">✓ {feature}</span>
              ))}
            </div>
            <button className="service-cta">
              <span className="cta-text">Explore Service</span>
              <span className="cta-arrow">→</span>
              <div className="cta-hover-effect"></div>
            </button>
          </div>
          <div className="card-hover-effect"></div>
        </div>
      ))}
    </div>
    
    <div className="services-cta">
      <div className="cta-content">
        <h3>Ready to Transform Your Business?</h3>
        <p>Let's discuss your project and create something amazing together</p>
        <div className="cta-buttons">
          <button className="primary-button large">
            <span>Start Your Project</span>
            <span className="button-sparkle">✨</span>
          </button>
          <button className="secondary-button">
            <span>View Case Studies</span>
            <span className="button-arrow">📊</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  {/* Background Elements */}
  <div className="services-background">
    <div className="bg-shape shape-1"></div>
    <div className="bg-shape shape-2"></div>
    <div className="bg-shape shape-3"></div>
  </div>
</section>

      {/* POS System Section */}
<section className="pos-system-section" id="pos-system">
  <div className="section-background">
    <div className="bg-shape shape-1"></div>
    <div className="bg-shape shape-2"></div>
    <div className="bg-shape shape-3"></div>
    <div className="bg-grid"></div>
  </div>
  
  <div className="section-container">
    <div className="pos-content">
      <div className="pos-text">
        <div className="section-badge">
          <span>Point of Sale</span>
        </div>
        <h2>Revolutionize Your Retail Operations</h2>
        <p>
          At Webpoint, we develop custom Point of Sale (POS) systems that streamline retail operations 
          with inventory management, sales tracking, and customer management features. Our POS solutions 
          help businesses process transactions efficiently while providing valuable insights through 
          comprehensive reporting and analytics tools.
        </p>
        
        <div className="pos-features">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13H21V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V13ZM3 13V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V13M7 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="feature-text">
              <h4>Inventory Management</h4>
              <p>Track stock levels, automate reordering, and manage suppliers efficiently.</p>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="feature-text">
              <h4>Sales Tracking</h4>
              <p>Monitor transactions, analyze trends, and optimize your sales strategy.</p>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="feature-text">
              <h4>Customer Management</h4>
              <p>Build customer profiles, track purchase history, and enhance loyalty.</p>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 20L11 4M13 20L17 4M6 9H20M4 15H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="feature-text">
              <h4>Analytics & Reporting</h4>
              <p>Gain insights with detailed reports and data visualization tools.</p>
            </div>
          </div>
        </div>
        
        <div className="pos-actions">
          <button className="primary-button">
            <span>Learn More About POS</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="secondary-button">
            <span>View Live Demo</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 12C19.1114 14.991 15.7183 18 12 18C8.2817 18 4.88856 14.991 3 12C5.36527 9.04153 8.7858 6 12 6C15.2142 6 18.6347 9.04153 21 12Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="pos-visual">
        <div className="dashboard-preview">
          <div className="dashboard-header">
            <div className="dashboard-controls">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="dashboard-title">Webpoint POS Dashboard</div>
            <div className="dashboard-status">
              <div className="status-indicator"></div>
              <span>Live</span>
            </div>
          </div>
          <div className="dashboard-content">
            <div className="metric-cards">
              <div className="metric-card">
                <div className="metric-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="metric-data">
                  <div className="metric-value">$12,485</div>
                  <div className="metric-label">Today's Revenue</div>
                </div>
                <div className="metric-trend up">+12%</div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="metric-data">
                  <div className="metric-value">84</div>
                  <div className="metric-label">Transactions</div>
                </div>
                <div className="metric-trend up">+5%</div>
              </div>
            </div>
            <div className="chart-area">
              <div className="chart-header">
                <h4>Sales Overview</h4>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-color current"></span>
                    <span>Current</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color previous"></span>
                    <span>Previous</span>
                  </div>
                </div>
              </div>
              <div className="chart-container">
                <div className="chart-bars">
                  <div className="bar-group">
                    <div className="bar previous" style={{height: '60%'}}></div>
                    <div className="bar current" style={{height: '80%'}}></div>
                  </div>
                  <div className="bar-group">
                    <div className="bar previous" style={{height: '70%'}}></div>
                    <div className="bar current" style={{height: '85%'}}></div>
                  </div>
                  <div className="bar-group">
                    <div className="bar previous" style={{height: '50%'}}></div>
                    <div className="bar current" style={{height: '75%'}}></div>
                  </div>
                  <div className="bar-group">
                    <div className="bar previous" style={{height: '65%'}}></div>
                    <div className="bar current" style={{height: '90%'}}></div>
                  </div>
                  <div className="bar-group">
                    <div className="bar previous" style={{height: '55%'}}></div>
                    <div className="bar current" style={{height: '70%'}}></div>
                  </div>
                  <div className="bar-group">
                    <div className="bar previous" style={{height: '75%'}}></div>
                    <div className="bar current" style={{height: '95%'}}></div>
                  </div>
                </div>
                <div className="chart-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
              </div>
            </div>
            <div className="recent-activity">
              <h4>Recent Sales</h4>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-info">
                    <span className="customer">Customer #4821</span>
                    <span className="time">2:30 PM</span>
                  </div>
                  <span className="amount">$245.50</span>
                </div>
                <div className="activity-item">
                  <div className="activity-info">
                    <span className="customer">Customer #4822</span>
                    <span className="time">2:15 PM</span>
                  </div>
                  <span className="amount">$89.99</span>
                </div>
                <div className="activity-item">
                  <div className="activity-info">
                    <span className="customer">Customer #4823</span>
                    <span className="time">1:45 PM</span>
                  </div>
                  <span className="amount">$156.75</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="floating-elements">
          <div className="floating-card card-1">
            <div className="card-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span>Inventory Updated</span>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span>New Customer Added</span>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17H7C5.89543 17 5 16.1046 5 15V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V9M14 21H5M14 21L19 16M14 21L14 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Report Generated</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section" id="why-choose-us">
        <div className="section-container">
          <div className="section-header">
            <h2>Why Choose WebPoint</h2>
            <p>Discover what makes us the preferred choice for Sri Lankan businesses</p>
          </div>
          <div className="why-choose-grid">
            {whyChooseUsFeatures.map((feature, index) => (
              <div key={index} className="why-choose-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
<section className="packages-section" id="packages">
  <div className="section-container">
    <div className="section-header">
      <div className="package-badge">
        <span>💎 Premium Solutions</span>
      </div>
      <h2>Choose Your Perfect Plan</h2>
      <p>Affordable web design packages tailored for Sri Lankan businesses of all sizes</p>
    </div>
    
    <div className="packages-toggle">
      <span className="toggle-label">Monthly</span>
      <label className="toggle-switch">
        <input type="checkbox" className="toggle-input" />
        <span className="toggle-slider"></span>
      </label>
      <span className="toggle-label active">Annual <span className="discount-badge">Save 20%</span></span>
    </div>
    
    <div className="packages-container">
      {packages.map((pkg, index) => (
        <div key={index} className={`package-card ${pkg.recommended ? 'recommended' : ''}`}>
          {pkg.recommended && (
            <div className="recommended-badge">
              <span>⭐ Most Popular</span>
            </div>
          )}
          
          <div className="package-header">
            <div className="package-icon">
              {pkg.name === "Basic" && "🚀"}
              {pkg.name === "Professional" && "💼"}
              {pkg.name === "Enterprise" && "🏢"}
            </div>
            <h3>{pkg.name}</h3>
            <p className="package-subtitle">
              {pkg.name === "Basic" && "Perfect for startups"}
              {pkg.name === "Professional" && "Ideal for growing businesses"}
              {pkg.name === "Enterprise" && "For large organizations"}
            </p>
          </div>
          
          <div className="package-price">
            <div className="price-amount">{pkg.price}</div>
            <div className="price-period">one-time payment</div>
          </div>
          
          <ul className="package-features">
            {pkg.features.map((feature, fIndex) => (
              <li key={fIndex}>
                <span className="feature-icon">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <button className={`package-button ${pkg.recommended ? 'recommended-button' : ''}`}>
            <span className="button-text">Get Started</span>
            <span className="button-arrow">→</span>
          </button>
          
          <div className="package-footer">
            <div className="support-info">
              <span>📞</span>
              <span>Priority Support Included</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="packages-footer">
      <div className="guarantee-badge">
        <span>✅ 30-Day Money-Back Guarantee</span>
      </div>
      <p className="footer-note">All plans include free SSL certificate and basic SEO setup</p>
    </div>
  </div>
</section>

      {/* CTA Section */}
<section className="cta-section">
  <div className="cta-background">
    <div className="cta-shapes">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="shape shape-4"></div>
    </div>
    <div className="cta-gradient"></div>
  </div>
  
  <div className="section-container">
    <div className="cta-content">
      <div className="cta-badge">
        <span>✨ Limited Time Offer</span>
      </div>
      
      <h2 className="cta-title">
        Ready to Transform Your 
        <span className="cta-highlight"> Digital Presence</span>?
      </h2>
      
      <p className="cta-description">
        Join <strong>20+ successful Sri Lankan businesses</strong> that have elevated their online presence 
        with WebPoint.lk. Start your journey today and get <strong>free consultation</strong> worth LKR 25,000!
      </p>
      
      <div className="cta-features">
        <div className="feature-item">
          <span className="feature-icon">✅</span>
          <span>Free 3 Month Service</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">✅</span>
          <span>30-Day Money Back</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">✅</span>
          <span>Lifetime Support</span>
        </div>
      </div>
      
      <div className="cta-buttons">
        <button 
          className="cta-primary-button"
          onClick={() => navigate('/AddShop')}
        >
          <span className="button-content">
            <span className="button-text">Start Your Project Today</span>
            <span className="button-arrow">→</span>
          </span>
          <div className="button-glow"></div>
        </button>
        
        <button className="cta-secondary-button">
          <span className="video-icon">🎬</span>
          Watch Success Stories
        </button>
      </div>
      
      <div className="cta-guarantee">
        <div className="guarantee-item">
          <span className="guarantee-icon">🏆</span>
          <span>6-Year Experience</span>
        </div>
        <div className="guarantee-item">
          <span className="guarantee-icon">💎</span>
          <span>Quality Guaranteed</span>
        </div>
        <div className="guarantee-item">
          <span className="guarantee-icon">🚀</span>
          <span>Fast Delivery</span>
        </div>
      </div>
      
      <div className="cta-stats">
        <div className="stat">
          <div className="stat-number">100%</div>
          <div className="stat-label">Client Satisfaction</div>
        </div>
        <div className="stat">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support Available</div>
        </div>
        <div className="stat">
          <div className="stat-number">20+</div>
          <div className="stat-label">Projects Delivered</div>
        </div>
      </div>
    </div>
  </div>
  
  <div className="cta-wave">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
      <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
      <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
    </svg>
  </div>
</section>

      {/* Footer */}
      <footer className="main-footer" id="contact">
        <div className="section-container">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-brand">
                <h3>WebPoint.lk</h3>
                <p>Professional web design and development services for Sri Lankan businesses.</p>
                <div className="social-icons">
                  <a href="#"><span>📱</span></a>
                  <a href="#"><span>💻</span></a>
                  <a href="#"><span>📸</span></a>
                </div>
              </div>
              
              <div className="footer-links">
                <div className="footer-column">
                  <h4>Services</h4>
                  <ul>
                    <li><a href="#services">Web Design</a></li>
                    <li><a href="#services">Mobile Applications</a></li>
                    <li><a href="#pos-system">POS Systems</a></li>
                    <li><a href="#services">E-Commerce Solutions</a></li>
                  </ul>
                </div>
                
                <div className="footer-column">
                  <h4>Quick Links</h4>
                  <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#packages">Packages</a></li>
                    <li><a href="#why-choose-us">Why Choose Us</a></li>
                  </ul>
                </div>
                
                <div className="footer-column">
                  <h4>Contact Info</h4>
                  <ul className="contact-info">
                    <li>📍 Colombo, Sri Lanka</li>
                    <li>📞 +94 70 731 2180</li>
                    <li>✉️ info@webpoint.lk</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>&copy; 2025 WebPoint.lk. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;