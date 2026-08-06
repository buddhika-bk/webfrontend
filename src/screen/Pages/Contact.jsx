import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Contact.module.css';

const Contact = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactMethods = [
    { icon: '📞', title: 'Phone', value: '070-7312180 / 071-6646377', color: '#8b5cf6' },
    { icon: '💬', title: 'WhatsApp', value: '072-1202070', color: '#10b981' },
    { icon: '✉️', title: 'Email', value: 'info@webpoint.lk', color: '#3b82f6' },
    { icon: '📍', title: 'Location', value: 'Suncity Tower, Malabe, Colombo.', color: '#f59e0b' }
  ];

  const services = [
    { name: 'Web Development', icon: '💻' },
    { name: 'POS Systems', icon: '🛒' },
    { name: '3D & Flyer Design', icon: '🎨' },
    { name: 'Custom Software', icon: '⚙️' },
    { name: 'Mobile Apps', icon: '📱' }
  ];

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.contactContainer}>
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
            <a href="/about">About</a>
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

      {/* Hero Section - Matching Home Page */}
      <div className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>✦ Get In Touch</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              <span>Let's Build</span>
              <span className={styles.highlightText}>Something Amazing</span>
              <span>Together</span>
            </h1>
            
            <p className={styles.heroDescription}>
              Ready to transform your digital presence? Contact us today for a free consultation 
              and let's discuss how we can help your business grow.
            </p>
            
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24hr</span>
                <span className={styles.statLabel}>Response Time</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>Free</span>
                <span className={styles.statLabel}>Consultation</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>99.9%</span>
                <span className={styles.statLabel}>Satisfaction</span>
              </div>
            </div>
            
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton} onClick={() => window.location.href = 'tel:+94716646377'}>
                Call Now: 071-6646377
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
                <span className={styles.cardTitle}>Contact Us</span>
              </div>
              <div className={styles.heroCardContent}>
                <div className={styles.cardMetrics}>
                  {contactMethods.map((method, index) => (
                    <div key={index} className={styles.cardMetric} style={{ '--method-color': method.color }}>
                      <span className={styles.metricIcon}>{method.icon}</span>
                      <div>
                        <div className={styles.metricValue}>{method.title}</div>
                        <div className={styles.metricLabel}>{method.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.sectionContainer}>
          <div className={styles.contentWrapper}>
            {/* Contact Form Section */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionBadge}>
                  <span>✦ Send Message</span>
                </div>
                <h2 className={styles.sectionTitle}>Get a <span className={styles.textGradient}>Free Quote</span></h2>
                <p className={styles.sectionSubtitle}>
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              <form className={styles.contactForm} onSubmit={handleSubmit}>
                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    ✅ Thank you! Your message has been sent successfully. We'll contact you soon.
                  </div>
                )}
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <div className={styles.servicesSelection}>
                  <label>Interested In:</label>
                  <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                      <div key={index} className={styles.serviceCheckbox}>
                        <input type="checkbox" id={`service-${index}`} />
                        <label htmlFor={`service-${index}`}>
                          <span className={styles.serviceIcon}>{service.icon}</span>
                          {service.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className={styles.buttonArrow}>→</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div className={styles.infoSection}>
              <div className={styles.infoCard}>
                <div className={styles.infoHeader}>
                  <div className={styles.infoBadge}>
                    <span>✦ Contact Details</span>
                  </div>
                  <h3>How to Reach Us</h3>
                  <p>Choose your preferred method of communication</p>
                </div>

                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>📞</div>
                    <div>
                      <h4>Phone</h4>
                      <p>070-7312180 / 071-6646377</p>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>💬</div>
                    <div>
                      <h4>WhatsApp</h4>
                      <p>072-1202070 / 070-6646255</p>
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

                <div className={styles.officeHours}>
                  <h4>Office Hours</h4>
                  <div className={styles.hoursItem}>
                    <span>🕐 Mon - Fri</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className={styles.hoursItem}>
                    <span>🕐 Saturday</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </div>
                  <div className={styles.hoursItem}>
                    <span>🕐 Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>

                <div className={styles.quickActions}>
                  <a 
                    href="https://wa.me/94716646255" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.whatsappButton}
                  >
                    <span>💬</span>
                    Message on WhatsApp
                  </a>
                  <button 
                    className={styles.callButton}
                    onClick={() => window.location.href = 'tel:+94707312180'}
                  >
                    <span>📞</span>
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section - Updated */}
      <div className={styles.mapSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ Find Us</span>
            </div>
            <h2 className={styles.sectionTitle}>Our <span className={styles.textGradient}>Location</span></h2>
          </div>
          
          <div className={styles.mapContainer}>
            <div className={styles.mapWrapper}>
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

      {/* CTA Section - Matching Home Page */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaBackground}></div>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBadge}>
              <span>✦ Start Your Journey</span>
            </div>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your <span>Business</span>?
            </h2>
            <p className={styles.ctaDescription}>
              Don't wait to transform your business. Contact us now and let's create 
              something extraordinary together.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary} onClick={() => navigate('/service')}>
                View Our Services
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button className={styles.ctaSecondary} onClick={() => window.location.href = 'tel:+94707312180'}>
                <span>📞</span>
                Call Now: 071-6646377
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

export default Contact;