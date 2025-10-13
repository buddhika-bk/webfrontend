import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DemoBagStyle.module.css';

const DemoBag = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState('brown');
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();

  const product = {
    name: "Ladies New Glamor High Quality Luxury Shoulder Bag Brown",
    price: "Rs 12,980.00",
    installment: "or 3 X Rs 4,326.67 with KOKO",
    description: "The Ladies New Glamor High Quality Luxury Shoulder Bag is an exquisite accessory designed to elevate any outfit. Crafted with meticulous attention to detail, it combines sophisticated style with functionality. Made from premium materials, this shoulder bag exudes elegance and luxury. Its spacious interior provides ample room for essentials, while the sleek design and intricate embellishments add a touch of glamour to any ensemble. Perfect for special occasions or everyday use, this bag is a statement piece that complements the discerning taste of fashion-forward individuals.",
    features: [
      "Premium quality materials",
      "Spacious interior with multiple compartments",
      "Adjustable shoulder strap",
      "Secure magnetic closure",
      "Elegant gold-tone hardware",
      "Water-resistant lining"
    ],
    colors: [
      { 
        name: 'brown', 
        value: '#8B4513', 
        displayName: 'Classic Brown',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop' 
      },
      { 
        name: 'black', 
        value: '#2D3748', 
        displayName: 'Elegant Black',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop' 
      },
      { 
        name: 'beige', 
        value: '#F5F5DC', 
        displayName: 'Champagne Beige',
        image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=600&fit=crop' 
      },
      { 
        name: 'navy', 
        value: '#1E3A8A', 
        displayName: 'Midnight Navy',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop' 
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop"
    ],
    specifications: {
      material: "Premium PU Leather",
      dimensions: "30cm x 20cm x 12cm",
      closure: "Magnetic Strap",
      strap: "Adjustable 120cm",
      weight: "0.8kg",
      compartments: "Main + 2 inner + back pocket"
    }
  };

  const relatedProducts = [
    {
      id: 1,
      name: "Pu Leather New Design Women Hand Bag Black",
      price: "Rs 6,980.00",
      category: "HANDBAGS",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop",
      outOfStock: false
    },
    {
      id: 2,
      name: "Women's Luxury Handbag 2023 Beige",
      price: "Rs 14,550.00",
      category: "HANDBAGS",
      image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=300&h=300&fit=crop",
      outOfStock: false
    },
    {
      id: 3,
      name: "Pu Leather New Design Women Hand Bag Beige Color",
      price: "Rs 8,950.00",
      category: "HANDBAGS",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop",
      outOfStock: true
    },
    {
      id: 4,
      name: "Glamorous PU Leather Handbag Pink",
      price: "Rs 12,850.00",
      category: "HANDBAGS",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      outOfStock: true
    }
  ];

  const handleAddToCart = () => {
    alert(`Added to cart: ${product.name} - Color: ${selectedColor} - Quantity: ${quantity}`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout: ${product.name}`);
  };

  const currentColor = product.colors.find(color => color.name === selectedColor);
  const currentColorImages = currentColor?.image 
    ? [currentColor.image, ...product.images.slice(1)]
    : product.images;

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ← Back to Products
        </button>
        <div className={styles.breadcrumbLinks}>
          <span>HOME</span>
          <span>/</span>
          <span>HANDBAGS</span>
        </div>
      </nav>

      {/* Main Product Section */}
      <div className={styles.productMain}>
        {/* Product Images */}
        <div className={styles.productGallery}>
          <div className={styles.mainImage}>
            <img src={currentColorImages[activeImage]} alt={product.name} />
            <div className={styles.productBadge}>Premium</div>
          </div>
          <div className={styles.imageThumbnails}>
            {currentColorImages.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${activeImage === index ? styles.active : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={image} alt={`${product.name} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.name}</h1>

          {/* Pricing */}
          <div className={styles.pricingSection}>
            <div className={styles.currentPrice}>{product.price}</div>
            <div className={styles.installmentPlan}>
              {product.installment}
            </div>
          </div>

          {/* Color Selection */}
          <div className={styles.selectionSection}>
            <div className={styles.sectionHeader}>
              <h3>Select Color</h3>
              <div className={styles.selectedColorIndicator}>
                Selected: <span className={styles.selectedColorName}>{currentColor?.displayName}</span>
              </div>
            </div>
            <div className={styles.colorOptionsGrid}>
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`${styles.colorOptionCard} ${selectedColor === color.name ? styles.active : ''}`}
                  onClick={() => {
                    setSelectedColor(color.name);
                    setActiveImage(0);
                  }}
                >
                  <div className={styles.colorOptionContent}>
                    <div className={styles.colorPreview}>
                      <div
                        className={styles.colorSwatch}
                        style={{ backgroundColor: color.value }}
                      ></div>
                      {selectedColor === color.name && (
                        <div className={styles.colorCheckmark}>✓</div>
                      )}
                    </div>
                    <div className={styles.colorInfo}>
                      <span className={styles.colorName}>{color.displayName}</span>
                      <span className={styles.colorStatus}>
                        {selectedColor === color.name ? 'Selected' : 'Available'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className={styles.purchaseSection}>
            <div className={styles.quantitySection}>
              <h3>Quantity</h3>
              <div className={styles.quantityControls}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={styles.quantityBtn}
                  disabled={quantity <= 1}
                >
                  <span>-</span>
                </button>
                <div className={styles.quantityDisplay}>
                  <span className={styles.quantityNumber}>{quantity}</span>
                  <span className={styles.quantityLabel}>Items</span>
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={styles.quantityBtn}
                >
                  <span>+</span>
                </button>
              </div>
            </div>
            
            <div className={styles.actionButtonsGroup}>
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                <span className={styles.btnIcon}>🛒</span>
                <span className={styles.btnText}>ADD TO CART</span>
              </button>
              <button className={styles.buyNowBtn} onClick={handleBuyNow}>
                <span className={styles.btnIcon}>⚡</span>
                <span className={styles.btnText}>BUY NOW</span>
              </button>
            </div>
          </div>

          
        </div>
      </div>

      {/* Product Tabs */}
      <div className={styles.productTabs}>
        <div className={styles.tabHeaders}>
          <button 
            className={`${styles.tabHeader} ${activeTab === 'description' ? styles.active : ''}`}
            onClick={() => setActiveTab('description')}
          >
            DESCRIPTION
          </button>
          <button 
            className={`${styles.tabHeader} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            REVIEWS (0)
          </button>
          <button 
            className={`${styles.tabHeader} ${activeTab === 'specifications' ? styles.active : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            SPECIFICATIONS
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'description' && (
            <div className={styles.tabPanel}>
              <p className={styles.descriptionText}>{product.description}</p>
              <div className={styles.specsGrid}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <span className={styles.specLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.tabPanel}>
              <div className={styles.noReviews}>
                <div className={styles.noReviewsIcon}>💬</div>
                <h3>No Reviews Yet</h3>
                <p>Be the first to review this product</p>
                <button className={styles.writeReviewBtn}>Write a Review</button>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className={styles.tabPanel}>
              <div className={styles.specificationsTable}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className={styles.specRow}>
                    <div className={styles.specKey}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</div>
                    <div className={styles.specValue}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Features */}
          <div className={styles.featuresSection}>
            <h3>Product Features</h3>
            <ul className={styles.featuresList}>
              {product.features.map((feature, index) => (
                <li key={index}>
                  <span className={styles.featureIcon}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <div className={styles.badgeIcon}>🚚</div>
              <div className={styles.badgeInfo}>
                <span className={styles.badgeTitle}>Free Shipping</span>
                <span className={styles.badgeDesc}>Over Rs 5,000</span>
              </div>
            </div>
            <div className={styles.trustBadge}>
              <div className={styles.badgeIcon}>↩️</div>
              <div className={styles.badgeInfo}>
                <span className={styles.badgeTitle}>Easy Returns</span>
                <span className={styles.badgeDesc}>30 Days Policy</span>
              </div>
            </div>
            <div className={styles.trustBadge}>
              <div className={styles.badgeIcon}>🔒</div>
              <div className={styles.badgeInfo}>
                <span className={styles.badgeTitle}>Secure Payment</span>
                <span className={styles.badgeDesc}>SSL Protected</span>
              </div>
            </div>
            <div className={styles.trustBadge}>
              <div className={styles.badgeIcon}>⭐</div>
              <div className={styles.badgeInfo}>
                <span className={styles.badgeTitle}>Quality Guarantee</span>
                <span className={styles.badgeDesc}>1 Year Warranty</span>
              </div>
            </div>
          </div><br /><br></br>

      {/* Related Products */}
      <div className={styles.relatedProductsSection}>
        <h2>RELATED PRODUCTS</h2>
        <div className={styles.relatedProductsGrid}>
          {relatedProducts.map((product) => (
            <div key={product.id} className={`${styles.relatedProductCard} ${product.outOfStock ? styles.outOfStock : ''}`}>
              {product.outOfStock && (
                <div className={styles.outOfStockBadge}>OUT OF STOCK</div>
              )}
              <div className={styles.productImageContainer}>
                <img src={product.image} alt={product.name} />
                <div className={styles.productCategory}>{product.category}</div>
              </div>
              <h3 className={styles.productName}>{product.name}</h3>
              <div className={styles.productPrice}>{product.price}</div>
              {!product.outOfStock && (
                <button className={styles.quickViewBtn}>Quick View</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterContent}>
          <h2>Stay Updated with Latest Collections</h2>
          <p>Subscribe to get special offers, free giveaways, and new product launches</p>
          <div className={styles.newsletterForm}>
            <input type="email" placeholder="Enter your email address" />
            <button className={styles.subscribeBtn}>SUBSCRIBE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoBag;