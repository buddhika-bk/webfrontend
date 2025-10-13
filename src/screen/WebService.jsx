import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const services = [
    {
      title: "Web Design & Development",
      description: "We create visually appealing and user-friendly websites that are optimized for performance and functionality. Our designs are responsive, ensuring a seamless experience across all devices.",
      icon: "💻",
      gradient: styles.gradientBlue
    },
    {
      title: "E-commerce Solutions",
      description: "We develop robust e-commerce platforms that enable you to sell products and services online. Our solutions include secure payment gateways, inventory management, and user-friendly interfaces.",
      icon: "🛒",
      gradient: styles.gradientPurple
    },
    {
      title: "Search Engine Optimization (SEO)",
      description: "Our SEO services help improve your website's visibility on search engines, driving organic traffic and increasing your online reach. We use proven strategies to enhance your search rankings.",
      icon: "📈",
      gradient: styles.gradientGreen
    },
    {
      title: "Content Management Systems (CMS)",
      description: "We implement user-friendly CMS solutions that allow you to easily manage and update your website content without technical expertise. Popular CMS options include WordPress, Joomla, and Drupal.",
      icon: "⚙️",
      gradient: styles.gradientOrange
    },
    {
      title: "Web Hosting & Maintenance",
      description: "We provide reliable web hosting services to ensure your website is always accessible. Our maintenance packages include regular updates, backups, and security monitoring to keep your site running smoothly.",
      icon: "🔧",
      gradient: styles.gradientIndigo
    }
  ];

  const demoButtons = [
    { 
      path: '/demoshop', 
      label: 'Demo Shop Home Page',
      image: demoshopImg,
      color: styles.gradientBlueDark
    },
    { 
      path: '/demosaloon', 
      label: 'Demo Salon Web Page',
      image: saloonImg,
      color: styles.gradientCyanDark
    },
    { 
      path: '/demoBag', 
      label: 'Item View Page (Bag)',
      image: bagImg,
      color: styles.gradientPurpleDark
    },
    { 
      path: '/demoshoe', 
      label: 'Item View Page (Shoes)',
      image: shoeImg,
      color: styles.gradientGreenDark
    },
    { 
      path: '/demoCard', 
      label: 'Add to Cart Page',
      image: cartImg,
      color: styles.gradientOrangeDark
    },
    { 
      path: '/demodress', 
      label: 'DressPoint Dress View Page',
      image: dressImg,
      color: styles.gradientIndigoDark
    },
    { 
      path: '/demophone', 
      label: 'Phone Item View Page',
      image: phoneImg,
      color: styles.gradientCyanDark
    }
  ];

  return (
    <div className={styles.webserviceContainer}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={`${styles.bgCircle} ${styles.circle1}`}></div>
        <div className={`${styles.bgCircle} ${styles.circle2}`}></div>
        <div className={`${styles.bgCircle} ${styles.circle3}`}></div>
        <div className={styles.bgGrid}></div>
      </div>

      {/* Hero Section */}
      <div className={styles.webserviceHero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span>🚀 Premium Web Services</span>
          </div>
          <h1 className={styles.webserviceTitle}>
            Transform Your <span className={styles.titleGradient}>Digital Presence</span>
          </h1>
          <p className={styles.webserviceDescription}>
            We offer a comprehensive range of web services to help you establish and grow your online presence. 
            Our team of experts is dedicated to delivering high-quality solutions tailored to your specific needs.
          </p>
          
          <div className={styles.heroStats}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Projects Completed</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Client Satisfaction</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Team Members</div>
            </div>
          </div>

          <div className={styles.heroActions}>
            <button className={styles.ctaPrimary} onClick={() => navigate('/contact')}>
              Start Your Project
            </button>
            <button className={styles.ctaSecondary} onClick={() => document.querySelector(`.${styles.servicesSection}`).scrollIntoView({ behavior: 'smooth' })}>
              View Services
            </button>
          </div>
        </div>
        
        <div className={styles.heroVisual}>
          <div className={`${styles.floatingCard} ${styles.card1}`}>
            <div className={styles.cardIcon}>💻</div>
            <span>Web Design</span>
          </div>
          <div className={`${styles.floatingCard} ${styles.card2}`}>
            <div className={styles.cardIcon}>🛒</div>
            <span>E-commerce</span>
          </div>
          <div className={`${styles.floatingCard} ${styles.card3}`}>
            <div className={styles.cardIcon}>📈</div>
            <span>SEO</span>
          </div>
          <div className={styles.mainVisual}>
            <div className={styles.visualGradient}></div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <h2>Our <span className={styles.highlight}>Services</span></h2>
          <p>Comprehensive web solutions tailored for your business growth and success</p>
        </div>
        
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div 
              key={index}
              className={`${styles.serviceCard} ${activeService === index ? styles.active : ''}`}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className={`${styles.serviceIcon} ${service.gradient}`}>
                {service.icon}
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <div className={styles.serviceArrow}>→</div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Showcase Section */}
      <div className={styles.demoSection}>
        <div className={styles.sectionHeader}>
          <h2>Explore Our <span className={styles.highlight}>Demos</span></h2>
          <p>Experience our work through interactive demo pages showcasing real projects</p>
        </div>
        
        <div className={styles.demoGrid}>
          {demoButtons.map((button, index) => (
            <div 
              key={index}
              className={styles.demoCard}
              onClick={() => navigate(button.path)}
            >
              <div className={styles.demoImageContainer}>
                {/* Replace gradient with actual image */}
                <img 
                  src={button.image} 
                  alt={button.label}
                  className={styles.demoImage}
                />
                <div className={styles.demoOverlay}>
                  <span className={styles.viewDemo}>View Demo →</span>
                </div>
              </div>
              <div className={styles.demoContent}>
                <h3 className={styles.demoTitle}>{button.label}</h3>
                <button className={styles.demoButton}>
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <h2>Ready to Start Your Project?</h2>
            <p>Let's create something amazing together. Get in touch with our team today and let's discuss how we can bring your vision to life.</p>
            <div className={styles.ctaActions}>
              <button className={styles.ctaPrimary} onClick={() => navigate('/contact')}>
                Get Started Today
              </button>
              <button className={styles.ctaSecondary} onClick={() => navigate('/portfolio')}>
                View Portfolio
              </button>
            </div>
          </div>
          <div className={styles.ctaGraphic}>
            <div className={styles.ctaIcon}>🚀</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebService;