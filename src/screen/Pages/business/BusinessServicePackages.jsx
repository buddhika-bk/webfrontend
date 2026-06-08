import React, { useState } from 'react';
import './BusinessServicePackages.css';

const BusinessServicePackages = () => {
  const [packages] = useState([
    {
      id: 1,
      title: 'Enterprise POS System',
      icon: '🛒',
      category: 'POS Systems',
      description: 'Complete Point of Sale system for multi-branch businesses',
      features: [
        'Multi-branch Management',
        'Advanced Inventory Tracking',
        'Real-time Analytics Dashboard',
        'Employee Performance Tracking',
        'Customer Loyalty Program',
        '24/7 Priority Support',
        'Automatic Backups',
        'Mobile App Access'
      ],
      price: 'LKR 75,000',
      duration: 'Annual',
      popular: true,
      target: 'Medium to Large Businesses'
    },
    {
      id: 2,
      title: 'Custom Software Development',
      icon: '💻',
      category: 'Development',
      description: 'Tailored software solutions for your specific business needs',
      features: [
        'Requirement Analysis',
        'Custom Development',
        'Quality Assurance Testing',
        'Deployment & Integration',
        '6 Months Free Support',
        'Staff Training',
        'Documentation',
        'Source Code Ownership'
      ],
      price: 'Custom Quote',
      duration: 'Project Based',
      popular: false,
      target: 'All Business Sizes'
    },
    {
      id: 3,
      title: 'Business Website Package',
      icon: '🌐',
      category: 'Web Development',
      description: 'Professional business website with CMS and SEO optimization',
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Content Management System',
        'Contact Forms',
        'Google Maps Integration',
        'Social Media Integration',
        'Analytics Integration',
        '1 Year Hosting'
      ],
      price: 'LKR 50,000',
      duration: 'Annual',
      popular: true,
      target: 'Small to Medium Businesses'
    },
    {
      id: 4,
      title: 'Digital Marketing Package',
      icon: '📱',
      category: 'Marketing',
      description: 'Complete digital marketing solution for brand growth',
      features: [
        'Social Media Management',
        'Email Marketing Campaigns',
        'SEO Services',
        'Content Creation',
        'Analytics & Reporting',
        'Ad Campaign Management',
        'Brand Strategy',
        'Monthly Performance Review'
      ],
      price: 'LKR 35,000',
      duration: 'Monthly',
      popular: false,
      target: 'Growing Businesses'
    },
    {
      id: 5,
      title: 'Cloud Solutions',
      icon: '☁️',
      category: 'Infrastructure',
      description: 'Scalable cloud infrastructure for your business',
      features: [
        'Cloud Hosting',
        'Data Backup',
        'Disaster Recovery',
        '24/7 Monitoring',
        'Auto-scaling',
        'Security Compliance',
        'CDN Integration',
        'Technical Support'
      ],
      price: 'LKR 25,000',
      duration: 'Monthly',
      popular: false,
      target: 'Tech-focused Businesses'
    },
    {
      id: 6,
      title: 'IT Consulting',
      icon: '🎯',
      category: 'Consulting',
      description: 'Expert IT consulting to optimize your business processes',
      features: [
        'Process Analysis',
        'Technology Assessment',
        'Digital Transformation Strategy',
        'Implementation Roadmap',
        'Team Training',
        'Ongoing Advisory',
        'Security Audit',
        'Cost Optimization'
      ],
      price: 'LKR 15,000',
      duration: 'Hourly',
      popular: false,
      target: 'All Business Sizes'
    }
  ]);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(packages.map(p => p.category))];

  const filteredPackages = selectedCategory === 'all' 
    ? packages 
    : packages.filter(p => p.category === selectedCategory);

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleSubscribe = (pkg) => {
    alert(`Thank you for your interest in ${pkg.title}! Our sales team will contact you within 24 hours.`);
  };

  const handleGetQuote = (pkg) => {
    alert(`Quote request for ${pkg.title} has been sent. We'll get back to you shortly!`);
  };

  return (
    <div className="business-service-packages">
      <div className="packages-header">
        <h1>Business Service Packages</h1>
        <p>Choose the perfect solution for your business needs</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'All Packages' : category}
          </button>
        ))}
      </div>

      <div className="packages-grid">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
            {pkg.popular && (
              <div className="popular-badge">
                <span>⭐ Most Popular</span>
              </div>
            )}
            <div className="package-icon">{pkg.icon}</div>
            <h3>{pkg.title}</h3>
            <p className="package-category">{pkg.category}</p>
            <p className="package-description">{pkg.description}</p>
            
            <div className="package-features">
              <h4>Key Features:</h4>
              <ul>
                {pkg.features.slice(0, 4).map((feature, index) => (
                  <li key={index}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
                {pkg.features.length > 4 && (
                  <li className="more-features">
                    +{pkg.features.length - 4} more features
                  </li>
                )}
              </ul>
            </div>

            <div className="package-price">
              <span className="price">{pkg.price}</span>
              <span className="duration">/{pkg.duration}</span>
            </div>

            <div className="package-target">
              <span className="target-icon">🎯</span>
              <span>{pkg.target}</span>
            </div>

            <div className="package-actions">
              <button onClick={() => handleViewDetails(pkg)} className="btn-details">
                View Details
              </button>
              {pkg.price !== 'Custom Quote' ? (
                <button onClick={() => handleSubscribe(pkg)} className="btn-subscribe">
                  Subscribe Now
                </button>
              ) : (
                <button onClick={() => handleGetQuote(pkg)} className="btn-quote">
                  Get Quote
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for detailed view */}
      {showModal && selectedPackage && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-icon">{selectedPackage.icon}</span>
                <div>
                  <h2>{selectedPackage.title}</h2>
                  <p className="modal-category">{selectedPackage.category}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>Package Overview</h3>
                <p className="overview-text">{selectedPackage.description}</p>
                <div className="info-row">
                  <span className="info-label">Target Audience:</span>
                  <span>{selectedPackage.target}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Pricing:</span>
                  <span className="pricing">{selectedPackage.price} / {selectedPackage.duration}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Complete Features List</h3>
                <ul className="features-list full">
                  {selectedPackage.features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h3>Why Choose This Package?</h3>
                <div className="benefits">
                  <div className="benefit-item">
                    <span className="benefit-icon">🚀</span>
                    <div>
                      <h4>Fast Implementation</h4>
                      <p>Quick setup and deployment for minimal business disruption</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">💪</span>
                    <div>
                      <h4>Dedicated Support</h4>
                      <p>24/7 customer support with dedicated account manager</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🔒</span>
                    <div>
                      <h4>Secure & Reliable</h4>
                      <p>Enterprise-grade security with 99.9% uptime guarantee</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>What's Included?</h3>
                <div className="included-items">
                  <div className="included-item">✓ Free consultation call</div>
                  <div className="included-item">✓ Onboarding session</div>
                  <div className="included-item">✓ Training materials</div>
                  <div className="included-item">✓ Regular updates</div>
                  <div className="included-item">✓ Performance reports</div>
                  <div className="included-item">✓ Priority support</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="close-btn">
                Close
              </button>
              {selectedPackage.price !== 'Custom Quote' ? (
                <button onClick={() => handleSubscribe(selectedPackage)} className="subscribe-btn">
                  Subscribe Now
                </button>
              ) : (
                <button onClick={() => handleGetQuote(selectedPackage)} className="quote-btn">
                  Request Quote
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessServicePackages;