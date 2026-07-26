"use client";

import { useState, useMemo } from "react";
import { ShoppingBag, Search, Menu, ArrowRight, Heart, X, Plus, Minus, Check, SearchX } from "lucide-react";
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

const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function EcommercePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [newsletterDone, setNewsletterDone] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);

    const scrollToProducts = () => {
        document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" });
    };

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

    const visibleProducts = useMemo(() => {
        const q = normalize(query.trim());
        if (!q) return products;
        return products.filter((p) => normalize(p.name).includes(q) || normalize(p.category).includes(q));
    }, [query]);

    const checkout = () => {
        setOrderPlaced(true);
        setCart([]);
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
                        <button
                            className="hover:opacity-60 transition-opacity"
                            aria-label="Buscar productos"
                            aria-expanded={searchOpen}
                            onClick={() => { setSearchOpen((o) => !o); if (searchOpen) setQuery(""); }}
                        >
                            {searchOpen ? <X size={20} className="stroke-[1.5]" /> : <Search size={20} className="stroke-[1.5]" />}
                        </button>
                        {/* Antes este botón llamaba a toggleFavorite(0) y el id 0 no existe:
                            marcaba un producto fantasma. Ahora informa cuántos hay guardados. */}
                        <button
                            className="hover:opacity-60 transition-opacity hidden sm:block relative"
                            aria-label={`Favoritos (${favorites.length})`}
                            onClick={scrollToProducts}
                        >
                            <Heart size={20} className={favorites.length > 0 ? "fill-[#111111] stroke-[1.5]" : "stroke-[1.5]"} />
                            {favorites.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-2 bg-[#111111] text-[#FAFAFA] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium"
                                >
                                    {favorites.length}
                                </motion.span>
                            )}
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

                {/* Barra de búsqueda desplegable */}
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden border-t border-[#E5E5E5]"
                        >
                            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
                                <Search size={18} className="stroke-[1.5] text-gray-400 shrink-0" />
                                <input
                                    autoFocus
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Buscar por pieza o categoría..."
                                    aria-label="Buscar por pieza o categoría"
                                    className="flex-1 bg-transparent text-sm tracking-wide outline-none placeholder:text-gray-400"
                                />
                                {query && (
                                    <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda" className="text-gray-400 hover:text-[#111111] transition-colors">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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

                            {orderPlaced ? (
                                <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 13 }}
                                        className="w-16 h-16 rounded-full bg-[#111111] text-[#FAFAFA] flex items-center justify-center mb-6"
                                    >
                                        <Check size={28} />
                                    </motion.div>
                                    <h3 className="font-serif text-xl tracking-widest mb-3">COMPRA CONFIRMADA</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-1">
                                        Pedido #AE-{String(2600 + favorites.length + cart.length).padStart(4, "0")}
                                    </p>
                                    <p className="text-xs text-gray-400 leading-relaxed mb-8">
                                        Te enviamos el seguimiento por correo. Envío de cortesía, llega en 3 a 5 días hábiles.
                                    </p>
                                    <button
                                        onClick={() => { setOrderPlaced(false); setCartOpen(false); }}
                                        className="w-full border border-[#111111] py-4 text-xs uppercase tracking-widest font-medium hover:bg-[#111111] hover:text-[#FAFAFA] transition-colors"
                                    >
                                        Seguir explorando
                                    </button>
                                </div>
                            ) : cart.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 px-6 text-center">
                                    <ShoppingBag size={48} className="stroke-[1] mb-4 opacity-50" />
                                    <p className="text-sm">Tu bolso está vacío.</p>
                                    <p className="text-xs mt-1">Explora nuestra colección curada.</p>
                                    <button
                                        onClick={() => { setCartOpen(false); scrollToProducts(); }}
                                        className="mt-6 text-xs uppercase tracking-widest font-medium border-b border-[#111111] text-[#111111] pb-1"
                                    >
                                        Ver la colección
                                    </button>
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

                            {cart.length > 0 && !orderPlaced && (
                                /* pb extra en mobile: el pill de navegación de las demos flota
                                   sobre el borde inferior y tapaba el botón de compra. */
                                <div className="border-t border-[#E5E5E5] px-6 py-6 pb-24 sm:pb-6 space-y-4">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span className="uppercase tracking-widest">Envío</span>
                                        <span>{totalPrice >= 500 ? "De cortesía" : "$25"}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 uppercase tracking-widest text-xs">Total</span>
                                        <span className="font-bold text-lg">
                                            ${(totalPrice >= 500 ? totalPrice : totalPrice + 25).toLocaleString()}
                                        </span>
                                    </div>
                                    <button
                                        onClick={checkout}
                                        className="w-full bg-[#111111] text-[#FAFAFA] py-4 text-sm uppercase tracking-widest font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                    >
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
                            <button
                                onClick={scrollToProducts}
                                className="group inline-flex items-center justify-center gap-4 bg-[#111111] text-[#FAFAFA] hover:bg-gray-800 transition-colors text-sm tracking-widest uppercase font-medium px-8 py-4"
                            >
                                Comprar Colección
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Curated Selection */}
                <section id="coleccion" className="py-20 md:py-32 px-6 max-w-7xl mx-auto scroll-mt-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <h2 className="text-3xl font-serif mb-4">Selección Curada</h2>
                            <p className="text-gray-500 text-sm max-w-sm">Eleva tu día a día con piezas atemporales diseñadas para perdurar más allá de cualquier temporada.</p>
                        </div>
                        <button
                            onClick={() => { setSearchOpen(true); setQuery(""); }}
                            className="self-start inline-block text-xs uppercase tracking-widest font-medium border-b border-[#111111] pb-1"
                        >
                            Ver Catálogo
                        </button>
                    </div>

                    {visibleProducts.length === 0 && (
                        <div className="py-16 text-center">
                            <SearchX size={32} className="text-gray-300 mx-auto mb-4 stroke-[1.5]" />
                            <p className="text-sm text-gray-500 mb-4">No encontramos piezas para &ldquo;{query}&rdquo;.</p>
                            <button onClick={() => setQuery("")} className="text-xs uppercase tracking-widest font-medium border-b border-[#111111] pb-1">
                                Ver todo
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {visibleProducts.map((product) => (
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

                                    {/* Favorite button. En touch no existe el hover, así que
                                        de md para abajo estos controles quedan siempre visibles. */}
                                    <button
                                        aria-label={favorites.includes(product.id) ? `Quitar ${product.name} de favoritos` : `Guardar ${product.name} en favoritos`}
                                        aria-pressed={favorites.includes(product.id)}
                                        className={`absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full transition-opacity duration-300 hover:bg-white md:group-hover:opacity-100 ${favorites.includes(product.id) ? "opacity-100" : "opacity-100 md:opacity-0"
                                            }`}
                                        onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                                    >
                                        <Heart size={16} className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "stroke-[1.5]"} />
                                    </button>

                                    <button
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 bg-[#111111] text-[#FAFAFA] text-xs uppercase tracking-widest py-3 px-6 whitespace-nowrap hover:bg-gray-800 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
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
