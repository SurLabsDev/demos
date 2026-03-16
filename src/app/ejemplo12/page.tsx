"use client";

import { useState } from "react";
import { Utensils, Clock, MapPin, Star, Phone, ChevronDown, Leaf, Flame, Award, Instagram, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DemoNav from "../components/DemoNav";

const menuCategories = ["Entradas", "Principales", "Postres"];

const menuItems: Record<string, { id: number; name: string; desc: string; price: string; image: string; tags?: string[]; popular?: boolean }[]> = {
    Entradas: [
        { id: 1, name: "Burrata con Tomates Heirloom", desc: "Burrata cremosa sobre tomates de estación, albahaca fresca y reducción de balsámico.", price: "$18", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=400", tags: ["Vegetariano"], popular: true },
        { id: 2, name: "Tartar de Atún Rojo", desc: "Atún rojo cortado a cuchillo con aguacate, sésamo tostado y chips de wonton.", price: "$22", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=80&w=400" },
        { id: 3, name: "Croquetas de Jamón Ibérico", desc: "Bechamel cremosa con jamón ibérico de bellota. Servidas con alioli de trufa.", price: "$16", image: "https://images.unsplash.com/photo-1554502078-ef0fc409efce?auto=format&fit=crop&q=80&w=400", popular: true },
    ],
    Principales: [
        { id: 4, name: "Risotto de Hongos Silvestres", desc: "Arroz carnaroli con porcini, shiitake y trufa negra. Terminado con parmesano 36 meses.", price: "$28", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=400", tags: ["Vegetariano"], popular: true },
        { id: 5, name: "Lomo de Cordero Glaseado", desc: "Cordero patagónico con glaseado de miel y mostaza, puré de batata y espárragos.", price: "$34", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400" },
        { id: 6, name: "Pasta Negra al Fruto de Mar", desc: "Tagliatelle al tinta de calamar con langostinos, mejillones y vongole en salsa de vino blanco.", price: "$30", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=400", popular: true },
    ],
    Postres: [
        { id: 7, name: "Fondant de Chocolate 70%", desc: "Corazón líquido de chocolate belga con helado de vainilla de Madagascar.", price: "$14", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=400", popular: true },
        { id: 8, name: "Cheesecake de Yuzu", desc: "Base de galleta con crema de yuzu japonés, merengue flameado y frutos rojos.", price: "$12", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=400" },
        { id: 9, name: "Tiramisú Clásico", desc: "Bizcocho embebido en espresso, crema de mascarpone y cacao amargo.", price: "$13", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=400", tags: ["Clásico"] },
    ],
};

const reviews = [
    { name: "Sofía M.", rating: 5, text: "Una experiencia gastronómica increíble. El risotto de hongos es el mejor que probé." },
    { name: "Andrés L.", rating: 5, text: "Ambiente sofisticado sin ser pretencioso. El servicio es impecable." },
    { name: "María T.", rating: 5, text: "El fondant de chocolate es motivo suficiente para volver cada semana." },
];

export default function RestaurantPage() {
    const [activeCategory, setActiveCategory] = useState("Entradas");
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFav = (id: number) => {
        setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#2A2A2A] font-sans selection:bg-amber-200">
            {/* Hero */}
            <header className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600"
                    alt="Restaurant interior"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />

                {/* Nav overlay */}
                <nav className="absolute top-0 left-0 right-0 z-20 p-6">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <span className="text-white font-serif text-2xl tracking-wider">Oliva</span>
                        <div className="hidden md:flex items-center gap-8 text-sm text-white/70 font-medium">
                            <a href="#menu" className="hover:text-white transition-colors">Carta</a>
                            <a href="#about" className="hover:text-white transition-colors">Nosotros</a>
                            <a href="#reviews" className="hover:text-white transition-colors">Opiniones</a>
                        </div>
                        <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2">
                            <Phone size={14} /> Reservar
                        </button>
                    </div>
                </nav>

                {/* Hero content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
                    <div className="max-w-6xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                                </div>
                                <span className="text-white/50 text-sm">4.9 · Fine Dining</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-4">
                                Donde cada plato<br />cuenta una historia.
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
                                <span className="flex items-center gap-1.5"><MapPin size={14} /> Palermo, Buenos Aires</span>
                                <span className="flex items-center gap-1.5"><Clock size={14} /> Mar-Dom · 19:00 - 00:00</span>
                                <span className="flex items-center gap-1.5"><Award size={14} /> Guía Michelin 2026</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Menu Section */}
            <section id="menu" className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-amber-700 uppercase tracking-widest mb-3">Nuestra Carta</p>
                    <h2 className="text-3xl md:text-4xl font-serif">Cocina de autor con raíces locales</h2>
                </div>

                {/* Category tabs */}
                <div className="flex justify-center gap-2 mb-12">
                    {menuCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                ? "bg-[#2A2A2A] text-white shadow-lg"
                                : "bg-white border border-[#E8E4DE] text-[#888] hover:border-[#2A2A2A]/20"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Menu items */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {menuItems[activeCategory].map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white rounded-2xl border border-[#E8E4DE] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    {item.popular && (
                                        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                                            <Flame size={10} /> Popular
                                        </span>
                                    )}
                                    <button
                                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                        onClick={() => toggleFav(item.id)}
                                    >
                                        <Heart size={14} className={favorites.includes(item.id) ? "fill-red-500 text-red-500" : "text-[#888]"} />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                                        <span className="text-lg font-bold text-amber-700 shrink-0 ml-3">{item.price}</span>
                                    </div>
                                    <p className="text-sm text-[#888] leading-relaxed mb-3">{item.desc}</p>
                                    {item.tags && (
                                        <div className="flex gap-2">
                                            {item.tags.map((tag) => (
                                                <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md flex items-center gap-1">
                                                    <Leaf size={10} /> {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </section>

            {/* About strip */}
            <section id="about" className="bg-[#2A2A2A] text-white py-20 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {[
                        { icon: Leaf, title: "Ingredientes Locales", desc: "Trabajamos con productores de la región para garantizar frescura y trazabilidad." },
                        { icon: Award, title: "Chef Premiado", desc: "Nuestro chef ejecutivo fue reconocido entre los 50 mejores de Latinoamérica." },
                        { icon: Utensils, title: "Menú Estacional", desc: "Renovamos nuestra carta cada temporada para ofrecer lo mejor de cada estación." },
                    ].map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                            <item.icon size={28} className="text-amber-400 mx-auto mb-4" />
                            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Reviews */}
            <section id="reviews" className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-amber-700 uppercase tracking-widest mb-3">Opiniones</p>
                    <h2 className="text-3xl font-serif">Lo que dicen nuestros invitados</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((r, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-[#E8E4DE] rounded-2xl p-6">
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(r.rating)].map((_, j) => <Star key={j} size={14} className="fill-amber-400 text-amber-400" />)}
                            </div>
                            <p className="text-[#666] text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                            <p className="text-sm font-semibold">{r.name}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-[#2A2A2A] text-white py-16 px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Reservá tu experiencia</h2>
                <p className="text-white/50 mb-8">Disponibilidad limitada. Recomendamos reservar con al menos 48hs de anticipación.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="bg-amber-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-600 transition-colors flex items-center gap-2">
                        <Phone size={16} /> Reservar Mesa
                    </button>
                    <button className="border border-white/20 text-white/70 px-8 py-4 rounded-full font-medium hover:bg-white/5 transition-colors flex items-center gap-2">
                        <Instagram size={16} /> @oliva.bsas
                    </button>
                </div>
            </section>

            <DemoNav />
        </div>
    );
}
