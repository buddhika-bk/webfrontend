import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DigitalSolution.module.css';

// Import images (you'll need to add these to your assets)
import solutionHeroImg from '../../assets/solution-hero.jpg';
// import project1Img from '../../assets/project1.jpg';
// import project2Img from '../../assets/project2.jpg';
// import project3Img from '../../assets/project3.jpg';
import filmProjectImg from '../../assets/September .jpeg';
import concertProjectImg from '../../assets/kpop.jpeg';
import tshirtProjectImg from '../../assets/Tshirt.png';

const DigitalSolution = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  // Google Images URLs for fallback
  const heroImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80';
  const solutionImage1 = 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  const solutionImage2 = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80';
  const solutionImage3 = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  
  // New images for Digital Marketing projects
//   const filmProjectImg = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1159&q=80';
//   const concertProjectImg = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
//   const tshirtProjectImg = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

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
      popular: false,
      gradient: styles.gradientGreen
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
      popular: true,
      gradient: styles.gradientPurple
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
      popular: false,
      gradient: styles.gradientBlue
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

  // Our Work / Portfolio Items - UPDATED with new Digital Marketing projects
  const workItems = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'Web Development',
      description: 'A modern e-commerce solution with AI-powered recommendations',
      image: solutionImage1,
      color: '#8b5cf6',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      id: 2,
      title: 'September Film Campaign',
      category: 'Digital Marketing',
      description: 'Complete digital marketing campaign for September Film release including social media strategy, teaser content, and audience engagement',
      image: filmProjectImg,
      color: '#3b82f6',
      tags: ['Social Media', 'Video Marketing', 'Content Strategy'],
      link: '#'
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      category: 'Mobile Development',
      description: 'Secure and user-friendly mobile banking application',
      image: solutionImage3,
      color: '#10b981',
      tags: ['React Native', 'Firebase', 'Payment API'],
      link: '#'
    },
    {
      id: 4,
      title: 'Sweet Day K-pop Concert',
      category: 'Digital Marketing',
      description: 'Comprehensive digital promotion for Sweet Day K-pop concert including ticket sales campaigns, fan engagement, and live event coverage',
      image: concertProjectImg,
      color: '#ec4899',
      tags: ['Event Marketing', 'Social Media', 'Influencer Collaboration'],
      link: '#'
    },
    {
      id: 5,
      title: 'LMS Platform',
      category: 'Web Development',
      description: 'Learning management system for online education',
      image: solutionImage1,
      color: '#f59e0b',
      tags: ['React', 'Django', 'PostgreSQL'],
      link: '#'
    },
    {
      id: 6,
      title: 'T-Shirt Design Campaign',
      category: 'Digital Marketing',
      description: 'Creative digital campaign for a custom t-shirt brand featuring design showcases, user-generated content, and limited edition launches',
      image: tshirtProjectImg,
      color: '#06b6d4',
      tags: ['Visual Design', 'Branding', 'Social Commerce'],
      link: '#'
    },
    {
      id: 7,
      title: 'Corporate Website Redesign',
      category: 'Web Design',
      description: 'Modern redesign for a leading corporate brand',
      image: heroImage,
      color: '#8b5cf6',
      tags: ['UI/UX', 'Animation', 'Responsive'],
      link: '#'
    },
    {
      id: 8,
      title: 'Brand Identity Package',
      category: 'Branding',
      description: 'Complete brand identity design for a startup',
      image: solutionImage2,
      color: '#f59e0b',
      tags: ['Logo', 'Branding', 'Style Guide'],
      link: '#'
    }
  ];

  // Filter categories - UPDATED "Marketing" to "Digital Marketing"
  const categories = ['all', 'Web Development', 'Mobile Development', 'Digital Marketing', 'Web Design', 'Branding'];

  const filteredWork = activeTab === 'all' 
    ? workItems 
    : workItems.filter(item => item.category === activeTab);

  return (
    <div className={styles.digitalSolutionContainer}>
      {/* Animated Background - Similar to Services page */}
      <div className={styles.backgroundAnimation}>
        <div className={styles.floatingShapes}>
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className={styles.floatingShape}
              style={{
                animationDelay: `${i * 0.4}s`,
                background: pricingPlans[i % pricingPlans.length]?.color + '20',
                borderColor: pricingPlans[i % pricingPlans.length]?.color + '40',
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
            ></div>
          ))}
        </div>
        <div className={styles.gradientOrbs}>
          <div className={`${styles.orb} ${styles.orb1}`}></div>
          <div className={`${styles.orb} ${styles.orb2}`}></div>
          <div className={`${styles.orb} ${styles.orb3}`}></div>
          <div className={`${styles.orb} ${styles.orb4}`}></div>
        </div>
      </div>

      {/* Creative Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeText}>✨ Digital Solutions</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Transform Your Business with{' '}
            <span className={styles.titleHighlight}>Innovative Digital</span>{' '}
            Solutions
          </h1>
          
          <p className={styles.heroDescription}>
            We craft cutting-edge digital experiences that drive growth, 
            engage customers, and transform your business for the digital age. 
            From strategy to execution, we're your partner in digital success.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>250+</div>
              <div className={styles.statLabel}>Projects Completed</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>95%</div>
              <div className={styles.statLabel}>Client Retention</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>15+</div>
              <div className={styles.statLabel}>Industry Awards</div>
            </div>
          </div>

          <div className={styles.heroActions}>
            <button 
              className={styles.primaryButton}
              onClick={() => navigate('/contact')}
            >
              Start Your Digital Journey
              <span className={styles.buttonIcon}>→</span>
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={() => document.querySelector(`.${styles.pricingSection}`)?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Pricing
              <span className={styles.buttonIcon}>↓</span>
            </button>
          </div>

          <div className={styles.heroTrustBadges}>
            <div className={styles.trustBadge}>
              <span>⭐</span>
              <span>4.9/5 Rating</span>
            </div>
            <div className={styles.trustBadge}>
              <span>🏆</span>
              <span>Award Winning</span>
            </div>
            <div className={styles.trustBadge}>
              <span>🔒</span>
              <span>Secure & Reliable</span>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroVisualWrapper}>
            <div className={styles.heroMainImage}>
              <img 
                src={solutionHeroImg} 
                alt="Digital Solutions"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400/1a1b3a/8b5cf6?text=Digital+Solutions';
                }}
              />
              <div className={styles.imageOverlay}></div>
            </div>
            
            <div className={styles.floatingCards}>
              <div className={styles.floatingCard} style={{ '--delay': '0s', '--color': '#8b5cf6' }}>
                <span className={styles.cardIcon}>📱</span>
                <span>Mobile First</span>
              </div>
              <div className={styles.floatingCard} style={{ '--delay': '1s', '--color': '#3b82f6' }}>
                <span className={styles.cardIcon}>⚡</span>
                <span>Fast Performance</span>
              </div>
              <div className={styles.floatingCard} style={{ '--delay': '2s', '--color': '#10b981' }}>
                <span className={styles.cardIcon}>🎨</span>
                <span>Creative Design</span>
              </div>
              <div className={styles.floatingCard} style={{ '--delay': '3s', '--color': '#ec4899' }}>
                <span className={styles.cardIcon}>🔒</span>
                <span>Secure</span>
              </div>
            </div>

            <div className={styles.heroStatsVisual}>
              <div className={styles.statCircle}>
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(212, 205, 205, 0.2)" strokeWidth="8"/>
                  <circle 
                    cx="50" cy="50" r="45" fill="none" 
                    stroke="url(#gradient)" strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset="70"
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className={styles.statCircleContent}>
                  <span className={styles.statCircleValue}>100%</span>
                  <span className={styles.statCircleLabel}>Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans Section */}
      <div className={styles.pricingSection} id="pricing">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>💰 Pricing Plans</span>
          </div>
          <h2>Flexible <span className={styles.textGradient}>Pricing</span> for Every Business</h2>
          <p className={styles.sectionSubtitle}>
            Choose the perfect plan that fits your business needs and budget. 
            All plans include premium support and regular updates.
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
                transform: hoveredPlan === plan.id ? 'translateY(-15px)' : 'translateY(0)',
                '--plan-color': plan.color
              }}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>
                  <span>Most Popular</span>
                </div>
              )}
              
              <div className={`${styles.pricingIcon} ${plan.gradient}`}>
                {plan.icon}
              </div>
              
              <h3 className={styles.pricingName}>{plan.name}</h3>
              <p className={styles.pricingDescription}>{plan.description}</p>
              
              <div className={styles.pricingPrice}>
                <span className={styles.priceValue}>{plan.price}</span>
                <span className={styles.pricePeriod}>{plan.period}</span>
              </div>
              
              <ul className={styles.pricingFeatures}>
                {plan.features.map((feature, index) => (
                  <li key={index} className={styles.pricingFeature}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`${styles.pricingButton} ${plan.popular ? styles.popularButton : ''}`}
                style={{ '--button-color': plan.color }}
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

      {/* How We Work Section */}
      <div className={styles.processSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>⚙️ Our Process</span>
          </div>
          <h2>How We <span className={styles.textGradient}>Transform</span> Ideas into Reality</h2>
          <p className={styles.sectionSubtitle}>
            Our proven methodology ensures successful delivery of your digital solutions
          </p>
        </div>

        <div className={styles.processTimeline}>
          {/* Main timeline line */}
          <div className={styles.timelineLine}></div>
          
          <div className={styles.processSteps}>
            {workSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={styles.processStep}
                style={{ '--step-color': step.color }}
              >
                <div className={styles.stepNumberWrapper}>
                  <div className={styles.stepNumber} style={{ background: `${step.color}20`, color: step.color }}>
                    {step.number}
                  </div>
                  <div className={styles.stepConnector}></div>
                </div>
                
                <div className={styles.stepContent}>
                  <div className={styles.stepIconWrapper} style={{ background: `${step.color}20` }}>
                    <span className={styles.stepIcon} style={{ color: step.color }}>{step.icon}</span>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>

                {index < workSteps.length - 1 && (
                  <div className={styles.stepArrow}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Process Stats */}
        <div className={styles.processStats}>
          <div className={styles.processStat}>
            <div className={styles.processStatValue}>2x</div>
            <div className={styles.processStatLabel}>Faster Delivery</div>
          </div>
          <div className={styles.processStat}>
            <div className={styles.processStatValue}>100%</div>
            <div className={styles.processStatLabel}>On-time Completion</div>
          </div>
          <div className={styles.processStat}>
            <div className={styles.processStatValue}>24/7</div>
            <div className={styles.processStatLabel}>Support</div>
          </div>
        </div>
      </div>

      {/* Our Work Section - UPDATED with new Digital Marketing projects */}
      <div className={styles.workSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>🎨 Our Portfolio</span>
          </div>
          <h2>Recent <span className={styles.textGradient}>Digital</span> Masterpieces</h2>
          <p className={styles.sectionSubtitle}>
            Explore some of our favorite projects that showcase our expertise and creativity
          </p>
        </div>

        {/* Category Filter - UPDATED "Marketing" to "Digital Marketing" */}
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

        {/* Work Grid */}
        <div className={styles.workGrid}>
          {filteredWork.map((work) => (
            <div 
              key={work.id} 
              className={styles.workCard}
              style={{ '--card-color': work.color }}
            >
              <div className={styles.workImageWrapper}>
                <img 
                  src={work.image} 
                  alt={work.title}
                  className={styles.workImage}
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
                    onClick={() => window.open(work.link, '_blank')}
                  >
                    View Project
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

        {/* View All Button */}
        <div className={styles.workViewAll}>
          <button 
            className={styles.viewAllButton}
            onClick={() => navigate('/portfolio')}
          >
            View All Projects
            <span className={styles.buttonIcon}>→</span>
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h2>Ready to Transform Your Digital Presence?</h2>
            <p>
              Let's collaborate to create something extraordinary. Get a free consultation 
              and discover how we can help your business thrive in the digital world.
            </p>
            
            <div className={styles.ctaFeatures}>
              <div className={styles.ctaFeature}>
                <span>✓</span>
                Free Strategy Session
              </div>
              <div className={styles.ctaFeature}>
                <span>✓</span>
                No Obligation Quote
              </div>
              <div className={styles.ctaFeature}>
                <span>✓</span>
                24/7 Support
              </div>
            </div>

            <div className={styles.ctaActions}>
              <button 
                className={styles.ctaPrimary}
                onClick={() => navigate('/contact')}
              >
                Get Free Consultation
                <span className={styles.buttonIcon}>→</span>
              </button>
              <button 
                className={styles.ctaSecondary}
                onClick={() => navigate('/services')}
              >
                Explore Services
              </button>
            </div>
          </div>

          <div className={styles.ctaVisual}>
            <div className={styles.ctaCircle}>
              <div className={styles.ctaCircleInner}>
                <div className={styles.ctaIcons}>
                  <span>🚀</span>
                  <span>💡</span>
                  <span>⚡</span>
                  <span>🎯</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalSolution;