"use client";

import { useState } from "react";
import { ShoppingBag, Search, Menu, ArrowRight, Heart, X, Plus, Minus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DemoNav from "../components/DemoNav";

interface Product {
    id: number;
    name: string;
    price: number;
    priceLabel: string;
    category: string;
    image: string;
}

const products: Product[] = [
    { id: 1, name: "BOLSO TOTE LEATHER", price: 1250, priceLabel: "$1,250", category: "Marroquinería", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "ESENCIA N° 5", price: 185, priceLabel: "$185", category: "Fragancias", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "PENDIENTES ORO BLANCO", price: 420, priceLabel: "$420", category: "Joyería", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "LENTES NOIR LUXE", price: 890, priceLabel: "$890", category: "Accesorios", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800" },
];

interface CartItem {
    product: Product;
    qty: number;
}

export default function EcommercePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [newsletterDone, setNewsletterDone] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((c) => c.product.id === product.id);
            if (existing) return prev.map((c) => c.product.id === product.id ? { ...c, qty: c.qty + 1 } : c);
            return [...prev, { product, qty: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((c) => c.product.id !== productId));
    };

    const updateQty = (productId: number, delta: number) => {
        setCart((prev) => prev.map((c) => {
            if (c.product.id !== productId) return c;
            const newQty = c.qty + delta;
            return newQty <= 0 ? c : { ...c, qty: newQty };
        }).filter((c) => c.qty > 0));
    };

    const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
    const totalPrice = cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#111111] selection:text-[#FAFAFA]">
            {/* Announcement Bar */}
            <div className="bg-[#111111] text-[#FAFAFA] text-xs font-medium tracking-widest text-center py-2 uppercase">
                Envío global de cortesía en compras superiores a $500
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#E5E5E5]">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-6 text-sm tracking-widest uppercase font-medium">
                        <a href="#" className="hover:text-gray-500 transition-colors">Colección</a>
                        <a href="#" className="hover:text-gray-500 transition-colors">Diario</a>
                        <a href="#" className="hover:text-gray-500 transition-colors">Atelier</a>
                    </div>

                    <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={20} />
                    </button>

                    <a href="#" className="text-2xl font-serif tracking-widest font-bold">
                        AESTHÈTE
                    </a>

                    <div className="flex items-center gap-5">
                        <button className="hover:opacity-60 transition-opacity"><Search size={20} className="stroke-[1.5]" /></button>
                        <button className="hover:opacity-60 transition-opacity hidden sm:block" onClick={() => toggleFavorite(0)}>
                            <Heart size={20} className="stroke-[1.5]" />
                        </button>
                        <button className="hover:opacity-60 transition-opacity relative" onClick={() => setCartOpen(true)}>
                            <ShoppingBag size={20} className="stroke-[1.5]" />
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-2 bg-[#111111] text-[#FAFAFA] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#FAFAFA] z-[60] flex flex-col"
                    >
                        <div className="flex items-center justify-between px-6 h-20 border-b border-[#E5E5E5]">
                            <span className="text-2xl font-serif tracking-widest font-bold">AESTHÈTE</span>
                            <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
                        </div>
                        <nav className="flex-1 flex flex-col items-center justify-center gap-10">
                            {["Colección", "Diario", "Atelier", "Favoritos", "Contacto"].map((item, i) => (
                                <motion.a
                                    key={item}
                                    href="#"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="text-3xl font-serif tracking-widest hover:text-gray-500 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <AnimatePresence>
                {cartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 z-[60]"
                            onClick={() => setCartOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FAFAFA] z-[70] shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between px-6 py-6 border-b border-[#E5E5E5]">
                                <h2 className="font-serif text-xl tracking-widest">TU BOLSO ({totalItems})</h2>
                                <button onClick={() => setCartOpen(false)}><X size={20} /></button>
                            </div>

                            {cart.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 px-6 text-center">
                                    <ShoppingBag size={48} className="stroke-[1] mb-4 opacity-50" />
                                    <p className="text-sm">Tu bolso está vacío.</p>
                                    <p className="text-xs mt-1">Explora nuestra colección curada.</p>
                                </div>
                            ) : (
                                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                                    {cart.map((item) => (
                                        <div key={item.product.id} className="flex gap-4">
                                            <div className="w-20 h-24 bg-[#EFEFEF] shrink-0 overflow-hidden">
                                                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-sm font-medium tracking-wide">{item.product.name}</h3>
                                                    <p className="text-xs text-gray-500 mt-0.5">{item.product.category}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 border border-[#E5E5E5] rounded-sm">
                                                        <button className="p-1.5 hover:bg-[#EFEFEF] transition-colors" onClick={() => updateQty(item.product.id, -1)}><Minus size={12} /></button>
                                                        <span className="text-xs font-medium w-4 text-center">{item.qty}</span>
                                                        <button className="p-1.5 hover:bg-[#EFEFEF] transition-colors" onClick={() => updateQty(item.product.id, 1)}><Plus size={12} /></button>
                                                    </div>
                                                    <span className="text-sm font-medium">${(item.product.price * item.qty).toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <button className="self-start text-gray-400 hover:text-gray-600 transition-colors" onClick={() => removeFromCart(item.product.id)}>
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {cart.length > 0 && (
                                <div className="border-t border-[#E5E5E5] px-6 py-6 space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 uppercase tracking-widest text-xs">Total</span>
                                        <span className="font-bold text-lg">${totalPrice.toLocaleString()}</span>
                                    </div>
                                    <button className="w-full bg-[#111111] text-[#FAFAFA] py-4 text-sm uppercase tracking-widest font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                        Finalizar Compra <ArrowRight size={14} />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main>
                {/* Hero Split */}
                <section className="relative min-h-[50vh] md:min-h-[85vh] md:h-[85vh] flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 h-[40vh] md:h-full relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#EFEFEF] -z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200"
                            alt="Editorial presentation"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[2s] ease-out mix-blend-multiply"
                        />
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-12 md:py-20 bg-[#F0EFEB]">
                        <p className="text-xs tracking-[0.2em] font-medium uppercase text-gray-500 mb-6">Objeto de Deseo</p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-8">
                            La Arquitectura<br />de la Forma.
                        </h1>
                        <p className="text-gray-600 max-w-md mb-12 text-sm leading-relaxed">
                            Elaborada con precisión milimétrica, nuestra más reciente colección desafía los límites entre la utilidad cotidiana y el arte escultural. Unidades limitadas disponibles.
                        </p>
                        <div>
                            <button className="group inline-flex items-center justify-center gap-4 bg-[#111111] text-[#FAFAFA] hover:bg-gray-800 transition-colors text-sm tracking-widest uppercase font-medium px-8 py-4">
                                Comprar Colección
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Curated Selection */}
                <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <h2 className="text-3xl font-serif mb-4">Selección Curada</h2>
                            <p className="text-gray-500 text-sm max-w-sm">Eleva tu día a día con piezas atemporales diseñadas para perdurar más allá de cualquier temporada.</p>
                        </div>
                        <a href="#" className="inline-block text-xs uppercase tracking-widest font-medium border-b border-[#111111] pb-1">Ver Catálogo</a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                className="group cursor-pointer"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#EFEFEF]">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                                    {/* Favorite button */}
                                    <button
                                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                                        onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                                    >
                                        <Heart size={16} className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "stroke-[1.5]"} />
                                    </button>

                                    <button
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-[#111111] text-[#FAFAFA] text-xs uppercase tracking-widest py-3 px-6 whitespace-nowrap hover:bg-gray-800"
                                        onClick={() => addToCart(product)}
                                    >
                                        Añadir al Bolso
                                    </button>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{product.category}</span>
                                    <h3 className="text-sm font-medium tracking-wide mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-600 font-medium">{product.priceLabel}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Brand Story */}
                <section className="py-24 bg-[#111111] text-[#FAFAFA] text-center px-6">
                    <div className="max-w-2xl mx-auto">
                        <span className="block mb-6"><ShoppingBag size={24} className="mx-auto stroke-[1]" /></span>
                        <h2 className="text-3xl font-serif mb-8 leading-tight">Lujo silencioso confeccionado para el minimalista exigente.</h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10">
                            Obtenemos únicamente los materiales más excepcionales, trabajando íntimamente con maestros artesanos para crear obras de calidad inquebrantable que te acompañarán de por vida.
                        </p>
                        <button className="text-xs uppercase tracking-widest px-8 py-4 border border-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#111111] transition-colors">
                            Nuestra Historia
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-[#E5E5E5] py-16 px-6 bg-[#FAFAFA]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-serif text-xl tracking-widest mb-6">AESTHÈTE</h3>
                        <p className="text-gray-500 max-w-sm">Definiendo el lujo moderno a través del diseño con propósito y la calidad inconcesionable.</p>
                    </div>
                    <div>
                        <h4 className="font-medium tracking-widest uppercase text-xs mb-6">Atención al Cliente</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li><a href="#" className="hover:text-[#111111] transition-colors">Contáctanos</a></li>
                            <li><a href="#" className="hover:text-[#111111] transition-colors">Envíos y Devoluciones</a></li>
                            <li><a href="#" className="hover:text-[#111111] transition-colors">Guía de Cuidados</a></li>
                            <li><a href="#" className="hover:text-[#111111] transition-colors">Preguntas Frecuentes</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium tracking-widest uppercase text-xs mb-6">Mantente Conectado</h4>
                        <p className="text-gray-500 text-xs mb-4">Suscríbete para recibir novedades, acceso a ventas privadas de colección.</p>
                        {newsletterDone ? (
                            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium py-2">
                                <Check size={16} /> ¡Suscripción confirmada!
                            </div>
                        ) : (
                            <form
                                className="flex border-b border-[#111111] pb-2"
                                onSubmit={(e) => { e.preventDefault(); setNewsletterDone(true); }}
                            >
                                <input type="email" required placeholder="Ingresa tu correo" className="bg-transparent w-full text-sm outline-none placeholder:text-gray-400" />
                                <button type="submit"><ArrowRight size={16} /></button>
                            </form>
                        )}
                    </div>
                </div>
            </footer>

            <DemoNav />
        </div>
    );
}
