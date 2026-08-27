import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
    const navigate = useNavigate();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <footer className={styles.mainFooter} id="contact">
            {/* 3D Background Effect */}
            <div className={styles.footerBgEffect} style={{
                transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`
            }}></div>

            {/* Floating Particles */}
            <div className={styles.footerParticles}>
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={styles.particle} style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 5}s`
                    }}></div>
                ))}
            </div>

            <div className={styles.sectionContainer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerMain}>
                        <div className={styles.footerBrand}>
                            <div className={styles.logo}>
                                <h1>WebPoint<span>.lk</span></h1>
                            </div>
                            <p>Professional web design and development services for Sri Lankan businesses.</p>
                            
                            {/* Original Social Media Icons with Brand Colors */}
                            <div className={styles.socialIcons}>
                                <a 
                                    href="https://facebook.com/webpointLanka" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`${styles.socialIcon} ${styles.fb}`}
                                    title="Facebook"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                
                                <a 
                                    href="https://www.instagram.com/webpoint_lanka_pvt_ltd" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`${styles.socialIcon} ${styles.ig}`}
                                    title="Instagram"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                    </svg>
                                </a>
                                
                                <a 
                                    href="https://www.linkedin.com/company/webpoint-sl/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`${styles.socialIcon} ${styles.li}`}
                                    title="LinkedIn"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                                
                                <a 
                                    href="https://www.tiktok.com/@webpoint_lanka" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`${styles.socialIcon} ${styles.tt}`}
                                    title="TikTok"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.57-1.68 5.16-4.47 5.61-2.93.48-5.84-1.44-6.45-4.26-.74-3.45 1.84-6.78 5.25-7.09.72-.06 1.44-.06 2.16-.06v3.99c-.43-.03-.86-.05-1.29-.02-1.44.09-2.73 1.24-2.79 2.69-.07 1.57 1.19 2.95 2.75 3.07 1.58.12 3.02-1.07 3.26-2.65.04-.23.04-.47.04-.71v-12.5h4.01c-.01-.94-.02-1.88-.01-2.82z"/>
                                    </svg>
                                </a>
                                
                                <a 
                                    href="https://wa.me/+94706646255" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`${styles.socialIcon} ${styles.wa}`}
                                    title="WhatsApp"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className={styles.footerLinks}>
                            <div className={styles.footerColumn}>
                                <h4>Services</h4>
                                <ul>
                                    <li><a onClick={() => handleNavigation('/webservice')}>Website Development</a></li>
                                    <li><a onClick={() => handleNavigation('/pos-system')}>POS System</a></li>
                                    <li><a onClick={() => handleNavigation('/systems')}>Software Solutions</a></li>
                                    <li><a onClick={() => handleNavigation('/digital-solution')}>Digital Marketing</a></li>
                                </ul>
                            </div>

                            <div className={styles.footerColumn}>
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a onClick={() => handleNavigation('/home')}>Home</a></li>
                                    <li><a onClick={() => handleNavigation('/service')}>Services</a></li>
                                    <li><a onClick={() => handleNavigation('/about')}>About</a></li>
                                    <li><a onClick={() => handleNavigation('/contact')}>Contact</a></li>
                                </ul>
                            </div>

                            <div className={styles.footerColumn}>
                                <h4>Contact Info</h4>
                                <ul className={styles.contactInfo}>
                                    <li><span className={styles.contactIcon}>📍</span> Suncity Tower, Malabe, Colombo.</li>
                                    <li><span className={styles.contactIcon}>📞</span> +94 70 731 2180</li>
                                    <li><span className={styles.contactIcon}>✉️</span> info@webpoint.lk</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <p>&copy; 2026 WebPoint.lk. All rights reserved.</p>
                        <div className={styles.footerBottomLinks}>
                            <a onClick={() => handleNavigation('/privacy')}>Privacy Policy</a>
                            <span className={styles.separator}>•</span>
                            <a onClick={() => handleNavigation('/terms')}>Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;