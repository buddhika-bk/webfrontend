import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WebServiceStyle.module.css';

// Import images
import demoshopImg from '../assets/demoshop.png';
import bagImg from '../assets/demobag.png';
import shoeImg from '../assets/demoshoe.png';
import cartImg from '../assets/democard.png';
import dressImg from '../assets/demodress.png';
import phoneImg from '../assets/demophone.png';
import saloonImg from '../assets/demosaloon.png';

const WebService = () => {
  const [activeService, setActiveService] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Web Design & Development",
      description: "We create visually appealing and user-friendly websites that are optimized for performance and functionality. Our designs are responsive, ensuring a seamless experience across all devices.",
      icon: "💻",
      color: "#3b82f6",
      features: ["Responsive Design", "Custom UI/UX", "Performance Optimized", "SEO Friendly"]
    },
    {
      title: "E-commerce Solutions",
      description: "We develop robust e-commerce platforms that enable you to sell products and services online. Our solutions include secure payment gateways, inventory management, and user-friendly interfaces.",
      icon: "🛒",
      color: "#8b5cf6",
      features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Secure Checkout"]
    },
    {
      title: "Search Engine Optimization (SEO)",
      description: "Our SEO services help improve your website's visibility on search engines, driving organic traffic and increasing your online reach. We use proven strategies to enhance your search rankings.",
      icon: "📈",
      color: "#10b981",
      features: ["Keyword Research", "On-Page SEO", "Link Building", "Analytics Tracking"]
    },
    {
      title: "Content Management Systems (CMS)",
      description: "We implement user-friendly CMS solutions that allow you to easily manage and update your website content without technical expertise. Popular CMS options include WordPress, Joomla, and Drupal.",
      icon: "⚙️",
      color: "#f59e0b",
      features: ["Easy Content Management", "Custom Templates", "Plugin Integration", "User Management"]
    },
    {
      title: "Web Hosting & Maintenance",
      description: "We provide reliable web hosting services to ensure your website is always accessible. Our maintenance packages include regular updates, backups, and security monitoring.",
      icon: "🔧",
      color: "#6366f1",
      features: ["24/7 Monitoring", "Regular Backups", "Security Updates", "Performance Optimization"]
    }
  ];

  const demoButtons = [
    { 
      path: '/demoshop', 
      label: 'Demo Shop Home Page',
      image: demoshopImg,
      color: '#3b82f6'
    },
    { 
      path: '/demosaloon', 
      label: 'Demo Salon Web Page',
      image: saloonImg,
      color: '#06b6d4'
    },
    { 
      path: '/demoBag', 
      label: 'Item View Page (Bag)',
      image: bagImg,
      color: '#8b5cf6'
    },
    { 
      path: '/demoshoe', 
      label: 'Item View Page (Shoes)',
      image: shoeImg,
      color: '#10b981'
    },
    { 
      path: '/demoCard', 
      label: 'Add to Cart Page',
      image: cartImg,
      color: '#f59e0b'
    },
    { 
      path: '/demodress', 
      label: 'DressPoint Dress View Page',
      image: dressImg,
      color: '#6366f1'
    },
    { 
      path: '/demophone', 
      label: 'Phone Item View Page',
      image: phoneImg,
      color: '#ec4899'
    }
  ];

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="hero" className={styles.webserviceContainer}>
      

      {/* Hero Section - Matching Home Page */}
     <div id="hero" className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        
        <div id="hero" className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>✦ Premium Web Services</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              <span>Transform Your</span>
              <span className={styles.highlightText}>Digital Presence</span>
              <span>with Our Web Services</span>
            </h1>
            
            <p id="hero" className={styles.heroDescription}>
              We offer a comprehensive range of web services to help you establish and grow your online presence. 
              Our team of experts is dedicated to delivering high-quality solutions tailored to your specific needs.
            </p>
            
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>98%</span>
                <span className={styles.statLabel}>Client Satisfaction</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>48hr</span>
                <span className={styles.statLabel}>Delivery Time</span>
              </div>
            </div>
            
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton} onClick={() => navigate('/contact')}>
                Start Your Project
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button className={styles.secondaryButton} onClick={() => document.querySelector(`.${styles.servicesSection}`)?.scrollIntoView({ behavior: 'smooth' })}>
                <span className={styles.playIcon}>▶</span>
                View Services
              </button>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardHeader}>
                <div className={styles.cardDots}>
                  <span></span><span></span><span></span>
                </div>
                <span className={styles.cardTitle}>Web Services</span>
              </div>
              <div className={styles.heroCardContent}>
                <div className={styles.cardMetrics}>
                  {services.slice(0, 4).map((service, index) => (
                    <div key={index} className={styles.cardMetric}>
                      <span className={styles.metricIcon}>{service.icon}</span>
                      <div>
                        <div className={styles.metricValue}>{service.title.split('&')[0].trim()}</div>
                        <div className={styles.metricLabel}>{service.features[0]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section - Matching Home Page */}
      <div className={styles.servicesSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Our Services</span>
            </div>
            <h2 className={styles.sectionTitle}>Comprehensive <span className={styles.textGradient}>Web Solutions</span></h2>
            <p className={styles.sectionSubtitle}>
              Comprehensive web solutions tailored for your business growth and success
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div 
                key={index}
                className={`${styles.serviceCard} ${activeService === index ? styles.active : ''}`}
                onMouseEnter={() => setActiveService(index)}
                style={{ '--service-color': service.color }}
              >
                <div className={styles.serviceIconWrapper}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <button className={styles.serviceCta}>
                  Learn More <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Showcase Section - Matching Home Page Style */}
      <div className={styles.demoSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Explore Our Demos</span>
            </div>
            <h2 className={styles.sectionTitle}>Experience Our <span className={styles.textGradient}>Work</span></h2>
            <p className={styles.sectionSubtitle}>
              Explore our interactive demo pages showcasing real projects
            </p>
          </div>
          
          <div className={styles.demoGrid}>
            {demoButtons.map((button, index) => (
              <div 
                key={index}
                className={styles.demoCard}
                onClick={() => navigate(button.path)}
                style={{ '--demo-color': button.color }}
              >
                <div className={styles.demoImageContainer}>
                  <img 
                    src={button.image} 
                    alt={button.label}
                    className={styles.demoImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/400x220/${button.color.slice(1)}/ffffff?text=${encodeURIComponent(button.label)}`;
                    }}
                  />
                  <div className={styles.demoOverlay}>
                    <span className={styles.viewDemo}>View Demo →</span>
                  </div>
                </div>
                <div className={styles.demoContent}>
                  <h3 className={styles.demoTitle}>{button.label}</h3>
                  <button className={styles.demoButton} style={{ borderColor: button.color, color: button.color }}>
                    Explore Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Matching Home Page */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaBackground}></div>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBadge}>
              <span>✦ Ready to Start</span>
            </div>
            <h2 className={styles.ctaTitle}>
              Ready to Start Your <span>Project</span>?
            </h2>
            <p className={styles.ctaDescription}>
              Let's create something amazing together. Get in touch with our team today and let's discuss how we can bring your vision to life.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary} onClick={() => navigate('/contact')}>
                Get Started Today
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button className={styles.ctaSecondary} onClick={() => navigate('/portfolio')}>
                View Portfolio
              </button>
            </div>
            <div className={styles.ctaGuarantee}>
              <span>⚡ 48-Hour Delivery</span>
              <span>🕐 24/7 Support</span>
              <span>⭐ 100% Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebService;