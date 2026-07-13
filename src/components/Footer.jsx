import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <footer className={styles.mainFooter} id="contact">
            <div className={styles.sectionContainer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerMain}>
                        <div className={styles.footerBrand}>
                            <div className={styles.logo}>
                                <h1>WebPoint<span>.lk</span></h1>
                            </div>
                            <p>Professional web design and development services for Sri Lankan businesses.</p>
                            <div className={styles.socialIcons}>
                                <a href="#"><span>📱</span></a>
                                <a href="#"><span>💻</span></a>
                                <a href="#"><span>📸</span></a>
                            </div>
                        </div>

                        <div className={styles.footerLinks}>
                            <div className={styles.footerColumn}>
                                <h4>Services</h4>
                                <ul>
                                    <li><a onClick={() => handleNavigation('/webservice')}>Website Development</a></li>
                                    <li><a onClick={() => handleNavigation('/service')}>Mobile Applications</a></li>
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
                                    <li>📍 Suncity Tower, Malabe, Colombo.</li>
                                    <li>📞 +94 70 731 2180</li>
                                    <li>✉️ info@webpoint.lk</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <p>&copy; 2026 WebPoint.lk. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;