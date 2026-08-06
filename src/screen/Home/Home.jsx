import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeStyle.module.css';
import POSDemoPDF from "../../assets/POSDemo.pdf";

const Home = () => {
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [usdRate, setUsdRate] = useState(336);
  const [isRateLive, setIsRateLive] = useState(true);
  
  // --- NEW STATE FOR SOCIAL SHARE BAR ---
  const [isShareBarOpen, setIsShareBarOpen] = useState(true);

  // Simulate live USD rate update (in production, fetch from API)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Simulate live rate updates every second
    const rateInterval = setInterval(() => {
      const change = (Math.random() - 0.5) * 2;
      setUsdRate(prev => Math.max(300, Math.min(370, prev + change)));
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(rateInterval);
    };
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

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

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    smoothScroll(targetId);
  };

  // Updated services with navigation paths
  const services = [
    {
      title: "Web Development",
      description: "Professional website design and development tailored for your business needs. 48-hour delivery available.",
      icon: "💻",
      features: ["Responsive Design", "SEO Optimized", "Custom UI/UX", "CMS Integration", "48-Hour Delivery"],
      path: "/webservice"
    },
    {
      title: "POS Systems",
      description: "Complete Point of Sale solutions for supermarkets, restaurants, bookshops, pharmacies, and hardware stores.",
      icon: "🛒",
      features: ["Offline & Cloud Based", "Inventory Management", "Sales Tracking", "Customer Management", "Analytics & Reporting"],
      path: "/pos-system"
    },
    {
      title: "Concept Flyers & 3D Design",
      description: "Creative design services including film posters, concert posters, and 3D designs for your marketing needs.",
      icon: "🎨",
      features: ["Film Posters", "Concert Posters", "3D Design", "Brand Identity", "Creative Concepts"],
      path: "/digital-solution"
    },
    {
      title: "Custom Software Development",
      description: "Tailored software solutions to streamline your business operations and solve complex challenges.",
      icon: "⚙️",
      features: ["Custom Solutions", "System Integration", "API Development", "Cloud Solutions", "Maintenance Support"],
      path: "/systems"
    }
  ];

  // POS categories
  const posCategories = [
    {
      name: "Supermarkets",
      icon: "🏪",
      description: "Complete POS with inventory, barcode scanning, and multi-branch management"
    },
    {
      name: "Restaurants",
      icon: "🍽️",
      description: "Table management, order tracking, kitchen display, and billing"
    },
    {
      name: "Bookshops",
      icon: "📚",
      description: "ISBN scanning, stock management, and customer loyalty programs"
    },
    {
      name: "Pharmacies",
      icon: "💊",
      description: "Expiry tracking, prescription management, and compliance"
    },
    {
      name: "Hardware Stores",
      icon: "🔧",
      description: "Heavy inventory, supplier management, and bulk pricing"
    }
  ];

  // POS types
  const posTypes = [
    {
      title: "Offline POS",
      description: "Works without internet connection. Perfect for remote locations or businesses with unreliable internet.",
      icon: "📶",
      features: ["Works Offline", "Local Data Storage", "Syncs When Online", "Reliable Performance"]
    },
    {
      title: "Cloud POS",
      description: "Access your business anywhere, anytime. Real-time data sync across all locations.",
      icon: "☁️",
      features: ["Real-time Sync", "Access Anywhere", "Automatic Backups", "Multi-Branch Management"]
    }
  ];

  // Updated pricing packages
  const packages = [
    {
      name: "Starter",
      price: "$150",
      priceLKR: "$150 × " + Math.round(usdRate) + " = LKR " + (150 * Math.round(usdRate)).toLocaleString(),
      features: ["5 Pages Website", "Responsive Design", "Contact Form", "Basic SEO", "1 Month Support"],
      recommended: false,
      description: "Perfect for small businesses"
    },
    {
      name: "Professional",
      price: "$250",
      priceLKR: "$250 × " + Math.round(usdRate) + " = LKR " + (250 * Math.round(usdRate)).toLocaleString(),
      features: ["10 Pages Website", "CMS Integration", "SEO Basic", "3 Months Support", "Mobile Friendly"],
      recommended: true,
      description: "Ideal for growing businesses"
    },
    {
      name: "Enterprise",
      price: "$350",
      priceLKR: "$350 × " + Math.round(usdRate) + " = LKR " + (350 * Math.round(usdRate)).toLocaleString(),
      features: ["20 Pages Website", "Advanced SEO", "E-Commerce Ready", "5 Months Support", "Custom Design"],
      recommended: false,
      description: "For large organizations"
    }
  ];

  const whyChooseUsFeatures = [
    {
      title: "24/7 Service",
      description: "Round-the-clock support to ensure your business never stops. We're always here when you need us.",
      icon: "🕐"
    },
    {
      title: "48-Hour Delivery",
      description: "Fast turnaround on website development. Get your professional website up and running in just 48 hours.",
      icon: "⚡"
    },
    {
      title: "Expertise & Experience",
      description: "Years of experience delivering high-quality digital solutions that exceed client expectations.",
      icon: "🎯"
    },
    {
      title: "Creative Design",
      description: "Talented designers craft visually stunning designs that capture attention and leave a lasting impression.",
      icon: "🎨"
    },
    {
      title: "Customer Satisfaction",
      description: "We prioritize your satisfaction with every project. Your success is our success.",
      icon: "⭐"
    },
    {
      title: "Affordable Pricing",
      description: "Competitive pricing without compromising on quality. Great value for your investment.",
      icon: "💲"
    }
  ];

  return (
    <div className={styles.homeContainer}>
      
      {/* --- NEW SOCIAL SHARE BAR --- */}
      {/* <div className={styles.socialWrapper}>
        {isShareBarOpen ? (
          <div className={styles.socialShareBar}>
            <button 
              className={styles.socialCloseBtn} 
              onClick={() => setIsShareBarOpen(false)}
              aria-label="Close social share"
            >
              ✕
            </button>
            <div className={styles.socialIconsContainer}>
              <a href="https://facebook.com/webpointLanka" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.fb}`} title="Share on Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/webpoint_lanka_pvt_ltd?igsh=MW1mNmR1Y3hma2c3eQ==" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.ig}`} title="Share on Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/webpoint-sl/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.li}`} title="Share on LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@webpoint_lanka" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.tt}`} title="Share on TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.57-1.68 5.16-4.47 5.61-2.93.48-5.84-1.44-6.45-4.26-.74-3.45 1.84-6.78 5.25-7.09.72-.06 1.44-.06 2.16-.06v3.99c-.43-.03-.86-.05-1.29-.02-1.44.09-2.73 1.24-2.79 2.69-.07 1.57 1.19 2.95 2.75 3.07 1.58.12 3.02-1.07 3.26-2.65.04-.23.04-.47.04-.71v-12.5h4.01c-.01-.94-.02-1.88-.01-2.82z"/></svg>
              </a>
              <a href="https://wa.me/+94706646255" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.wa}`} title="Share on WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        ) : (
          <button 
            className={styles.socialOpenBtn} 
            onClick={() => setIsShareBarOpen(true)}
            aria-label="Open social share"
          >
            Share
          </button>
        )}
      </div> */}
      {/* --- END NEW SOCIAL SHARE BAR --- */}

      {/* Hero Section - Updated with larger card */}
      <section className={styles.heroSection} id="home">
        <div className={styles.heroBackground}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>🚀 Trusted by 100+ Sri Lankan Businesses</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              <span>Transform Your</span>
              <span className={styles.highlightText}>Digital Presence</span>
              <span>in Sri Lanka</span>
            </h1>
            
            <p className={styles.heroDescription}>
              We deliver professional web development, POS systems, creative design, and custom software solutions 
              tailored for Sri Lankan businesses. Fast delivery, 24/7 support, and guaranteed satisfaction.
            </p>
            
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>48hr</span>
                <span className={styles.statLabel}>Website Delivery</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Support Available</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>99.9%</span>
                <span className={styles.statLabel}>Satisfaction</span>
              </div>
            </div>
            
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton} onClick={() => navigate('/login')}>
                Get Started - It's Free
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button className={styles.secondaryButton} onClick={() => smoothScroll('#services')}>
                <span className={styles.playIcon}>▶</span>
                Explore Services
              </button>
            </div>
          </div>
          
          {/* Hero Visual - Enlarged Card */}
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardHeader}>
                <div className={styles.cardDots}>
                  <span></span><span></span><span></span>
                </div>
                <span className={styles.cardTitle}>WebPoint Solutions</span>
              </div>
              <div className={styles.heroCardContent}>
                <div className={styles.cardMetrics}>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>💻</span>
                    <div>
                      <div className={styles.metricValue}>Web Dev</div>
                      <div className={styles.metricLabel}>48hr Delivery</div>
                    </div>
                  </div>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>🛒</span>
                    <div>
                      <div className={styles.metricValue}>POS Systems</div>
                      <div className={styles.metricLabel}>Offline & Cloud</div>
                    </div>
                  </div>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>🎨</span>
                    <div>
                      <div className={styles.metricValue}>3D Design</div>
                      <div className={styles.metricLabel}>Creative Concepts</div>
                    </div>
                  </div>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>⚙️</span>
                    <div>
                      <div className={styles.metricValue}>Custom Software</div>
                      <div className={styles.metricLabel}>Tailored Solutions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Services Section */}
      <section className={styles.servicesSection} id="services">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Our Expertise</span>
            </div>
            <h2 className={styles.sectionTitle}>Comprehensive Digital Solutions</h2>
            <p className={styles.sectionSubtitle}>
              From web development to custom software, we deliver excellence for Sri Lankan businesses
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIconWrapper}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <button 
                  className={styles.serviceCta} 
                  onClick={() => navigate(service.path)}
                >
                  Learn More <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POS System Section */}
      <section className={styles.posSystemSection} id="pos-system">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Point of Sale Systems</span>
            </div>
            <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Complete POS Solutions</h2>
            <p className={styles.sectionSubtitle} style={{ color: 'rgba(255,255,255,0.7)' }}>
              Offline and Cloud-based systems for every business type
            </p>
          </div>

          {/* POS Types */}
          <div className={styles.posTypes}>
            {posTypes.map((type, index) => (
              <div key={index} className={styles.posTypeCard}>
                <div className={styles.posTypeIcon}>{type.icon}</div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <ul className={styles.posTypeFeatures}>
                  {type.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* POS Categories */}
          <div className={styles.posCategories}>
            <h3 className={styles.posCategoriesTitle}>Industries We Serve</h3>
            <div className={styles.posCategoriesGrid}>
              {posCategories.map((category, index) => (
                <div key={index} className={styles.posCategoryCard}>
                  <div className={styles.posCategoryIcon}>{category.icon}</div>
                  <h4>{category.name}</h4>
                  <p>{category.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.posCta}>
            <button className={styles.primaryButton} onClick={() => navigate('/pos-system')}>
              Explore POS Solutions →
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.packagesSection} id="pricing">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Simple, Transparent Pricing</span>
            </div>
            <h2 className={styles.sectionTitle}>Choose Your Perfect Plan</h2>
            <p className={styles.sectionSubtitle}>
              Priced in USD - Billed in LKR at daily bank rate
            </p>
          </div>

          {/* Live Rate Display */}
          <div className={styles.liveRateContainer}>
            <div className={styles.liveRateBadge}>
              <span className={`${styles.liveIndicator} ${isRateLive ? styles.live : ''}`}>
                {isRateLive ? '● LIVE' : '● OFFLINE'}
              </span>
              <span className={styles.rateDisplay}>
                1 USD = LKR <span className={styles.rateValue}>{Math.round(usdRate)}</span>
              </span>
              <span className={styles.rateUpdate}>Updating every second</span>
            </div>
          </div>

          <div className={styles.packagesContainer}>
            {packages.map((pkg, index) => (
              <div key={index} className={`${styles.packageCard} ${pkg.recommended ? styles.recommended : ''}`}>
                {pkg.recommended && (
                  <div className={styles.recommendedBadge}>⭐ Most Popular</div>
                )}
                <div className={styles.packageHeader}>
                  <h3>{pkg.name}</h3>
                  <p className={styles.packageSubtitle}>{pkg.description}</p>
                </div>
                <div className={styles.packagePrice}>
                  <span className={styles.priceAmount}>{pkg.price}</span>
                  <span className={styles.pricePeriod}>one-time payment</span>
                  <div className={styles.priceLKR}>{pkg.priceLKR}</div>
                </div>
                <ul className={styles.packageFeatures}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <button className={`${styles.packageButton} ${pkg.recommended ? styles.recommendedButton : ''}`} onClick={() => navigate('/login')}>
                  Get Started →
                </button>
                <div className={styles.packageFooter}>
                  <span>📞 24/7 Support Included</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.packagesFooter}>
            <div className={styles.guaranteeBadge}>
              <span>✅ 30-Day Money-Back Guarantee</span>
              <span className={styles.separator}>|</span>
              <span>⚡ 48-Hour Website Delivery</span>
              <span className={styles.separator}>|</span>
              <span>🕐 24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.whyChooseUsSection} id="about">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Why Choose Us</span>
            </div>
            <h2 className={styles.sectionTitle}>Your Trusted Digital Partner</h2>
            <p className={styles.sectionSubtitle}>
              We deliver excellence with speed, quality, and unwavering support
            </p>
          </div>

          <div className={styles.whyChooseGrid}>
            {whyChooseUsFeatures.map((feature, index) => (
              <div key={index} className={styles.whyChooseCard}>
                <div className={styles.whyChooseIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}></div>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBadge}>
              <span>✦ Let's Build Something Together</span>
            </div>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your <span>Business</span>?
            </h2>
            <p className={styles.ctaDescription}>
              Tell us about your project and get a free consultation. We respond within one business day.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimaryButton} onClick={() => navigate('/login')}>
                Start Your Project
              </button>
              <button className={styles.ctaSecondaryButton} onClick={() => smoothScroll('#services')}>
                Explore Services
              </button>
            </div>
            <div className={styles.ctaGuarantee}>
              <span>⚡ 48-Hour Delivery</span>
              <span>🕐 24/7 Support</span>
              <span>⭐ 100% Satisfaction</span>
              <span>💲 Best Value</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;