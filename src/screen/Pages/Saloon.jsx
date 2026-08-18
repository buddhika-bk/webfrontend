import React, { useEffect, useRef } from 'react';
import styles from './VinusStudio.module.css';

const VinusStudio = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className={styles.container}>
      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/94754545448"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFloat}
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="40"
          height="40"
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Header / Navigation */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoGold}>Vinu's</span>
          <span className={styles.logoGreen}>STUDIO</span>
        </div>
        <nav className={styles.nav}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className={styles.hero} ref={addToRefs}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.gold}>Your Beauty</span>
            <span className={styles.green}>, Our Passion</span>
          </h1>
          <p className={styles.heroSub}>
            Success Starts Here – We offer a wide range of services to help you look and feel your best.
          </p>
          <button className={styles.ctaButton}>Learn More →</button>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.heroPlaceholder}>
            <span>✨</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about} ref={addToRefs}>
        <div className={styles.aboutText}>
          <h2>About <span className={styles.gold}>Vinu's</span></h2>
          <p>
            We offer a wide range of services to help you look and feel your best. 
            Our experienced stylists are dedicated to your unique skin type and concerns.
            Care your skin with natural ingredients.
          </p>
          <button className={styles.ctaButtonSmall}>See Our Portfolio</button>
        </div>
        <div className={styles.aboutImage}>
          <div className={styles.aboutPlaceholder}>🌸</div>
        </div>
      </section>

      {/* Services / What We Provide */}
      <section id="services" className={styles.services} ref={addToRefs}>
        <h2 className={styles.sectionTitle}>Smooth Affair <span className={styles.gold}>Service We Provide</span></h2>
        <div className={styles.serviceCards}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>💆</div>
            <h3>Facials</h3>
            <p>Hydra, Gold, Vitamin C & more</p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>🦶</div>
            <h3>Pedicure</h3>
            <p>Nail & foot care</p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>💨</div>
            <h3>Hair Drying</h3>
            <p>Blow dry & setting</p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>✨</div>
            <h3>Makeup & Dressing</h3>
            <p>Sari draping, hair style</p>
          </div>
        </div>
        <button className={styles.ctaButtonSmall}>Shop Now</button>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricing} ref={addToRefs}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.gold}>Our</span> Price List
        </h2>
        <div className={styles.pricingGrid}>
          {/* Threading */}
          <div className={styles.priceCategory}>
            <h3 className={styles.categoryTitle}>Threading</h3>
            <ul>
              <li>Eyebrows <span>Rs.300/-</span></li>
              <li>Upper Lip <span>Rs.250/-</span></li>
              <li>Full Face <span>Rs.1,200/-</span></li>
            </ul>
          </div>
          {/* Waxing */}
          <div className={styles.priceCategory}>
            <h3 className={styles.categoryTitle}>Waxing</h3>
            <ul>
              <li>Face Wax <span>Rs.1,500/-</span></li>
              <li>Hands Wax <span>Rs.2,500/-</span></li>
              <li>Underarm Wax <span>Rs.1,500/-</span></li>
              <li>Full Leg Wax <span>Rs.4,000/-</span></li>
              <li>Bikini Wax <span>Rs.4,500/-</span></li>
              <li>Full Body Wax <span>Rs.15,000/-</span></li>
            </ul>
          </div>
          {/* Hair Services */}
          <div className={styles.priceCategory}>
            <h3 className={styles.categoryTitle}>Hair Services</h3>
            <ul>
              <li>Hair Cut <span>Rs.2,500/-Up</span></li>
              <li>Hair Straightening <span>Rs.12,000/-Up</span></li>
              <li>Keratin Treatment <span>Rs.15,000/-Up</span></li>
              <li>Hair Botox <span>Rs.15,000/-Up</span></li>
              <li>Hair Color <span>Rs.12,000/-Up</span></li>
              <li>Black Hair Color <span>Rs.2,000/-Up</span></li>
              <li>Blow Dry & Setting <span>Rs.1,500/-</span></li>
              <li>Hair Iron <span>Rs.1,500/-</span></li>
            </ul>
          </div>
          {/* Facials */}
          <div className={styles.priceCategory}>
            <h3 className={styles.categoryTitle}>Facials</h3>
            <ul>
              <li>Clean Up <span>Rs.2,000/-</span></li>
              <li>Normal Facial <span>Rs.3,500/-</span></li>
              <li>Vitamin C Facial <span>Rs.4,000/-</span></li>
              <li>Pearl Facial <span>Rs.4,500/-</span></li>
              <li>Gold Facial <span>Rs.6,000/-</span></li>
              <li>Hydra Facial <span>Rs.10,000/-</span></li>
            </ul>
          </div>
          {/* Nail & Foot */}
          <div className={styles.priceCategory}>
            <h3 className={styles.categoryTitle}>Nail & Foot</h3>
            <ul>
              <li>Pedicure <span>Rs.1,800/-</span></li>
              <li>Gel Color Application <span>Rs.1,500/-</span></li>
              <li>Acrylic Nails <span>Rs.5,500/-</span></li>
            </ul>
          </div>
          {/* Makeup & Dressing */}
          <div className={styles.priceCategory}>
            <h3 className={styles.categoryTitle}>Makeup & Dressing</h3>
            <ul>
              <li>Make-up <span>Rs.2,500/-</span></li>
              <li>Hair Style <span>Rs.2,500/-</span></li>
              <li>Sari Draping <span>Rs.1,000/-</span></li>
            </ul>
          </div>
          {/* Wellness */}
          <div className={`${styles.priceCategory} ${styles.wellness}`}>
            <h3 className={styles.categoryTitle}>Wellness</h3>
            <ul>
              <li>Head Massage <span>Rs.2,500/-</span></li>
              <li>Head & Shoulder <span>Rs.3,500/-</span></li>
              <li>Foot Massage <span>Rs.2,000/-</span></li>
              <li>Body Scrubs <span>Rs.3,500/-</span></li>
              <li>Full Body Massage <span>Rs.8,000/-</span></li>
            </ul>
          </div>
        </div>
        <div className={styles.pricingNote}>
          <p>Glow with Confidence – Everyday</p>
          <button className={styles.ctaButtonSmall}>Book Your Appointment Today</button>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials} ref={addToRefs}>
        <h2 className={styles.sectionTitle}>What Our <span className={styles.gold}>Clients Says</span></h2>
        <div className={styles.testimonialCard}>
          <p>
            “I had my makeup done at this beauty shop for my wedding and it was flawless. 
            The makeup artist listened to my requests and made me look and feel beautiful on my big day.”
          </p>
          <p className={styles.clientName}>— Monica</p>
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className={styles.contact} ref={addToRefs}>
        <div className={styles.contactContent}>
          <h2>Your Beauty & <span className={styles.gold}>Success Starts Here</span></h2>
          <p>585/1, Walgama, Malwana</p>
          <p>
            <a href="tel:0754545448">075 454 5448</a> / <a href="tel:0718545448">071 854 5448</a>
          </p>
          <p>Book your appointment today and enhance your natural beauty with professional care.</p>
          <div className={styles.socialLinks}>
            <a href="https://wa.me/94754545448" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="#instagram">Instagram</a>
            <a href="#facebook">Facebook</a>
          </div>
          <p className={styles.footerNote}>© Vinu's Studio – Ladies Only | Relax · Refresh · Rejuvenate</p>
        </div>
      </section>
    </div>
  );
};

export default VinusStudio;