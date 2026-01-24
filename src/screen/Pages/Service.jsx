import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Services.module.css';

import websiteDevImg from '../../assets/webpost.jpeg';

const Services = () => {
  const [activeService, setActiveService] = useState('website');
  const [hoveredService, setHoveredService] = useState(null);
  const navigate = useNavigate();

  // Google Images URLs for services
 
  const systemDevImg = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  const mobileAppImg = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  const ecommerceImg = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  const digitalMarketingImg = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80';
  const posSystemImg = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80';
  const lmsSystemImg = 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80';
  const financeSystemImg = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1011&q=80';

  const services = [
    {
      id: 'website',
      title: 'Website Development',
      tagline: 'Stunning Digital Experiences',
      description: 'Create beautiful, responsive, and high-performing websites that convert visitors into customers. From landing pages to complex web applications.',
      icon: '🌐',
      gradient: styles.gradientPurple,
      features: [
        'Custom Website Design',
        'Responsive Development',
        'E-commerce Integration',
        'CMS Development',
        'SEO Optimization',
        'Performance Tuning'
      ],
      image: websiteDevImg,
      color: '#8b5cf6',
      packages: [
        { name: 'Basic', price: 'LKR 25,000/=', features: ['5 Pages', 'Responsive Design', 'Basic SEO', 'Contact Form', '1 Month Support'] },
        { name: 'Professional', price: 'LKR 40,000/=', features: ['15 Pages', 'E-commerce Ready', 'Advanced SEO', 'CMS Integration', '3 Months Support'] },
        { name: 'Enterprise', price: 'LKR 75,000/=', features: ['Unlimited Pages', 'Custom Features', 'Full SEO', 'API Integration', '6 Months Support'] }
      ]
    },
    {
      id: 'system',
      title: 'System Development',
      tagline: 'Robust Business Solutions',
      description: 'Build custom software systems tailored to your business needs. Streamline operations with powerful, scalable, and secure enterprise solutions.',
      icon: '⚙️',
      gradient: styles.gradientBlue,
      features: [
        'Custom Software Development',
        'ERP Systems',
        'CRM Solutions',
        'Inventory Management',
        'Automation Tools',
        'API Development'
      ],
      image: systemDevImg,
      color: '#3b82f6',
      packages: [
        { name: 'Starter', price: '$4,999', features: ['Basic Features', 'Single Module', '6 Months Support', 'Basic Reporting'] },
        { name: 'Professional', price: '$12,999', features: ['Multiple Modules', 'Custom Features', '1 Year Support', 'Advanced Analytics'] },
        { name: 'Enterprise', price: '$29,999+', features: ['Full Customization', 'All Modules', 'Lifetime Support', 'AI Integration'] }
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Applications',
      tagline: 'Engage Your Mobile Audience',
      description: 'Develop stunning native and cross-platform mobile apps that provide seamless user experiences and drive engagement.',
      icon: '📱',
      gradient: styles.gradientPink,
      features: [
        'iOS & Android Development',
        'Cross-platform Apps',
        'UI/UX Design',
        'App Store Optimization',
        'Push Notifications',
        'Backend Integration'
      ],
      image: mobileAppImg,
      color: '#ec4899',
      packages: [
        { name: 'Basic App', price: '$5,999', features: ['Single Platform', 'Basic Features', '6 Months Updates', 'Simple Backend'] },
        { name: 'Pro App', price: '$14,999', features: ['Both Platforms', 'Advanced Features', '1 Year Updates', 'Custom Backend'] },
        { name: 'Enterprise App', price: '$34,999+', features: ['All Platforms', 'Complex Features', 'Lifetime Updates', 'Full Integration'] }
      ]
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Solutions',
      tagline: 'Sell Anything, Anywhere',
      description: 'Launch and scale your online store with our complete e-commerce solutions. From setup to marketing, we handle it all.',
      icon: '🛒',
      gradient: styles.gradientOrange,
      features: [
        'Online Store Setup',
        'Payment Gateway Integration',
        'Inventory Management',
        'Order Processing',
        'Shipping Solutions',
        'Customer Management'
      ],
      image: ecommerceImg,
      color: '#f59e0b',
      packages: [
        { name: 'Starter Store', price: '$2,999', features: ['Basic Store', '50 Products', 'Payment Gateway', 'Basic Support'] },
        { name: 'Growth Store', price: '$6,999', features: ['Advanced Store', '500 Products', 'Multi-gateway', 'Priority Support'] },
        { name: 'Enterprise Store', price: '$19,999+', features: ['Custom Platform', 'Unlimited Products', 'Full Integration', '24/7 Support'] }
      ]
    },
    {
      id: 'marketing',
      title: 'Digital Marketing',
      tagline: 'Amplify Your Online Presence',
      description: 'Drive traffic, generate leads, and increase sales with our data-driven digital marketing strategies and campaigns.',
      icon: '📈',
      gradient: styles.gradientGreen,
      features: [
        'Post Design',
        'Social Media Marketing',
        'Vedio Production',
        'Content Marketing',
        'Email Marketing',
        'Analytics & Reporting'
      ],
      image: digitalMarketingImg,
      color: '#10b981',
      packages: [
        { name: 'Basic Plan', price: '$999/mo', features: ['SEO Audit', 'Social Media', 'Basic Analytics', 'Monthly Reports'] },
        { name: 'Growth Plan', price: '$2,999/mo', features: ['Full SEO', 'PPC Campaigns', 'Advanced Analytics', 'Weekly Reports'] },
        { name: 'Enterprise Plan', price: '$7,999/mo', features: ['Complete Strategy', 'Multi-channel', 'Real-time Analytics', 'Dedicated Team'] }
      ]
    }
  ];

  const systems = [
    {
      id: 'pos',
      title: 'POS System',
      description: 'Complete Point of Sale solution for retail businesses',
      icon: '🛒',
      color: '#3b82f6',
      features: ['Inventory Management', 'Sales Analytics', 'Customer Management']
    },
    {
      id: 'lms',
      title: 'LMS System',
      description: 'Learning Management System for educational institutions',
      icon: '📚',
      color: '#8b5cf6',
      features: ['Course Management', 'Student Tracking', 'Assessment Tools']
    },
    {
      id: 'finance',
      title: 'Financial Tracker',
      description: 'Comprehensive financial management and tracking system',
      icon: '💰',
      color: '#10b981',
      features: ['Expense Tracking', 'Budget Planning', 'Investment Management']
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements and create a detailed project plan',
      icon: '🔍'
    },
    {
      number: '02',
      title: 'Design & Prototyping',
      description: 'Create stunning designs and interactive prototypes',
      icon: '🎨'
    },
    {
      number: '03',
      title: 'Development',
      description: 'Build robust solutions with modern technologies',
      icon: '💻'
    },
    {
      number: '04',
      title: 'Testing & Quality',
      description: 'Rigorous testing ensures flawless performance',
      icon: '🧪'
    },
    {
      number: '05',
      title: 'Launch & Deployment',
      description: 'Smooth deployment with zero downtime',
      icon: '🚀'
    },
    {
      number: '06',
      title: 'Support & Maintenance',
      description: 'Ongoing support and regular updates',
      icon: '🛠️'
    }
  ];

  const currentService = services.find(service => service.id === activeService);

  return (
    <div className={styles.servicesContainer}>
      {/* Animated Background */}
      <div className={styles.backgroundAnimation}>
        <div className={styles.floatingShapes}>
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className={styles.floatingShape}
              style={{
                animationDelay: `${i * 0.5}s`,
                background: services[i % services.length]?.color + '20',
                borderColor: services[i % services.length]?.color + '40'
              }}
            ></div>
          ))}
        </div>
        <div className={styles.gradientOrbs}>
          <div className={`${styles.orb} ${styles.orb1}`}></div>
          <div className={`${styles.orb} ${styles.orb2}`}></div>
          <div className={`${styles.orb} ${styles.orb3}`}></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeText}>✨ Premium Services</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Transform Your <span className={styles.titleHighlight}>Digital</span> Presence
          </h1>
          
          <p className={styles.heroDescription}>
            We deliver exceptional digital solutions that drive growth, enhance engagement, 
            and transform businesses. From concept to launch, we're with you every step of the way.
          </p>

          <div className={styles.heroMetrics}>
            <div className={styles.metric}>
              <div className={styles.metricValue}>500+</div>
              <div className={styles.metricLabel}>Projects Delivered</div>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>98%</div>
              <div className={styles.metricLabel}>Client Satisfaction</div>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>24/7</div>
              <div className={styles.metricLabel}>Support Available</div>
            </div>
          </div>

          <div className={styles.heroActions}>
            <button 
              className={styles.primaryButton}
              onClick={() => navigate('/contact')}
            >
              Start Your Project
              <span className={styles.buttonIcon}>🚀</span>
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={() => document.querySelector(`.${styles.servicesGrid}`)?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Services
              <span className={styles.buttonIcon}>↓</span>
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.serviceCards}>
            {services.slice(0, 4).map((service, index) => (
              <div 
                key={service.id}
                className={`${styles.serviceCard} ${styles[`card${index + 1}`]}`}
                style={{ 
                  '--service-color': service.color,
                  transform: `rotate(${index * 5}deg) translateY(${index * 10}px)`
                }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className={`${styles.cardIcon} ${service.gradient}`}>
                  {service.icon}
                </div>
                <h4>{service.title.split(' ')[0]}</h4>
                <p>{service.tagline}</p>
              </div>
            ))}
          </div>
          <div className={styles.heroGlow}></div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>Our Services</span>
          </div>
          <h2>Comprehensive <span className={styles.textGradient}>Digital Solutions</span></h2>
          <p className={styles.sectionSubtitle}>
            We offer a complete suite of digital services designed to help your business thrive in the modern marketplace.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div 
              key={service.id}
              className={`${styles.serviceItem} ${activeService === service.id ? styles.active : ''}`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => {
                setActiveService(service.id);
                // Special navigation for specific services
                if (service.id === 'website') {
                  navigate('/webservice');
                } else if (service.id === 'system') {
                  navigate('/systems');
                }
              }}
              style={{
                '--service-color': service.color,
                transform: hoveredService === service.id ? 'translateY(-10px)' : 'translateY(0)'
              }}
            >
              <div className={`${styles.serviceIcon} ${service.gradient}`}>
                {service.icon}
              </div>
              <h3 className={styles.serviceItemTitle}>{service.title}</h3>
              <p className={styles.serviceItemTagline}>{service.tagline}</p>
              <p className={styles.serviceItemDescription}>{service.description}</p>
              
              <div className={styles.serviceFeatures}>
                {service.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className={styles.serviceFeature}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                className={styles.serviceButton}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveService(service.id);
                  // Special navigation for specific services
                  if (service.id === 'website') {
                    navigate('/webservice');
                  } else if (service.id === 'system') {
                    navigate('/systems');
                  }
                }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Section */}
      {currentService && (
        <div className={styles.serviceDetails}>
          <div className={styles.detailsContainer}>
            <div className={styles.detailsContent}>
              <div className={styles.detailsHeader}>
                <div className={`${styles.detailsIcon} ${currentService.gradient}`}>
                  {currentService.icon}
                </div>
                <div>
                  <h2>{currentService.title}</h2>
                  <p className={styles.detailsTagline}>{currentService.tagline}</p>
                </div>
              </div>

              <p className={styles.detailsDescription}>{currentService.description}</p>

              <div className={styles.featuresList}>
                {currentService.features.map((feature, index) => (
                  <div key={index} className={styles.featureListItem}>
                    <div className={styles.featureBullet} style={{ background: currentService.color }}></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className={styles.pricingSection}>
                <h3>Flexible Pricing Plans</h3>
                <div className={styles.pricingCards}>
                  {currentService.packages.map((pkg, index) => (
                    <div key={index} className={styles.pricingCard}>
                      <div className={styles.pricingHeader}>
                        <h4>{pkg.name}</h4>
                        <div className={styles.price}>{pkg.price}</div>
                      </div>
                      <ul className={styles.pricingFeatures}>
                        {pkg.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                      <button 
                        className={styles.pricingButton}
                        onClick={() => navigate('/contact')}
                      >
                        Choose Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.detailsVisual}>
              <div className={styles.imageWrapper}>
                <img 
                  src={currentService.image} 
                  alt={currentService.title}
                  className={styles.detailsImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/500x300/1a1b3a/8b5cf6?text=${encodeURIComponent(currentService.title)}`;
                  }}
                />
                <div 
                  className={styles.imageOverlay}
                  style={{ background: `linear-gradient(45deg, ${currentService.color}20, transparent)` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Our Systems Section */}
      <div className={styles.systemsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>Our Systems</span>
          </div>
          <h2>Specialized <span className={styles.textGradient}>Business Systems</span></h2>
          <p className={styles.sectionSubtitle}>
            Custom-built systems designed to streamline your business operations
          </p>
        </div>

        <div className={styles.systemsGrid}>
          {systems.map((system, index) => (
            <div key={system.id} className={styles.systemCard}>
              <div className={styles.systemIconContainer} style={{ background: `${system.color}20` }}>
                <div className={styles.systemIcon} style={{ color: system.color }}>
                  {system.icon}
                </div>
              </div>
              <h3>{system.title}</h3>
              <p>{system.description}</p>
              <div className={styles.systemFeatures}>
                {system.features.map((feature, idx) => (
                  <div key={idx} className={styles.systemFeature}>
                    <span>✓</span>
                    {feature}
                  </div>
                ))}
              </div>
              <button 
                className={styles.systemButton}
                onClick={() => navigate('/systems')}
                style={{ background: system.color }}
              >
                Explore System
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className={styles.processSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>Our Process</span>
          </div>
          <h2>How We <span className={styles.textGradient}>Work</span></h2>
          <p className={styles.sectionSubtitle}>
            A systematic approach to delivering exceptional results
          </p>
        </div>

        <div className={styles.processTimeline}>
          <div className={styles.processRow}>
            {processSteps.slice(0, 3).map((step, index) => (
              <div key={index} className={styles.processStep}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.processRow}>
            {processSteps.slice(3, 6).map((step, index) => (
              <div key={index + 3} className={styles.processStep}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h2>Ready to Start Your Project?</h2>
            <p>
              Let's discuss your ideas and create something amazing together. 
              Get a free consultation and project estimate.
            </p>
            <div className={styles.ctaActions}>
              <button 
                className={styles.ctaPrimary}
                onClick={() => navigate('/contact')}
              >
                Get Free Consultation
              </button>
              <button 
                className={styles.ctaSecondary}
                onClick={() => navigate('/portfolio')}
              >
                View Our Work
              </button>
            </div>
          </div>
          <div className={styles.ctaVisual}>
            <div className={styles.ctaOrbit}>
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  className={styles.orbitingIcon}
                  style={{
                    '--orbit-index': index,
                    '--service-color': service.color,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {service.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;