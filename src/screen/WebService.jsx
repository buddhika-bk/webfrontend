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

  // Handle card tilt effect
  const handleCardTilt = (e, index) => {
    const card = document.querySelector(`[data-web-card="${index}"]`);
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
    const card = document.querySelector(`[data-web-card="${index}"]`);
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="hero" className={styles.webserviceContainer}>
      
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
      <div id="hero" className={styles.heroSection} data-section="hero">
        <div className={styles.heroBackground3D} style={{
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`
        }}>
          <div className={styles.heroSphere}></div>
        </div>
        
        <div id="hero" className={styles.heroContent} style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
        }}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span className={styles.pulseDot}></span>
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
            <div className={styles.heroCard3D} style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`
            }}>
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

      {/* ===== SERVICES SECTION ===== */}
      <div className={styles.servicesSection} data-section="services">
        <div className={styles.sectionContainer}>
          <div className={`${styles.sectionHeader} ${isVisible.services ? styles.visible : ''}`}>
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
                className={`${styles.serviceCard} ${activeService === index ? styles.active : ''} ${isVisible.services ? styles.visible : ''}`}
                data-web-card={`service-${index}`}
                onMouseMove={(e) => handleCardTilt(e, `service-${index}`)}
                onMouseLeave={() => resetCardTilt(`service-${index}`)}
                onMouseEnter={() => setActiveService(index)}
                style={{ 
                  '--service-color': service.color,
                  transitionDelay: `${index * 0.1}s`
                }}
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

      {/* ===== DEMO SHOWCASE SECTION ===== */}
      <div className={styles.demoSection} data-section="demos">
        <div className={styles.sectionContainer}>
          <div className={`${styles.sectionHeader} ${isVisible.demos ? styles.visible : ''}`}>
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
                className={`${styles.demoCard} ${isVisible.demos ? styles.visible : ''}`}
                data-web-card={`demo-${index}`}
                onMouseMove={(e) => handleCardTilt(e, `demo-${index}`)}
                onMouseLeave={() => resetCardTilt(`demo-${index}`)}
                onClick={() => navigate(button.path)}
                style={{ 
                  '--demo-color': button.color,
                  transitionDelay: `${index * 0.1}s`
                }}
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