import { motion } from 'framer-motion';
import './MenuSection.css';

/**
 * Carta de utilería. Ni los nombres ni las fotos son de un local real: antes
 * esto servía las fotos de producto de una marca existente, con su logo impreso
 * en cada vaso. Cada imagen se revisó a ojo para descartar vasos con logo, que
 * abundan en el stock de bubble tea, y las seis son distintas entre sí (la
 * versión original repetía la misma foto en dos tragos).
 */
const menuItems = [
    { id: 1, name: 'Mango Jazmín', desc: 'Té verde de jazmín con mango y perlas de tapioca', image: 'https://images.unsplash.com/photo-1718065598477-505b9c2e764d?auto=format&fit=crop&q=80&w=400', color: '#FCD34D' },
    { id: 2, name: 'Cacao Nube', desc: 'Té con leche, cacao y cold foam', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400', color: '#A0D2A1' },
    { id: 3, name: 'Pera Oolong', desc: 'Té oolong efervescente con pera y jengibre', image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&q=80&w=400', color: '#FCA5A5' },
    { id: 4, name: 'Menta Limón', desc: 'Té verde frío con menta, lima y mucho hielo', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', color: '#FBBF24' },
    { id: 5, name: 'Leche Perlada', desc: 'Té con leche clásico y perlas de tapioca', image: 'https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?auto=format&fit=crop&q=80&w=400', color: '#38BDF8' },
    { id: 6, name: 'Matcha Frío', desc: 'Matcha helado con perlas y un toque de vainilla', image: 'https://images.unsplash.com/photo-1572932759882-bb34c848d1b3?auto=format&fit=crop&q=80&w=400', color: '#FCA5A5' },
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
