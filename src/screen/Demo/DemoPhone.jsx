// DemoPhone.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DemoPhoneStyle.module.css';

const DemoPhone = () => {
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState('deep-blue');
    const [selectedStorage, setSelectedStorage] = useState('512GB');

    // Phone data
    const phoneData = {
        name: "iPhone 17 Pro Max",
        price: "Coming Soon",
        status: "Out of Stock",
        description: "Experience the next generation of smartphone technology with groundbreaking features that redefine what's possible.",
        features: [
            {
                icon: "🚀",
                title: "A19 Chip",
                description: "Faster performance and efficiency for all models"
            },
            {
                icon: "🔄",
                title: "ProMotion Display",
                description: "Up to 120Hz refresh rate for smoother scrolling and video"
            },
            {
                icon: "📸",
                title: "24MP Front Camera",
                description: "Major upgrade for improved selfies and video calls"
            },
            {
                icon: "🔩",
                title: "Aluminium Design",
                description: "Return to aluminium frames for all iPhone 17 models"
            },
            {
                icon: "⚡",
                title: "iOS 26",
                description: "Latest version enhancing user experience"
            },
            {
                icon: "🔍",
                title: "Upgraded Cameras",
                description: "Enhanced 48MP telephoto lenses with 3.5x optical zoom"
            },
            {
                icon: "💾",
                title: "More RAM",
                description: "Increased memory for demanding professional tasks"
            },
            {
                icon: "❄️",
                title: "Advanced Cooling",
                description: "Vapour chamber cooling to better manage heat"
            }
        ],
        colors: [
            {
                id: 'deep-blue',
                name: 'Deep Blue',
                value: '#1e3a5f',
                preview: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop'
            },
            {
                id: 'space-black',
                name: 'Space Black',
                value: '#2c2c2e',
                preview: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop'
            },
            {
                id: 'silver',
                name: 'Silver',
                value: '#f0f0f0',
                preview: 'https://images.unsplash.com/photo-1583394838336-ecd977736f90?w=150&h=150&fit=crop'
            },
            {
                id: 'gold',
                name: 'Gold',
                value: '#ffd700',
                preview: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=150&h=150&fit=crop'
            }
        ],
        storage: ['256GB', '512GB', '1TB'],
        images: [
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1583394838336-ecd977736f90?w=600&h=600&fit=crop'
        ]
    };

    // Related products
    const relatedProducts = [
        {
            id: 2,
            name: "Galaxy A06",
            price: "Rs.39,129.00 – Rs.46,339.00",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
            status: "In Stock"
        },
        {
            id: 3,
            name: "iPad Pro (M4 Chip)",
            price: "Rs.364,990.00 – Rs.308,989.00",
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop",
            status: "In Stock"
        },
        {
            id: 4,
            name: "iPhone 16 Pro Max",
            price: "Rs.530,439.00 – Rs.616,959.00",
            image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop",
            status: "In Stock"
        }
    ];

    return (
        <div className={styles.demoPhonePage}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                <button onClick={() => navigate(-1)} className={styles.backBtn} style={{marginLeft: '20px'}}>
                    ← Back to Products
                </button>
                <div className={styles.container}>
                    <a href="/">Home</a>
                    <span>/</span>
                    <a href="/smartphones">Smartphones & Tablets</a>
                    <span>/</span>
                    <a href="/smartphones/apple">Smartphones</a>
                    <span>/</span>
                    <a href="/smartphones/apple">Apple iPhone</a>
                    <span>/</span>
                    <span className={styles.current}>iPhone 17 Pro Max</span>
                </div>
            </div>

            {/* Main Product Section */}
            <div className={styles.productSection}>
                <div className={styles.container}>
                    <div className={styles.productGrid}>
                        {/* Product Images */}
                        <div className={styles.productImages}>
                            <div className={styles.mainImage}>
                                <img
                                    src={phoneData.images[0]}
                                    alt={phoneData.name}
                                    onError={(e) => {
                                        e.target.src = `https://via.placeholder.com/600x600/1e3a5f/ffffff?text=iPhone+17+Pro+Max`;
                                    }}
                                />
                            </div>
                            <div className={styles.imageThumbnails}>
                                {phoneData.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={styles.thumbnail}
                                    >
                                        <img
                                            src={image}
                                            alt={`View ${index + 1}`}
                                            onError={(e) => {
                                                e.target.src = `https://via.placeholder.com/80x80/1e3a5f/ffffff?text=View+${index + 1}`;
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className={styles.productDetails}>
                            <div className={styles.statusBadge}>{phoneData.status}</div>
                            <h1 className={styles.productTitle}>{phoneData.name}</h1>

                            <div className={styles.priceSection}>
                                <span className={styles.price}>{phoneData.price}</span>
                            </div>

                            <p className={styles.productDescription}>{phoneData.description}</p>

                            {/* Color Selection */}
                            <div className={styles.selectionGroup}>
                                <div className={styles.sectionHeader}>
                                    <h3>Choose Color</h3>
                                    <span className={styles.selectedColor}>
                                        {phoneData.colors.find(color => color.id === selectedColor)?.name}
                                    </span>
                                </div>
                                <div className={styles.colorSelection}>
                                    {phoneData.colors.map(color => (
                                        <div
                                            key={color.id}
                                            className={`${styles.colorOption} ${selectedColor === color.id ? styles.active : ''}`}
                                            onClick={() => setSelectedColor(color.id)}
                                        >
                                            <div className={styles.colorCard}>
                                                <div
                                                    className={styles.colorPreview}
                                                    style={{ backgroundColor: color.value }}
                                                ></div>
                                                <div className={styles.colorInfo}>
                                                    <div
                                                        className={styles.colorDot}
                                                        style={{ backgroundColor: color.value }}
                                                    ></div>
                                                    <span className={styles.colorName}>{color.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Storage Selection */}
                            <div className={styles.selectionGroup}>
                                <h3>Storage Capacity</h3>
                                <div className={styles.storageSelection}>
                                    {phoneData.storage.map(storage => (
                                        <button
                                            key={storage}
                                            className={`${styles.storageOption} ${selectedStorage === storage ? styles.active : ''}`}
                                            onClick={() => setSelectedStorage(storage)}
                                        >
                                            <span className={styles.storageSize}>{storage}</span>
                                            <span className={styles.storageRecommended}>
                                                {storage === '512GB' ? 'Most Popular' : ''}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className={styles.actionButtons}>
                                <button className={styles.btnPrimary} disabled>
                                    <span className={styles.btnIcon}>📦</span>
                                    Out of Stock
                                </button>
                                <button className={styles.btnSecondary}>
                                    <span className={styles.btnIcon}>❤️</span>
                                    Add to Wishlist
                                </button>
                            </div>

                            {/* Quick Features */}
                            <div className={styles.quickFeatures}>
                                <div className={styles.featureHighlight}>
                                    <span className={styles.featureIcon}>🚀</span>
                                    <span>A19 Chip Performance</span>
                                </div>
                                <div className={styles.featureHighlight}>
                                    <span className={styles.featureIcon}>📸</span>
                                    <span>48MP Pro Camera</span>
                                </div>
                                <div className={styles.featureHighlight}>
                                    <span className={styles.featureIcon}>🔋</span>
                                    <span>All-Day Battery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className={styles.featuresSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeaderCenter}>
                        <h2 className={styles.sectionTitle}>Key Features</h2>
                        <p className={styles.sectionSubtitle}>Discover what makes iPhone 17 Pro Max extraordinary</p>
                    </div>
                    <div className={styles.featuresGrid}>
                        {phoneData.features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureHeader}>
                                    <div className={styles.featureIconCircle}>
                                        <span className={styles.featureEmoji}>{feature.icon}</span>
                                    </div>
                                    <div className={styles.featureNumber}>0{index + 1}</div>
                                </div>
                                <div className={styles.featureContent}>
                                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                                    <p className={styles.featureDescription}>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className={styles.relatedProducts}>
                <div className={styles.container}>
                    <div className={styles.sectionHeaderCenter}>
                        <h2 className={styles.sectionTitle}>Related Products</h2>
                        <p className={styles.sectionSubtitle}>Explore other amazing devices</p>
                    </div>
                    <div className={styles.productsGrid}>
                        {relatedProducts.map(product => (
                            <div key={product.id} className={styles.productCard}>
                                <div className={styles.productStatus}>{product.status}</div>
                                <div className={styles.productImage}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.src = `https://via.placeholder.com/200x200/1e3a5f/ffffff?text=${product.name}`;
                                        }}
                                    />
                                </div>
                                <div className={styles.productInfo}>
                                    <h2 style={{ fontSize: 30, fontWeight: 'normal' }}>{product.name}</h2>
                                    <div className={styles.productPrice} style={{ textAlign: 'center' }}>{product.price}</div>
                                    <button className={styles.btnView}>
                                        <span className={styles.btnIcon}>👁️</span>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoPhone;