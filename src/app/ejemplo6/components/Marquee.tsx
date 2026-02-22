import { motion } from 'framer-motion';
import './Marquee.css';

export default function Marquee() {
    const words = ["BUBBLE TEA", "MYSTERY BOX", "SABORES AUTÉNTICOS", "CHA HAUS CLUB"];
    const repeatedWords = Array(10).fill(words).flat();

    return (
        <div className="marquee-container">
            <motion.div
                className="marquee-content"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20
                }}
            >
                {repeatedWords.map((word, idx) => (
                    <span key={idx} className="marquee-item">
                        {word} <span className="marquee-star">✧</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
