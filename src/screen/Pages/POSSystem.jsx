import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './POSSystem.module.css';

// Import images (you'll need to add these to your assets)
import posDashboardImg from '../../assets/pos.jpeg';
import posHardwareImg from '../../assets/pos-hardware.jpg';
import posMobileImg from '../../assets/mobile.jpeg';
import posCloudImg from '../../assets/dashboadclude.jpeg';

const POSSystem = () => {
  const [activeTab, setActiveTab] = useState('offline');
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    // Intersection Observer for scroll reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    document.querySelectorAll('[data-section]').forEach((el) => {
      observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  // POS Features
  const posFeatures = [
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Track sales, inventory, and customer data in real-time with powerful analytics dashboards.'
    },
    {
      icon: '🛒',
      title: 'Inventory Management',
      description: 'Efficiently manage stock levels, track inventory movements, and automate reordering processes.'
    },
    {
      icon: '👤',
      title: 'Customer Management',
      description: 'Build detailed customer profiles, track purchase history, and enhance loyalty programs.'
    },
    {
      icon: '📱',
      title: 'Mobile POS',
      description: 'Process transactions anywhere in your store with mobile POS capabilities.'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Accept all major payment methods with bank-grade security and encryption.'
    },
    {
      icon: '📈',
      title: 'Sales Reports',
      description: 'Generate comprehensive reports with detailed insights into your business performance.'
    }
  ];

  // Hardware Components
  const hardwareComponents = [
    {
      icon: '🖥️',
      title: 'Monitor',
      description: 'High-resolution display for clear view of transactions and system interface.'
    },
    {
      icon: '💻',
      title: 'CPU / POS Terminal',
      description: 'Powerful processing unit for smooth and fast transaction processing.'
    },
    {
      icon: '📷',
      title: 'Barcode Reader',
      description: 'Quick and accurate barcode scanning for fast checkout and inventory management.'
    },
    {
      icon: '🖨️',
      title: 'Bill Printer',
      description: 'High-speed thermal receipt printer for customer invoices and receipts.'
    },
    {
      icon: '🏷️',
      title: 'Barcode Printer',
      description: 'Print custom barcode labels for products and inventory management.'
    },
    {
      icon: '🖱️',
      title: 'Touch Display',
      description: 'Intuitive touch screen interface for easy navigation and quick transactions.'
    },
    {
      icon: '🔋',
      title: 'UPS (Uninterruptible Power Supply)',
      description: 'Backup power supply to ensure uninterrupted operations during power outages.'
    },
    {
      icon: '💰',
      title: 'Cash Drawer',
      description: 'Secure cash management system with automated opening and closing features.'
    }
  ];

  // POS Benefits
  const posBenefits = [
    {
      title: 'Increased Efficiency',
      description: 'Streamline your checkout process and reduce waiting times for customers.',
      icon: '⚡'
    },
    {
      title: 'Accurate Inventory',
      description: 'Real-time inventory tracking with automatic stock updates and alerts.',
      icon: '📦'
    },
    {
      title: 'Better Customer Experience',
      description: 'Provide faster service, personalized offers, and seamless payment options.',
      icon: '⭐'
    },
    {
      title: 'Data-Driven Decisions',
      description: 'Make informed business decisions with detailed sales and customer analytics.',
      icon: '📊'
    },
    {
      title: 'Cost Reduction',
      description: 'Minimize errors, reduce theft, and optimize operational costs.',
      icon: '💰'
    },
    {
      title: 'Business Growth',
      description: 'Scale your business with features designed for growth and expansion.',
      icon: '🚀'
    }
  ];

  // Industry Solutions
  const industrySolutions = [
    {
      icon: '🏪',
      title: 'Supermarkets',
      description: 'Complete POS with inventory, barcode scanning, and multi-branch management.'
    },
    {
      icon: '🍽️',
      title: 'Restaurants',
      description: 'Table management, order tracking, kitchen display, and billing.'
    },
    {
      icon: '📚',
      title: 'Bookshops',
      description: 'ISBN scanning, stock management, and customer loyalty programs.'
    },
    {
      icon: '💊',
      title: 'Pharmacies',
      description: 'Expiry tracking, prescription management, and compliance features.'
    },
    {
      icon: '🔧',
      title: 'Hardware Stores',
      description: 'Heavy inventory management, supplier management, and bulk pricing.'
    }
  ];

  // Handle card tilt effect
  const handleCardTilt = (e, index) => {
    const card = document.querySelector(`[data-card="${index}"]`);
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const resetCardTilt = (index) => {
    const card = document.querySelector(`[data-card="${index}"]`);
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div className={styles.posContainer}>
      
      {/* ===== 3D ANIMATED BACKGROUND ===== */}
      <div className={styles.threeDBackground}>
        <div className={styles.gridLines}></div>
        <div className={styles.floatingOrb} style={{ 
          left: `${50 + mousePos.x * 20}%`, 
          top: `${50 + mousePos.y * 20}%` 
        }}></div>
        <div className={styles.floatingOrb2} style={{ 
          left: `${30 + mousePos.x * -10}%`, 
          top: `${30 + mousePos.y * -10}%` 
        }}></div>
        <div className={styles.floatingOrb3} style={{ 
          left: `${70 + mousePos.x * -15}%`, 
          top: `${40 + mousePos.y * 15}%` 
        }}></div>
        <div className={styles.particles}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={styles.particle} style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}></div>
          ))}
        </div>
      </div>

      {/* ===== SCROLL PROGRESS BAR ===== */}
      <div className={styles.scrollProgressBar} style={{ width: `${scrollProgress}%` }}></div>

      {/* ===== HERO SECTION ===== */}
      <div className={styles.heroSection} data-section="hero">
        <div className={styles.heroBackground3D} style={{
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`
        }}>
          <div className={styles.heroSphere}></div>
        </div>
        
        <div className={styles.heroContent} style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
        }}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span className={styles.pulseDot}></span>
              <span>✦ Complete POS System</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              <span>Revolutionize Your</span>
              <span className={styles.highlightText}>Retail Operations</span>
              <span>with Our POS System</span>
            </h1>
            
            <p className={styles.heroDescription}>
              WebPoint POS is a complete Point of Sale solution designed for businesses of all sizes. 
              From small retail stores to large supermarket chains, our POS system streamlines operations, 
              boosts efficiency, and drives growth.
            </p>
            
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Industries Served</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Live Support</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>99.9%</span>
                <span className={styles.statLabel}>Satisfaction</span>
              </div>
            </div>
            
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton} onClick={() => navigate('/contact')}>
                Get Your POS System
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button className={styles.secondaryButton} onClick={() => document.querySelector(`.${styles.posTypesSection}`)?.scrollIntoView({ behavior: 'smooth' })}>
                <span className={styles.playIcon}>▶</span>
                Explore POS Types
              </button>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.heroCard3D} style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`
            }}>
              <div className={styles.heroCardHeader}>
                <div className={styles.cardDots}>
                  <span></span><span></span><span></span>
                </div>
                <span className={styles.cardTitle}>POS System</span>
              </div>
              <div className={styles.heroCardContent}>
                <div className={styles.cardMetrics}>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>🏪</span>
                    <div>
                      <div className={styles.metricValue}>Supermarkets</div>
                      <div className={styles.metricLabel}>Multi-Branch Support</div>
                    </div>
                  </div>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>🍽️</span>
                    <div>
                      <div className={styles.metricValue}>Restaurants</div>
                      <div className={styles.metricLabel}>Table & Order Management</div>
                    </div>
                  </div>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>💊</span>
                    <div>
                      <div className={styles.metricValue}>Pharmacies</div>
                      <div className={styles.metricLabel}>Expiry & Prescription Tracking</div>
                    </div>
                  </div>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>🔧</span>
                    <div>
                      <div className={styles.metricValue}>Hardware Stores</div>
                      <div className={styles.metricLabel}>Bulk & Supplier Management</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== POS TYPES SECTION ===== */}
      <div className={styles.posTypesSection} id="pos-types" data-section="posTypes">
        <div className={styles.sectionContainer}>
          <div className={`${styles.sectionHeader} ${isVisible.posTypes ? styles.visible : ''}`}>
            <div className={styles.sectionBadge}>
              <span>✦ POS Types</span>
            </div>
            <h2 className={styles.sectionTitle}>Choose Your <span className={styles.textGradient}>POS Solution</span></h2>
            <p className={styles.sectionSubtitle}>
              We offer both offline and cloud-based POS systems to suit your business needs
            </p>
          </div>

          <div className={styles.posTypesGrid}>
            {/* Offline POS */}
            <div 
              className={`${styles.posTypeCard} ${activeTab === 'offline' ? styles.active : ''} ${isVisible.posTypes ? styles.visible : ''}`}
              data-card="offline"
              onMouseMove={(e) => handleCardTilt(e, 'offline')}
              onMouseLeave={() => resetCardTilt('offline')}
            >
              <div className={styles.posTypeHeader}>
                <div className={styles.posTypeIcon}>📶</div>
                <h3>Offline POS System</h3>
              </div>
              <div className={styles.posTypeBadge}>One-Time Payment</div>
              <p className={styles.posTypeDescription}>
                Perfect for businesses with unreliable internet or remote locations. 
                Works completely offline with local data storage.
              </p>
              <ul className={styles.posTypeFeatures}>
                <li>✓ Works Without Internet</li>
                <li>✓ Local Data Storage</li>
                <li>✓ Syncs When Online</li>
                <li>✓ Reliable Performance</li>
                <li>✓ One-Time Payment</li>
                <li>✓ Full Admin Panel Control</li>
              </ul>
              <button className={styles.posTypeBtn} onClick={() => navigate('/contact')}>
                Get Offline POS
              </button>
            </div>

            {/* Cloud POS */}
            <div 
              className={`${styles.posTypeCard} ${activeTab === 'cloud' ? styles.active : ''} ${styles.cloudCard} ${isVisible.posTypes ? styles.visible : ''}`}
              data-card="cloud"
              onMouseMove={(e) => handleCardTilt(e, 'cloud')}
              onMouseLeave={() => resetCardTilt('cloud')}
            >
              <div className={styles.posTypeHeader}>
                <div className={styles.posTypeIcon}>☁️</div>
                <h3>Cloud POS System</h3>
              </div>
              <div className={styles.posTypeBadge} style={{ background: '#c4aef7' }}>Annually Subscription</div>
              <p className={styles.posTypeDescription}>
                Access your business anywhere, anytime. Real-time data sync across all locations 
                with advanced features and mobile app support.
              </p>
              <ul className={styles.posTypeFeatures}>
                <li>✓ Real-time Data Sync</li>
                <li>✓ Access Anywhere, Anytime</li>
                <li>✓ Automatic Backups</li>
                <li>✓ Multi-Branch Management</li>
                <li>✓ Mobile App Included</li>
                <li>✓ Live Chat Support</li>
              </ul>
              <button className={styles.posTypeBtn} style={{ background: '#8b5cf6' }} onClick={() => navigate('/contact')}>
                Get Cloud POS
              </button>
            </div>
          </div>

          {/* Additional Features for Cloud POS */}
          <div className={`${styles.cloudFeaturesSection} ${isVisible.posTypes ? styles.visible : ''}`}>
            <h3 style={{ color: '#e9ebf0' }}>Cloud POS Premium Features</h3>
            <div className={styles.cloudFeaturesGrid}>
              <div className={styles.cloudFeature}>
                <span className={styles.cloudFeatureIcon}>📱</span>
                <div>
                  <h4>Mobile App Included</h4>
                  <p>Full admin control from your smartphone with dedicated mobile application.</p>
                </div>
              </div>
              <div className={styles.cloudFeature}>
                <span className={styles.cloudFeatureIcon}>🤖</span>
                <div>
                  <h4>AI Report Generation</h4>
                  <p>Get intelligent insights and predictive analytics with AI-powered reporting.</p>
                </div>
              </div>
              <div className={styles.cloudFeature}>
                <span className={styles.cloudFeatureIcon}>💬</span>
                <div>
                  <h4>Live Chat Support</h4>
                  <p>Direct live chat contact to our software development company anytime via the system.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FEATURES SECTION ===== */}
      <div className={styles.featuresSection} data-section="features">
        <div className={styles.sectionContainer}>
          <div className={`${styles.sectionHeader} ${isVisible.features ? styles.visible : ''}`}>
            <div className={styles.sectionBadge}>
              <span>✦ Key Features</span>
            </div>
            <h2 className={styles.sectionTitle}>Powerful <span className={styles.textGradient}>POS Features</span></h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to manage your retail business efficiently
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {posFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`${styles.featureCard} ${isVisible.features ? styles.visible : ''}`}
                data-card={`feature-${index}`}
                onMouseMove={(e) => handleCardTilt(e, `feature-${index}`)}
                onMouseLeave={() => resetCardTilt(`feature-${index}`)}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={styles.featureIconWrapper}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== BENEFITS SECTION ===== */}
      <div className={styles.benefitsSection} data-section="benefits">
        <div className={styles.sectionContainer}>
          <div className={`${styles.sectionHeader} ${isVisible.benefits ? styles.visible : ''}`}>
            <div className={styles.sectionBadge}>
              <span>✦ Benefits</span>
            </div>
            <h2 className={styles.sectionTitle}>Why Choose Our <span className={styles.textGradient}>POS System</span></h2>
            <p className={styles.sectionSubtitle}>
              Transform your business with our comprehensive POS solution
            </p>
          </div>

          <div className={styles.benefitsGrid}>
            {posBenefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`${styles.benefitCard} ${isVisible.benefits ? styles.visible : ''}`}
                data-card={`benefit-${index}`}
                onMouseMove={(e) => handleCardTilt(e, `benefit-${index}`)}
                onMouseLeave={() => resetCardTilt(`benefit-${index}`)}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={styles.benefitIcon}>{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== HARDWARE SECTION ===== */}
      <div className={styles.hardwareSection} data-section="hardware">
        <div className={styles.sectionContainer}>
          <div className={`${styles.sectionHeader} ${isVisible.hardware ? styles.visible : ''}`}>
            <div className={styles.sectionBadge}>
              <span>✦ Hardware</span>
            </div>
            <h2 className={styles.sectionTitle}>Complete <span className={styles.textGradient}>Hardware</span> Solutions</h2>
            <p className={styles.sectionSubtitle}>
              All hardware components included with your POS system
            </p>
          </div>

          <div className={styles.hardwareGrid}>
            {hardwareComponents.map((hardware, index) => (
              <div 
                key={index} 
                className={`${styles.hardwareCard} ${isVisible.hardware ? styles.visible : ''}`}
                data-card={`hardware-${index}`}
                onMouseMove={(e) => handleCardTilt(e, `hardware-${index}`)}
                onMouseLeave={() => resetCardTilt(`hardware-${index}`)}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className={styles.hardwareIcon}>{hardware.icon}</div>
                <h4>{hardware.title}</h4>
                <p>{hardware.description}</p>
              </div>
            ))}
          </div>

          <div className={`${styles.hardwareNote} ${isVisible.hardware ? styles.visible : ''}`}>
            <p>🔧 All hardware comes with installation support and 1-year warranty</p>
          </div>
        </div>
      </div>

      {/* ===== INDUSTRIES SECTION ===== */}
      <div className={styles.industriesSection} data-section="industries">
        <div className={styles.sectionContainer}>
          <div className={`${styles.sectionHeader} ${isVisible.industries ? styles.visible : ''}`}>
            <div className={styles.sectionBadge}>
              <span>✦ Industries</span>
            </div>
            <h2 className={styles.sectionTitle}>Industries We <span className={styles.textGradient}>Serve</span></h2>
            <p className={styles.sectionSubtitle}>
              Customized POS solutions for various business types
            </p>
          </div>

          <div className={styles.industriesGrid}>
            {industrySolutions.map((industry, index) => (
              <div 
                key={index} 
                className={`${styles.industryCard} ${isVisible.industries ? styles.visible : ''}`}
                data-card={`industry-${index}`}
                onMouseMove={(e) => handleCardTilt(e, `industry-${index}`)}
                onMouseLeave={() => resetCardTilt(`industry-${index}`)}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={styles.industryIcon}>{industry.icon}</div>
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      <div className={styles.ctaSection} data-section="cta">
        <div className={styles.ctaBackground3D} style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
        }}></div>
        <div className={styles.sectionContainer}>
          <div className={`${styles.ctaContent} ${isVisible.cta ? styles.visible : ''}`} style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
          }}>
            <div className={styles.ctaBadge}>
              <span>✦ Get Your POS System</span>
            </div>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your <span>Retail Business</span>?
            </h2>
            <p className={styles.ctaDescription}>
              Get a free consultation and demo of our POS system. We'll help you choose the right 
              solution for your business needs.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary} onClick={() => navigate('/contact')}>
                Get Free Consultation
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button className={styles.ctaSecondary} onClick={() => navigate('/contact')}>
                Request a Demo
              </button>
            </div>
            <div className={styles.ctaGuarantee}>
              <span>⚡ Quick Setup</span>
              <span>🕐 24/7 Support</span>
              <span>⭐ 100% Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSSystem;