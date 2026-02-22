import { motion } from 'framer-motion';
import './MysteryBoxSection.css';

export default function MysteryBoxSection() {
    return (
        <section className="mystery-section section container">
            <div className="mystery-grid">
                <motion.div
                    className="mystery-content"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="badge">EDICIÓN LIMITADA</div>
                    <h2 className="title mystery-title">MYSTERY BOX</h2>
                    <p className="mystery-desc">
                        ¿Te animás a probar algo diferente? Pedí tu Mystery Box y dejate sorprender por combinaciones exclusivas, accesorios Kawaii y sabores que no están en el menú regular.
                    </p>
                    <motion.button
                        className="mystery-btn"
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        QUIERO MI CAJA 🎁
                    </motion.button>
                </motion.div>

                <motion.div
                    className="mystery-image-container"
                    initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    whileHover={{
                        rotate: [0, -5, 5, -5, 5, 0],
                        scale: 1.1,
                        transition: { duration: 0.5 }
                    }}
                >
                    <div className="mystery-backdrop"></div>
                    <img src="/images/Vaso_misterioso.webp" alt="Mystery Box" className="mystery-img" />

                    {/* Floating decorative elements */}
                    <motion.div className="decoration deco-1" animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>✨</motion.div>
                    <motion.div className="decoration deco-2" animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}>🌟</motion.div>
                    <motion.div className="decoration deco-3" animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }}>✦</motion.div>
                </motion.div>
            </div>
        </section>
    );
}
