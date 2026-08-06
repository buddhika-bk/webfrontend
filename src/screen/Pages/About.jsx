import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './About.module.css';
import logoImage from '../../assets/logo.png';
import storyImage from '../../assets/story.jpeg';

const About = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Buddhika Kaveeja',
      role: 'CEO & Lead Developer',
      image: '../../assets/person.jpeg',
      description: '6+ years in software development and business strategy',
      social: { linkedin: 'https://www.linkedin.com/in/buddhika-kaveeja-955166296/', twitter: '#' }
    },
    {
      id: 2,
      name: 'Ruchira Ransika',
      role: 'Marketing Director',
      image: '../../assets/person.jpeg',
      description: 'Expert marketing and digital branding',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      id: 3,
      name: 'Nelinka Adikari',
      role: 'Project Manager',
      image: '../../assets/person.jpeg',
      description: 'Specialized in backend systems and cloud architecture',
      social: { linkedin: 'https://www.linkedin.com/in/nelinka-numaya-adikari-b59161296/', twitter: '#' }
    },
    {
      id: 4,
      name: 'Mihin Malavige',
      role: 'Digital Marketing Head',
      image: '../../assets/person.jpeg',
      description: 'Digital marketing strategist with 2+ years experience',
      social: { linkedin: '#', twitter: '#' }
    }
  ];

  // Services data
  const services = [
    {
      id: 'website',
      title: 'Website Development',
      description: 'Custom websites and web applications with 48-hour delivery',
      icon: '💻',
      color: '#8b5cf6'
    },
    {
      id: 'pos',
      title: 'POS Systems',
      description: 'Offline and cloud-based POS for retail, restaurants, and more',
      icon: '🛒',
      color: '#3b82f6'
    },
    {
      id: 'design',
      title: 'Concept Flyers & 3D Design',
      description: 'Creative design services including film posters, concert posters, and 3D designs',
      icon: '🎨',
      color: '#ec4899'
    },
    {
      id: 'software',
      title: 'Custom Software Development',
      description: 'Tailored software solutions to streamline your business operations',
      icon: '⚙️',
      color: '#f59e0b'
    },
    {
      id: 'mobile',
      title: 'Mobile Applications',
      description: 'iOS & Android app development and deployment',
      icon: '📱',
      color: '#10b981'
    }
  ];

  // Timeline data
  const timeline = [
    { year: 2020, title: 'Company Founded', description: 'WebPoint established in Colombo, Sri Lanka' },
    { year: 2021, title: 'First 50 Projects', description: 'Successfully delivered 50+ projects' },
    { year: 2022, title: 'Team Expansion', description: 'Expanded to 15+ team members' },
    { year: 2023, title: 'International Clients', description: 'Started serving international clients' },
    { year: 2024, title: 'Award Recognition', description: 'Best Tech Startup Award 2024' },
    { year: 2025, title: 'New Office', description: 'Opening new headquarters in Malabe' }
  ];

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.aboutContainer}>
      {/* Navigation Bar - Matching Home Page */}
      {/* <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <div className={styles.navLogo}>
            <span className={styles.logoIcon}>◆</span>
            <span className={styles.logoText}>WebPoint</span>
          </div>
          
          <div className={styles.navLinks}>
            <a href="/#home">Home</a>
            <a href="/#services">Services</a>
            <a href="/#pos-system">POS Solutions</a>
            <a href="/#pricing">Pricing</a>
            <a href="/about" className={styles.active}>About</a>
          </div>
          
          <div className={styles.navActions}>
            <button className={styles.navCta} onClick={() => navigate('/login')}>
              Get Started
            </button>
            <button className={styles.mobileToggle}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section - Matching Home Page Style */}
      <div className={styles.heroSection} id="about-hero">
        <div className={styles.heroBackground}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>✦ Since 2020</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              <span>About</span>
              <span className={styles.highlightText}>WebPoint</span>
              <span>Sri Lanka</span>
            </h1>
            
            <p className={styles.heroDescription}>
              For <strong>6 years</strong>, we've been transforming businesses through innovative digital solutions. 
              Based in Colombo, we've helped <strong>100+ clients</strong> achieve their digital goals with cutting-edge 
              technology and creative expertise.
            </p>
            
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>6+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Projects Delivered</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>20+</span>
                <span className={styles.statLabel}>Team Members</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>99.9%</span>
                <span className={styles.statLabel}>Satisfaction</span>
              </div>
            </div>
            
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton} onClick={() => navigate('/contact')}>
                Get In Touch
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button className={styles.secondaryButton} onClick={() => navigate('/service')}>
                <span className={styles.playIcon}>▶</span>
                Our Services
              </button>
            </div>
          </div>
          
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
      </div>

      {/* Our Story Section - Updated */}
      <div className={styles.storySection} id="story">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Our Journey</span>
            </div>
            <h2 className={styles.sectionTitle}>Our <span className={styles.textGradient}>Story</span></h2>
            <p className={styles.sectionSubtitle}>
              From a small startup to a leading digital solutions provider in Sri Lanka
            </p>
          </div>

          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <h3>Building Digital Excellence Since 2020</h3>
              <p>
                WebPoint was founded in 2020 with a vision to revolutionize the digital landscape
                in Sri Lanka. What started as a small team of passionate developers has grown into
                a full-service digital agency with expertise across multiple domains.
              </p>
              <p>
                Over the past 6 years, we've worked with businesses of all sizes - from local startups
                to international corporations. Our approach combines technical expertise with creative
                innovation to deliver solutions that drive real business growth.
              </p>
              <div className={styles.missionVision}>
                <div className={styles.missionCard}>
                  <h4>Our Mission</h4>
                  <p>To empower businesses with innovative digital solutions that drive growth and success.</p>
                </div>
                <div className={styles.visionCard}>
                  <h4>Our Vision</h4>
                  <p>To be Sri Lanka's leading digital transformation partner for businesses worldwide.</p>
                </div>
              </div>
            </div>
            <div className={styles.storyImage}>
              <div className={styles.imageContainer}>
                <img
                  src={storyImage}
                  alt="WebPoint Story"
                  className={styles.storyImageContent}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className={styles.imageOverlay}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section - Updated */}
      <div className={styles.timelineSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Milestones</span>
            </div>
            <h2 className={styles.sectionTitle}>Our <span className={styles.textGradient}>Journey</span></h2>
          </div>

          <div className={styles.timeline}>
            {timeline.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className={styles.timelineDot}></div>
                {index < timeline.length - 1 && (
                  <div className={styles.timelineLine}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section - Updated to match Home Page */}
      <div className={styles.servicesSection} id="services">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ What We Do</span>
            </div>
            <h2 className={styles.sectionTitle}>Our <span className={styles.textGradient}>Services</span></h2>
            <p className={styles.sectionSubtitle}>
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIconWrapper}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button className={styles.serviceButton} onClick={() => navigate('/service')}>
                  Learn More <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section - Updated */}
      <div className={styles.teamSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Meet Our Team</span>
            </div>
            <h2 className={styles.sectionTitle}>Our <span className={styles.textGradient}>Experts</span></h2>
            <p className={styles.sectionSubtitle}>
              Dedicated professionals committed to your success
            </p>
          </div>

          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.id} className={styles.teamCard}>
                <div className={styles.memberImage}>
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=8b5cf6&color=fff&size=200`;
                    }}
                  />
                  <div className={styles.memberOverlay}></div>
                </div>
                <div className={styles.memberInfo}>
                  <h3>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberDescription}>{member.description}</p>
                  <div className={styles.socialLinks}>
                    <a href={member.social.linkedin} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                    <a href={member.social.twitter} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section - Updated to match Home Page CTA */}
      <div className={styles.contactSection}>
        <div className={styles.contactBackground}></div>
        <div className={styles.sectionContainer}>
          <div className={styles.contactContent}>
            <div className={styles.contactBadge}>
              <span>✦ Get In Touch</span>
            </div>
            <h2 className={styles.contactTitle}>
              Let's Build Something <span className={styles.textGradient}>Amazing</span> Together
            </h2>
            <p className={styles.contactDescription}>
              Ready to take your business to the next level? Contact us today for a free consultation.
            </p>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>070-7312180</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>💬</div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>072-1202070</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>info@webpoint.lk</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📍</div>
                <div>
                  <h4>Location</h4>
                  <p>Suncity Tower, Malabe, Colombo</p>
                </div>
              </div>
            </div>

            <div className={styles.contactButtons}>
              <button className={styles.contactPrimary} onClick={() => navigate('/contact')}>
                Contact Us Now <span>→</span>
              </button>
              <a href="https://wa.me/94721202070" target="_blank" rel="noopener noreferrer" className={styles.contactWhatsapp}>
                <span>💬</span> Message on WhatsApp
              </a>
            </div>
          </div>

          <div className={styles.contactVisual}>
            <div className={styles.contactMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15825.006627732612!2d80.00440334515252!3d7.091541294807006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fbe433c1c2db%3A0x363c2a6f4d5e7778!2sGampaha%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1706181234567!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - WebPoint Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;