import { motion } from 'framer-motion';
import './MenuSection.css';

/**
 * Las fotos de producto viven en public/images y su nombre coincide con el del
 * ítem. Antes se servía stock de Unsplash (con la 1 y la 4 repetidas), lo que
 * además metía seis pedidos a un dominio externo en cada carga.
 */
const menuItems = [
    { id: 1, name: 'Maracuya Hibiscus', desc: 'Te verde de jazmin con maracuya y flor de hibisco', image: '/images/Maracuya_Hibiscus.webp', color: '#FCD34D' },
    { id: 2, name: 'Pink Lychee', desc: 'Te oolong con lychee, toques de rosa y cold foam', image: '/images/Pink_Lychee.webp', color: '#A0D2A1' },
    { id: 3, name: 'Durazno Oolong', desc: 'Te oolong efervescente con durazno', image: '/images/Durazno_Oolong.webp', color: '#FCA5A5' },
    { id: 4, name: 'Purple Lemonade', desc: 'Limonada con te de flor de clitoria', image: '/images/Purple_Lemonade.webp', color: '#FBBF24' },
    { id: 5, name: 'Cloud Coco', desc: 'Te de flor de clitoria con agua de coco y cold foam azul', image: '/images/Cloud_Coco.webp', color: '#38BDF8' },
    { id: 6, name: 'Crisantemo Zen', desc: 'Te verde de jazmin con limon, chia, crisantemo y bayas de goji', image: '/images/Crisantemo_Zen.webp', color: '#FCA5A5' },
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
