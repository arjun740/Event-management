import {Link} from 'react-router-dom'
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
                        <li><Link to="/">Home</Link></li>
                        <li><Link to={"/events"}>Events</Link></li>
                        <li><Link to={"/events"}>Contact</Link></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h4>Contact Us</h4>
                    <p>123 Event Street, City, Country</p>
                    <p>Email: info@example.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;