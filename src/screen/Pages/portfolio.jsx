import React from 'react';
import styles from './portfolio.module.css';

const About = () => {
    // Contact information
    const contactInfo = {
        phone: '+94716646377',
        whatsapp: '+94706646255',
        email: 'info@webpoint.lk',
        website: 'webpoint.lk',
        location: 'Malabe, Sri Lanka'
    };

    // Handle WhatsApp click with auto-generated message
    const handleWhatsApp = () => {
        const message = encodeURIComponent("Hi WebPoint! I found you online and would love to discuss a new software project.");
        window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, '_blank');
    };

    // Handle Phone click (opens native dialer on mobile)
    const handleCall = () => {
        window.location.href = `tel:${contactInfo.phone}`;
    };

    // Handle Email click
    const handleEmail = () => {
        window.location.href = `mailto:${contactInfo.email}`;
    };

    // Service Tags
    const services = [
        'Software Dev', 'Websites', 'Mobile Apps', 
        'Poster Designs', '3D Modeling'
    ];

    return (
        <div className={styles.container}>
            
            {/* --- Top Logo Branding --- */}
            <div className={styles.headerLogo}>
                <span className={styles.logoBluePart}>Web</span><span className={styles.logoBluePart}>P</span><span className={styles.logoBluePart}>oint</span>
                <span className={styles.logoOrangePart}>.lk</span>
            </div>

            {/* --- Main Content Card --- */}
            <div className={styles.mainCard}>
                
                <div className={styles.profileSection}>
                    <h2 className={styles.companyName}>WebPoint Lanka</h2>
                    <p className={styles.companySub}>(PVT) Ltd.</p>
                    <div className={styles.badge}>Software Company</div>
                </div>

                {/* Service Tags */}
                <div className={styles.tagsContainer}>
                    {services.map((service, index) => (
                        <span key={index} className={styles.tag}>{service}</span>
                    ))}
                </div>

                {/* Stats Row */}
                <div className={styles.statsRow}>
                    <div className={styles.stat}>
                        <span className={styles.statNum}>5+</span>
                        <span className={styles.statLabel}>Years</span>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.stat}>
                        <span className={styles.statNum}>100+</span>
                        <span className={styles.statLabel}>Projects</span>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.stat}>
                        <span className={styles.statNum}>2020</span>
                        <span className={styles.statLabel}>Founded</span>
                    </div>
                </div>

                {/* Location */}
                <div className={styles.location}>
                    <span className={styles.pinIcon}>📍</span> {contactInfo.location}
                </div>

                {/* Main CTA Button */}
                <button className={styles.primaryButton}>
                    Get a Free Quote
                </button>
            </div>

            {/* --- Action Row (WhatsApp, Email, Call) --- */}
            <div className={styles.actionRow}>
                <div className={styles.actionItem} onClick={handleWhatsApp}>
                    <div className={`${styles.iconCircle} ${styles.whatsappIcon}`}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <span className={styles.actionLabel}>WhatsApp</span>
                </div>

                <div className={styles.actionItem} onClick={handleEmail}>
                    <div className={`${styles.iconCircle} ${styles.emailIcon}`}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg>
                    </div>
                    <span className={styles.actionLabel}>Email</span>
                </div>

                <div className={styles.actionItem} onClick={handleCall}>
                    <div className={`${styles.iconCircle} ${styles.callIcon}`}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"/></svg>
                    </div>
                    <span className={styles.actionLabel}>Call</span>
                </div>
            </div>

            {/* --- Bottom Social Links --- */}
            <div className={styles.bottomLinks}>
                <a href="#" className={styles.socialLink}>Facebook</a>
                <span className={styles.divider}>•</span>
                <a href="#" className={styles.socialLink}>Instagram</a>
                <span className={styles.divider}>•</span>
                <a href="#" className={styles.socialLink}>LinkedIn</a>
                <span className={styles.divider}>•</span>
                <a href="#" className={styles.socialLink}>TikTok</a>
            </div>

            <a href={`https://${contactInfo.website}`} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>
                🌐 webpoint.lk
            </a>
            
        </div>
    );
};

export default About;