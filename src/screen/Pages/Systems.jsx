import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Systems.module.css';

// Import local POS system image
import posSystemImg from '../../assets/pos.jpeg';
import dashboardImg from '../../assets/dashboad.png';
import analyticsImg from '../../assets/report.png';

const Systems = () => {
  const [activeSystem, setActiveSystem] = useState('pos');
  const navigate = useNavigate();

  // Other images - using Unsplash URLs
  const lmsSystemImg = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  const financeSystemImg = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  const mobileAppImg = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  const integrationImg = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80';

  const systems = [
    {
      id: 'pos',
      title: 'Point of Sale (POS) System',
      tagline: 'Streamline Your Retail Operations',
      description: 'A comprehensive POS system designed to optimize your retail business operations, from inventory management to customer relationship management.',
      icon: '🛒',
      gradient: styles.gradientBlue,
      features: [
        'Real-time inventory tracking',
        'Multi-payment integration',
        'Customer loyalty programs',
        'Sales analytics & reporting',
        'Employee management',
        'Barcode scanning'
      ],
      image: posSystemImg, // Using the imported local image
      color: '#3b82f6'
    },
    {
      id: 'lms',
      title: 'Learning Management System (LMS)',
      tagline: 'Transform Education & Training',
      description: 'An intuitive LMS platform for educational institutions and corporate training, enabling seamless course management and student engagement.',
      icon: '📚',
      gradient: styles.gradientPurple,
      features: [
        'Course creation & management',
        'Interactive quizzes & assignments',
        'Progress tracking & analytics',
        'Video conferencing integration',
        'Mobile learning support',
        'Certificate generation'
      ],
      image: lmsSystemImg,
      color: '#8b5cf6'
    },
    {
      id: 'finance',
      title: 'Personal Financial Tracker',
      tagline: 'Master Your Financial Journey',
      description: 'A powerful personal finance management tool that helps individuals track expenses, set budgets, and achieve financial goals.',
      icon: '💰',
      gradient: styles.gradientGreen,
      features: [
        'Expense categorization',
        'Budget planning & tracking',
        'Investment portfolio management',
        'Bill payment reminders',
        'Financial goal setting',
        'Tax preparation assistance'
      ],
      image: financeSystemImg,
      color: '#10b981'
    }
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Real-time Updates',
      description: 'Live data synchronization across all devices'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting and insights'
    },
    {
      icon: '🛡️',
      title: 'Bank-level Security',
      description: 'Enterprise-grade security protocols'
    },
    {
      icon: '☁️',
      title: 'Cloud-Based',
      description: 'Access from anywhere, anytime'
    },
    {
      icon: '📱',
      title: 'Mobile Responsive',
      description: 'Fully optimized for mobile devices'
    },
    {
      icon: '🔄',
      title: '24/7 Support',
      description: 'Round-the-clock technical support'
    }
  ];

  const demoScreens = [
    {
      title: 'Dashboard Overview',
      description: 'Centralized control panel with real-time metrics',
      image: dashboardImg,
      system: 'all'
    },
    {
      title: 'Analytics & Reports',
      description: 'Detailed insights and performance analysis',
      image: analyticsImg,
      system: 'all'
    },
    {
      title: 'Mobile Application',
      description: 'On-the-go access to all system features',
      image: mobileAppImg,
      system: 'all'
    }
  ];

  const currentSystem = systems.find(system => system.id === activeSystem);

  return (
    <div className={styles.systemsContainer}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={`${styles.bgCircle} ${styles.circle1}`}></div>
        <div className={`${styles.bgCircle} ${styles.circle2}`}></div>
        <div className={`${styles.bgCircle} ${styles.circle3}`}></div>
        <div className={styles.bgGrid}></div>
        <div className={styles.floatingOrbs}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.floatingOrb} style={{
              animationDelay: `${i * 0.5}s`,
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}></div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span>🚀 Enterprise Systems</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Powerful <span className={styles.titleGradient}>Systems</span> for Modern Businesses
          </h1>
          
          <p className={styles.heroDescription}>
            Discover our comprehensive suite of enterprise-grade systems designed to streamline operations, 
            enhance productivity, and drive growth for businesses of all sizes.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⚡</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>99.9%</div>
                <div className={styles.statLabel}>Uptime Guarantee</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>👥</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>10K+</div>
                <div className={styles.statLabel}>Active Users</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🛡️</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>256-bit</div>
                <div className={styles.statLabel}>Encryption</div>
              </div>
            </div>
          </div>

          <div className={styles.heroActions}>
            <button className={styles.ctaPrimary} onClick={() => navigate('/contact')}>
              Request Demo
            </button>
            <button className={styles.ctaSecondary} onClick={() => document.querySelector(`.${styles.systemsSection}`).scrollIntoView({ behavior: 'smooth' })}>
              Explore Systems
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.systemCardsPreview}>
            {systems.map((system, index) => (
              <div 
                key={system.id}
                className={`${styles.previewCard} ${styles[`card${index + 1}`]}`}
                style={{ '--system-color': system.color }}
                onClick={() => setActiveSystem(system.id)}
              >
                <div className={`${styles.cardIcon} ${system.gradient}`}>
                  {system.icon}
                </div>
                <h3>{system.title.split(' ')[0]}</h3>
                <p>{system.tagline}</p>
              </div>
            ))}
          </div>
          <div className={styles.visualGlow}></div>
        </div>
      </div>

      {/* Systems Overview Section */}
      <div className={styles.systemsSection}>
        <div className={styles.sectionHeader}>
          <h2>Our <span className={styles.highlight}>Systems</span></h2>
          <p>Comprehensive solutions tailored for different business needs</p>
        </div>

        <div className={styles.systemTabs}>
          {systems.map((system) => (
            <button
              key={system.id}
              className={`${styles.systemTab} ${activeSystem === system.id ? styles.active : ''}`}
              onClick={() => setActiveSystem(system.id)}
              style={{
                borderColor: activeSystem === system.id ? system.color : 'transparent',
                background: activeSystem === system.id ? `${system.color}20` : 'transparent'
              }}
            >
              <div className={`${styles.tabIcon} ${system.gradient}`}>
                {system.icon}
              </div>
              <span>{system.title}</span>
            </button>
          ))}
        </div>

        {currentSystem && (
          <div className={styles.systemDetails}>
            <div className={styles.systemInfo}>
              <div className={styles.systemHeader}>
                <div className={`${styles.systemIcon} ${currentSystem.gradient}`}>
                  {currentSystem.icon}
                </div>
                <div>
                  <h3 className={styles.systemTitle}>{currentSystem.title}</h3>
                  <p className={styles.systemTagline}>{currentSystem.tagline}</p>
                </div>
              </div>
              
              <p className={styles.systemDescription}>{currentSystem.description}</p>
              
              <div className={styles.featuresGrid}>
                {currentSystem.features.map((feature, index) => (
                  <div key={index} className={styles.featureItem}>
                    <div className={styles.featureCheck}>✓</div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className={styles.systemActions}>
                <button className={styles.demoButton} onClick={() => navigate('/contact')}>
                  Request Live Demo
                </button>
                <button className={styles.docsButton} onClick={() => navigate(`/docs/${currentSystem.id}`)}>
                  View Documentation
                </button>
              </div>
            </div>

            <div className={styles.systemVisual}>
              <div className={styles.imageContainer}>
                <img 
                  src={currentSystem.image} 
                  alt={currentSystem.title}
                  className={styles.systemImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/500x300/0a192f/64ffda?text=${encodeURIComponent(currentSystem.title)}`;
                  }}
                />
                <div className={styles.imageGlow} style={{ background: currentSystem.color }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Core <span className={styles.highlight}>Features</span></h2>
          <p>Powerful capabilities across all our systems</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <span className={styles.featureIconEmoji}>{feature.icon}</span>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Screens Section */}
      <div className={styles.demoSection}>
        <div className={styles.sectionHeader}>
          <h2>System <span className={styles.highlight}>Preview</span></h2>
          <p>Explore our intuitive interfaces and powerful dashboards</p>
        </div>

        <div className={styles.demoGrid}>
          {demoScreens.map((screen, index) => (
            <div key={index} className={styles.demoCard}>
              <div className={styles.demoImageContainer}>
                <img 
                  src={screen.image} 
                  alt={screen.title}
                  className={styles.demoImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/400x200/0a192f/64ffda?text=${encodeURIComponent(screen.title)}`;
                  }}
                />
                <div className={styles.demoOverlay}>
                  <button className={styles.viewButton}>
                    Expand View
                  </button>
                </div>
              </div>
              <div className={styles.demoContent}>
                <h3 className={styles.demoTitle}>{screen.title}</h3>
                <p className={styles.demoDescription}>{screen.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <div className={styles.badge}>
              <span>🎯 Get Started Today</span>
            </div>
            <h2>Ready to Transform Your Business?</h2>
            <p>Schedule a personalized demo and discover how our systems can revolutionize your operations. Our experts will guide you through every feature.</p>
            <div className={styles.ctaActions}>
              <button className={styles.ctaPrimary} onClick={() => navigate('/contact')}>
                Book a Demo
              </button>
              <button className={styles.ctaSecondary} onClick={() => navigate('/pricing')}>
                View Pricing
              </button>
            </div>
          </div>
          <div className={styles.ctaGraphic}>
            <div className={styles.ctaIcon}>🚀</div>
            <div className={styles.ctaParticles}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={styles.particle} style={{
                  animationDelay: `${i * 0.3}s`,
                  background: systems[i]?.color
                }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Systems;