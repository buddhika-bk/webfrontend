import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Contact.module.css';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
    
    // Simulate API call
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
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactPersons = [
    {
      role: 'Project Manager',
      name: 'Nelinka Adikari',
      phone: '072-1202070',
      email: 'nelinka@webpoint.lk',
      icon: '👩‍💼'
    },
    {
      role: 'Marketing Manager',
      name: 'Ruchira Ransika',
      phone: '071-6646377',
      email: 'ruchira@webpoint.lk',
      icon: '👨‍💼'
    },
    {
      role: 'General Inquiries',
      name: 'Customer Support',
      phone: '070-7312180',
      email: 'info@webpoint.lk',
      icon: '📞'
    }
  ];

  const services = [
    { name: 'Website Development', icon: '🌐' },
    { name: 'System Development', icon: '⚙️' },
    { name: 'Mobile Applications', icon: '📱' },
    { name: 'E-commerce Solutions', icon: '🛒' },
    { name: 'Digital Marketing', icon: '📈' }
  ];

  const contactMethods = [
    { icon: '📧', title: 'Email', value: 'info@webpoint.lk', color: '#8b5cf6' },
    { icon: '📱', title: 'Phone', value: '070-7312180', color: '#3b82f6' },
    { icon: '💬', title: 'WhatsApp', value: '072-1202070', color: '#10b981' },
    { icon: '📍', title: 'Location', value: 'Gampaha, Sri Lanka', color: '#f59e0b' }
  ];

  return (
    <div className={styles.contactContainer}>
      {/* Animated Background */}
      <div className={styles.backgroundAnimation}>
        <div className={styles.floatingShapes}>
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={styles.floatingShape}
              style={{
                animationDelay: `${i * 0.3}s`,
                background: `rgba(${139 + i * 10}, ${92 + i * 5}, ${246}, 0.1)`,
                borderColor: `rgba(${139 + i * 10}, ${92 + i * 5}, ${246}, 0.2)`
              }}
            ></div>
          ))}
        </div>
        <div className={styles.gradientOrbs}>
          <div className={`${styles.orb} ${styles.orb1}`}></div>
          <div className={`${styles.orb} ${styles.orb2}`}></div>
          <div className={`${styles.orb} ${styles.orb3}`}></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeText}>📞 Get In Touch</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Let's <span className={styles.titleHighlight}>Build</span> Something Amazing Together
          </h1>
          
          <p className={styles.heroDescription}>
            Ready to transform your digital presence? Contact us today for a free consultation 
            and let's discuss how we can help your business grow.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statIcon}>⚡</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>24-hour</div>
                <div className={styles.statLabel}>Response Time</div>
              </div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>Free</div>
                <div className={styles.statLabel}>Initial Consultation</div>
              </div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <div className={styles.statIcon}>🎯</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Client Satisfaction</div>
              </div>
            </div>
          </div>

          <div className={styles.heroActions}>
            <button 
              className={styles.primaryButton}
              onClick={() => navigate('/contact')}
            >
              <span className={styles.buttonIcon}>📞</span>
              Call Now: 070-7312180
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={() => navigate('/service')}
            >
              <span className={styles.buttonIcon}>🌐</span>
              Our Services
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.contactVisual}>
            <div className={styles.contactMethodsGrid}>
              {contactMethods.map((method, index) => (
                <div 
                  key={index} 
                  className={styles.contactMethodCard}
                  style={{ '--method-color': method.color }}
                >
                  <div 
                    className={styles.methodIcon}
                    style={{ background: `${method.color}20` }}
                  >
                    {method.icon}
                  </div>
                  <div className={styles.methodContent}>
                    <h4>{method.title}</h4>
                    <p>{method.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.visualGlow}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Contact Form Section */}
          <div className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionBadge}>
                <span>Send Message</span>
              </div>
              <h2>Get a <span className={styles.textGradient}>Free Quote</span></h2>
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
                    <span className={styles.sendIcon}>📤</span>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <div className={styles.infoHeader}>
                <div className={styles.infoBadge}>
                  <span>Contact Details</span>
                </div>
                <h3>How to Reach Us</h3>
                <p>Choose your preferred method of communication</p>
              </div>

              {/* Contact Persons */}
              <div className={styles.contactPersons}>
                {contactPersons.map((person, index) => (
                  <div key={index} className={styles.personCard}>
                    <div className={styles.personIcon}>{person.icon}</div>
                    <div className={styles.personInfo}>
                      <h4>{person.role}</h4>
                      <p className={styles.personName}>{person.name}</p>
                      <div className={styles.personContact}>
                        <div className={styles.contactItem}>
                          <span className={styles.contactIcon}>📞</span>
                          <span>{person.phone}</span>
                        </div>
                        <div className={styles.contactItem}>
                          <span className={styles.contactIcon}>✉️</span>
                          <span>{person.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Location */}
              <div className={styles.locationCard}>
                <div className={styles.locationHeader}>
                  <div className={styles.locationIcon}>📍</div>
                  <h4>Our Location</h4>
                </div>
                <div className={styles.locationDetails}>
                  <p className={styles.locationAddress}>
                    <strong>WebPoint Sri Lanka</strong><br />
                    Gampaha, Sri Lanka
                  </p>
                  <div className={styles.locationFeatures}>
                    <div className={styles.feature}>
                      <span>🕒</span>
                      <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                    </div>
                    <div className={styles.feature}>
                      <span>📅</span>
                      <span>Sat: 9:00 AM - 1:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className={styles.quickActions}>
                <a 
                  href="https://wa.me/94721202070" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.whatsappButton}
                >
                  <span className={styles.whatsappIcon}>💬</span>
                  Message on WhatsApp
                </a>
                <button 
                  className={styles.callButton}
                  onClick={() => window.location.href = 'tel:+94707312180'}
                >
                  <span className={styles.callIcon}>📞</span>
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className={styles.mapSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>Find Us</span>
          </div>
          <h2>Our <span className={styles.textGradient}>Location</span></h2>
        </div>
        
        <div className={styles.mapContainer}>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapContent}>
              <div className={styles.mapPin}>
                <div className={styles.pinIcon}>📍</div>
                <div className={styles.pinText}>
                  <h4>Gampaha, Sri Lanka</h4>
                  <p>Comming Soon WebPoint Headquarters</p>
                </div>
              </div>
              <div className={styles.mapDetails}>
                <div className={styles.mapFeature}>
                  <span>🚗</span>
                  <span>Easy parking available</span>
                </div>
                <div className={styles.mapFeature}>
                  <span>🏢</span>
                  <span>Modern office facility</span>
                </div>
                <div className={styles.mapFeature}>
                  <span>☕</span>
                  <span>Meeting room available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <h2>Start Your Digital Journey Today</h2>
            <p>
              Don't wait to transform your business. Contact us now and let's create 
              something extraordinary together.
            </p>
            <div className={styles.ctaButtons}>
              <button 
                className={styles.ctaPrimary}
                onClick={() => navigate('/service')}
              >
                View Our Services
              </button>
              <button 
                className={styles.ctaSecondary}
                onClick={() => window.location.href = 'tel:+94707312180'}
              >
                Call Now: 070-7312180
              </button>
            </div>
          </div>
          <div className={styles.ctaVisual}>
            <div className={styles.ctaOrbit}>
              <div className={styles.orbitingIcon}>🌐</div>
              <div className={styles.orbitingIcon}>⚙️</div>
              <div className={styles.orbitingIcon}>📱</div>
              <div className={styles.orbitingIcon}>🛒</div>
              <div className={styles.orbitingIcon}>📈</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;