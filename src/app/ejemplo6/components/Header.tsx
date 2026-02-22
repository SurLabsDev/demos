import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Menu, X } from 'lucide-react';
import './Header.css';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                className={`header ${scrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="header-container">
                    <div className="logo-container">
                        <span className="brand-name" style={{ fontSize: '1.5rem', fontWeight: 900, fontStyle: 'italic', letterSpacing: '0.1em' }}>SUR*STUDIO</span>
                    </div>

                    <nav className="desktop-nav">
                        <a href="#menu" className="nav-link">Menú</a>
                        <a href="#club" className="nav-link">Club</a>
                    </nav>

                    <div className="header-actions">
                        <a href="https://maps.app.goo.gl/YourMapLink" target="_blank" rel="noreferrer" className="store-link">
                            <MapPin size={18} />
                            <span>Tienda</span>
                        </a>

                        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-nav"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menú</a>
                        <a href="#club" onClick={() => setMobileMenuOpen(false)}>Club</a>
                        <a href="https://maps.app.goo.gl/YourMapLink" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>Tienda</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
