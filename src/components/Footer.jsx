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
                            <div className={styles.socialIcons}>
                                <a href="https://facebook.com/webpointLanka" target="_blank" rel="noopener noreferrer">
                                    <span className={styles.socialIcon}>📘</span>
                                </a>
                                <a href="https://www.instagram.com/webpoint_lanka_pvt_ltd" target="_blank" rel="noopener noreferrer">
                                    <span className={styles.socialIcon}>📸</span>
                                </a>
                                <a href="https://www.linkedin.com/company/webpoint-sl/" target="_blank" rel="noopener noreferrer">
                                    <span className={styles.socialIcon}>💼</span>
                                </a>
                                <a href="https://wa.me/+94706646255" target="_blank" rel="noopener noreferrer">
                                    <span className={styles.socialIcon}>💬</span>
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