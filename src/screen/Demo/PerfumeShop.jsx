import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './PerfumeShop.module.css';


const FRAME_COUNT = 51;
const FRAME_PATH = (i) =>
  `../../assets/frames/ezgif-frame-${String(i).padStart(3, '0')}.png`;

const PerfumeShop = () => {
  const heroRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadedFrames, setLoadedFrames] = useState({});
  const [framesReady, setFramesReady] = useState(false);
  const rafRef = useRef(null);
  const imagesRef = useRef({});

  // ── Preload frames: first 8 block, rest stream in background ──
  useEffect(() => {
    let cancelled = false;
    const blocking = Array.from({ length: 8 }, (_, i) => i + 1);
    const background = Array.from(
      { length: FRAME_COUNT - 8 },
      (_, i) => i + 9
    );

    const loadOne = (frameNum) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = FRAME_PATH(frameNum);
        img.onload = () => {
          imagesRef.current[frameNum] = img;
          if (!cancelled) {
            setLoadedFrames((prev) => ({ ...prev, [frameNum]: true }));
          }
          resolve();
        };
        img.onerror = () => resolve(); // don't block sequence on a missing frame
      });

    Promise.all(blocking.map(loadOne)).then(() => {
      if (!cancelled) setFramesReady(true);
      background.forEach((n) => loadOne(n));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Scroll → progress, via rAF-throttled handler ──
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // progress 0 → hero top at viewport top; progress 1 → hero fully scrolled past
      const total = rect.height - viewportH;
      const raw = total > 0 ? -rect.top / total : 0;
      const clamped = Math.min(1, Math.max(0, raw));
      setScrollProgress(clamped);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  const currentFrame =
    Math.floor(scrollProgress * (FRAME_COUNT - 1)) + 1; // 1 → 51
  const clampedFrame = Math.min(FRAME_COUNT, Math.max(1, currentFrame));

  // subtle 3D phone rotation tied to progress (eases at start/end)
  const rotateY = Math.sin(scrollProgress * Math.PI) * 10; // -0 → 10 → 0 deg
  const rotateX = 4 - scrollProgress * 4; // 4deg tilt easing to flat
  const translateZ = -40 + scrollProgress * 40;
  const floatOffset = Math.sin(scrollProgress * Math.PI * 2) * 6;

  return (
    <div className={styles.container}>
      {/* ═══ HERO WITH NAV ═══ */}
      <section className={styles.hero} ref={heroRef}>
        <nav className={styles.nav}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>✦</span>
            <div className={styles.brandText}>
              <span className={styles.brandName}>M WANTED</span>
              <span className={styles.brandBy}>by E Perf Fragrance</span>
            </div>
          </div>
          <ul className={styles.navLinks}>
            <li className={styles.navActive}>Home</li>
            <li>Shop</li>
            <li>Collections</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
          <div className={styles.navIcons}>
            <span>🔍</span>
            <span>👤</span>
            <span className={styles.cartIcon}>
              🛒<span className={styles.cartBadge}>0</span>
            </span>
          </div>
        </nav>

        <div className={styles.heroInner}>
          {/* ── Left: copy + CTAs ── */}
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>Discover Your Signature Scent</p>
            <h1 className={styles.heroTitle}>
              CRAFTED
              <br />
              TO BE
              <br />
              <span className={styles.heroTitleGold}>REMEMBERED</span>
            </h1>
            <p className={styles.heroDesc}>
              Luxury fragrances that define your style and leave a lasting
              impression.
            </p>
            <div className={styles.heroCtas}>
              <button className={styles.heroBtn}>SHOP NOW →</button>
              <button className={styles.heroBtnSecondary}>
                EXPLORE COLLECTION
              </button>
            </div>
          </div>

          {/* ── Right: 3D phone with scroll-driven frame sequence ── */}
          <div className={styles.heroStage}>
            <div
              className={styles.phoneWrap}
              style={{
                transform: `translateY(${floatOffset}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              }}
            >
              <div className={styles.phoneShadow} />
              <div className={styles.phone}>
                <div className={styles.phoneNotch} />
                <div className={styles.phoneScreen}>
                  {!framesReady && (
                    <div className={styles.frameLoading}>
                      <span className={styles.loadingDot} />
                    </div>
                  )}
                  {loadedFrames[clampedFrame] && (
                    <img
                      key={clampedFrame}
                      src={FRAME_PATH(clampedFrame)}
                      alt={`Perfume Shop screen ${clampedFrame} of ${FRAME_COUNT}`}
                      className={styles.frameImage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.scrollHint}>
          <span className={styles.scrollHintLine} />
          <span className={styles.scrollHintText}>Scroll</span>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>🧴</span>
            <div>
              <h3 className={styles.featureTitle}>PREMIUM QUALITY</h3>
              <p className={styles.featureDesc}>
                Finest ingredients sourced globally
              </p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>🏅</span>
            <div>
              <h3 className={styles.featureTitle}>LONG LASTING</h3>
              <p className={styles.featureDesc}>
                Fragrances that stay with you
              </p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>♥</span>
            <div>
              <h3 className={styles.featureTitle}>MADE WITH PASSION</h3>
              <p className={styles.featureDesc}>
                Blended to perfection with care
              </p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>📦</span>
            <div>
              <h3 className={styles.featureTitle}>SECURE DELIVERY</h3>
              <p className={styles.featureDesc}>
                Safe &amp; fast delivery at your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COLLECTIONS ═══ */}
      <section className={styles.collections}>
        <p className={styles.sectionTag}>OUR COLLECTIONS</p>
        <h2 className={styles.sectionTitle}>Find Your Signature Scent</h2>

        <div className={styles.collectionsGrid}>
          <div className={styles.collectionCard}>
            <div className={styles.cardImg}>
              <img
                src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&h=650&fit=crop&auto=format"
                alt="For Him collection"
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>FOR HIM</h3>
              <p className={styles.cardSub}>Bold, confident &amp; timeless</p>
              <button className={styles.exploreBtn}>EXPLORE</button>
            </div>
          </div>

          <div className={styles.collectionCard}>
            <div className={styles.cardImg}>
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=650&fit=crop&auto=format"
                alt="For Her collection"
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>FOR HER</h3>
              <p className={styles.cardSub}>
                Elegant, feminine &amp; enchanting
              </p>
              <button className={styles.exploreBtn}>EXPLORE</button>
            </div>
          </div>

          <div className={styles.collectionCard}>
            <div className={styles.cardImg}>
              <img
                src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=650&fit=crop&auto=format"
                alt="Unisex collection"
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>UNISEX</h3>
              <p className={styles.cardSub}>Versatile scents for every mood</p>
              <button className={styles.exploreBtn}>EXPLORE</button>
            </div>
          </div>

          <div className={styles.collectionCard}>
            <div className={styles.cardImg}>
              <img
                src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=650&fit=crop&auto=format"
                alt="Best Sellers collection"
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>BEST SELLERS</h3>
              <p className={styles.cardSub}>Our most loved fragrances</p>
              <button className={styles.exploreBtn}>EXPLORE</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DISCOUNT BANNER ═══ */}
      <section className={styles.discountBanner}>
        <div className={styles.discountText}>
          <p className={styles.discountTag}>DISCOVER YOUR PERFECT SCENT</p>
          <h2 className={styles.discountOffer}>UP TO 20% OFF</h2>
          <button className={styles.discountBtn}>SHOP NOW</button>
        </div>
        <div className={styles.discountImage}>
          <img
            src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=700&h=500&fit=crop&auto=format"
            alt="Gift wrapped perfume bottles"
          />
        </div>
      </section>

      {/* ═══ FOOTER TRUST ═══ */}
      <footer className={styles.footerTrust}>
        <div className={styles.trustGrid}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🚚</span>
            <div>
              <h4 className={styles.trustTitle}>Free Shipping</h4>
              <p className={styles.trustDesc}>On all orders over $50</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>↩</span>
            <div>
              <h4 className={styles.trustTitle}>Easy Returns</h4>
              <p className={styles.trustDesc}>30 days return policy</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🔒</span>
            <div>
              <h4 className={styles.trustTitle}>100% Secure</h4>
              <p className={styles.trustDesc}>Your payment is safe</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>💬</span>
            <div>
              <h4 className={styles.trustTitle}>Support 24/7</h4>
              <p className={styles.trustDesc}>We're here to help</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PerfumeShop;