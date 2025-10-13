import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DemoSaloonStyle.module.css';

// // Import your local image
// import saloonBackground from '../assets/saloon.png';

const DemoSaloon = () => {
  const [activeService, setActiveService] = useState(0);
  const navigate = useNavigate();

  const services = [
    {
      title: "HAIR CUTTING",
      price: "from $37",
      image: "💇‍♀️",
      features: [
        "Professional styling",
        "Latest trends",
        "Quality products",
        "Expert consultation"
      ]
    },
    {
      title: "OIL MASSAGE",
      price: "from $59",
      image: "💆‍♀️",
      features: [
        "Aromatherapy oils",
        "Relaxing experience",
        "Stress relief",
        "Therapeutic benefits"
      ]
    },
    {
      title: "MAKE UP",
      price: "from $25",
      image: "💄",
      features: [
        "Professional makeup",
        "Special occasions",
        "Beauty consultation",
        "Premium products"
      ]
    },
    {
      title: "AROMA THERAPY",
      price: "from $49",
      image: "🌸",
      features: [
        "Essential oils",
        "Mind relaxation",
        "Body wellness",
        "Sensory experience"
      ]
    }
  ];

  const centerServices = [
    {
      title: "BEAUTY CENTER",
      image: "✨",
      description: "Experience premium beauty treatments with our expert team using the latest techniques and products."
    },
    {
      title: "SPA CENTER",
      image: "🛁",
      description: "Relax and rejuvenate with our luxurious spa treatments designed for ultimate relaxation."
    },
    {
      title: "NAILS CENTER",
      image: "💅",
      description: "Get stunning nail art and treatments with our professional nail technicians and quality products."
    }
  ];

  const specialServices = [
    {
      title: "HAIR STYLING",
      image: "👑",
      description: "Transform your look with our expert hair styling services for any occasion."
    },
    {
      title: "BRIDAL MAKEUP",
      image: "👰",
      description: "Perfect bridal makeup that enhances your natural beauty on your special day."
    },
    {
      title: "NAIL ART",
      image: "🎨",
      description: "Creative and elegant nail designs that express your unique style."
    },
    {
      title: "THERAPEUTIC MASSAGE",
      image: "🌟",
      description: "Healing massage therapies that relieve tension and promote wellness."
    },
    {
      title: "LUXURY SPA",
      image: "🏮",
      description: "Indulge in our luxury spa experiences for complete mind and body relaxation."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      comment: "The best beauty experience I've ever had! The staff is amazing.",
      rating: 5
    },
    {
      name: "Emily Davis",
      comment: "My wedding makeup was absolutely perfect. Thank you!",
      rating: 5
    },
    {
      name: "Jessica Wilson",
      comment: "Regular visitor here. Always leave feeling refreshed and beautiful.",
      rating: 4
    }
  ];

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <div className={styles.demoSaloonContainer}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>✨</span>
            <span className={styles.logoText}>Blossom Beauty</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <button className={styles.bookBtn}>Book Now</button>
          </div>
        </div>
      </nav>

      {/* Modern Hero Section with Background Image */}
      <section className={styles.heroSection} id="home">
        <div className={styles.heroBackground}>
          {/* Background Image */}
          <div
            className={styles.backgroundImage}
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80')` }}
          ></div>

          {/* Overlay and Effects */}
          <div className={styles.backgroundOverlay}></div>
          <div className={styles.backgroundGradient}></div>
          <div className={styles.backgroundPattern}></div>

          {/* Floating Shapes */}
          <div className={styles.floatingShapes}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>
            <div className={styles.shape3}></div>
          </div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.contentWrapper}>
            {/* Badge */}
            <div className={styles.heroBadge}>
              <span>✨ Premium Beauty Experience</span>
            </div>

            {/* Main Title */}
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine1}>Discover Your</span>
              <span className={styles.titleLine2}>
                <span className={styles.titleGradient}>Natural</span>
                <span className={styles.titleSpacer}> </span>
                <span className={styles.titleOutline}>Radiance</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              Where luxury meets wellness in an exclusive sanctuary designed
              to enhance your natural beauty and restore inner balance
            </p>

            {/* Stats */}
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>15+</div>
                <div className={styles.statLabel}>Expert Stylists</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>5K+</div>
                <div className={styles.statLabel}>Happy Clients</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Premium Services</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={styles.heroButtons}>
              <button className={styles.primaryBtn}>
                <span className={styles.btnText}>Book Appointment</span>
                <span className={styles.btnIcon}>→</span>
              </button>
              <button className={styles.secondaryBtn}>
                <span className={styles.btnText}>View Services</span>
                <div className={styles.playButton}>
                  <span>▶</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine}></div>
          <span>Scroll to Explore</span>
        </div>

        {/* Decorative Elements */}
        <div className={styles.decorativeElements}>
          <div className={styles.deco1}>🌸</div>
          <div className={styles.deco2}>💫</div>
          <div className={styles.deco3}>✨</div>
        </div>
      </section>

      {/* Special Offers Section - 4 Services in One Row */}
      <section className={styles.specialOffers} id="services">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>COMFORT FOR EVERY WOMAN</div>
          <h2>OUR SPECIAL OFFERS</h2>
          <p className={styles.sectionDescription}>
            Indulge in our exclusive beauty treatments designed to pamper and rejuvenate.
            Experience luxury at affordable prices with our special packages.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.image}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.servicePrice}>{service.price}</p>
              <ul className={styles.serviceFeatures}>
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className={styles.checkIcon}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={styles.bookNowBtn}>
                <span>BOOK NOW</span>
                <span className={styles.btnIcon}>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Beauty Centers Section */}
      <section className={styles.centersSection}>
        <div className={styles.centersGrid}>
          {centerServices.map((center, index) => (
            <div key={index} className={styles.centerCard}>
              <div className={styles.centerIcon}>{center.image}</div>
              <h3>{center.title}</h3>
              <p>{center.description}</p>
              <div className={styles.centerOverlay}>
                <button className={styles.centerBtn}>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyChooseUs}>
        <div className={styles.whyChooseContent}>
          <div className={styles.whyChooseText}>
            <div className={styles.sectionBadge}>EXCELLENCE</div>
            <h2>WHY CHOOSE OUR BEAUTY CENTER</h2>
            <p>
              We are committed to providing exceptional beauty services using only the finest
              products and techniques. Our team of certified professionals ensures you receive
              personalized care and stunning results every time.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>500+</div>
                <div className={styles.statLabel}>Happy Clients</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Experts</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>5★</div>
                <div className={styles.statLabel}>Rating</div>
              </div>
            </div>
          </div>
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🌿</div>
              <div>
                <h4>100% NATURAL PRODUCTS</h4>
                <p>Organic and eco-friendly beauty products</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>👩‍🎓</div>
              <div>
                <h4>PROFESSIONAL BEAUTICIANS</h4>
                <p>Certified and experienced beauty experts</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🎁</div>
              <div>
                <h4>SPECIAL OFFERS</h4>
                <p>Exclusive deals for regular customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className={styles.promotionBanner}>
        <div className={styles.promotionContent}>
          <div className={styles.discountBadge}>
            <span className={styles.discountText}>50% OFF</span>
            <span className={styles.discountSub}>SPECIAL OFFER</span>
          </div>
          <h2>SPRING BEAUTY SPECIAL</h2>
          <p>Experience luxury spa treatments at half price this season! Perfect time to pamper yourself.</p>
          <button className={styles.promotionBtn}>
            <span>GET THIS OFFER</span>
            <span className={styles.btnIcon}>✨</span>
          </button>
        </div>
        <div className={styles.promotionFlowers}>
          <div className={styles.flower}>🌷</div>
          <div className={styles.flower}>🌹</div>
          <div className={styles.flower}>🌸</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <h2>WHAT OUR CLIENTS SAY</h2>
          <p>Don't just take our word for it - hear from our satisfied customers</p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.rating}>
                {renderStars(testimonial.rating)}
              </div>
              <p className={styles.testimonialText}>"{testimonial.comment}"</p>
              <div className={styles.clientInfo}>
                <div className={styles.clientAvatar}>👤</div>
                <div className={styles.clientDetails}>
                  <div className={styles.clientName}>{testimonial.name}</div>
                  <div className={styles.clientStatus}>Regular Client</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Services Section */}
      <section className={styles.specialServices}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>PREMIUM SERVICES</div>
          <h2>OUR SPECIALIZED TREATMENTS</h2>
          <p className={styles.sectionDescription}>
            From bridal makeup to therapeutic massages, we offer comprehensive beauty solutions
            tailored to your unique needs and preferences.
          </p>
        </div>

        <div className={styles.specialServicesGrid}>
          {specialServices.map((service, index) => (
            <div key={index} className={styles.specialServiceCard}>
              <div className={styles.serviceImage}>{service.image}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className={styles.learnMoreBtn}>
                Discover More
                <span className={styles.btnIcon}>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <span className={styles.logoIcon}>✨</span>
              <span className={styles.logoText}>Blossom Beauty</span>
            </div>
            <p>Your trusted partner in beauty and wellness. Experience the difference with our premium services.</p>
            <div className={styles.socialLinks}>
              <span>📱</span>
              <span>📷</span>
              <span>💌</span>
              <span>🐦</span>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Services</h4>
            <ul>
              <li><a href="#hair">Hair Styling</a></li>
              <li><a href="#makeup">Makeup</a></li>
              <li><a href="#spa">Spa Treatments</a></li>
              <li><a href="#nails">Nail Care</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Contact Info</h4>
            <div className={styles.contactInfo}>
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ hello@blossombeauty.com</p>
              <p>📍 123 Beauty Street, City</p>
              <p>🕒 Mon-Sat: 9AM-8PM</p>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Blossom Beauty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DemoSaloon;