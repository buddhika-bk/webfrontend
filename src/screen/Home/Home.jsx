import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeStyle.module.css';

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
      icon: "💻",
      features: ["Responsive Design", "SEO Optimized", "Custom UI/UX", "CMS Integration"]
    },
    {
      title: "Mobile Applications",
      description: "Custom mobile apps for iOS and Android to reach your customers anywhere.",
      icon: "📱",
      features: ["iOS & Android", "Native Development", "App Store Deployment", "Maintenance"]
    },
    {
      title: "Software Development",
      description: "Custom software solutions to streamline your business operations.",
      icon: "⚙️",
      features: ["Custom Solutions", "System Integration", "API Development", "Maintenance"]
    },
    {
      title: "E-Commerce Solutions",
      description: "Complete online store setup with payment integration and inventory management.",
      icon: "🛒",
      features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Secure Checkout"]
    }
  ];

  const packages = [
    {
      name: "Basic",
      price: "LKR 35,000",
      features: ["5 Page Website", "Responsive Design", "Contact Form", "1 Month Free Support"],
      recommended: false
    },
    {
      name: "Professional",
      price: "LKR 50,000",
      features: ["10 Page Website", "CMS Integration", "SEO Basic", "3 Months Free Support", "Mobile Friendly"],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "LKR 80,000",
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
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection} id="home">
        <div className={styles.heroBackground}>
          <div className={styles.heroParticles} id="particles-js"></div>
          <div className={styles.heroGradient}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>🚀 Trusted by 100+ Sri Lankan Businesses</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>Elevate Your</span>
              <span className={`${styles.titleLine} ${styles.highlightContainer}`}>
                <span className={styles.highlightText}>Online Presence</span>
                <span className={styles.highlightUnderline}></span>
              </span>
              <span className={styles.titleLine}>in Sri Lanka</span>
            </h1>

            <p className={styles.heroDescription}>
              We deliver cutting-edge web design, mobile applications, and custom software solutions
              that drive growth for Sri Lankan businesses. Transform your digital footprint today.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber} data-count="250">20+</div>
                <div className={styles.statLabel}>Projects Delivered</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber} data-count="98">100%</div>
                <div className={styles.statLabel}>Client Satisfaction</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber} data-count="5">6+</div>
                <div className={styles.statLabel}>Years Experience</div>
              </div>
            </div>

            <div className={styles.heroButtons}>
              <button
                className={`${styles.primaryButton} ${styles.animatedButton}`}
                onClick={() => navigate('/AddShop')}
              >
                <span className={styles.buttonText}>Get Started - It's Free</span>
                <span className={styles.buttonIcon}>🚀</span>
              </button>
              <button className={`${styles.secondaryButton} ${styles.videoButton}`}>
                <span className={styles.playIcon}>▶</span>
                Watch Demo Video
              </button>
            </div>

            <div className={styles.heroClients}>
              <p>Trusted by leading Sri Lankan brands:</p>
              <div className={styles.clientLogos} style={{ fontSize: '34px', color: '#d5d0d0ff', fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.floatingPlatform}>
              <div className={styles.platformBase}>
                <div className={styles.browserWindow}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className={styles.browserContent}>
                    <div className={styles.websitePreview}></div>
                  </div>
                </div>

                <div className={styles.mobileDevice}>
                  <div className={styles.mobileScreen}>
                    <div className={styles.appPreview}></div>
                  </div>
                </div>
              </div>

              <div className={`${styles.floatingElement} ${styles.element1}`}>
                <span className={styles.spanicon}>💻</span>
                <div className={styles.tooltip}>Web Design</div>
              </div>
              <div className={`${styles.floatingElement} ${styles.element2}`}>
                <span className={styles.spanicon}>📱</span>
                <div className={styles.tooltip}>Mobile Apps</div>
              </div>
              <div className={`${styles.floatingElement} ${styles.element3}`}>
                <span className={styles.spanicon}>🛒</span>
                <div className={styles.tooltip}>E-Commerce</div>
              </div>
              <div className={`${styles.floatingElement} ${styles.element4}`}>
                <span className={styles.spanicon}>📊</span>
                <div className={styles.tooltip}>POS Systems</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.scrollArrow}></div>
        </div>
      </section>

      {/* Modern Services Section */}
      <section className={styles.servicesSection} id="services">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✨ Our Expertise</span>
            </div>
            <h2 className={styles.sectionTitle}>Transform Your Digital Presence</h2>
            <p className={styles.sectionSubtitle}>
              Comprehensive digital solutions tailored for Sri Lankan businesses to thrive in the digital era
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {features.map((service, index) => (
              <div
                key={index}
                className={styles.serviceCard}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={() => {
                  if (service.title === "Web Design" || service.title === "E-Commerce Solutions") {
                    navigate('/webservice');
                  }
                  if (service.title === "Software Development") {
                    navigate('/systems');
                  }
                }}
                style={{
                  cursor: (service.title === "Web Design" || service.title === "E-Commerce Solutions" || service.title === "Software Development")
                    ? 'pointer'
                    : 'default'
                }}
              >
                <div className={styles.cardBackground}></div>
                <div className={styles.cardContent}>
                  <div className={styles.serviceIconWrapper}>
                    <div className={styles.iconBackground}></div>
                    <div className={styles.serviceIcon}>{service.icon}</div>
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <div className={styles.serviceFeatures}>
                    {service.features && service.features.map((feature, idx) => (
                      <span key={idx} className={styles.featureTag}>✓ {feature}</span>
                    ))}
                  </div>
                  <button
                    className={styles.serviceCta}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (service.title === "Web Design" || service.title === "E-Commerce Solutions") {
                        navigate('/webservice');
                      }
                      if (service.title === "Software Development") {
                        navigate('/systems');
                      }
                    }}
                  >
                    <span className={styles.ctaText}>
                      {service.title === "Web Design" || service.title === "E-Commerce Solutions" || service.title === "Software Development"
                        ? "Explore Service"
                        : "Coming Soon"}
                    </span>
                    <span className={styles.ctaArrow}>
                      {service.title === "Web Design" || service.title === "E-Commerce Solutions" || service.title === "Software Development" ? "→" : "🔒"}
                    </span>
                    <div className={styles.ctaHoverEffect}></div>
                  </button>
                </div>
                <div className={styles.cardHoverEffect}></div>

                {(service.title === "Web Design" || service.title === "E-Commerce Solutions" || service.title === "Software Development") && (
                  <div className={styles.clickIndicator}>
                    <span>Click to explore →</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.servicesCta}>
            <div className={styles.ctaContent}>
              <h3>Ready to Transform Your Business?</h3>
              <p>Let's discuss your project and create something amazing together</p>
              <div className={styles.ctaButtons}>
                <button
                  className={`${styles.primaryButton} ${styles.large}`}
                  onClick={() => navigate('/add-shop')}
                >
                  <span>Start Your Project</span>
                  <span className={styles.buttonSparkle}>✨</span>
                </button>
                <button
                  className={styles.secondaryButton}
                  onClick={() => navigate('/service')}
                >
                  <span>View All Services</span>
                  <span className={styles.buttonArrow}>📊</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.servicesBackground}>
          <div className={`${styles.bgShape} ${styles.shape1}`}></div>
          <div className={`${styles.bgShape} ${styles.shape2}`}></div>
          <div className={`${styles.bgShape} ${styles.shape3}`}></div>
        </div>
      </section>
      
      {/* POS System Section */}
      <section className={styles.posSystemSection} id="pos-system">
        <div className={styles.sectionBackground}>
          <div className={`${styles.bgShape} ${styles.shape1}`}></div>
          <div className={`${styles.bgShape} ${styles.shape2}`}></div>
          <div className={`${styles.bgShape} ${styles.shape3}`}></div>
          <div className={styles.bgGrid}></div>
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.posContent}>
            <div className={styles.posText}>
              <div className={styles.sectionBadge}>
                <span>Point of Sale</span>
              </div>
              <h2>Revolutionize Your Retail Operations</h2>
              <p>
                At Webpoint, we develop custom Point of Sale (POS) systems that streamline retail operations
                with inventory management, sales tracking, and customer management features. Our POS solutions
                help businesses process transactions efficiently while providing valuable insights through
                comprehensive reporting and analytics tools.
              </p>

              <div className={styles.posFeatures}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 13H21V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V13ZM3 13V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V13M7 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className={styles.featureText}>
                    <h4>Inventory Management</h4>
                    <p>Track stock levels, automate reordering, and manage suppliers efficiently.</p>
                  </div>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className={styles.featureText}>
                    <h4>Sales Tracking</h4>
                    <p>Monitor transactions, analyze trends, and optimize your sales strategy.</p>
                  </div>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className={styles.featureText}>
                    <h4>Customer Management</h4>
                    <p>Build customer profiles, track purchase history, and enhance loyalty.</p>
                  </div>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 20L11 4M13 20L17 4M6 9H20M4 15H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className={styles.featureText}>
                    <h4>Analytics & Reporting</h4>
                    <p>Gain insights with detailed reports and data visualization tools.</p>
                  </div>
                </div>
              </div>

              <div className={styles.posActions}>
                <button className={styles.primaryButton} onClick={() => navigate('/systems')}>
                  <span>Learn More About POS</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <a
                  href="https://youtu.be/w-sDHXBIveg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className={styles.secondaryButton}>
                    <span>View Live Demo</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M21 12C19.1114 14.991 15.7183 18 12 18C8.2817 18 4.88856 14.991 3 12C5.36527 9.04153 8.7858 6 12 6C15.2142 6 18.6347 9.04153 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </a>
              </div>
            </div>

            <div className={styles.posVisual}>
              <div className={styles.dashboardPreview}>
                <div className={styles.dashboardHeader}>
                  <div className={styles.dashboardControls}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={styles.dashboardTitle}>Webpoint POS Dashboard</div>
                  <div className={styles.dashboardStatus}>
                    <div className={styles.statusIndicator}></div>
                    <span>Live</span>
                  </div>
                </div>
                <div className={styles.dashboardContent}>
                  <div className={styles.metricCards}>
                    <div className={styles.metricCard}>
                      <div className={styles.metricIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className={styles.metricData}>
                        <div className={styles.metricValue}>$12,485</div>
                        <div className={styles.metricLabel}>Today's Revenue</div>
                      </div>
                      <div className={`${styles.metricTrend} ${styles.up}`}>+12%</div>
                    </div>
                    <div className={styles.metricCard}>
                      <div className={styles.metricIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className={styles.metricData}>
                        <div className={styles.metricValue}>84</div>
                        <div className={styles.metricLabel}>Transactions</div>
                      </div>
                      <div className={`${styles.metricTrend} ${styles.up}`}>+5%</div>
                    </div>
                  </div>
                  <div className={styles.chartArea}>
                    <div className={styles.chartHeader}>
                      <h4>Sales Overview</h4>
                      <div className={styles.chartLegend}>
                        <div className={styles.legendItem}>
                          <span className={`${styles.legendColor} ${styles.current}`}></span>
                          <span>Current</span>
                        </div>
                        <div className={styles.legendItem}>
                          <span className={`${styles.legendColor} ${styles.previous}`}></span>
                          <span>Previous</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.chartContainer}>
                      <div className={styles.chartBars}>
                        <div className={styles.barGroup}>
                          <div className={`${styles.bar} ${styles.previous}`} style={{ height: '60%' }}></div>
                          <div className={`${styles.bar} ${styles.current}`} style={{ height: '80%' }}></div>
                        </div>
                        <div className={styles.barGroup}>
                          <div className={`${styles.bar} ${styles.previous}`} style={{ height: '70%' }}></div>
                          <div className={`${styles.bar} ${styles.current}`} style={{ height: '85%' }}></div>
                        </div>
                        <div className={styles.barGroup}>
                          <div className={`${styles.bar} ${styles.previous}`} style={{ height: '50%' }}></div>
                          <div className={`${styles.bar} ${styles.current}`} style={{ height: '75%' }}></div>
                        </div>
                        <div className={styles.barGroup}>
                          <div className={`${styles.bar} ${styles.previous}`} style={{ height: '65%' }}></div>
                          <div className={`${styles.bar} ${styles.current}`} style={{ height: '90%' }}></div>
                        </div>
                        <div className={styles.barGroup}>
                          <div className={`${styles.bar} ${styles.previous}`} style={{ height: '55%' }}></div>
                          <div className={`${styles.bar} ${styles.current}`} style={{ height: '70%' }}></div>
                        </div>
                        <div className={styles.barGroup}>
                          <div className={`${styles.bar} ${styles.previous}`} style={{ height: '75%' }}></div>
                          <div className={`${styles.bar} ${styles.current}`} style={{ height: '95%' }}></div>
                        </div>
                      </div>
                      <div className={styles.chartLabels}>
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.recentActivity}>
                    <h4>Recent Sales</h4>
                    <div className={styles.activityList}>
                      <div className={styles.activityItem}>
                        <div className={styles.activityInfo}>
                          <span className={styles.customer}>Customer #4821</span>
                          <span className={styles.time}>2:30 PM</span>
                        </div>
                        <span className={styles.amount}>$245.50</span>
                      </div>
                      <div className={styles.activityItem}>
                        <div className={styles.activityInfo}>
                          <span className={styles.customer}>Customer #4822</span>
                          <span className={styles.time}>2:15 PM</span>
                        </div>
                        <span className={styles.amount}>$89.99</span>
                      </div>
                      <div className={styles.activityItem}>
                        <div className={styles.activityInfo}>
                          <span className={styles.customer}>Customer #4823</span>
                          <span className={styles.time}>1:45 PM</span>
                        </div>
                        <span className={styles.amount}>$156.75</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.floatingElements}>
                <div className={`${styles.floatingCard} ${styles.card1}`}>
                  <div className={styles.cardIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span>Inventory Updated</span>
                </div>
                <div className={`${styles.floatingCard} ${styles.card2}`}>
                  <div className={styles.cardIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span>New Customer Added</span>
                </div>
                <div className={`${styles.floatingCard} ${styles.card3}`}>
                  <div className={styles.cardIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 17H7C5.89543 17 5 16.1046 5 15V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V9M14 21H5M14 21L19 16M14 21L14 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      <section className={styles.whyChooseUsSection} id="why-choose-us">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2>Why Choose WebPoint</h2>
            <p>Discover what makes us the preferred choice for Sri Lankan businesses</p>
          </div>
          <div className={styles.whyChooseGrid}>
            {whyChooseUsFeatures.map((feature, index) => (
              <div key={index} className={styles.whyChooseCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className={styles.packagesSection} id="packages">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.packageBadge}>
              <span>💎 Premium Solutions</span>
            </div>
            <h2>Choose Your Perfect Plan</h2>
            <p>Affordable web design packages tailored for Sri Lankan businesses of all sizes</p>
          </div>

          <div className={styles.packagesToggle}>
            <span className={styles.toggleLabel}>Monthly</span>
            <label className={styles.toggleSwitch}>
              <input type="checkbox" className={styles.toggleInput} />
              <span className={styles.toggleSlider}></span>
            </label>
            <span className={`${styles.toggleLabel} ${styles.active}`}>Annual <span className={styles.discountBadge}>Save 20%</span></span>
          </div>

          <div className={styles.packagesContainer}>
            {packages.map((pkg, index) => (
              <div key={index} className={`${styles.packageCard} ${pkg.recommended ? styles.recommended : ''}`}>
                {pkg.recommended && (
                  <div className={styles.recommendedBadge}>
                    <span>⭐ Most Popular</span>
                  </div>
                )}

                <div className={styles.packageHeader}>
                  <div className={styles.packageIcon}>
                    {pkg.name === "Basic" && "🚀"}
                    {pkg.name === "Professional" && "💼"}
                    {pkg.name === "Enterprise" && "🏢"}
                  </div>
                  <h3>{pkg.name}</h3>
                  <p className={styles.packageSubtitle}>
                    {pkg.name === "Basic" && "Perfect for startups"}
                    {pkg.name === "Professional" && "Ideal for growing businesses"}
                    {pkg.name === "Enterprise" && "For large organizations"}
                  </p>
                </div>

                <div className={styles.packagePrice}>
                  <div className={styles.priceAmount}>{pkg.price}</div>
                  <div className={styles.pricePeriod}>one-time payment</div>
                </div>

                <ul className={styles.packageFeatures}>
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex}>
                      <span className={styles.featureIcon}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`${styles.packageButton} ${pkg.recommended ? styles.recommendedButton : ''}`}>
                  <span className={styles.buttonText}>Get Started</span>
                  <span className={styles.buttonArrow}>→</span>
                </button>

                <div className={styles.packageFooter}>
                  <div className={styles.supportInfo}>
                    <span>📞</span>
                    <span>Priority Support Included</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.packagesFooter}>
            <div className={styles.guaranteeBadge}>
              <span>✅ 30-Day Money-Back Guarantee</span>
            </div>
            <p className={styles.footerNote}>All plans include free SSL certificate and basic SEO setup</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaShapes}>
            <div className={`${styles.shape} ${styles.shape1}`}></div>
            <div className={`${styles.shape} ${styles.shape2}`}></div>
            <div className={`${styles.shape} ${styles.shape3}`}></div>
            <div className={`${styles.shape} ${styles.shape4}`}></div>
          </div>
          <div className={styles.ctaGradient}></div>
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBadge}>
              <span>✨ Limited Time Offer</span>
            </div>

            <h2 className={styles.ctaTitle}>
              Ready to Transform Your
              <span className={styles.ctaHighlight}> Digital Presence</span>?
            </h2>

            <p className={styles.ctaDescription}>
              Join <strong>20+ successful Sri Lankan businesses</strong> that have elevated their online presence
              with WebPoint.lk. Start your journey today and get <strong>free consultation</strong> worth LKR 25,000!
            </p>

            <div className={styles.ctaFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✅</span>
                <span>Free 3 Month Service</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✅</span>
                <span>30-Day Money Back</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✅</span>
                <span>Lifetime Support</span>
              </div>
            </div>

            <div className={styles.ctaButtons}>
              <button
                className={styles.ctaPrimaryButton}
                onClick={() => navigate('/AddShop')}
              >
                <span className={styles.buttonContent}>
                  <span className={styles.buttonText}>Start Your Project Today</span>
                  <span className={styles.buttonArrow}>→</span>
                </span>
                <div className={styles.buttonGlow}></div>
              </button>

              <button className={styles.ctaSecondaryButton}>
                <span className={styles.videoIcon}>🎬</span>
                Watch Success Stories
              </button>
            </div>

            <div className={styles.ctaGuarantee}>
              <div className={styles.guaranteeItem}>
                <span className={styles.guaranteeIcon}>🏆</span>
                <span>6-Year Experience</span>
              </div>
              <div className={styles.guaranteeItem}>
                <span className={styles.guaranteeIcon}>💎</span>
                <span>Quality Guaranteed</span>
              </div>
              <div className={styles.guaranteeItem}>
                <span className={styles.guaranteeIcon}>🚀</span>
                <span>Fast Delivery</span>
              </div>
            </div>

            <div className={styles.ctaStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Client Satisfaction</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>Support Available</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>20+</div>
                <div className={styles.statLabel}>Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ctaWave}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Home;