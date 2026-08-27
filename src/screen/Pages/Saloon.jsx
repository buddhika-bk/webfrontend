import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './VinusStudio.module.css';

const SERVICES = [
  { icon: '💆', title: 'Facials', desc: 'Hydra, Gold, Vitamin C & more' },
  { icon: '🦶', title: 'Pedicure', desc: 'Nail & foot care' },
  { icon: '💨', title: 'Hair Drying', desc: 'Blow dry & setting' },
  { icon: '✨', title: 'Makeup & Dressing', desc: 'Sari draping, hair style' },
];

const PRICING = [
  {
    title: 'Threading',
    items: [
      ['Eyebrows', 'Rs.300/-'],
      ['Upper Lip', 'Rs.250/-'],
      ['Full Face', 'Rs.1,200/-'],
    ],
  },
  {
    title: 'Waxing',
    items: [
      ['Face Wax', 'Rs.1,500/-'],
      ['Hands Wax', 'Rs.2,500/-'],
      ['Underarm Wax', 'Rs.1,500/-'],
      ['Full Leg Wax', 'Rs.4,000/-'],
      ['Bikini Wax', 'Rs.4,500/-'],
      ['Full Body Wax', 'Rs.15,000/-'],
    ],
  },
  {
    title: 'Hair Services',
    items: [
      ['Hair Cut', 'Rs.2,500/-Up'],
      ['Hair Straightening', 'Rs.12,000/-Up'],
      ['Keratin Treatment', 'Rs.15,000/-Up'],
      ['Hair Botox', 'Rs.15,000/-Up'],
      ['Hair Color', 'Rs.12,000/-Up'],
      ['Black Hair Color', 'Rs.2,000/-Up'],
      ['Blow Dry & Setting', 'Rs.1,500/-'],
      ['Hair Iron', 'Rs.1,500/-'],
    ],
  },
  {
    title: 'Facials',
    items: [
      ['Clean Up', 'Rs.2,000/-'],
      ['Normal Facial', 'Rs.3,500/-'],
      ['Vitamin C Facial', 'Rs.4,000/-'],
      ['Pearl Facial', 'Rs.4,500/-'],
      ['Gold Facial', 'Rs.6,000/-'],
      ['Hydra Facial', 'Rs.10,000/-'],
    ],
  },
  {
    title: 'Nail & Foot',
    items: [
      ['Pedicure', 'Rs.1,800/-'],
      ['Gel Color Application', 'Rs.1,500/-'],
      ['Acrylic Nails', 'Rs.5,500/-'],
    ],
  },
  {
    title: 'Makeup & Dressing',
    items: [
      ['Make-up', 'Rs.2,500/-'],
      ['Hair Style', 'Rs.2,500/-'],
      ['Sari Draping', 'Rs.1,000/-'],
    ],
  },
  {
    title: 'Wellness',
    wellness: true,
    items: [
      ['Head Massage', 'Rs.2,500/-'],
      ['Head & Shoulder Massage', 'Rs.3,500/-'],
      ['Foot Massage', 'Rs.2,000/-'],
      ['Body Scrubs', 'Rs.3,500/-'],
      ['Full Body Massage', 'Rs.8,000/-'],
    ],
  },
];

/** Adds a live perspective tilt to a card as the pointer moves across it. */
function useTilt(strength = 10) {
  const onMove = useCallback(
    (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--rx', `${(-py * strength).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(px * strength).toFixed(2)}deg`);
      card.style.setProperty('--gx', `${(px * 100 + 50).toFixed(0)}%`);
      card.style.setProperty('--gy', `${(py * 100 + 50).toFixed(0)}%`);
    },
    [strength]
  );
  const onLeave = useCallback((e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  }, []);
  return { onMouseMove: onMove, onMouseLeave: onLeave };
}

