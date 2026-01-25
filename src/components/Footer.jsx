import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <footer className="main-footer" id="contact">
            <div className="section-container">
                <div className="footer-content">
                    <div className="footer-main">
                        <div className="footer-brand">
                            <div className="logo">
                                <h1>WebPoint<span>.lk</span></h1>
                            </div>
                            <p>Professional web design and development services for Sri Lankan businesses.</p>
                            <div className="social-icons">
                                <a href="#"><span>📱</span></a>
                                <a href="#"><span>💻</span></a>
                                <a href="#"><span>📸</span></a>
                            </div>
                        </div>

                        <div className="footer-links">
                            <div className="footer-column">
                                <h4>Services</h4>
                                <ul>
                                    <li><a href="/webservice">Website Development</a></li>
                                    <li><a href="/service">Mobile Applications</a></li>
                                    <li><a href="/systems">Software Solutions</a></li>
                                    <li><a href="/service">Digital Marketing</a></li>
                                </ul>
                            </div>

                            <div className="footer-column">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a href="/home">Home</a></li>
                                    <li><a href="/service">Services</a></li>
                                    <li><a href="/about">About</a></li>
                                    <li><a href="/contact">Contact</a></li>
                                </ul>
                            </div>

                            <div className="footer-column">
                                <h4>Contact Info</h4>
                                <ul className="contact-info">
                                    <li>📍 Colombo, Sri Lanka</li>
                                    <li>📞 +94 70 731 2180</li>
                                    <li>✉️ info@webpoint.lk</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2026 WebPoint.lk. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;