import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Systems.module.css';

// Import local images
import posSystemImg from '../../assets/pos.jpeg';
import dashboardImg from '../../assets/dashboad.jpeg';
import analyticsImg from '../../assets/reportview.jpeg';
import lmsSystemImg from '../../assets/lms.jpeg';
import financeSystemImg from '../../assets/financial.jpeg';
import mobileAppImg from '../../assets/mobile.jpeg';

const Systems = () => {
  const [activeSystem, setActiveSystem] = useState('business');
  const [activeCategory, setActiveCategory] = useState('crm');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // System Categories
  const systemCategories = [
    {
      id: 'business',
      title: 'Business Management Systems',
      icon: '🏢',
      color: '#3b82f6',
      systems: [
        {
          id: 'crm',
          title: 'CRM (Customer Relationship Management)',
          icon: '🤝',
          features: ['Customer Management', 'Sales Tracking', 'Lead Management', 'Call Management']
        },
        {
          id: 'erp',
          title: 'ERP (Enterprise Resource Planning)',
          icon: '🏭',
          features: ['HR', 'Finance', 'Inventory', 'Procurement', 'Payroll', 'Manufacturing', 'Sales']
        },
        {
          id: 'pos',
          title: 'POS (Point of Sale)',
          icon: '🛒',
          features: ['Billing', 'Inventory', 'Barcode', 'Customer Management', 'Reports']
        },
        {
          id: 'inventory',
          title: 'Inventory Management System',
          icon: '📦',
          features: ['Stock Management', 'Warehouse', 'Suppliers', 'Purchase Orders']
        },
        {
          id: 'accounting',
          title: 'Accounting Software',
          icon: '💰',
          features: ['Income', 'Expenses', 'Tax', 'Ledger', 'Reports']
        }
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare Systems',
      icon: '🏥',
      color: '#10b981',
      systems: [
        {
          id: 'hospital',
          title: 'Hospital Management System',
          icon: '🏨',
          features: ['Patients', 'Doctors', 'Pharmacy', 'Lab', 'Billing', 'Appointments']
        },
        {
          id: 'clinic',
          title: 'Clinic Management',
          icon: '🩺',
          features: ['Patient Records', 'Appointments', 'Billing', 'Prescriptions']
        },
        {
          id: 'pharmacy',
          title: 'Pharmacy Management',
          icon: '💊',
          features: ['Medicine Inventory', 'Sales', 'Expiry Tracking', 'Supplier Management']
        },
        {
          id: 'laboratory',
          title: 'Laboratory Management',
          icon: '🔬',
          features: ['Test Management', 'Patient Records', 'Results', 'Billing']
        }
      ]
    },
    {
      id: 'education',
      title: 'Education Systems',
      icon: '📚',
      color: '#8b5cf6',
      systems: [
        {
          id: 'school',
          title: 'School Management System',
          icon: '🏫',
          features: ['Students', 'Teachers', 'Exams', 'Timetable', 'Attendance']
        },
        {
          id: 'university',
          title: 'University Management',
          icon: '🎓',
          features: ['Courses', 'Registration', 'Results', 'Faculty']
        },
        {
          id: 'lms',
          title: 'Learning Management System (LMS)',
          icon: '📖',
          features: ['Online Classes', 'Assignments', 'Quizzes', 'Videos']
        },
        {
          id: 'exam',
          title: 'Online Exam System',
          icon: '📝',
          features: ['Question Bank', 'Online Tests', 'Auto Grading', 'Results']
        }
      ]
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Systems',
      icon: '🛍️',
      color: '#f59e0b',
      systems: [
        {
          id: 'onlineshop',
          title: 'Online Shopping Website',
          icon: '🏪',
          features: ['Product Catalog', 'Cart', 'Payment Gateway', 'Order Management']
        },
        {
          id: 'foodordering',
          title: 'Food Ordering System',
          icon: '🍔',
          features: ['Restaurant List', 'Order Placement', 'Delivery Tracking', 'Payment']
        },
        {
          id: 'restaurant',
          title: 'Restaurant Management',
          icon: '🍽️',
          features: ['Orders', 'Kitchen', 'POS', 'Inventory']
        },
        {
          id: 'grocery',
          title: 'Grocery Delivery',
          icon: '🛒',
          features: ['Product Catalog', 'Delivery Scheduling', 'Payment', 'Order Tracking']
        }
      ]
    },
    {
      id: 'financial',
      title: 'Financial Systems',
      icon: '💳',
      color: '#ec4899',
      systems: [
        {
          id: 'banking',
          title: 'Banking System',
          icon: '🏦',
          features: ['Accounts', 'Transfers', 'Loans', 'Statements']
        },
        {
          id: 'loan',
          title: 'Loan Management',
          icon: '📊',
          features: ['Loan Applications', 'Approval', 'Repayment', 'Interest Calculation']
        },
        {
          id: 'wallet',
          title: 'Wallet System',
          icon: '👛',
          features: ['eWallet', 'Digital Payments', 'Transactions', 'Balance Management']
        }
      ]
    },
    {
      id: 'government',
      title: 'Government Systems',
      icon: '🏛️',
      color: '#6366f1',
      systems: [
        {
          id: 'citizen',
          title: 'Citizen Registration',
          icon: '📋',
          features: ['Registration', 'ID Management', 'Records', 'Verification']
        },
        {
          id: 'passport',
          title: 'Passport & License',
          icon: '🪪',
          features: ['Applications', 'Document Verification', 'Status Tracking', 'Renewal']
        },
        {
          id: 'tax',
          title: 'Tax Management',
          icon: '📄',
          features: ['Tax Filing', 'Payments', 'Returns', 'Records']
        },
        {
          id: 'election',
          title: 'Election Management',
          icon: '🗳️',
          features: ['Voter Registration', 'Voting', 'Results', 'Reporting']
        }
      ]
    },
    {
      id: 'hotel',
      title: 'Hotel & Tourism',
      icon: '🏨',
      color: '#06b6d4',
      systems: [
        {
          id: 'hotelmgmt',
          title: 'Hotel Management',
          icon: '🏩',
          features: ['Rooms', 'Bookings', 'Payments', 'Guest Management']
        },
        {
          id: 'travel',
          title: 'Travel Booking',
          icon: '✈️',
          features: ['Flight/Hotel Search', 'Booking', 'Payment', 'Itinerary']
        }
      ]
    },
    {
      id: 'hr',
      title: 'Human Resources',
      icon: '👥',
      color: '#f97316',
      systems: [
        {
          id: 'hrms',
          title: 'HR Management',
          icon: '📋',
          features: ['Employees', 'Payroll', 'Attendance', 'Leave Management']
        },
        {
          id: 'recruitment',
          title: 'Recruitment Portal',
          icon: '🎯',
          features: ['Job Postings', 'Applications', 'Candidate Tracking', 'Hiring']
        }
      ]
    },
    {
      id: 'logistics',
      title: 'Logistics',
      icon: '🚚',
      color: '#10b981',
      systems: [
        {
          id: 'courier',
          title: 'Courier System',
          icon: '📦',
          features: ['Tracking', 'Delivery', 'Drivers', 'Route Optimization']
        },
        {
          id: 'fleet',
          title: 'Fleet Management',
          icon: '🚛',
          features: ['Vehicle Tracking', 'Driver Management', 'Maintenance', 'Fuel Management']
        }
      ]
    },
    {
      id: 'social',
      title: 'Social Media',
      icon: '📱',
      color: '#8b5cf6',
      systems: [
        {
          id: 'socialmedia',
          title: 'Social Media Platform',
          icon: '🌐',
          features: ['User Profiles', 'Posts', 'Messaging', 'Feed']
        },
        {
          id: 'chat',
          title: 'Chat Application',
          icon: '💬',
          features: ['Real-time Messaging', 'Groups', 'File Sharing', 'Notifications']
        },
        {
          id: 'videocall',
          title: 'Video Calling App',
          icon: '🎥',
          features: ['Video Calls', 'Audio Calls', 'Screen Sharing', 'Recording']
        }
      ]
    },
    {
      id: 'realestate',
      title: 'Real Estate',
      icon: '🏠',
      color: '#f59e0b',
      systems: [
        {
          id: 'property',
          title: 'Property Management',
          icon: '🏘️',
          features: ['Property Listings', 'Tenants', 'Rent', 'Maintenance']
        },
        {
          id: 'propertsell',
          title: 'Property Selling Platform',
          icon: '🏡',
          features: ['Listings', 'Inquiries', 'Appointments', 'Sales']
        }
      ]
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      icon: '🏭',
      color: '#3b82f6',
      systems: [
        {
          id: 'factory',
          title: 'Factory Management',
          icon: '⚙️',
          features: ['Production', 'Machines', 'Inventory', 'Quality Control']
        },
        {
          id: 'supplychain',
          title: 'Supply Chain Management',
          icon: '📦',
          features: ['Supplier Management', 'Order Processing', 'Logistics', 'Inventory']
        }
      ]
    },
    {
      id: 'booking',
      title: 'Booking Systems',
      icon: '📅',
      color: '#ec4899',
      systems: [
        {
          id: 'cinema',
          title: 'Cinema Booking',
          icon: '🎬',
          features: ['Movie Listings', 'Seat Selection', 'Payment', 'Ticket Generation']
        },
        {
          id: 'salon',
          title: 'Salon Booking',
          icon: '💇',
          features: ['Services', 'Appointments', 'Staff', 'Customer Management']
        }
      ]
    },
    {
      id: 'ai',
      title: 'AI-Integrated Systems',
      icon: '🧠',
      color: '#6366f1',
      systems: [
        {
          id: 'chatbot',
          title: 'AI Chatbots',
          icon: '🤖',
          features: ['Customer Support', 'Conversational AI', '24/7 Availability', 'Integration']
        },
        {
          id: 'ocr',
          title: 'OCR & Document Analysis',
          icon: '📄',
          features: ['Image Recognition', 'Document Scanning', 'Text Extraction', 'Data Processing']
        },
        {
          id: 'recommendation',
          title: 'Recommendation Systems',
          icon: '🎯',
          features: ['Personalized Suggestions', 'Machine Learning', 'User Behavior Analysis']
        }
      ]
    },
    {
      id: 'cms',
      title: 'Content Management Systems (CMS)',
      icon: '📝',
      color: '#10b981',
      systems: [
        {
          id: 'news',
          title: 'News Website',
          icon: '📰',
          features: ['Articles', 'Categories', 'Authors', 'Comments']
        },
        {
          id: 'blog',
          title: 'Blog Platform',
          icon: '✍️',
          features: ['Posts', 'Tags', 'Comments', 'SEO']
        },
        {
          id: 'portfolio',
          title: 'Portfolio Website',
          icon: '🎨',
          features: ['Projects', 'Gallery', 'About', 'Contact']
        }
      ]
    },
    {
      id: 'dashboard',
      title: 'Dashboards & Analytics',
      icon: '📊',
      color: '#f59e0b',
      systems: [
        {
          id: 'bi',
          title: 'Business Intelligence Dashboard',
          icon: '📈',
          features: ['KPI Tracking', 'Data Visualization', 'Reports', 'Analytics']
        },
        {
          id: 'salesdash',
          title: 'Sales Dashboard',
          icon: '💰',
          features: ['Revenue Tracking', 'Sales Funnel', 'Performance Metrics']
        },
        {
          id: 'hrdash',
          title: 'HR Dashboard',
          icon: '👥',
          features: ['Employee Metrics', 'Attendance', 'Payroll', 'Performance']
        }
      ]
    },
    {
      id: 'iot',
      title: 'IoT Dashboards',
      icon: '📶',
      color: '#06b6d4',
      systems: [
        {
          id: 'smarthome',
          title: 'Smart Home Dashboard',
          icon: '🏠',
          features: ['Device Control', 'Automation', 'Monitoring', 'Alerts']
        },
        {
          id: 'factoryiot',
          title: 'Factory Monitoring',
          icon: '🏭',
          features: ['Machine Monitoring', 'Production Tracking', 'Maintenance Alerts']
        },
        {
          id: 'agriiot',
          title: 'Agriculture Monitoring',
          icon: '🌾',
          features: ['Weather Data', 'Crop Monitoring', 'Irrigation Control', 'Yield Tracking']
        }
      ]
    }
  ];

  // Get current category systems
  const currentCategory = systemCategories.find(cat => cat.id === activeSystem);
  const currentSystem = currentCategory?.systems.find(sys => sys.id === activeCategory);

  const handleCategoryClick = (categoryId) => {
    setActiveSystem(categoryId);
    const category = systemCategories.find(cat => cat.id === categoryId);
    if (category && category.systems.length > 0) {
      setActiveCategory(category.systems[0].id);
    }
  };

  const handleSystemClick = (systemId) => {
    setActiveCategory(systemId);
  };

  return (
    <div className={styles.systemsContainer}>
      

      {/* Hero Section - Matching Home Page */}
      <div className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>✦ Enterprise Systems</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              <span>Comprehensive</span>
              <span className={styles.highlightText}>Business Systems</span>
              <span>for Every Industry</span>
            </h1>
            
            <p className={styles.heroDescription}>
              We develop custom business management systems tailored to your specific industry needs. 
              From CRM and ERP to healthcare and education systems, we deliver enterprise-grade solutions.
            </p>
            
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>18+</span>
                <span className={styles.statLabel}>Industry Categories</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>System Solutions</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Support Available</span>
              </div>
            </div>
            
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton} onClick={() => navigate('/contact')}>
                Discuss Your Project
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button className={styles.secondaryButton} onClick={() => document.querySelector(`.${styles.categoriesSection}`)?.scrollIntoView({ behavior: 'smooth' })}>
                <span className={styles.playIcon}>▶</span>
                Explore Systems
              </button>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardHeader}>
                <div className={styles.cardDots}>
                  <span></span><span></span><span></span>
                </div>
                <span className={styles.cardTitle}>Our Systems</span>
              </div>
              <div className={styles.heroCardContent}>
                <div className={styles.cardMetrics}>
                  {systemCategories.slice(0, 4).map((cat) => (
                    <div key={cat.id} className={styles.cardMetric}>
                      <span className={styles.metricIcon}>{cat.icon}</span>
                      <div>
                        <div className={styles.metricValue}>{cat.title}</div>
                        <div className={styles.metricLabel}>{cat.systems.length} Solutions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className={styles.categoriesSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <span>✦ System Categories</span>
            </div>
            <h2 className={styles.sectionTitle}>Explore Our <span className={styles.textGradient}>System Solutions</span></h2>
            <p className={styles.sectionSubtitle}>
              Choose from 18+ industry categories with 50+ specialized system solutions
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {systemCategories.map((category) => (
              <div
                key={category.id}
                className={`${styles.categoryCard} ${activeSystem === category.id ? styles.active : ''}`}
                onClick={() => handleCategoryClick(category.id)}
                style={{ '--category-color': category.color }}
              >
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3>{category.title}</h3>
                <span className={styles.categoryCount}>{category.systems.length} Systems</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Systems Detail Section */}
      {currentCategory && currentSystem && (
        <div className={styles.systemsDetailSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.detailHeader}>
              <div className={styles.detailBreadcrumb}>
                <span className={styles.breadcrumbItem}>{currentCategory.title}</span>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbItem} style={{ color: currentCategory.color }}>{currentSystem.title}</span>
              </div>
            </div>

            <div className={styles.detailContent}>
              <div className={styles.systemList}>
                {currentCategory.systems.map((sys) => (
                  <div
                    key={sys.id}
                    className={`${styles.systemListItem} ${activeCategory === sys.id ? styles.active : ''}`}
                    onClick={() => handleSystemClick(sys.id)}
                    style={{ '--system-color': currentCategory.color }}
                  >
                    <span className={styles.systemListIcon}>{sys.icon}</span>
                    <span className={styles.systemListName}>{sys.title}</span>
                  </div>
                ))}
              </div>

              <div className={styles.systemDetailPanel}>
                <div className={styles.systemDetailHeader}>
                  <div className={styles.systemDetailIcon} style={{ background: `${currentCategory.color}20`, color: currentCategory.color }}>
                    {currentSystem.icon}
                  </div>
                  <div>
                    <h3>{currentSystem.title}</h3>
                    <p style={{ color: currentCategory.color }}>Key Features</p>
                  </div>
                </div>

                <div className={styles.systemDetailFeatures}>
                  {currentSystem.features.map((feature, index) => (
                    <div key={index} className={styles.systemDetailFeature}>
                      <span className={styles.featureCheck}>✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.systemDetailActions}>
                  <button className={styles.systemDetailBtn} onClick={() => navigate('/contact')}>
                    Request a Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section - Matching Home Page */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaBackground}></div>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBadge}>
              <span>✦ Let's Build Something Together</span>
            </div>
            <h2 className={styles.ctaTitle}>
              Ready to Build Your <span>Custom System</span>?
            </h2>
            <p className={styles.ctaDescription}>
              Let's discuss your requirements and create a custom system solution tailored to your business needs.
              Get a free consultation and project estimate.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary} onClick={() => navigate('/contact')}>
                Get Free Consultation
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button className={styles.ctaSecondary} onClick={() => navigate('/service')}>
                View All Services
              </button>
            </div>
            <div className={styles.ctaGuarantee}>
              <span>⚡ 48-Hour Delivery</span>
              <span>🕐 24/7 Support</span>
              <span>⭐ 99.9% Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Systems;