const VinusStudio = () => {
  const sectionsRef = useRef([]);
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const cardTilt = useTilt(10);
  const softTilt = useTilt(5);

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

  const handleHeroMove = (e) => {
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x, y });
  };

  return (
    <div className={styles.container}>
      {/* Ambient 3D mesh background — fixed, drifts slowly behind everything */}
      <div className={styles.meshBg} aria-hidden="true">
        <span className={styles.meshBlobGold} />
        <span className={styles.meshBlobGreen} />
        <span className={styles.meshBlobGold2} />
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/94754545448"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFloat}
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Header / Navigation */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>V</span>
          <span className={styles.logoText}>
            <span className={styles.logoGold}>Vinu&apos;s</span>
            <span className={styles.logoGreen}>STUDIO</span>
          </span>
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
      <section
        id="home"
        className={styles.hero}
        ref={(el) => {
          addToRefs(el);
          heroRef.current = el;
        }}
        onMouseMove={handleHeroMove}
      >
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Ladies Only · By Appointment</span>
          <h1 className={styles.heroTitle}>
            <span className={styles.gold}>Your Beauty,</span>
            <span className={styles.green}>Our Passion</span>
          </h1>
          <p className={styles.heroSub}>
            Step into a modern sanctuary of gold and green — where every treatment is
            tailored to your skin, your hair, and your glow.
          </p>
          <div className={styles.heroActions}>
            <a href="#contact" className={styles.ctaButton}>Book Your Session →</a>
            <a href="#pricing" className={styles.ctaGhost}>View Price List</a>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div
            className={styles.orbStage}
            style={{
              transform: `rotateX(${parallax.y * -10}deg) rotateY(${parallax.x * 10}deg)`,
            }}
          >
            <span
              className={styles.orbGold}
              style={{ transform: `translate3d(${parallax.x * -18}px, ${parallax.y * -18}px, 60px)` }}
            />
            <span
              className={styles.orbGreen}
              style={{ transform: `translate3d(${parallax.x * 26}px, ${parallax.y * 26}px, 20px)` }}
            />
            <span
              className={styles.orbRing}
              style={{ transform: `translate3d(${parallax.x * -10}px, ${parallax.y * -10}px, 100px) rotate(${parallax.x * 12}deg)` }}
            />
            <span className={styles.orbCore}>✨</span>
            <span className={styles.chipLeaf} style={{ transform: `translate3d(${parallax.x * 34}px, ${parallax.y * 12}px, 140px)` }}>🌿</span>
            <span className={styles.chipSpark} style={{ transform: `translate3d(${parallax.x * -30}px, ${parallax.y * 20}px, 160px)` }}>💫</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about} ref={addToRefs}>
        <div className={styles.aboutVisual} {...softTilt} style={{ transform: 'perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0))' }}>
          <span className={styles.aboutGlow} />
          <span className={styles.aboutEmoji}>🌸</span>
          <span className={styles.aboutRing} />
        </div>
        <div className={styles.aboutText}>
          <span className={styles.eyebrow}>About Us</span>
          <h2>
            About <span className={styles.gold}>Vinu&apos;s</span>
          </h2>
          <p>
            We offer a wide range of services to help you look and feel your best.
            Our experienced stylists are dedicated to your unique skin type and concerns.
            Care for your skin with natural ingredients.
          </p>
          <a href="#contact" className={styles.ctaButtonSmall}>
            See Our Portfolio
          </a>
        </div>
      </section>

      {/* Services / What We Provide */}
      <section id="services" className={styles.services} ref={addToRefs}>
        <span className={styles.eyebrow} style={{ textAlign: 'center', display: 'block' }}>What We Offer</span>
        <h2 className={styles.sectionTitle}>
          Smooth Affair <span className={styles.gold}>Service We Provide</span>
        </h2>
        <div className={styles.serviceCards}>
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className={styles.serviceCard}
              {...cardTilt}
              style={{ transform: 'perspective(800px) rotateX(var(--rx,0)) rotateY(var(--ry,0)) translateY(0)' }}
            >
              <div className={styles.serviceIcon}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <a href="#pricing" className={styles.ctaButtonSmall}>
          Shop Now
        </a>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricing} ref={addToRefs}>
        <span className={styles.eyebrow} style={{ textAlign: 'center', display: 'block' }}>Price List</span>
        <h2 className={styles.sectionTitle}>
          <span className={styles.gold}>Our</span> Price List
        </h2>
        <div className={styles.pricingGrid}>
          {PRICING.map((cat) => (
            <div
              key={cat.title}
              className={`${styles.priceCategory} ${cat.wellness ? styles.wellness : ''}`}
              {...softTilt}
              style={{ transform: 'perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0))' }}
            >
              <h3 className={styles.categoryTitle}>{cat.title}</h3>
              <ul>
                {cat.items.map(([name, price]) => (
                  <li key={name}>
                    <span className={styles.itemName}>{name}</span>
                    <span className={styles.itemPrice}>{price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.pricingNote}>
          <p>Glow with Confidence – Everyday</p>
          <button className={styles.ctaButtonSmall} onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Book Your Appointment Today
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials} ref={addToRefs}>
        <h2 className={styles.sectionTitle}>
          What Our <span className={styles.gold}>Clients Say</span>
        </h2>
        <div
          className={styles.testimonialCard}
          {...softTilt}
          style={{ transform: 'perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0))' }}
        >
          <span className={styles.quoteMark}>&ldquo;</span>
          <p>
            I had my makeup done at this beauty shop for my wedding and it was flawless.
            The makeup artist listened to my requests and made me look and feel beautiful
            on my big day.
          </p>
          <p className={styles.clientName}>— Monica</p>
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className={styles.contact} ref={addToRefs}>
        <div className={styles.bokeh} aria-hidden="true">
          <span /><span /><span /><span /><span /><span />
        </div>
        <div className={styles.contactContent}>
          <span className={styles.eyebrowLight}>Get In Touch</span>
          <h2>
            Your Beauty &amp; <span className={styles.gold}>Success Starts Here</span>
          </h2>
          <p>585/1, Walgama, Malwana</p>
          <p>
            <a href="tel:0754545448">075 454 5448</a> / <a href="tel:0718545448">071 854 5448</a>
          </p>
          <p>Book your appointment today and enhance your natural beauty with professional care.</p>
          <div className={styles.socialLinks}>
            <a href="https://wa.me/94754545448" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://www.instagram.com/bandaravino?utm_source=qr&igsi=MTYybDY0dnBtYnN4bw==">Instagram</a>
            <a href="https://www.facebook.com/share/1BmA4eM4PL/">Facebook</a>
          </div>
          <p className={styles.footerNote}>© Vinu&apos;s Studio – Ladies Only | Relax · Refresh · Rejuvenate</p>
        </div>
      </section>
    </div>
  );
};

export default VinusStudio;