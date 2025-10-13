import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DemoCardStyle.css';

const DemoDress = () => {
  const [quantity, setQuantity] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const product = {
    name: "Ladies New Glamor High Quality Luxury Shoulder Bag Brown",
    price: 12980.00,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop"
  };

  const subtotal = product.price * quantity;
  const shippingCost = shippingMethod === 'standard' ? 300.00 : 0;
  const total = subtotal + shippingCost;

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      alert(`Coupon ${couponCode} applied!`);
      setCouponCode('');
    }
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    // navigate('/checkout');
  };

  return (
    <div className="demo-card-container">
      {/* Breadcrumb */}
      <nav className="breadcrumb" style={{marginLeft: '20px'}}>
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back to Products
        </button>
        <span>Home / Bagss / Ladies / {product.name}</span>
      </nav>
      {/* Header with Progress */}
      <div className="checkout-header">
        <div className="header-content">
          <h1 className="page-title">Shopping Cart</h1>
          <div className="progress-steps">
            <div className="step active">
              <div className="step-indicator">
                <span>1</span>
              </div>
              <span className="step-label">SHOPPING CART</span>
            </div>
            <div className="step">
              <div className="step-indicator">
                <span>2</span>
              </div>
              <span className="step-label">CHECKOUT DETAILS</span>
            </div>
            <div className="step">
              <div className="step-indicator">
                <span>3</span>
              </div>
              <span className="step-label">ORDER COMPLETE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-layout">
        {/* Main Cart Content */}
        <div className="cart-main">
          {/* Cart Items Card */}
          <div className="cart-card">
            <div className="card-header">
              <h2>Your Shopping Items</h2>
            </div>
            
            <div className="cart-items">
              <div className="cart-item">
                <div className="item-image">
                  <img src={product.image} alt={product.name} />
                  <div className="item-badge">Luxury</div>
                </div>
                
                <div className="item-details">
                  <h3 className="item-title">{product.name}</h3>
                  <p className="item-sku">SKU: BAG-2024-LUX</p>
                  <div className="item-features">
                    <span className="feature-tag">Premium Leather</span>
                    <span className="feature-tag">Waterproof</span>
                  </div>
                </div>

                <div className="item-controls">
                  <div className="price-section">
                    <span className="price">${product.price.toLocaleString()}</span>
                    <span className="price-note">per item</span>
                  </div>

                  <div className="quantity-section">
                    <label>Quantity</label>
                    <div className="quantity-control">
                      <button 
                        className="qty-btn"
                        onClick={() => handleQuantityChange(-1)}
                      >
                        −
                      </button>
                      <span className="qty-display">{quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => handleQuantityChange(1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="subtotal-section">
                    <span className="subtotal-label">Subtotal</span>
                    <span className="subtotal-amount">${subtotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cart-actions">
              <button className="action-btn continue-shopping">
                <span className="btn-icon">←</span>
                CONTINUE SHOPPING
              </button>
              <button className="action-btn update-cart">
                UPDATE CART
              </button>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="coupon-card">
            <div className="card-header">
              <h3>Apply Coupon Code</h3>
            </div>
            <div className="coupon-input-group">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button 
                className="apply-coupon-btn"
                onClick={handleApplyCoupon}
              >
                APPLY COUPON
              </button>
            </div>
            <div className="coupon-suggestions">
              <span>Popular: </span>
              <button className="suggestion-tag">SAVE10</button>
              <button className="suggestion-tag">WELCOME15</button>
              <button className="suggestion-tag">FREESHIP</button>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="order-summary">
          <div className="summary-card">
            <div className="card-header">
              <h2>Order Summary</h2>
            </div>

            <div className="summary-content">
              <div className="summary-row">
                <span>Subtotal ({quantity} items)</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>

              <div className="shipping-section">
                <div className="section-title">Shipping Method</div>
                <div className="shipping-options">
                  <label className="shipping-option">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                    />
                    <div className="option-content">
                      <span className="option-title">Standard Delivery</span>
                      <span className="option-price">$300.00</span>
                      <span className="option-desc">3-5 business days</span>
                    </div>
                  </label>

                  <label className="shipping-option">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'self-pickup'}
                      onChange={() => setShippingMethod('self-pickup')}
                    />
                    <div className="option-content">
                      <span className="option-title">Self Pickup</span>
                      <span className="option-price">Free</span>
                      <span className="option-desc">Pick up from our store</span>
                    </div>
                  </label>

                  <label className="shipping-option">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'uber'}
                      onChange={() => setShippingMethod('uber')}
                    />
                    <div className="option-content">
                      <span className="option-title">Uber Delivery</span>
                      <span className="option-price">Varies</span>
                      <span className="option-desc">Same day delivery available</span>
                    </div>
                  </label>

                  <label className="shipping-option">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'pickme'}
                      onChange={() => setShippingMethod('pickme')}
                    />
                    <div className="option-content">
                      <span className="option-title">Pickme Delivery</span>
                      <span className="option-price">Varies</span>
                      <span className="option-desc">Express delivery service</span>
                    </div>
                  </label>
                </div>

                <div className="shipping-note">
                  <i>Shipping options will be updated during checkout.</i>
                </div>

                <button className="calculate-shipping-btn">
                  Calculate Custom Shipping
                </button>
              </div>

              <div className="summary-divider"></div>

              <div className="total-row">
                <div className="total-label">
                  <span>Total Amount</span>
                  <small>Including shipping</small>
                </div>
                <div className="total-amount">${total.toLocaleString()}</div>
              </div>

              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                PROCEED TO CHECKOUT
                <span className="btn-arrow">→</span>
              </button>

              <div className="security-features">
                <div className="security-item">
                  <span className="security-icon">🔒</span>
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="security-item">
                  <span className="security-icon">🛡️</span>
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoDress;