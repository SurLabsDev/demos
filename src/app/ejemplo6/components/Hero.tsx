import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const slides = [
    { desktop: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=1200', mobile: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=600' },
    { desktop: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200', mobile: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600' },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <section className="hero-section" id="hero">
            <div className="hero-container">
                {/* Floating Neo-Brutalist Badges */}
                <motion.div
                    style={{ position: 'absolute', top: '15%', left: '2%', backgroundColor: '#FFB6C1', padding: '1rem 2rem', borderRadius: '50px', border: '4px solid var(--text-dark)', fontWeight: 900, fontSize: '1.2rem', zIndex: 10, pointerEvents: 'none', boxShadow: '5px 5px 0px 0px var(--text-dark)' }}
                    animate={{ y: [0, -15, 0], rotate: [-10, -5, -10] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>✨ SO FRESH</motion.div>

                <motion.div
                    style={{ position: 'absolute', bottom: '15%', right: '2%', width: '120px', height: '120px', backgroundColor: '#E2FF66', borderRadius: '50%', border: '4px solid var(--text-dark)', zIndex: 10, pointerEvents: 'none', boxShadow: '8px 8px 0px 0px var(--text-dark)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem' }}
                    animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                    transition={{ rotate: { repeat: Infinity, duration: 10, ease: "linear" }, scale: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}>✌️</motion.div>

                <AnimatePresence mode="wait">
                    <motion.img
                        key={current}
                        src={isMobile ? slides[current].mobile : slides[current].desktop}
                        alt="Cha Haus Hero"
                        className="carousel-image"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5, y: 100 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, rotate: 5, y: -100 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                </AnimatePresence>

                <button className="carousel-btn prev" onClick={prevSlide}>
                    <ChevronLeft size={32} />
                </button>
                <button className="carousel-btn next" onClick={nextSlide}>
                    <ChevronRight size={32} />
                </button>
            </div>
        </section>
    );
}
