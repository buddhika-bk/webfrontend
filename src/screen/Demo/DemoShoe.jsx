import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DemoShoeStyle.css';


const DemoShoe = () => {
  const [selectedSize, setSelectedSize] = useState('8');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();

  const product = {
    code: "SNO5.1.K",
    name: "Nike Mens Shoe",
    type: "(Plus Size)",
    model: "NKM020",
    price: "Rs 8,999.00 LKR",
    originalPrice: "Rs 7,499.00 LKR",
    description: "No shortcuts-just the perfect fusion of innovation and style. This Nike essential brings iconic DNA to your everyday rotation with lightweight comfort, clean lines, and just the right amount of attitude. Engineered for movement and built to last, it's got the grip to keep you grounded and the cushioning to keep you going. Whether you're chasing goals or just the weekend, this is your go-to for stepping up and standing out.",
    installment: "3 X Rs 2,999.66",
    cashback: "4.5% Cashback with",
    kokko: "or 3 X Rs 2,999.66 with KOKKO",
    features: [
      "Lightweight comfort technology",
      "Enhanced cushioning system",
      "Durable rubber outsole",
      "Breathable mesh upper",
      "Iconic Nike styling"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'black', value: '#2D3748' },
      { name: 'white', value: '#FFFFFF' },
      { name: 'red', value: '#E53E3E' },
      { name: 'blue', value: '#3182CE' }
    ],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop"
    ]
  };

  const relatedProducts = [
    {
      id: 1,
      name: "Nike Air Max",
      price: "Rs 12,999.00 LKR",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Nike Running Shoe",
      price: "Rs 9,499.00 LKR",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Nike Basketball",
      price: "Rs 11,299.00 LKR",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop"
    }
  ];

  const handleAddToCart = () => {
    navigate('/democard');
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout: ${product.name}`);
  };

  return (
    <div className="demo-shoe-container">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back to Products
        </button>
        <span>Home / Shoes / Men / {product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="product-main">
        {/* Product Images */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.images[activeImage]} alt={product.name} />
            <div className="product-badge">NEW</div>
          </div>
          <div className="image-thumbnails">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={image} alt={`${product.name} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-code">{product.code}</div>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-type">{product.type}</div>
          <div className="product-model">{product.model}</div>

          {/* Pricing */}
          <div className="pricing-section">
            <div className="current-price">{product.price}</div>
            <div className="original-price">{product.originalPrice}</div>
            <div className="installment-plan">
              <div className="installment">{product.installment}</div>
              <div className="cashback">{product.cashback}</div>
              <div className="kokko">{product.kokko}</div>
            </div>
          </div>

          {/* Color Selection */}
          <div className="selection-section">
            <h3>Color: <span className="selected-color">{selectedColor}</span></h3>
            <div className="color-options">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-option ${selectedColor === color.name ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color.name)}
                >
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: color.value }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="selection-section">
            <h3>Size</h3>
            <div className="size-options">
              {product.sizes.map((size) => (
                <div
                  key={size}
                  className={`size-option ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="quantity-section">
            <h3>Quantity</h3>
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <div>
            <button className="add-to-cart-btn1" onClick={handleAddToCart}>
              Add to Cart
            </button></div>
            <div>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
            </div>
          </div>

              
        </div>
      </div>

      {/* Product Description */}
      <div className="product-description-section">
        <h2>Product Description</h2>
        <p className="description-text">{product.description}</p>
      </div>

      {/* Features */}
          <div className="features-section">
            <h3>Product Features</h3>
            <ul className="features-list">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

      {/* Related Products */}
      <div className="related-products-section">
        <h2>You Might Also Like</h2>
        <div className="related-products-grid">
          {relatedProducts.map((product) => (
            <div key={product.id} className="related-product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <div className="price">{product.price}</div>
              <button className="quick-view-btn">Quick View</button>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="additional-info">
        <div className="info-card">
          <div className="icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>Free delivery for orders above Rs 5,000</p>
        </div>
        <div className="info-card">
          <div className="icon">↩️</div>
          <h3>30-Day Returns</h3>
          <p>Easy returns within 30 days</p>
        </div>
        <div className="info-card">
          <div className="icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>Your payment information is safe</p>
        </div>
        <div className="info-card">
          <div className="icon">📞</div>
          <h3>Support</h3>
          <p>24/7 customer support</p>
        </div>
      </div>
    </div>
  );
};

export default DemoShoe;