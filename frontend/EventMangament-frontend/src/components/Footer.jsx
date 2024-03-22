import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerColumn}>
                    <h4 className={styles.aboutus}>About Us</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra massa sed aliquam sodales.</p>
                </div>
                <div className={styles.footerColumn}>
                    <h4>Quick Links</h4>
                    <ul className={styles.links}>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Destinations</a></li>
                        <li><a href="#">Packages</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h4>Contact Us</h4>
                    <p>123 Travel Street, City, Country</p>
                    <p>Email: info@example.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;