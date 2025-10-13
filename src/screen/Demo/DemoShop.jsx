import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DemoShopStyle.module.css';
import DemoDress from './DemoDress';

const DemoShop = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  // Sample data for products
  const newArrivals = [
    {
      id: 1,
      name: "Premium Leather Jacket",
      price: "$299.99",
      originalPrice: "$399.99",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
      category: "Jackets",
      rating: 4.8,
      isNew: true,
      colors: ["#2D3748", "#4A5568", "#718096"]
    },
    {
      id: 2,
      name: "Designer Summer Dress",
      price: "$159.99",
      originalPrice: "$199.99",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      category: "Dresses",
      rating: 4.6,
      isNew: true,
      colors: ["#E53E3E", "#F56565", "#FEB2B2"]
    },
    {
      id: 3,
      name: "Classic White Sneakers",
      price: "$129.99",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
      category: "Shoes",
      rating: 4.9,
      isNew: true,
      colors: ["#FFFFFF", "#E2E8F0", "#CBD5E0"]
    },
    {
      id: 4,
      name: "Luxury Watch Collection",
      price: "$499.99",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop",
      category: "Accessories",
      rating: 4.7,
      isNew: true,
      colors: ["#1A202C", "#2D3748", "#4A5568"]
    },
    {
      id: 5,
      name: "Designer Handbag",
      price: "$349.99",
      originalPrice: "$429.99",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
      category: "Bags",
      rating: 4.5,
      isNew: true,
      colors: ["#744210", "#D69E2E", "#F6E05E"]
    },
    {
      id: 6,
      name: "Premium Sunglasses",
      price: "$189.99",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop",
      category: "Accessories",
      rating: 4.4,
      isNew: true,
      colors: ["#1A202C", "#2D3748", "#4A5568"]
    },
    {
      id: 7,
      name: "Casual Denim Shirt",
      price: "$79.99",
      originalPrice: "$99.99",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      category: "Shirts",
      rating: 4.3,
      isNew: true,
      colors: ["#3182CE", "#63B3ED", "#BEE3F8"]
    },
    {
      id: 8,
      name: "Elegance High Heels",
      price: "$179.99",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop",
      category: "Shoes",
      rating: 4.6,
      isNew: true,
      colors: ["#1A202C", "#E53E3E", "#F56565"]
    }
  ];

  const topSelling = [
    {
      id: 9,
      name: "Casual T-Shirt Pack",
      price: "$49.99",
      originalPrice: "$69.99",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      category: "T-Shirts",
      rating: 4.9,
      isBestSeller: true,
      colors: ["#FFFFFF", "#000000", "#E53E3E"]
    },
    {
      id: 10,
      name: "Designer Denim Jeans",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      category: "Jeans",
      rating: 4.7,
      isBestSeller: true,
      colors: ["#2B6CB0", "#3182CE", "#63B3ED"]
    },
    {
      id: 11,
      name: "Winter Wool Coat",
      price: "$199.99",
      originalPrice: "$249.99",
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop",
      category: "Coats",
      rating: 4.8,
      isBestSeller: true,
      colors: ["#1A202C", "#2D3748", "#4A5568"]
    },
    {
      id: 12,
      name: "Sports Running Shoes",
      price: "$119.99",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=500&fit=crop",
      category: "Shoes",
      rating: 4.6,
      isBestSeller: true,
      colors: ["#E53E3E", "#F56565", "#FEB2B2"]
    },
    {
      id: 13,
      name: "Knit Sweater",
      price: "$79.99",
      originalPrice: "$99.99",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
      category: "Sweaters",
      rating: 4.5,
      isBestSeller: true,
      colors: ["#744210", "#D69E2E", "#F6E05E"]
    },
    {
      id: 14,
      name: "Designer Backpack",
      price: "$129.99",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
      category: "Bags",
      rating: 4.7,
      isBestSeller: true,
      colors: ["#1A202C", "#2D3748", "#4A5568"]
    },
    {
      id: 15,
      name: "Active Wear Set",
      price: "$99.99",
      originalPrice: "$129.99",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop&crop=center",
      category: "Activewear",
      rating: 4.8,
      isBestSeller: true,
      colors: ["#2F855A", "#38A169", "#68D391"]
    },
    {
      id: 16,
      name: "Formal Blazer",
      price: "$229.99",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
      category: "Blazers",
      rating: 4.7,
      isBestSeller: true,
      colors: ["#1A202C", "#2D3748", "#4A5568"]
    }
  ];

  const categories = [
    { name: "Men's Fashion", icon: "👔", count: "200+" },
    { name: "Women's Fashion", icon: "👗", count: "300+" },
    { name: "Accessories", icon: "🕶️", count: "150+" },
    { name: "Footwear", icon: "👟", count: "100+" },
    { name: "Bags", icon: "👜", count: "80+" },
    { name: "Watches", icon: "⌚", count: "50+" }
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      rating: 5,
      comment: "Amazing quality and fast shipping! The attention to detail in every stitch shows the craftsmanship. Will definitely shop here again and recommend to all my followers.",
      avatar: "👩",
      date: "2 days ago",
      likes: 24
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Business Professional",
      rating: 4,
      comment: "Great products at reasonable prices. The suits fit perfectly and the fabric quality is exceptional. Customer service was excellent and helped me with sizing.",
      avatar: "👨",
      date: "1 week ago",
      likes: 18
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Style Enthusiast",
      rating: 5,
      comment: "Love the modern styles and the quality exceeded my expectations! The dresses are even more beautiful in person. Perfect for both casual and formal occasions.",
      avatar: "👩‍💼",
      date: "3 days ago",
      likes: 31
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      role: "Tech Entrepreneur",
      rating: 5,
      comment: "Best online shopping experience I've had. The website is intuitive, delivery was ahead of schedule, and the products are premium quality. Highly recommended!",
      avatar: "🧑‍💻",
      date: "5 days ago",
      likes: 27
    },
    {
      id: 5,
      name: "Jessica Williams",
      role: "Interior Designer",
      rating: 5,
      comment: "Absolutely in love with my purchases! The colors are vibrant and true to photos. The materials feel luxurious and the fit is perfect. Already planning my next order!",
      avatar: "👩‍🎨",
      date: "1 day ago",
      likes: 19
    },
    {
      id: 6,
      name: "David Thompson",
      role: "Marketing Director",
      rating: 4,
      comment: "Impressed with the quality and style selection. The customer support team was incredibly helpful when I needed to exchange sizes. Fast shipping and great packaging!",
      avatar: "👨‍💼",
      date: "4 days ago",
      likes: 22
    }
  ];

  const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className={styles.demoShopContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <h1 style={{fontSize:50, marginTop:-5}}>BKSTAR</h1>
          </div>
          <nav className={`${styles.nav} ${expanded ? styles.navExpanded : ''}`}>
            <h2><a href="#home">Home</a></h2>
            <h2><a href="#new-arrivals">New Arrivals</a></h2>
            <h2><a href="#top-selling">Top Selling</a></h2>
            <h2><a href="#categories">Categories</a></h2>
            <h2><a href="#reviews">Reviews</a></h2>
          </nav>
          <div className={styles.headerActions}>
            <button className={styles.searchBtn}>🔍</button>
            <button className={styles.cartBtn}>🛒</button>
            <button className={styles.authBtn}>Login</button>
            <button
              className={styles.menuToggle}
              onClick={() => setExpanded(!expanded)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero} id="home">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>New Collection 2024</span>
              <div className={styles.badgeGlow}></div>
            </div>

            <h1>
              <span className={styles.titleLine}>EXPRESS YOUR</span>
              <span className={styles.titleLine}>UNIQUE STYLE </span>
              <span className={styles.titleLine}>WITH CONFIDENCE</span>
            </h1>

            <p className={styles.heroDescription}>
              Discover fashion that speaks to you. From casual essentials to statement pieces,
              find your perfect match in our carefully curated collection of 200+ international brands.
            </p>

            <div className={styles.heroButtons}>
              <button className={`${styles.ctaButton} ${styles.primary}`}>
                <span>Shop Collection</span>
                <div className={styles.buttonGlow}></div>
              </button>
              <button className={`${styles.ctaButton} ${styles.secondary}`}>
                <span>Explore Trends</span>
              </button>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>🏷️</div>
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>200+</span>
                  <span className={styles.statLabel}>Premium Brands</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>⭐</div>
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>2.5K+</span>
                  <span className={styles.statLabel}>Quality Products</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>😊</div>
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>3K+</span>
                  <span className={styles.statLabel}>Happy Customers</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.floatingCards}>
              <div className={`${styles.card} ${styles.card1}`}>
                <div className={styles.cardImage}>
                  <img
                    src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop"
                    alt="Trending Fashion Style"
                  />
                </div>
                <div className={styles.cardBadge}>Trending</div>
              </div>
              <div className={`${styles.card} ${styles.card2}`}>
                <div className={styles.cardImage}>
                  <img
                    src="https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=400&h=500&fit=crop"
                    alt="Elegant Wear"
                  />
                </div>
                <div className={styles.cardBadge}>New</div>
              </div>
              <div className={`${styles.card} ${styles.card3}`}>
                <div className={styles.cardImage}>
                  <img
                    src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=500&fit=crop"
                    alt="New Collection"
                  />
                </div>
                <div className={styles.cardBadge}>Popular</div>
              </div>
            </div>

            <div className={styles.floatingElements}>
              <div className={`${styles.floatingElement} ${styles.element1}`}></div>
              <div className={`${styles.floatingElement} ${styles.element2}`}></div>
              <div className={`${styles.floatingElement} ${styles.element3}`}></div>
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine}></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Brands Section */}
      <section className={styles.brands}>
        <div className={styles.brandsContainer}>
          <h2 className={styles.name}>VERSACE</h2>
          <h2 className={styles.name}>GUCCI</h2>
          <h2 className={styles.name}>PRADA</h2>
          <h2 className={styles.name}>CALVIN KLEIN</h2>
          <h2 className={styles.name}>ZARA</h2>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className={styles.newArrivals} id="new-arrivals">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>Latest Collection</div>
            <h2>NEW ARRIVALS</h2>
            <p>Discover our freshly curated collection of trending fashion pieces</p>
          </div>
          <div className={styles.productsGrid}>
            {newArrivals.map(product => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImages}>
                  <img src={product.image} alt={product.name} />
                  {product.isNew && <div className={`${styles.productBadge} ${styles.new}`}>NEW</div>}
                  <div className={styles.productActions}>
                    <button className={`${styles.actionBtn} ${styles.wishlist}`}>
                      <span>❤️</span>
                    </button>
                    <button className={`${styles.actionBtn} ${styles.quickView}`}>
                      <span>👁️</span>
                    </button>
                  </div>
                  <button className={styles.addToCartBtn}>Add to Cart</button>
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.productCategory}>{product.category}</span>
                  <h2 className={styles.productName} style={{ color: '#ffffff', fontSize: '1.9rem', fontWeight: 600 , textAlign: 'center', marginTop:20}}>{product.name}</h2>
                  <div className={styles.productRating} style={{ color: '#efc331ff', fontSize: '1.7rem', fontWeight: 600, textAlign: 'center', marginLeft: '25%'}}>
                    {'★'.repeat(Math.floor(product.rating))}
                    <span className={styles.ratingValue} style={{ color: '#efc331ff', fontSize: '1.5rem', fontWeight: 600}}>{product.rating}</span>
                  </div>
                  <div className={styles.productPricing}>
                    <span className={styles.productPrice}>{product.price}</span>
                    {product.originalPrice && (
                      <span className={styles.productOriginalPrice}>{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.sectionFooter}>
            <button className={styles.viewAllBtn}>View All New Arrivals</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection} id="categories">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>BROWSE BY DRESS STYLE</h2>
          <p className={styles.sectionSubtitle}>Discover your perfect look with our curated collections</p>
        </div>

        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${styles.categoryCard} ${styles[`categoryCard${index + 1}`]}`}
              style={{ '--accent-color': category.color }}
            >
              <div className={styles.categoryContent}>
                <div className={styles.categoryIconWrapper}>
                  <div className={styles.categoryIcon}>{category.icon}</div>
                  <div className={styles.iconBackdrop}></div>
                </div>
                <div className={styles.categoryInfo}>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <span className={styles.categoryCount}>{category.count} Products</span>
                </div>
                <div className={styles.categoryHoverEffect}>
                  <span className={styles.exploreText}>Explore →</span>
                </div>
              </div>
              <div className={styles.categoryGradientOverlay}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Selling Section */}
      <section className={styles.topSelling} id="top-selling">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>Customer Favorites</div>
            <h2>TOP SELLING</h2>
            <p>Shop our most loved and frequently purchased items</p>
          </div>
          <div className={styles.productsGrid}>
            {topSelling.map(product => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImages}>
                  <img src={product.image} alt={product.name} />
                  {product.isBestSeller && <div className={`${styles.productBadge} ${styles.bestseller}`}>BESTSELLER</div>}
                  <div className={styles.productActions}>
                    <button className={`${styles.actionBtn} ${styles.wishlist}`}>
                      <span>❤️</span>
                    </button>
                    <button className={`${styles.actionBtn} ${styles.quickView}`}>
                      <span>👁️</span>
                    </button>
                  </div>
                  <button className={styles.addToCartBtn}>Add to Cart</button>
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.productCategory}>{product.category}</span>
                  <h2 className={styles.productName} style={{ color: '#ffffff', fontSize: '1.9rem', fontWeight: 600 , textAlign: 'center', marginTop:20}}>{product.name}</h2>

                  <div className={styles.productRating} style={{ color: '#efc331ff', fontSize: '1.7rem', fontWeight: 600, textAlign: 'center', marginLeft: '25%'}}>
                    {'★'.repeat(Math.floor(product.rating))}
                    <span className={styles.ratingValue} style={{ color: '#efc331ff', fontSize: '1.5rem', fontWeight: 600}}>{product.rating}</span>
                  </div>
                  <div className={styles.productPricing}>
                    <span className={styles.productPrice}>{product.price}</span>
                    {product.originalPrice && (
                      <span className={styles.productOriginalPrice}>{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.sectionFooter}>
            <button className={styles.viewAllBtn}>View All Best Sellers</button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={styles.reviewsSection} id="reviews">
        <div className={styles.reviewsContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>OUR HAPPY CUSTOMERS</h2>
            <p className={styles.sectionSubtitle}>Discover why thousands trust our products</p>
            <div className={styles.sectionDecoration}>
              <div className={styles.decorationLine}></div>
              <div className={styles.decorationStar}>⭐</div>
              <div className={styles.decorationLine}></div>
            </div>
          </div>

          <div className={styles.reviewsGrid}>
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`${styles.reviewCard} ${styles[`reviewCard${index % 3 + 1}`]}`}
              >
                <div className={styles.cardBackground}>
                  <div className={styles.backgroundPattern}></div>
                </div>

                <div className={styles.reviewContent}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatarContainer}>
                      <div className={styles.reviewAvatar}>
                        {review.avatar}
                      </div>
                      <div className={styles.avatarBorder}></div>
                      <div className={styles.verifiedBadge}>
                        <span className={styles.verifiedIcon}>✓</span>
                      </div>
                    </div>

                    <div className={styles.reviewerInfo}>
                      <h4 className={styles.reviewerName}>{review.name}</h4>
                      <span className={styles.reviewerRole}>{review.role || "Verified Customer"}</span>
                      <div className={styles.reviewStars}>
                        {renderStars(review.rating)}
                        <span className={styles.ratingNumber}>{review.rating}.0</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.reviewBody}>
                    <div className={styles.quoteIcon}>"</div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                    <div className={styles.reviewMeta}>
                      <span className={styles.reviewDate}>{review.date || "2 days ago"}</span>
                      <div className={styles.reviewActions}>
                        <button className={`${styles.actionBtn} ${styles.likeBtn}`}>
                          <span className={styles.actionIcon}>👍</span>
                          <span className={styles.actionCount}>{review.likes || 12}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.cardHoverEffect}></div>
              </div>
            ))}
          </div>

          <div className={styles.reviewsCta}>
            <button className={styles.ctaButton}>
              <span>Read More Reviews</span>
              <div className={styles.ctaArrow}>→</div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.simpleFooter}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            {/* Brand Section */}
            <div className={styles.footerBrand}>
              <h3 className={styles.brandName}>BKSTAR</h3>
              <p className={styles.brandDescription}>
                Your ultimate destination for modern fashion and style.
              </p>
            </div>

            {/* Links Sections */}
            <div className={styles.footerLinks}>
              <div className={styles.linkColumn}>
                <h4>Shop</h4>
                <ul>
                  <li><a href="#new-arrivals">New Arrivals</a></li>
                  <li><a href="#top-selling">Top Selling</a></li>
                  <li><a href="#categories">Categories</a></li>
                </ul>
              </div>

              <div className={styles.linkColumn}>
                <h4>Help</h4>
                <ul>
                  <li><a href="#">Customer Service</a></li>
                  <li><a href="#">Shipping Info</a></li>
                  <li><a href="#">Returns & Exchanges</a></li>
                </ul>
              </div>

              <div className={styles.linkColumn}>
                <h4>Contact</h4>
                <ul>
                  <li>support@bkstar.com</li>
                  <li>+1 (555) 123-4567</li>
                  <li>123 Fashion St, Style City</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className={styles.footerBottom}>
            <div className={styles.divider}></div>
            <p>&copy; 2025 BKSTAR. All rights reserved. Crafted by Webpoint SriLanka.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DemoShop;