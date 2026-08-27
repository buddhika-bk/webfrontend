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
      fullImage: ikkaProjectImg
    }
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
    <div className={styles.digitalSolutionContainer}>
      
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
            <div className={styles.heroCard3D} style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`
            }}>
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

      {/* ===== OUR WORK SECTION ===== */}
      <div className={styles.workSection} data-section="work">
        <div className={styles.sectionContainer}>
          <div className={`${styles.sectionHeader} ${isVisible.work ? styles.visible : ''}`}>
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
            {filteredWork.map((work, index) => (
              <div 
                key={work.id} 
                className={`${styles.workCard} ${isVisible.work ? styles.visible : ''}`}
                data-card={index}
                onMouseMove={(e) => handleCardTilt(e, index)}
                onMouseLeave={() => resetCardTilt(index)}
                style={{ 
                  '--card-color': work.color,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
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
        </div>
      </div>

      {/* ===== IMAGE POPUP MODAL ===== */}
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

      {/* ===== PROCESS SECTION ===== */}
      <div className={styles.processSection} data-section="process">
        <div className={styles.sectionContainer}>
          <div className={`${styles.sectionHeader} ${isVisible.process ? styles.visible : ''}`}>
            <div className={styles.sectionBadge}>
              <span>✦ Our Process</span>
            </div>
            <h2 className={styles.sectionTitle}>How We <span className={styles.textGradient}>Work</span></h2>
            <p className={styles.sectionSubtitle}>
              Our proven methodology ensures successful delivery of your digital solutions
            </p>
          </div>

          <div className={styles.processGrid}>
            {workSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`${styles.processStep} ${isVisible.process ? styles.visible : ''}`}
                style={{ 
                  '--step-color': step.color,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <div className={styles.stepNumber} style={{ color: step.color }}>{step.number}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>

          <div className={`${styles.processStats} ${isVisible.process ? styles.visible : ''}`}>
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