import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PerfumeShop.module.css';

// ─── Import all frame images dynamically via Vite ─────────────────────────
// Matches every file in src/assets/frames/, e.g. ezgif-frame-001.png ...
// ezgif-frame-051.png. Sorted numerically so frame order always matches
// filename order regardless of how many digits are in the number.
const frameModules = import.meta.glob('../../assets/frames/*.png', { eager: true, import: 'default' });
const frameUrls = Object.entries(frameModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url);

const PerfumeShop = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  const [cartCount, setCartCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeNav, setActiveNav] = useState('Home');
  const [notification, setNotification] = useState('');

  const totalFrames = frameUrls.length;

  // ─── Draw a specific frame to canvas with aspect-ratio preservation ─────
  const renderFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) return;

    const displayW = Math.round(rect.width * dpr);
    const displayH = Math.round(rect.height * dpr);

    if (canvas.width !== displayW || canvas.height !== displayH) {
      canvas.width = displayW;
      canvas.height = displayH;
    }

    // Clear fully before drawing the next frame — prevents ghosting/stuck
    // frames showing through transparent regions of the new PNG.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0c0a08';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Compute cover / center fit manually (object-fit does not apply to
    // <canvas> elements, so this math is what actually does the fitting).
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawW, drawH, dx, dy;
    if (imgRatio > canvasRatio) {
      drawH = canvas.height;
      drawW = canvas.height * imgRatio;
      dx = (canvas.width - drawW) / 2;
      dy = 0;
    } else {
      drawW = canvas.width;
      drawH = canvas.width / imgRatio;
      dx = 0;
      dy = (canvas.height - drawH) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  // ─── Preload all frame images ────────────────────────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    const total = frameUrls.length;

    if (total === 0) {
      // eslint-disable-next-line no-console
      console.error(
        'No frames found. Check that PNGs exist in src/assets/frames/ and that the glob path in PerfumeShop.jsx matches this file\'s location relative to that folder.'
      );
      setImagesLoaded(true);
      return;
    }

    const loadedImages = new Array(total);

    frameUrls.forEach((url, idx) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        loadedCount += 1;
        loadedImages[idx] = img;
        const pct = Math.round((loadedCount / total) * 100);
        setLoadPercentage(pct);

        // Render frame 0 as soon as it's available so there's no blank
        // canvas flash while the remaining frames stream in.
        if (idx === 0) {
          imagesRef.current[0] = img;
          renderFrame(0);
        }

        if (loadedCount === total) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
          renderFrame(currentFrame);
        }
      };

      img.onerror = () => {
        loadedCount += 1;
        // eslint-disable-next-line no-console
        console.error(`Frame failed to load: ${url}`);
        if (loadedCount === total) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };
    });

    return () => {
      imagesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderFrame]);

  // ─── Scroll handler for 3D scroll frame sequence ─────────────────────────
  // `.hero` is a very tall block (500vh). Inside it, `.canvasStickyStage` is
  // `position: sticky; top: 0; height: 100vh`, so it stays pinned to the
  // viewport for the entire height of `.hero`. That entire scroll distance
  // maps to the frame sequence:
  //   1) While the hero scrolls through, the canvas stays fixed in place
  //      and only the frame image changes (the "3D animation").
  //   2) Once scrolled past the full height of `.hero` (all frames played),
  //      the sticky stage releases and the page scrolls normally onward.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const hero = heroRef.current;
          if (hero && totalFrames > 0) {
            const rect = hero.getBoundingClientRect();
            const totalScroll = hero.scrollHeight - window.innerHeight;
            const currentScroll = -rect.top;

            let progress = 0;
            if (totalScroll > 0) {
              progress = currentScroll / totalScroll;
            }
            progress = Math.min(1, Math.max(0, progress));

            setScrollProgress(progress);

            // round (not floor) so progress === 1 actually reaches the
            // last frame, and intermediate frames map evenly across the
            // whole scroll distance instead of skewing early.
            const frameIdx = Math.min(
              totalFrames - 1,
              Math.max(0, Math.round(progress * (totalFrames - 1)))
            );

            setCurrentFrame((prev) => {
              if (prev !== frameIdx) {
                renderFrame(frameIdx);
              }
              return frameIdx;
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [totalFrames, renderFrame]);

  // ─── Re-render current frame if canvas resizes independent of scroll ────
  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(currentFrame);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded]);

  // ─── Mouse move parallax handler ──────────────────────────────────────────
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setMouseOffset({
      x: (clientX - cx) / cx,
      y: (clientY - cy) / cy
    });
  };

  // ─── Dynamic 3D Transform for Fullscreen Background Canvas ──────────────
  const bgRotY = mouseOffset.x * 5;
  const bgRotX = mouseOffset.y * -4;
  const bgScale = 1.03 + Math.sin(scrollProgress * Math.PI) * 0.03;

  const bgTransformStyle = {
    transform: `scale(${bgScale}) rotateY(${bgRotY.toFixed(2)}deg) rotateX(${bgRotX.toFixed(2)}deg)`,
    transformOrigin: 'center center'
  };

  // ─── Interactive actions ──────────────────────────────────────────────────
  const handleAddToCart = (name = 'Élixir Royal Signature') => {
    setCartCount((prev) => prev + 1);
    setNotification(`Added "${name}" to your luxury shopping bag.`);
    setTimeout(() => setNotification(''), 3500);
  };

  const scrollToCollections = () => {
    const element = document.getElementById('collectionsSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ─── Collections Data ──────────────────────────────────────────────────────
  const collections = [
    {
      id: 1,
      name: 'Noir Absolu',
      subtitle: 'Eau De Parfum — 100ml',
      price: '$240.00',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=600&fit=crop'
    },
    {
      id: 2,
      name: "Soleil d'Or",
      subtitle: 'Extrait De Parfum — 100ml',
      price: '$280.00',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&h=600&fit=crop'
    },
    {
      id: 3,
      name: 'Rose Royale',
      subtitle: 'Pure Essence — 75ml',
      price: '$210.00',
      image: 'https://images.unsplash.com/photo-1588405748480-1cf41488c70f?w=600&h=600&fit=crop'
    },
    {
      id: 4,
      name: 'Oud Impérial',
      subtitle: 'Private Reserve — 100ml',
      price: '$320.00',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=600&fit=crop'
    }
  ];

  // ─── Features Data ───────────────────────────────────────────────────────
  const features = [
    {
      icon: '✨',
      title: '100% AUTHENTIC',
      desc: 'Directly sourced from Master Grasse perfumers'
    },
    {
      icon: '💎',
      title: 'ARTISANAL BLENDS',
      desc: 'Rare organic botanicals & natural absolutes'
    },
    {
      icon: '✈️',
      title: 'WORLDWIDE DELIVERY',
      desc: 'Complimentary express priority courier'
    },
    {
      icon: '🎁',
      title: 'LUXURY PACKAGING',
      desc: 'Signature embossed box with silk pouch'
    }
  ];

  return (
    <div className={styles.container} onMouseMove={handleMouseMove}>
      {/* ═══ Ambient Glow & Grid ═══ */}
      <div
        className={styles.ambientGlow}
        style={{
          transform: `translate(${mouseOffset.x * 25}px, ${mouseOffset.y * 25}px)`
        }}
      />
      <div className={styles.ambientGrid} />

      {/* ═══ Toast Notification ═══ */}
      {notification && (
        <div className={styles.toast}>
          <span className={styles.toastCheck}>✓</span>
          {notification}
        </div>
      )}

      {/* ═══ Sticky Luxury Navigation ═══ */}
      <header className={styles.nav}>
        <div className={styles.brand} onClick={() => navigate('/home')}>
          <span className={styles.brandIcon}>⚜</span>
          <div className={styles.brandText}>
            <span className={styles.brandName}>ÉLIXIR ROYAL</span>
            <span className={styles.brandBy}>HAUTE PARFUMERIE PARIS</span>
          </div>
        </div>

        <ul className={styles.navLinks}>
          <li
            className={activeNav === 'Home' ? styles.navActive : ''}
            onClick={() => {
              setActiveNav('Home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Home
          </li>
          <li
            className={activeNav === 'Collections' ? styles.navActive : ''}
            onClick={() => {
              setActiveNav('Collections');
              scrollToCollections();
            }}
          >
            Collections
          </li>
          <li
            className={activeNav === 'Artisans' ? styles.navActive : ''}
            onClick={() => setActiveNav('Artisans')}
          >
            The Atelier
          </li>
          <li
            className={activeNav === 'Contact' ? styles.navActive : ''}
            onClick={() => navigate('/contact')}
          >
            Concierge
          </li>
        </ul>

        <div className={styles.navIcons}>
          <button className={styles.navIconBtn} onClick={() => navigate(-1)}>
            ← Back to Store
          </button>
          <div className={styles.cartIcon} onClick={() => handleAddToCart('Signature Eau De Parfum')}>
            <span>🛍️</span>
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </div>
        </div>
      </header>

      {/* ═══ 3D Frame Scroll Hero Runway ═══ */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.canvasStickyStage}>
          {/* Fullscreen 3D Background Canvas */}
          <div className={styles.canvasWrapper3D} style={bgTransformStyle}>
            <canvas ref={canvasRef} className={styles.frameCanvas} />
          </div>

          {/* Minimal Edge Vignette for Crystal-Clear Visibility */}
          <div className={styles.canvasEdgeVignette} />

          {/* Centered Hero Content with Smooth Scroll Fade */}
          <div
            className={styles.heroContent}
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 2.8),
              transform: `translateY(${-scrollProgress * 60}px)`,
              pointerEvents: scrollProgress > 0.35 ? 'none' : 'auto'
            }}
          >
            <div className={styles.phaseBadge}>
              <span className={styles.phaseDot} />
              <span>HAUTE PARFUMERIE PARIS</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleGold}>SCENT OF LUXURY</span>
            </h1>

            <p className={styles.heroDesc}>
              A transcendent masterwork of Calabrian bergamot, velvet Damask rose, and golden royal amber encased in hand-sculpted crystal.
            </p>

            <div className={styles.heroCtas}>
              <button
                className={styles.heroBtn}
                onClick={() => handleAddToCart('Élixir Royal Signature')}
              >
                PRE-ORDER FLACON
              </button>
              <button className={styles.heroBtnSecondary} onClick={scrollToCollections}>
                EXPLORE COLLECTION
              </button>
            </div>
          </div>

          {/* Scroll Hint */}
          <div
            className={styles.scrollHint}
            style={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
            onClick={() => {
              window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
            }}
          >
            <div className={styles.scrollHintLine} />
            <span className={styles.scrollHintText}>SCROLL TO ROTATE 3D FLACON</span>
          </div>

          {!imagesLoaded && (
            <div className={styles.frameLoading}>
              <div className={styles.loadingSpinner} />
              <p className={styles.loadingText}>
                Loading 3D Experience... {loadPercentage}%
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ Features Strip ═══ */}
      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureItem}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Signature Collections ═══ */}
      <section id="collectionsSection" className={styles.collections}>
        <span className={styles.sectionTag}>Curated Essences</span>
        <h2 className={styles.sectionTitle}>Signature Collection</h2>

        <div className={styles.collectionsGrid}>
          {collections.map((item) => (
            <div key={item.id} className={styles.collectionCard}>
              <div className={styles.cardImg}>
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardSub}>{item.subtitle}</p>
                <div className={styles.cardPrice}>{item.price}</div>
                <button
                  className={styles.exploreBtn}
                  onClick={() => handleAddToCart(item.name)}
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Discount / VIP Banner ═══ */}
      <section className={styles.discountBanner}>
        <div className={styles.discountText}>
          <p className={styles.discountTag}>PRIVATE SALON PRIVILEGE</p>
          <h2 className={styles.discountOffer}>ENJOY 20% OFF YOUR FIRST FLACON</h2>
          <button
            className={styles.discountBtn}
            onClick={() => handleAddToCart('VIP Privilège Discovery Set')}
          >
            CLAIM PRIVILEGE CODE
          </button>
        </div>
        <div className={styles.discountImage}>
          <img
            src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=700&h=500&fit=crop&auto=format"
            alt="Gift wrapped perfume bottles"
            loading="lazy"
          />
        </div>
      </section>

      {/* ═══ Footer Trust Section ═══ */}
      <footer className={styles.footerTrust}>
        <div className={styles.trustGrid}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🚚</span>
            <div>
              <h4 className={styles.trustTitle}>Free Shipping</h4>
              <p className={styles.trustDesc}>On all orders over $150 worldwide</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>↩</span>
            <div>
              <h4 className={styles.trustTitle}>Easy Returns</h4>
              <p className={styles.trustDesc}>30 days complimentary returns</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🔒</span>
            <div>
              <h4 className={styles.trustTitle}>100% Secure</h4>
              <p className={styles.trustDesc}>Encrypted payment processing</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>💬</span>
            <div>
              <h4 className={styles.trustTitle}>Support 24/7</h4>
              <p className={styles.trustDesc}>Fragrance concierge at your service</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PerfumeShop;