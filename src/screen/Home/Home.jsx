import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeStyle.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [usdRate, setUsdRate] = useState(336);
  const [isRateLive, setIsRateLive] = useState(true);
  const [isShareBarOpen, setIsShareBarOpen] = useState(true);

  // Mouse position state for 3D effects
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Refs for 3D tilt effect
  const heroRef = useRef(null);
  const cardsRef = useRef([]);

  // Scroll progress state
  const [scrollProgress, setScrollProgress] = useState(0);

  // 3D Card Tilt Effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized mouse position (-1 to 1)
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    
    setMousePos({ x, y });
  };

  // Handle card tilt on mouse move
  const handleCardTilt = (e, index) => {
    const card = cardsRef.current[index];
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
    const card = cardsRef.current[index];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  // Simulate live USD rate update
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Simulate live rate updates every second
    const rateInterval = setInterval(() => {
      const change = (Math.random() - 0.5) * 2;
      setUsdRate(prev => Math.max(300, Math.min(370, prev + change)));
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
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
      path: "/webservice",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "POS Systems",
      description: "Complete Point of Sale solutions for supermarkets, restaurants, bookshops, pharmacies, and hardware stores.",
      icon: "🛒",
      features: ["Offline & Cloud Based", "Inventory Management", "Sales Tracking", "Customer Management", "Analytics & Reporting"],
      path: "/pos-system",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      title: "Concept Flyers & 3D Design",
      description: "Creative design services including film posters, concert posters, and 3D designs for your marketing needs.",
      icon: "🎨",
      features: ["Film Posters", "Concert Posters", "3D Design", "Brand Identity", "Creative Concepts"],
      path: "/digital-solution",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      title: "Custom Software Development",
      description: "Tailored software solutions to streamline your business operations and solve complex challenges.",
      icon: "⚙️",
      features: ["Custom Solutions", "System Integration", "API Development", "Cloud Solutions", "Maintenance Support"],
      path: "/systems",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
  ];

  // POS categories
  const posCategories = [
    { name: "Supermarkets", icon: "🏪", description: "Complete POS with inventory, barcode scanning, and multi-branch management" },
    { name: "Restaurants", icon: "🍽️", description: "Table management, order tracking, kitchen display, and billing" },
    { name: "Bookshops", icon: "📚", description: "ISBN scanning, stock management, and customer loyalty programs" },
    { name: "Pharmacies", icon: "💊", description: "Expiry tracking, prescription management, and compliance" },
    { name: "Hardware Stores", icon: "🔧", description: "Heavy inventory, supplier management, and bulk pricing" }
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
    { title: "24/7 Service", description: "Round-the-clock support to ensure your business never stops. We're always here when you need us.", icon: "🕐" },
    { title: "48-Hour Delivery", description: "Fast turnaround on website development. Get your professional website up and running in just 48 hours.", icon: "⚡" },
    { title: "Expertise & Experience", description: "Years of experience delivering high-quality digital solutions that exceed client expectations.", icon: "🎯" },
    { title: "Creative Design", description: "Talented designers craft visually stunning designs that capture attention and leave a lasting impression.", icon: "🎨" },
    { title: "Customer Satisfaction", description: "We prioritize your satisfaction with every project. Your success is our success.", icon: "⭐" },
    { title: "Affordable Pricing", description: "Competitive pricing without compromising on quality. Great value for your investment.", icon: "💲" }
  ];

  return (
    <div className={styles.homeContainer} onMouseMove={handleMouseMove}>
      {/* 3D Animated Background */}
      <div className={styles.threeDBackground}>
        <div className={styles.gridLines}></div>
        <div className={styles.floatingOrb} style={{ left: `${50 + mousePos.x * 20}%`, top: `${50 + mousePos.y * 20}%` }}></div>
        <div className={styles.floatingOrb2} style={{ left: `${30 + mousePos.x * -10}%`, top: `${30 + mousePos.y * -10}%` }}></div>
        <div className={styles.floatingOrb3} style={{ left: `${70 + mousePos.x * -15}%`, top: `${40 + mousePos.y * 15}%` }}></div>
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

      {/* Scroll Progress Bar */}
      <div className={styles.scrollProgressBar} style={{ width: `${scrollProgress}%` }}></div>

      {/* Hero Section - 3D Parallax */}
      <section className={styles.heroSection} id="home" ref={heroRef}>
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
              <span>🚀 Trusted by 100+ Sri Lankan Businesses</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine1}>Transform Your</span>
              <span className={styles.highlightText}>Digital Presence</span>
              <span className={styles.titleLine3}>in Sri Lanka</span>
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

          {/* Hero Visual - 3D Rotating Card */}
          <div className={styles.heroVisual3D}>
            <div className={styles.heroCard3D} style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`
            }}>
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

      {/* Services Section - 3D Tilt Cards */}
      <section className={styles.servicesSection} id="services">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Our Expertise</span>
            </div>
            <h2 className={styles.sectionTitle}>Comprehensive Digital Solutions</h2>
            <p className={styles.sectionSubtitle}>From web development to custom software, we deliver excellence for Sri Lankan businesses</p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div
                key={index}
                className={styles.serviceCard}
                onClick={() => navigate(service.path)}
                style={{ cursor: "pointer" }}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseMove={(e) => handleCardTilt(e, index)}
                onMouseLeave={() => resetCardTilt(index)}
              >
                <div className={styles.serviceCardGlow} style={{ background: service.gradient }}></div>
                <div className={styles.serviceIconWrapper} style={{ background: service.gradient }}>
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
                  type="button"
                  className={styles.serviceCta}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(service.path);
                  }}
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
              <div key={index} className={styles.posTypeCard} style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg)`
              }}>
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
            <p className={styles.sectionSubtitle}>Priced in USD - Billed in LKR at daily bank rate</p>
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
            <p className={styles.sectionSubtitle}>We deliver excellence with speed, quality, and unwavering support</p>
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
        <div className={styles.ctaBackground3D} style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
        }}></div>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent} style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
          }}>
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