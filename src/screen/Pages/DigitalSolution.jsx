import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DigitalSolution.module.css';

// Import images
import solutionHeroImg from '../../assets/solution-hero.jpg';
import filmProjectImg from '../../assets/September.jpeg';
import concertProjectImg from '../../assets/kpop.jpeg';
import ikkaProjectImg from '../../assets/Ikka.jpeg';

const DigitalSolution = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Google Images URLs for fallback
  const heroImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1172&q=80';
  const solutionImage1 = 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';
  const solutionImage2 = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1115&q=80';
  const solutionImage3 = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';

  // Pricing Plans
  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic Digital',
      price: 'LKR 45,000',
      period: '/month',
      description: 'Perfect for startups and small businesses',
      icon: '🌱',
      color: '#10b981',
      features: [
        'Business Profile Analysis',
        'Brand & Market Research',
        'Strategy Planning & Goal Setting',
        'Monthly Performance Reporting',
        'Dedicated Account Manager',
        'Email & WhatsApp Support'
      ],
      buttonText: 'Get Started',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Digital',
      price: 'LKR 70,000',
      period: '/month',
      description: 'Ideal for growing businesses',
      icon: '🚀',
      color: '#8b5cf6',
      features: [
        'Social Media Account Setup (FB / Instagram)',
        '15 Pages',
        '8–12 Social Media Posts per Month',
        'Basic Graphic Design',
        'Page Optimization (Bio, Highlights, CTA)',
        'Basic Audience Targeting',
        'Monthly Report',
        'Support: Email / WhatsApp'
      ],
      buttonText: 'Choose Plan',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Digital',
      price: 'LKR 1,00,000',
      period: '/month',
      description: 'For large-scale businesses',
      icon: '🏢',
      color: '#3b82f6',
      features: [
        'Advanced Social Media Management (FB, IG, TikTok / LinkedIn)',
        '16–24 Social Media Posts per Month',
        'Premium Graphic Designs + Reels',
        'Paid Ads Management (Facebook / Instagram)',
        'Advanced Audience Targeting & Retargeting',
        'Basic SEO Optimization',
        'Website Traffic Tracking',
        'Bi-Weekly Performance Report',
        'Priority Support'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  // How We Work Steps
  const workSteps = [
    {
      id: 1,
      number: '01',
      title: 'Discovery Call',
      description: 'We discuss your business goals, target audience, and digital requirements in detail.',
      icon: '🎯',
      color: '#8b5cf6'
    },
    {
      id: 2,
      number: '02',
      title: 'Strategy & Planning',
      description: 'Our experts create a comprehensive digital strategy tailored to your needs.',
      icon: '📊',
      color: '#3b82f6'
    },
    {
      id: 3,
      number: '03',
      title: 'Design & Prototyping',
      description: 'We create stunning designs and interactive prototypes for your approval.',
      icon: '🎨',
      color: '#ec4899'
    },
    {
      id: 4,
      number: '04',
      title: 'Development',
      description: 'Our developers bring the designs to life with clean, efficient code.',
      icon: '⚙️',
      color: '#f59e0b'
    },
    {
      id: 5,
      number: '05',
      title: 'Testing & QA',
      description: 'Rigorous testing ensures everything works perfectly across all devices.',
      icon: '🧪',
      color: '#10b981'
    },
    {
      id: 6,
      number: '06',
      title: 'Launch & Grow',
      description: 'We launch your solution and provide ongoing support and optimization.',
      icon: '📈',
      color: '#06b6d4'
    }
  ];

  // Digital Marketing Only Projects (Updated)
  const workItems = [
    {
      id: 1,
      title: 'September Film Flyers',
      category: 'Digital Marketing',
      description: 'Complete creative campaign for September film release with poster concepts, social media designs, and all visual branding developed by WebPoint.lk.',
      image: filmProjectImg,
      color: '#3b82f6',
      tags: ['Social Media', 'Video Marketing', 'Content Strategy'],
      link: '#',
      fullImage: filmProjectImg
    },
    {
      id: 2,
      title: 'Sweet Day K-pop Concert',
      category: 'Digital Marketing',
      description: 'Comprehensive digital promotion for Sweet Day K-pop concert including social media buzz, influencer collaborations, and targeted advertising.',
      image: concertProjectImg,
      color: '#ec4899',
      tags: ['Event Marketing', 'Social Media', 'Influencer Collaboration'],
      link: '#',
      fullImage: concertProjectImg
    },
    {
      id: 3,
      title: 'Ikka Film Flyers',
      category: 'Digital Marketing',
      description: 'Ikka Film main poster concepts, social media creatives, and complete visual branding developed and designed by WebPoint.lk.',
      image: ikkaProjectImg,
      color: '#06b6d4',
      tags: ['Visual Design', 'Branding', 'Social Commerce'],
      link: '#',
      fullImage: ikkaProjectImg}
    // },
    // {
    //   id: 4,
    //   title: 'Social Media Growth Strategy',
    //   category: 'Digital Marketing',
    //   description: 'Data-driven social media growth strategy that increased engagement by 300% across multiple platforms through content optimization.',
    //   image: solutionImage2,
    //   color: '#8b5cf6',
    //   tags: ['Social Media', 'Data Analytics', 'Content Strategy'],
    //   link: '#',
    //   fullImage: solutionImage2
    // },
    // {
    //   id: 5,
    //   title: 'Influencer Marketing Campaign',
    //   category: 'Digital Marketing',
    //   description: 'Strategic influencer marketing campaign connecting brands with relevant creators to drive authentic engagement and conversion.',
    //   image: solutionImage1,
    //   color: '#f59e0b',
    //   tags: ['Influencer Marketing', 'Brand Strategy', 'Content Creation'],
    //   link: '#',
    //   fullImage: solutionImage1
    // },
    // {
    //   id: 6,
    //   title: 'Digital Brand Awareness Campaign',
    //   category: 'Digital Marketing',
    //   description: 'Comprehensive brand awareness campaign utilizing multi-channel digital marketing to establish brand presence and recognition.',
    //   image: heroImage,
    //   color: '#10b981',
    //   tags: ['Brand Awareness', 'Multi-Channel', 'Digital Strategy'],
    //   link: '#',
    //   fullImage: heroImage
    // }
  ];

  const categories = ['all', 'Digital Marketing'];

  const filteredWork = activeTab === 'all' 
    ? workItems 
    : workItems.filter(item => item.category === activeTab);

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openImagePopup = (image) => {
    setSelectedImage(image);
    setIsImagePopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImagePopup = () => {
    setIsImagePopupOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={styles.digitalSolutionContainer}>
      
      {/* Hero Section - Matching Home Page */}
      <div className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>✦ Digital Solutions</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              <span>Transform Your Business</span>
              <span className={styles.highlightText}>with Innovative Digital</span>
              <span>Solutions</span>
            </h1>
            
            <p className={styles.heroDescription}>
              We craft cutting-edge digital experiences that drive growth, engage customers, 
              and transform your business for the digital age.
            </p>
            
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>95%</span>
                <span className={styles.statLabel}>Client Retention</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Support Available</span>
              </div>
            </div>
            
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton} onClick={() => navigate('/contact')}>
                Start Your Digital Journey
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button 
                className={styles.secondaryButton} 
                onClick={() => {
                  const pricingSection = document.querySelector(`.${styles.pricingSection}`);
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className={styles.playIcon}>▶</span>
                View Pricing
              </button>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardHeader}>
                <div className={styles.cardDots}>
                  <span></span><span></span><span></span>
                </div>
                <span className={styles.cardTitle}>Digital Solutions</span>
              </div>
              <div className={styles.heroCardContent}>
                <div className={styles.cardMetrics}>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>📱</span>
                    <div>
                      <div className={styles.metricValue}>Mobile First</div>
                      <div className={styles.metricLabel}>Responsive Design</div>
                    </div>
                  </div>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>⚡</span>
                    <div>
                      <div className={styles.metricValue}>Fast Performance</div>
                      <div className={styles.metricLabel}>Optimized Speed</div>
                    </div>
                  </div>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>🎨</span>
                    <div>
                      <div className={styles.metricValue}>Creative Design</div>
                      <div className={styles.metricLabel}>Unique Concepts</div>
                    </div>
                  </div>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricIcon}>🔒</span>
                    <div>
                      <div className={styles.metricValue}>Secure</div>
                      <div className={styles.metricLabel}>Enterprise Grade</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans Section */}
      {/* <div className={styles.pricingSection} id="pricing">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Pricing Plans</span>
            </div>
            <h2 className={styles.sectionTitle}>Flexible <span className={styles.textGradient}>Pricing</span></h2>
            <p className={styles.sectionSubtitle}>
              Choose the perfect plan that fits your business needs and budget
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`${styles.pricingCard} ${plan.popular ? styles.popularCard : ''}`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                style={{
                  '--plan-color': plan.color,
                  transform: hoveredPlan === plan.id ? 'translateY(-8px)' : 'translateY(0)'
                }}
              >
                {plan.popular && (
                  <div className={styles.popularBadge}>⭐ Most Popular</div>
                )}
                
                <div className={styles.pricingIconWrapper}>
                  <span className={styles.pricingIcon}>{plan.icon}</span>
                </div>
                
                <h3 className={styles.pricingName}>{plan.name}</h3>
                <p className={styles.pricingDescription}>{plan.description}</p>
                
                <div className={styles.pricingPrice}>
                  <span className={styles.priceValue}>{plan.price}</span>
                  <span className={styles.pricePeriod}>{plan.period}</span>
                </div>
                
                <ul className={styles.pricingFeatures}>
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <span className={styles.featureCheck}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`${styles.pricingButton} ${plan.popular ? styles.popularButton : ''}`}
                  onClick={() => navigate('/contact')}
                >
                  {plan.buttonText}
                  <span className={styles.buttonArrow}>→</span>
                </button>
              </div>
            ))}
          </div>

          <div className={styles.pricingNote}>
            <p>✨ All plans include 30-day money-back guarantee. Custom enterprise solutions available.</p>
          </div>
        </div>
      </div> */}

      {/* Our Work Section - UPDATED with Digital Marketing Only */}
      <div className={styles.workSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Our Portfolio</span>
            </div>
            <h2 className={styles.sectionTitle}>Digital Marketing <span className={styles.textGradient}>Projects</span></h2>
            <p className={styles.sectionSubtitle}>
              Explore our digital marketing success stories that drive results and engagement
            </p>
          </div>

          <div className={styles.workFilter}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${activeTab === category ? styles.activeFilter : ''}`}
                onClick={() => setActiveTab(category)}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>

          <div className={styles.workGrid}>
            {filteredWork.map((work) => (
              <div key={work.id} className={styles.workCard} style={{ '--card-color': work.color }}>
                <div className={styles.workImageWrapper}>
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className={styles.workImage}
                    onClick={() => openImagePopup(work.fullImage || work.image)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/600x400/1a1b3a/${work.color.slice(1)}?text=${encodeURIComponent(work.title)}`;
                    }}
                  />
                  <div className={styles.workOverlay}>
                    <div className={styles.workTags}>
                      {work.tags.map((tag, index) => (
                        <span key={index} className={styles.workTag}>{tag}</span>
                      ))}
                    </div>
                    <button 
                      className={styles.workViewButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        openImagePopup(work.fullImage || work.image);
                      }}
                    >
                      🔍 View Full Image
                    </button>
                  </div>
                </div>
                <div className={styles.workContent}>
                  <span className={styles.workCategory} style={{ color: work.color }}>
                    {work.category}
                  </span>
                  <h3 className={styles.workTitle}>{work.title}</h3>
                  <p className={styles.workDescription}>{work.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.workViewAll}>
            {/* <button className={styles.viewAllButton} onClick={() => navigate('/portfolio')}>
              View All Projects
              <span className={styles.buttonIcon}>→</span>
            </button> */}
          </div>
        </div>
      </div>

      {/* Image Popup Modal */}
      {isImagePopupOpen && selectedImage && (
        <div className={styles.imagePopupOverlay} onClick={closeImagePopup}>
          <div className={styles.imagePopupContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.imagePopupClose} onClick={closeImagePopup}>
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Full size project" 
              className={styles.imagePopupFull}
            />
            <div className={styles.imagePopupCaption}>
              <p>Click anywhere outside to close</p>
            </div>
          </div>
        </div>
      )}

      {/* How We Work Section */}
      <div className={styles.processSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Our Process</span>
            </div>
            <h2 className={styles.sectionTitle}>How We <span className={styles.textGradient}>Work</span></h2>
            <p className={styles.sectionSubtitle}>
              Our proven methodology ensures successful delivery of your digital solutions
            </p>
          </div>

          <div className={styles.processGrid}>
            {workSteps.map((step) => (
              <div key={step.id} className={styles.processStep} style={{ '--step-color': step.color }}>
                <div className={styles.stepNumber} style={{ color: step.color }}>{step.number}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.processStats}>
            <div className={styles.processStat}>
              <span className={styles.processStatValue}>2x</span>
              <span className={styles.processStatLabel}>Faster Delivery</span>
            </div>
            <div className={styles.processStat}>
              <span className={styles.processStatValue}>99.9%</span>
              <span className={styles.processStatLabel}>On-time Completion</span>
            </div>
            <div className={styles.processStat}>
              <span className={styles.processStatValue}>24/7</span>
              <span className={styles.processStatLabel}>Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Matching Home Page */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaBackground}></div>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBadge}>
              <span>✦ Ready to Transform</span>
            </div>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your <span>Digital Presence</span>?
            </h2>
            <p className={styles.ctaDescription}>
              Let's collaborate to create something extraordinary. Get a free consultation 
              and discover how we can help your business thrive in the digital world.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary} onClick={() => navigate('/contact')}>
                Get Free Consultation
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button className={styles.ctaSecondary} onClick={() => navigate('/services')}>
                Explore Services
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

export default DigitalSolution;