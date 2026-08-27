import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Services.module.css';

import websiteDevImg from '../../assets/webpost.jpeg';

const Services = () => {
  const [activeService, setActiveService] = useState('website');
  const [hoveredService, setHoveredService] = useState(null);
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

  // =========================================================
  // IMAGE URLS
  // =========================================================

  const systemDevImg =
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';

  const mobileAppImg =
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';

  const ecommerceImg =
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';

  const digitalMarketingImg =
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1115&q=80';

  const posSystemImg =
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80';

  const lmsSystemImg =
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80';

  const financeSystemImg =
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1011&q=80';

  // =========================================================
  // SERVICES
  // =========================================================

  const services = [
    {
      id: 'website',
      title: 'Web Development',
      tagline: 'Stunning Digital Experiences',
      description:
        'Create beautiful, responsive, and high-performing websites that convert visitors into customers. 48-hour delivery available.',
      icon: '💻',
      gradient: styles.gradientPurple,
      features: [
        'Custom Website Design',
        'Responsive UI/UX Designs',
        'E-commerce Integration',
        'CMS Management',
        'SEO & Ai Optimization',
        'FREE .lk Domains',
      ],
      image: websiteDevImg,
      color: '#8b5cf6',
      packages: [
        {
          name: 'Starter',
          price: '$150',
          features: [
            '5 Pages',
            'Responsive Design',
            'Basic SEO',
            'Contact Form',
            '1 Month Support',
          ],
        },
        {
          name: 'Professional',
          price: '$250',
          features: [
            '10 Pages',
            'E-commerce Ready',
            'Advanced SEO',
            'CMS Integration',
            '3 Months Support',
          ],
        },
        {
          name: 'Enterprise',
          price: '$350',
          features: [
            '20 Pages',
            'Custom Features',
            'Full SEO + Ai Optimization',
            'API Integration',
            '6 Months Support',
          ],
        },
      ],
    },

    {
      id: 'pos',
      title: 'POS Systems',
      tagline: 'Complete Retail Solutions',
      description:
        'Offline and cloud-based Point of Sale systems for supermarkets, restaurants, bookshops, pharmacies, and hardware stores.',
      icon: '🛒',
      gradient: styles.gradientBlue,
      features: [
        'Offline & Cloud Based',
        'Inventory Management',
        'Sales Tracking',
        'Customer Management',
        'Analytics & Reporting',
        'Multi-Branch Support',
      ],
      image: posSystemImg,
      color: '#3b82f6',
      packages: [
        {
          name: 'Single-Store POS',
          price: '$100',
          features: [
            'Single Location',
            'Basic Inventory',
            'Sales Tracking',
            'Basic Reports',
          ],
        },
        {
          name: 'Multi-Store POS',
          price: '$200',
          features: [
            'Additional Two-Branch',
            'Advanced Inventory Management',
            'Sales Tracking & Reporting',
            'Stock Management',
            'Customer Management',
            'Analytics',
            '24/7 Support'
          ],
        },
        {
          name: 'Enterprise-Store POS',
          price: '$300',
          features: [
            'Full Customizations',
            'Multi-Branch Capabilities',
            'Cloud Sync',
            'Advanced Enterprise Analytics',
            'Automated Notifications',
            'Mobile App',
            'Ai Bot Integration',
            'Automated Reports',
            'Purchase Pattern Recommendations',
            'Stock Alerts',
            'Inbuilt Customer Loyalty Program',
            '24/7 Support',
          ],
        },
      ],
    },

    {
      id: 'design',
      title: 'Concept Flyers & 3D Design',
      tagline: 'Creative Visual Solutions',
      description:
        'Professional design services including film posters, concert posters, and 3D designs for your marketing needs.',
      icon: '🎨',
      gradient: styles.gradientPink,
      features: [
        'Film Posters',
        'Concert Posters',
        '3D Design',
        'Brand Identity',
        'Creative Concepts',
        'Print Ready Files',
      ],
      image: digitalMarketingImg,
      color: '#ec4899',
      packages: [
        {
          name: 'Basic Design',
          price: '$20',
          features: [
            'Single Poster',
            'Basic Design',
            '2 Revisions',
            'Digital Files',
          ],
        },
        {
          name: 'Professional',
          price: '$50',
          features: [
            'Multiple Designs',
            '3D Elements',
            '5 Revisions',
            'Print Ready',
          ],
        },
        {
          name: 'Enterprise',
          price: '$150',
          features: [
            'Full Campaign',
            '3D Design',
            'Unlimited Revisions',
            'Brand Guidelines',
          ],
        },
      ],
    },

    {
      id: 'software',
      title: 'Custom Software',
      tagline: 'Tailored Business Solutions',
      description:
        'Custom software solutions to streamline your business operations and solve complex challenges.',
      icon: '⚙️',
      gradient: styles.gradientOrange,
      features: [
        'Custom Solutions',
        'System Integration',
        'API Development',
        'Cloud Solutions',
        'Maintenance Support',
        'Scalable Architecture',
      ],
      image: systemDevImg,
      color: '#f59e0b',
      packages: [
        {
          name: 'Starter',
          price: '$450',
          features: [
            'Basic Features',
            'Single Module',
            '6 Months Support',
            'Basic Reporting',
          ],
        },
        {
          name: 'Professional',
          price: '$600',
          features: [
            'Multiple Modules',
            'Custom Features',
            '1 Year Support',
            'Advanced Analytics',
          ],
        },
        {
          name: 'Enterprise',
          price: '$750',
          features: [
            'Full Customization',
            'All Modules',
            'Lifetime Support',
            'AI Integration',
          ],
        },
      ],
    },

    {
      id: 'mobile',
      title: 'Mobile Apps',
      tagline: 'Engage Your Mobile Audience',
      description:
        'Develop stunning native and cross-platform mobile apps that provide seamless user experiences.',
      icon: '📱',
      gradient: styles.gradientGreen,
      features: [
        'iOS & Android Development',
        'Cross-platform Apps',
        'UI/UX Design',
        'App Store Optimization',
        'Push Notifications',
        'Backend Integration',
      ],
      image: mobileAppImg,
      color: '#10b981',
      packages: [
        {
          name: 'Basic App',
          price: '$600',
          features: [
            'Single Platform',
            'Basic Features',
            '6 Months Updates',
            'Simple Backend',
          ],
        },
        {
          name: 'Pro App',
          price: '$900',
          features: [
            'Both Platforms',
            'Advanced Features',
            '1 Year Updates',
            'Custom Backend',
          ],
        },
        {
          name: 'Enterprise App',
          price: '$1,500',
          features: [
            'All Platforms',
            'Complex Features',
            'Lifetime Updates',
            'Full Integration',
          ],
        },
      ],
    },
  ];

  // =========================================================
  // SYSTEMS
  // =========================================================

  const systems = [
    {
      id: 'pos',
      title: 'POS System',
      description: 'Complete Point of Sale solution for retail businesses',
      icon: '🛒',
      color: '#3b82f6',
      features: [
        'Inventory Management',
        'Sales Analytics',
        'Customer Management',
      ],
    },

    {
      id: 'lms',
      title: 'LMS System',
      description:
        'Learning Management System for educational institutions',
      icon: '📚',
      color: '#8b5cf6',
      features: [
        'Course Management',
        'Student Tracking',
        'Assessment Tools',
      ],
    },

    {
      id: 'finance',
      title: 'Financial Tracker',
      description:
        'Comprehensive financial management and tracking system',
      icon: '💰',
      color: '#10b981',
      features: [
        'Expense Tracking',
        'Budget Planning',
        'Investment Management',
      ],
    },
  ];

  // =========================================================
  // PROCESS
  // =========================================================

  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description:
        'We analyze your requirements and create a detailed project plan',
      icon: '🔍',
    },

    {
      number: '02',
      title: 'Design & Prototyping',
      description:
        'Create stunning designs and interactive prototypes',
      icon: '🎨',
    },

    {
      number: '03',
      title: 'Development',
      description:
        'Build robust solutions with modern technologies',
      icon: '💻',
    },

    {
      number: '04',
      title: 'Testing & Quality',
      description:
        'Rigorous testing ensures flawless performance',
      icon: '🧪',
    },

    {
      number: '05',
      title: 'Launch & Deployment',
      description:
        'Smooth deployment with zero downtime',
      icon: '🚀',
    },

    {
      number: '06',
      title: 'Support & Maintenance',
      description:
        'Ongoing support and regular updates',
      icon: '🛠️',
    },
  ];

  // =========================================================
  // CURRENT SERVICE
  // =========================================================

  const currentService = services.find(
    (service) => service.id === activeService
  );

  // =========================================================
  // SERVICE SELECT
  // =========================================================

  const handleServiceSelect = (serviceId) => {
    setActiveService(serviceId);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const detailsElement =
          document.getElementById('service-details');

        if (detailsElement) {
          detailsElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  };

  // =========================================================
  // ANCHOR NAVIGATION
  // =========================================================

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Handle card tilt effect
  const handleCardTilt = (e, index) => {
    const card = document.querySelector(`[data-service-card="${index}"]`);
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
    const card = document.querySelector(`[data-service-card="${index}"]`);
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className={styles.servicesContainer}>
      
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

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <div
        id="hero"
        className={styles.heroSection}
        data-section="hero"
      >
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
              <span>✦ Our Services</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span>Transform Your</span>

              <span className={styles.highlightText}>
                Digital Presence
              </span>

              <span>with Our Services</span>
            </h1>

            <p className={styles.heroDescription}>
              We deliver exceptional digital solutions that drive
              growth, enhance engagement, and transform businesses.
              From concept to launch, we're with you every step of
              the way.
            </p>

            {/* HERO STATS */}

            <div className={styles.heroStats}>

              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  100+
                </span>

                <span className={styles.statLabel}>
                  Projects Delivered
                </span>
              </div>

              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  99.9%
                </span>

                <span className={styles.statLabel}>
                  Satisfaction
                </span>
              </div>

              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  24/7
                </span>

                <span className={styles.statLabel}>
                  Support Available
                </span>
              </div>

            </div>

            {/* HERO BUTTONS */}

            <div className={styles.heroButtons}>

              <button
                className={styles.primaryButton}
                onClick={() => navigate('/contact')}
              >
                Start Your Project

                <span className={styles.buttonArrow}>
                  →
                </span>
              </button>

              <button
                className={styles.secondaryButton}
                onClick={() =>
                  document
                    .querySelector(`.${styles.servicesGrid}`)
                    ?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                }
              >
                <span className={styles.playIcon}>
                  ▶
                </span>

                Explore Services
              </button>

            </div>

          </div>

          {/* HERO VISUAL */}

          <div className={styles.heroVisual}>

            <div className={styles.heroCard3D} style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`
            }}>

              <div className={styles.heroCardHeader}>

                <div className={styles.cardDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <span className={styles.cardTitle}>
                  Our Services
                </span>

              </div>

              <div className={styles.heroCardContent}>

                <div className={styles.cardMetrics}>

                  {services.slice(0, 4).map(
                    (service) => (
                      <div
                        key={service.id}
                        className={styles.cardMetric}
                      >
                        <span className={styles.metricIcon}>
                          {service.icon}
                        </span>

                        <div>
                          <div
                            className={styles.metricValue}
                          >
                            {service.title}
                          </div>

                          <div
                            className={styles.metricLabel}
                          >
                            {service.tagline}
                          </div>
                        </div>
                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          SERVICES GRID SECTION
      ====================================================== */}

      <div
        className={styles.servicesSection}
        id="services"
        data-section="services"
      >

        <div className={styles.sectionContainer}>

          <div className={`${styles.sectionHeader} ${isVisible.services ? styles.visible : ''}`}>

            <div className={styles.sectionBadge}>
              <span>✦ What We Offer</span>
            </div>

            <h2 className={styles.sectionTitle}>
              Comprehensive{' '}
              <span className={styles.textGradient}>
                Digital Solutions
              </span>
            </h2>

            <p className={styles.sectionSubtitle}>
              We offer a complete suite of digital services
              designed to help your business thrive
            </p>

          </div>

          {/* SERVICES GRID */}

          <div className={styles.servicesGrid}>

            {services.map((service, index) => (

              <div
                key={service.id}
                className={`${styles.serviceCard} ${
                  activeService === service.id
                    ? styles.active
                    : ''
                } ${isVisible.services ? styles.visible : ''}`}
                data-service-card={index}
                onMouseMove={(e) => handleCardTilt(e, index)}
                onMouseLeave={() => resetCardTilt(index)}
                onMouseEnter={() =>
                  setHoveredService(service.id)
                }
                onMouseLeave={() =>
                  setHoveredService(null)
                }
                onClick={() =>
                  handleServiceSelect(service.id)
                }
                style={{
                  '--service-color': service.color,
                  transitionDelay: `${index * 0.1}s`,
                  transform:
                    hoveredService === service.id
                      ? 'translateY(-8px)'
                      : 'translateY(0)',
                }}
              >

                {/* SERVICE ICON */}

                <div className={styles.serviceIconWrapper}>
                  <span className={styles.serviceIcon}>
                    {service.icon}
                  </span>
                </div>

                {/* SERVICE TITLE */}

                <h3>
                  {service.title}
                </h3>

                {/* TAGLINE */}

                <p className={styles.serviceTagline}>
                  {service.tagline}
                </p>

                {/* DESCRIPTION */}

                <p className={styles.serviceDescription}>
                  {service.description}
                </p>

                {/* FEATURES */}

                <ul className={styles.serviceFeaturesList}>

                  {service.features
                    .slice(0, 4)
                    .map((feature, idx) => (

                      <li key={idx}>
                        ✓ {feature}
                      </li>

                    ))}

                </ul>

                {/* LEARN MORE */}

                <button
                  type="button"
                  className={styles.serviceButton}
                  onClick={(e) => {
                    e.stopPropagation();

                    handleServiceSelect(
                      service.id
                    );
                  }}
                >
                  Learn More{' '}
                  <span>→</span>
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* =====================================================
          SERVICE DETAILS SECTION
      ====================================================== */}

      {currentService && (

        <div
          id="service-details"
          className={styles.serviceDetails}
          data-section="details"
          style={{
            scrollMarginTop: '80px',
          }}
        >

          <div className={styles.sectionContainer}>

            <div className={styles.detailsContainer}>

              {/* DETAILS CONTENT */}

              <div className={styles.detailsContent}>

                <div className={styles.detailsHeader}>

                  <div
                    className={styles.detailsIcon}
                    style={{
                      background: `${currentService.color}20`,
                      color: currentService.color,
                    }}
                  >
                    {currentService.icon}
                  </div>

                  <div>

                    <h2>
                      {currentService.title}
                    </h2>

                    <p
                      className={
                        styles.detailsTagline
                      }
                      style={{
                        color: currentService.color,
                      }}
                    >
                      {currentService.tagline}
                    </p>

                  </div>

                </div>

                {/* DESCRIPTION */}

                <p
                  className={
                    styles.detailsDescription
                  }
                >
                  {currentService.description}
                </p>

                {/* FEATURES */}

                <div className={styles.featuresList}>

                  {currentService.features.map(
                    (feature, index) => (

                      <div
                        key={index}
                        className={
                          styles.featureListItem
                        }
                      >

                        <div
                          className={
                            styles.featureBullet
                          }
                          style={{
                            background:
                              currentService.color,
                          }}
                        ></div>

                        <span>
                          {feature}
                        </span>

                      </div>

                    )
                  )}

                </div>

                {/* PRICING */}

                <div
                  className={styles.pricingSection}
                >

                  <h3>
                    Flexible Pricing Plans
                  </h3>

                  <div
                    className={styles.pricingCards}
                  >

                    {currentService.packages.map(
                      (pkg, index) => (

                        <div
                          key={index}
                          className={
                            styles.pricingCard
                          }
                          style={{
                            borderColor: `${currentService.color}30`,
                          }}
                        >

                          <div
                            className={
                              styles.pricingHeader
                            }
                          >

                            <h4>
                              {pkg.name}
                            </h4>

                            <div
                              className={
                                styles.price
                              }
                              style={{
                                color:
                                  currentService.color,
                              }}
                            >
                              {pkg.price}
                            </div>
                              <p style={{ color: '#838282' ,fontSize: '0.805rem' }}>Upwards</p>
                          </div>

                          <ul
                            className={
                              styles.pricingFeatures
                            }
                          >

                            {pkg.features.map(
                              (
                                feature,
                                idx
                              ) => (

                                <li key={idx}>
                                  {feature}
                                </li>

                              )
                            )}

                          </ul>

                          <button
                            type="button"
                            className={
                              styles.pricingButton
                            }
                            onClick={() =>
                              navigate('/contact')
                            }
                            style={{
                              background: `${currentService.color}20`,
                              borderColor: `${currentService.color}40`,
                              color:
                                currentService.color,
                            }}
                          >
                            Choose Plan
                          </button>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>

              {/* DETAILS IMAGE */}

              <div className={styles.detailsVisual}>

                <div className={styles.imageWrapper}>

                  <img
                    src={currentService.image}
                    alt={currentService.title}
                    className={styles.detailsImage}
                    onError={(e) => {
                      e.target.onerror = null;

                      e.target.src =
                        `https://via.placeholder.com/500x300/1a1b3a/8b5cf6?text=${encodeURIComponent(
                          currentService.title
                        )}`;
                    }}
                  />

                  <div
                    className={styles.imageOverlay}
                    style={{
                      background: `linear-gradient(45deg, ${currentService.color}20, transparent)`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          PROCESS SECTION
      ====================================================== */}

      <div className={styles.processSection} data-section="process">

        <div className={styles.sectionContainer}>

          <div className={`${styles.sectionHeader} ${isVisible.process ? styles.visible : ''}`}>

            <div className={styles.sectionBadge}>
              <span>✦ Our Process</span>
            </div>

            <h2 className={styles.sectionTitle}>
              How We{' '}
              <span className={styles.textGradient}>
                Work
              </span>
            </h2>

            <p className={styles.sectionSubtitle}>
              A systematic approach to delivering
              exceptional results
            </p>

          </div>

          <div className={styles.processGrid}>

            {processSteps.map(
              (step, index) => (

                <div
                  key={index}
                  className={`${styles.processStep} ${isVisible.process ? styles.visible : ''}`}
                  data-service-card={`process-${index}`}
                  onMouseMove={(e) => handleCardTilt(e, `process-${index}`)}
                  onMouseLeave={() => resetCardTilt(`process-${index}`)}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >

                  <div
                    className={styles.stepNumber}
                  >
                    {step.number}
                  </div>

                  <div
                    className={styles.stepIcon}
                  >
                    {step.icon}
                  </div>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          CTA SECTION
      ====================================================== */}

      <div className={styles.ctaSection} data-section="cta">

        <div className={styles.ctaBackground3D} style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
        }}></div>

        <div className={styles.sectionContainer}>

          <div className={`${styles.ctaContent} ${isVisible.cta ? styles.visible : ''}`} style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
          }}>

            <div className={styles.ctaBadge}>
              <span>
                ✦ Let's Build Something Together
              </span>
            </div>

            <h2 className={styles.ctaTitle}>
              Ready to Start Your{' '}
              <span>Project</span>?
            </h2>

            <p className={styles.ctaDescription}>
              Let's discuss your ideas and create
              something amazing together. Get a free
              consultation and project estimate.
            </p>

            <div className={styles.ctaButtons}>

              <button
                type="button"
                className={styles.ctaPrimary}
                onClick={() =>
                  navigate('/contact')
                }
              >
                Get Free Consultation
              </button>

              <button
                type="button"
                className={styles.ctaSecondary}
                onClick={() =>
                  navigate('/portfolio')
                }
              >
                View Our Work
              </button>

            </div>

            <div className={styles.ctaGuarantee}>

              <span>
                ⚡ 48-Hour Delivery
              </span>

              <span>
                🕐 24/7 Support
              </span>

              <span>
                ⭐ 100% Satisfaction
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Services;