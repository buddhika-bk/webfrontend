import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DemoDressStyle.css';

const DemoDress = () => {
    const [selectedSize, setSelectedSize] = useState('L');
    const [quantity, setQuantity] = useState(1);
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const measurements = {
        chest: { XS: 31.5, S: 33, M: 35, L: 37, XL: 39, XXL: 41 },
        waist: { XS: 25.5, S: 27, M: 29, L: 31, XL: 33, XXL: 35 },
        length: { XS: 39.5, S: 40.4, M: 40.5, L: 41, XL: 41.5, XXL: 42 }
    };

    const relatedProducts = [
        {
            name: "Pinned Mixed Shift Dress",
            price: "Rs 5,990.00",
            installment: "Rs 1,996.66",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop&crop=center"
        },
        {
            name: "Ponte Start And Top Set Black - Top",
            price: "Rs 3,790.00",
            installment: "Rs 1,263.33",
            image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=300&h=400&fit=crop&crop=center"
        },
        {
            name: "Ponte Start And Top Set Black - Start",
            price: "Rs 5,990.00",
            installment: "Rs 1,996.66",
            image: "https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=300&h=400&fit=crop&crop=center"
        },
        {
            name: "Ponte Start And Top Set Beige - Top",
            price: "Rs 3,790.00",
            installment: "Rs 1,263.33",
            image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop&crop=center"
        },
        {
            name: "Floral Print Summer Dress",
            price: "Rs 4,590.00",
            installment: "Rs 1,530.00",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop&crop=center"
        },
        {
            name: "Elegant Evening Gown",
            price: "Rs 8,990.00",
            installment: "Rs 2,996.66",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop"
        }
    ];

    const mainProductImages = [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop&crop=center&brightness=110",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop&crop=center&brightness=120",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop&crop=center&brightness=130"
    ];

    const [selectedImage, setSelectedImage] = useState(mainProductImages[0]);

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    const handleAddToCart = () => {
        const product = {
            name: "Sleeveless Empired Line Chiffon Dress",
            price: "Rs 6,990.00",
            size: selectedSize,
            quantity: quantity,
            image: selectedImage,
            sku: "XEZZ80473-L"
        };

        // Here you would typically add to cart context or state management
        console.log('Added to cart:', product);
        alert(`Added ${quantity} ${selectedSize} size dress to cart!`);
    };

    const shareOnSocialMedia = (platform) => {
        const url = window.location.href;
        const title = "Sleeveless Empired Line Chiffon Dress";

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'instagram':
                window.open('https://www.instagram.com/', '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'pinterest':
                window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`, '_blank');
                break;
            default:
                break;
        }
    };

    // SVG Icons
    const FacebookIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );

    const InstagramIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.766 3.78 13.58 3.78 12.283s.44-2.483 1.346-3.408c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.925 1.346 2.111 1.346 3.408s-.44 2.483-1.346 3.408c-.875.807-2.026 1.297-3.323 1.297z" />
        </svg>
    );

    const WhatsAppIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.167-3.491-8.418" />
        </svg>
    );

    const TwitterIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.543l-.047-.02z" />
        </svg>
    );

    const PinterestIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
        </svg>
    );

    const ShareIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
        </svg>
    );

    return (
        <div className="demo-dress-container">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <button onClick={() => navigate(-1)} className="back-btn">
                    ← Back to Products
                </button>
                <span>Home</span> / <span>Dresses</span> / <span className="current">Sleeveless Empired Line Chiffon Dress</span>
            </div>

            <div className="product-main">
                {/* Product Images Section */}
                <div className="product-images">
                    <div className="main-image">
                        <img src={selectedImage} alt="Sleeveless Empired Line Chiffon Dress" />
                    </div>
                    <div className="image-thumbnails">
                        {mainProductImages.map((image, index) => (
                            <div
                                key={index}
                                className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="product-details">
                    <div className="stock-badge in-stock">In stock</div>
                    <h1 className="product-title">Sleeveless Empired Line Chiffon Dress</h1>

                    <div className="product-sku">SKU: XEZZ80473-L</div>

                    <div className="product-price">
                        <span className="current-price">Rs 6,990.00</span>
                    </div>

                    <div className="installment-option">
                        or 3 installments of <strong>Rs 2,330.00</strong> with <span className="payment-badge">while pay</span> or <span className="payment-badge">looko</span>
                    </div>

                    <div className="stock-warning">
                        <span className="warning-icon">⚠️</span>
                        Hurry! Only 2 Left in Stock!
                    </div>

                    {/* Size Selection */}
                    <div className="size-section">
                        <div className="size-header">
                            <span className="size-label">STYLE SIZE: <strong>{selectedSize}</strong></span>
                            <button className="size-guide-btn">SIZE GUIDE</button>
                        </div>
                        <div className="size-buttons">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button className="message-btn">MESSAGE</button>
                        <button className="see-on-you-btn">SEE IT ON YOU</button>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="purchase-section">
                        <div className="quantity-selector">
                            <button onClick={decreaseQuantity}>-</button>
                            <span>{quantity}</span>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            ADD TO CART
                        </button>
                    </div>

                    {/* Additional Add to Cart Button */}
                    <div className="additional-cart-section">
                        <button className="add-to-cart-btn-secondary" onClick={handleAddToCart}>
                            ADD TO CART
                        </button>
                    </div>

                    {/* Safe Checkout */}
                    <div className="safe-checkout">
                        <span>GUARANTEED SAFE CHECKOUT:</span>
                        <div className="payment-icons">
                            <span className="payment-icon">💳</span>
                            <span className="payment-icon">📱</span>
                            <span className="payment-icon">🏦</span>
                            <span className="payment-icon">🔒</span>
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="share-section">
                        <span><ShareIcon /> SHARE:</span>
                        <div className="social-icons">
                            <button className="social-icon facebook" onClick={() => shareOnSocialMedia('facebook')}>
                                <FacebookIcon />
                            </button>
                            <button className="social-icon instagram" onClick={() => shareOnSocialMedia('instagram')}>
                                <InstagramIcon />
                            </button>
                            <button className="social-icon whatsapp" onClick={() => shareOnSocialMedia('whatsapp')}>
                                <WhatsAppIcon />
                            </button>
                            <button className="social-icon twitter" onClick={() => shareOnSocialMedia('twitter')}>
                                <TwitterIcon />
                            </button>
                            <button className="social-icon pinterest" onClick={() => shareOnSocialMedia('pinterest')}>
                                <PinterestIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Specifications */}
            <div className="product-specs">
                <div className="specs-header" onClick={() => setExpanded(!expanded)}>
                    <h3>Product Specifications</h3>
                    <span className="expand-icon">{expanded ? '−' : '+'}</span>
                </div>

                {expanded && (
                    <div className="specs-content">
                        <div className="measurements">
                            <h4>Measurements (inches)</h4>
                            <div className="measurement-table">
                                <div className="table-header">
                                    <span>Size</span>
                                    <span>Chest</span>
                                    <span>Waist</span>
                                    <span>Length</span>
                                </div>
                                {sizes.map(size => (
                                    <div key={size} className="table-row">
                                        <span><strong>{size}</strong></span>
                                        <span>{measurements.chest[size]}</span>
                                        <span>{measurements.waist[size]}</span>
                                        <span>{measurements.length[size]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="product-info">
                            <div className="info-item">
                                <span className="info-label">Material:</span>
                                <span className="info-value">POLYESTER</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Color:</span>
                                <span className="info-value">PINK</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Fit Type:</span>
                                <span className="info-value">REGULAR FIT</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Stretch:</span>
                                <span className="info-value">RG Stretch</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Style:</span>
                                <span className="info-value">Sleeveless, Empired Line</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Accessories:</span>
                                <span className="info-value">ZIPPER</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Model Size:</span>
                                <span className="info-value">S</span>
                            </div>
                        </div>

                        <div className="product-note">
                            <p><strong>Note:</strong> Product Colour May Slightly Vary Due To Photographic Lighting Sources Or Your Monitor Setting.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Related Products */}
            <div className="related-products">
                <h2>RELATED PRODUCTS</h2>
                <div className="related-products-grid">
                    {relatedProducts.map((product, index) => (
                        <div key={index} className="related-product-card">
                            <div className="stock-badge in-stock">In stock</div>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <div className="product-price">{product.price}</div>
                            <div className="installment-option">
                                or 3 installments of <strong>{product.installment}</strong> with <span className="payment-badge">while pay</span>
                            </div>
                            <button className="related-add-to-cart-btn" onClick={() => {
                                alert(`Added ${product.name} to cart!`);
                            }}>
                                ADD TO CART
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DemoDress;