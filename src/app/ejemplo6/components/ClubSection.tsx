import { motion } from 'framer-motion';
import './ClubSection.css';

export default function ClubSection() {
    return (
        <section id="club" className="club-section section">
            <div className="container club-container">
                <motion.div
                    className="club-content"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="title club-title">SÉ PARTE DEL SUR*STUDIO CLUB Y DISFRUTA BENEFICIOS EXCLUSIVOS</h2>
                    <p>Escaneame para acceder a los beneficios</p>
                </motion.div>

                <motion.div
                    className="club-qr-wrapper"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="qr-container">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://surlabs.tech" alt="QR Code" className="qr-code" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
