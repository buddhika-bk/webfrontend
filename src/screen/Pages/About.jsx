import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './About.module.css';
import logoImage from '../../assets/logo.jpeg';
import storyImage from '../../assets/story.jpeg';

const About = () => {
  const navigate = useNavigate();

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
      name: 'Chehan Gamage',
      role: 'Digital Marketing Head',
      image: '../../assets/person.jpeg',
      description: 'Digital marketing strategist with 8+ years experience',
      social: { linkedin: '#', twitter: '#' }
    }
  ];

  // Services data
  const services = [
    {
      id: 'website',
      title: 'Website Development',
      description: 'Custom websites and web applications',
      icon: '🌐',
      color: '#8b5cf6'
    },
    {
      id: 'system',
      title: 'System Development',
      description: 'Business software and enterprise solutions',
      icon: '⚙️',
      color: '#3b82f6'
    },
    {
      id: 'mobile',
      title: 'Mobile Applications',
      description: 'iOS & Android app development and deployment',
      icon: '📱',
      color: '#ec4899'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Solution',
      description: 'Online stores and payment integrations',
      icon: '🛒',
      color: '#f59e0b'
    },
    {
      id: 'marketing',
      title: 'Digital Marketing',
      description: 'SEO, social media, and online campaigns',
      icon: '📈',
      color: '#10b981'
    }
  ];

  // Timeline data
  const timeline = [
    { year: 2020, title: 'Company Founded', description: 'WebPoint established in Colombo, Sri Lanka' },
    { year: 2021, title: 'First 100 Projects', description: 'Successfully delivered 100+ projects' },
    { year: 2022, title: 'Team Expansion', description: 'Expanded to 15+ team members' },
    { year: 2023, title: 'International Clients', description: 'Started serving international clients' },
    { year: 2024, title: 'Award Recognition', description: 'Best Tech Startup Award 2024' },
    { year: 2025, title: 'New Office', description: 'Opening soon new headquarters in Gampaha' }
  ];

  return (
    <div className={styles.aboutContainer}>
      {/* Animated Background */}
      <div className={styles.backgroundAnimation}>
        <div className={styles.floatingElements}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={styles.floatingElement}
              style={{
                animationDelay: `${i * 0.5}s`,
                left: `${10 + i * 10}%`,
                top: `${20 + i * 8}%`
              }}
            ></div>
          ))}
        </div>
        <div className={styles.gradientBlobs}>
          <div className={`${styles.blob} ${styles.blob1}`}></div>
          <div className={`${styles.blob} ${styles.blob2}`}></div>
          <div className={`${styles.blob} ${styles.blob3}`}></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeText}>🌟 Since 2020</span>
          </div>

          <h1 className={styles.heroTitle}>
            About <span className={styles.titleHighlight}>WebPoint</span> Sri Lanka
          </h1>

          <p className={styles.heroDescription}>
            For <span className={styles.highlight}>6 years</span>, we've been transforming businesses through
            innovative digital solutions. Based in Colombo, we've helped <span className={styles.highlight}>500+ clients</span>
            achieve their digital goals with cutting-edge technology and creative expertise.
          </p>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🚀</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>6+</div>
                <div className={styles.statLabel}>Years Experience</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>💼</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>500+</div>
                <div className={styles.statLabel}>Projects Delivered</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>👥</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>20+</div>
                <div className={styles.statLabel}>Team Members</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🎯</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>98%</div>
                <div className={styles.statLabel}>Client Satisfaction</div>
              </div>
            </div>
          </div>

          <div className={styles.heroActions}>
            <button
              className={styles.primaryButton}
              onClick={() => navigate('/contact')}
            >
              Get In Touch
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => navigate('/service')}
            >
              Our Services
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.companyLogo}>
            <div className={styles.logoContainer}>
              <img
                src={logoImage} // Use imported image
                alt="WebPoint Logo"
                className={styles.logoImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                  e.target.alt = "WebPoint Logo Placeholder";
                }}
              />
              <div className={styles.logoBorder}></div>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>WebPoint</span>
              <span className={styles.logoSubtitle}>Sri Lanka</span>
            </div>
          </div>
          <div className={styles.logoGlow}></div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className={styles.storySection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>Our Journey</span>
          </div>
          <h2>Our <span className={styles.textGradient}>Story</span></h2>
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
                src={storyImage} // Use imported image
                alt="WebPoint Story - Building Digital Futures Since 2020"
                className={styles.storyImageContent}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  e.target.alt = "Team collaboration and digital innovation";
                }}
              />
              <div className={styles.imageOverlay}></div>
              <div className={styles.imageCaption}>
                <span className={styles.captionText}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className={styles.timelineSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>Milestones</span>
          </div>
          <h2>Our <span className={styles.textGradient}>Journey</span> Timeline</h2>
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

      {/* Our Services Section */}
      <div className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>What We Do</span>
          </div>
          <h2>Our <span className={styles.textGradient}>Services</span></h2>
          <p className={styles.sectionSubtitle}>
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div
              key={service.id}
              className={styles.serviceCard}
              style={{ '--service-color': service.color }}
            >
              <div
                className={styles.serviceIcon}
                style={{ background: `${service.color}20`, color: service.color }}
              >
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button
                className={styles.serviceButton}
                onClick={() => navigate('/service')}
                style={{ background: service.color }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Our Team Section */}
      <div className={styles.teamSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>Meet Our Team</span>
          </div>
          <h2>Our <span className={styles.textGradient}>Experts</span></h2>
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
                    e.target.src = `https://via.placeholder.com/200/8b5cf6/ffffff?text=${member.name.charAt(0)}`;
                  }}
                />
                <div className={styles.imageOverlay}></div>
              </div>
              <div className={styles.memberInfo}>
                <h3>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.memberDescription}>{member.description}</p>
                <div className={styles.socialLinks}>
                  <a href={member.social.linkedin} className={styles.socialLink}>LinkedIn</a>
                  <a href={member.social.twitter} className={styles.socialLink}>Twitter</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info Section */}
      <div className={styles.contactSection}>
        <div className={styles.contactCard}>
          <div className={styles.contactContent}>
            <div className={styles.contactBadge}>
              <span>Get In Touch</span>
            </div>
            <h2>Let's Build Something <span className={styles.textGradient}>Amazing</span> Together</h2>
            <p className={styles.contactDescription}>
              Ready to take your business to the next level? Contact us today for a free consultation.
            </p>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📞</div>
                <div className={styles.contactDetails}>
                  <h4>Phone Number</h4>
                  <p>070-7312180</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>💬</div>
                <div className={styles.contactDetails}>
                  <h4>WhatsApp</h4>
                  <p>072-1202070</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>✉️</div>
                <div className={styles.contactDetails}>
                  <h4>Email</h4>
                  <p>info@webpoint.lk</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📍</div>
                <div className={styles.contactDetails}>
                  <h4>Location</h4>
                  <p>Gampaha, Sri Lanka</p>
                </div>
              </div>
            </div>

            <div className={styles.contactActions}>
              <button
                className={styles.contactButton}
                onClick={() => navigate('/contact')}
              >
                Contact Us Now
              </button>
              <a
                href="https://wa.me/94721202070"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          <div className={styles.contactVisual}>
            <div className={styles.contactMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15825.006627732612!2d80.00440334515252!3d7.091541294807006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fbe433c1c2db%3A0x363c2a6f4d5e7778!2sGampaha%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1706181234567!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '18px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Gampaha, Sri Lanka"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;