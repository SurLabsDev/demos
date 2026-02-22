import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram } from 'lucide-react';
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
                        <p>Canelones 2370, Montevideo, Uruguay</p>

                        <div className="footer-links">
                            <a href="https://maps.app.goo.gl/YourMapLink" target="_blank" rel="noreferrer" className="footer-btn">
                                <MapPin size={20} /> Mirá cómo llegar
                            </a>
                            <a href="tel:+59891300873" className="footer-btn">
                                <Phone size={20} /> 091 661 552
                            </a>
                            <a href="https://www.instagram.com/SUR*STUDIO.uy/" target="_blank" rel="noreferrer" className="footer-btn">
                                <Instagram size={20} /> SUR*STUDIO.uy
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
