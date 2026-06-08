import React, { useState } from 'react';
import './ServicePackages.css';

const packages = [
  {
    id: 1, title: 'POS System',           icon: '🛒',
    desc: 'Complete Point of Sale for retail & restaurants',
    features: ['Inventory Management','Sales Tracking','Customer Management','Reports & Analytics','Multi-branch Support'],
    price: 'LKR 25,000', duration: 'One-time setup', popular: false,
  },
  {
    id: 2, title: 'Financial Tracker',    icon: '💰',
    desc: 'Track your personal finances and expenses with ease',
    features: ['Expense Tracking','Budget Planning','Bill Reminders','Financial Reports','Investment Tracking'],
    price: 'LKR 5,000', duration: 'Annual', popular: false,
  },
  {
    id: 3, title: 'Post Design',          icon: '🎨',
    desc: 'Professional social media content design service',
    features: ['Custom Graphics','Brand Identity','Social Media Templates','20 Posts/Month','Quick Revisions'],
    price: 'LKR 15,000', duration: 'Monthly', popular: true,
  },
  {
    id: 4, title: 'Website Development',  icon: '🌐',
    desc: 'Modern, fully responsive website built for you',
    features: ['Custom Design','Mobile Responsive','SEO Optimized','CMS Integration','1 Year Support'],
    price: 'LKR 50,000', duration: 'One-time', popular: false,
  },
  {
    id: 5, title: 'Software Development', icon: '💻',
    desc: 'Custom software solutions tailored to your business',
    features: ['Requirement Analysis','Custom Development','Testing & QA','Deployment','6 Months Support'],
    price: 'Custom Quote', duration: 'Project based', popular: false,
  },
];

const ServicePackages = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="sp-root">
      <div className="sp-header">
        <h1 className="sp-title">Service Packages</h1>
        <p className="sp-sub">Choose the plan that fits your needs. Upgrade anytime.</p>
      </div>

      <div className="sp-grid">
        {packages.map((pkg, i) => (
          <div
            key={pkg.id}
            className={`sp-card ${pkg.popular ? 'popular' : ''} ${hovered === pkg.id ? 'hov' : ''}`}
            style={{ animationDelay: `${i * 0.07}s` }}
            onMouseEnter={() => setHovered(pkg.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {pkg.popular && <div className="sp-popular-tag">Most Popular</div>}

            <div className="sp-card-top">
              <div className="sp-icon">{pkg.icon}</div>
              <div>
                <h3 className="sp-card-title">{pkg.title}</h3>
                <p className="sp-card-desc">{pkg.desc}</p>
              </div>
            </div>

            <ul className="sp-features">
              {pkg.features.map((f, j) => (
                <li key={j}><span className="sp-check">✓</span>{f}</li>
              ))}
            </ul>

            <div className="sp-price-row">
              <div>
                <span className="sp-price">{pkg.price}</span>
                <span className="sp-duration">{pkg.duration}</span>
              </div>
            </div>

            <button className={`sp-cta ${pkg.popular ? 'sp-cta--primary' : 'sp-cta--outline'}`}
              onClick={() => alert(`Subscribing to ${pkg.title}. Payment integration coming soon!`)}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePackages;