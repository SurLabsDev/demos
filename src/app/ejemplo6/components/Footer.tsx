import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram } from 'lucide-react';
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_HREF, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../constants';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <motion.div
                    className="footer-card"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="footer-info">
                        <h2>La experiencia se vive mejor en persona</h2>
                        <p>{ADDRESS}</p>

                        <div className="footer-links">
                            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="footer-btn">
                                <MapPin size={20} /> Mirá cómo llegar
                            </a>
                            <a href={PHONE_HREF} className="footer-btn">
                                <Phone size={20} /> {PHONE_DISPLAY}
                            </a>
                            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="footer-btn">
                                <Instagram size={20} /> {INSTAGRAM_HANDLE}
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
