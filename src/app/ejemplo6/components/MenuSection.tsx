import { motion } from 'framer-motion';
import './MenuSection.css';

const menuItems = [
    { id: 1, name: 'Maracuya Hibiscus', desc: 'Te verde de jazmin con maracuya y flor de hibisco', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400', color: '#FFB6C1' },
    { id: 2, name: 'Pink Lychee', desc: 'Te oolong con lychee, toques de rosa y cold foam', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', color: '#FFC0CB' },
    { id: 3, name: 'Durazno Oolong', desc: 'Te oolong efervescente con durazno', image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&q=80&w=400', color: '#FFDAB9' },
    { id: 4, name: 'Purple Lemonade', desc: 'Limonada con te de flor de clitoria', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400', color: '#DDA0DD' },
    { id: 5, name: 'Cloud Coco', desc: 'Te de flor de clitoria con agua de coco y cold foam azul', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=400', color: '#87CEEB' },
    { id: 6, name: 'Crisantemo Zen', desc: 'Te verde de jazmin con limon, chia, crisantemo y bayas de goji', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400', color: '#FFFACD' },
];

export default function MenuSection() {
    return (
        <section id="menu" className="menu-section section container">
            <motion.h2
                className="title menu-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                MENÚ
            </motion.h2>

            <motion.div
                className="menu-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {}
                }}
            >
                {menuItems.map((item) => (
                    <motion.div
                        key={item.id}
                        className="menu-card"
                        variants={{
                            hidden: { opacity: 0, y: 80, scale: 0.8, rotate: -5 },
                            visible: { opacity: 1, y: 0, scale: 1, rotate: 0 }
                        }}
                        whileHover={{
                            y: -15,
                            scale: 1.05,
                            rotate: item.id % 2 === 0 ? 2 : -2,
                            boxShadow: `0px 20px 0px 0px var(--text-dark)`
                        }}
                        whileTap={{ scale: 0.95, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ borderBottom: `8px solid var(--text-dark)` }}
                    >
                        <div className="card-image-wrap" style={{ backgroundColor: 'var(--white)' }}>
                            <motion.img
                                src={item.image}
                                alt={item.name}
                                className="menu-image"
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <div className="card-content" style={{ backgroundColor: item.color }}>
                            <h3>{item.name}</h3>
                            <p>{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
