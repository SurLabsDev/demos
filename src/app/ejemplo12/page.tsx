"use client";

import { useState, useEffect } from "react";
import { Utensils, Clock, MapPin, Star, Phone, Leaf, Flame, Award, Instagram, Heart, X, Users, CalendarCheck, CheckCircle2 } from "lucide-react";
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

/** Horarios del turno noche. Los ocupados quedan visibles pero deshabilitados. */
const serviceHours = [
    { time: "19:00", taken: false },
    { time: "19:30", taken: false },
    { time: "20:00", taken: true },
    { time: "20:30", taken: false },
    { time: "21:00", taken: false },
    { time: "21:30", taken: true },
    { time: "22:00", taken: false },
];

const partySizes = [2, 3, 4, 5, 6];

interface DateOption {
    /** "Vie 31" */
    label: string;
    /** "31 de julio" para el resumen de la confirmación */
    long: string;
}

export default function RestaurantPage() {
    const [activeCategory, setActiveCategory] = useState("Entradas");
    const [favorites, setFavorites] = useState<number[]>([]);

    // Reserva
    const [bookingOpen, setBookingOpen] = useState(false);
    const [bookingDone, setBookingDone] = useState(false);
    const [dateOptions, setDateOptions] = useState<DateOption[]>([]);
    const [party, setParty] = useState(2);
    const [dateIdx, setDateIdx] = useState(0);
    const [time, setTime] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const toggleFav = (id: number) => {
        setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
    };

    /**
     * Las fechas se arman recién al abrir el modal. Calcularlas en el cuerpo del
     * componente las congelaría en el prerender estático y el HTML del servidor
     * dejaría de coincidir con el del cliente.
     */
    const openBooking = () => {
        const short = new Intl.DateTimeFormat("es-UY", { weekday: "short", day: "numeric" });
        const long = new Intl.DateTimeFormat("es-UY", { day: "numeric", month: "long" });
        const days: DateOption[] = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            // Cerrado los lunes (getDay() === 1), como dice el horario del hero.
            if (d.getDay() === 1) continue;
            days.push({
                label: i === 0 ? "Hoy" : short.format(d).replace(".", ""),
                long: long.format(d),
            });
        }
        setDateOptions(days);
        setDateIdx(0);
        setTime(null);
        setBookingDone(false);
        setBookingOpen(true);
    };

    const closeBooking = () => {
        setBookingOpen(false);
        setName("");
        setPhone("");
    };

    useEffect(() => {
        if (!bookingOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeBooking();
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [bookingOpen]);

    const canConfirm = Boolean(time) && name.trim().length > 1 && phone.trim().length > 5;

    return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#2A2A2A] font-sans selection:bg-amber-200">
            {/* Modal de reserva */}
            <AnimatePresence>
                {bookingOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
                            onClick={closeBooking}
                        />
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="Reservar mesa"
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.98 }}
                            transition={{ type: "spring", damping: 26, stiffness: 260 }}
                            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[520px] max-h-[88vh] overflow-y-auto bg-[#FAF8F5] rounded-2xl z-[81] shadow-2xl"
                        >
                            <button
                                onClick={closeBooking}
                                aria-label="Cerrar"
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-[#E8E4DE] flex items-center justify-center text-[#888] hover:text-[#2A2A2A] transition-colors z-10"
                            >
                                <X size={16} />
                            </button>

                            {bookingDone ? (
                                <div className="p-8 md:p-10 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 12 }}
                                        className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6"
                                    >
                                        <CheckCircle2 size={40} />
                                    </motion.div>
                                    <h2 className="text-2xl font-serif mb-3">Mesa reservada</h2>
                                    <p className="text-sm text-[#888] leading-relaxed mb-6">
                                        Te esperamos, {name.trim().split(" ")[0]}. Te enviamos la confirmación por SMS al {phone.trim()}.
                                    </p>

                                    <div className="bg-white border border-[#E8E4DE] rounded-2xl divide-y divide-[#F0EDE8] text-left mb-6">
                                        <div className="flex items-center justify-between px-5 py-3.5">
                                            <span className="text-xs uppercase tracking-widest text-[#888]">Fecha</span>
                                            <span className="text-sm font-semibold">{dateOptions[dateIdx]?.long}</span>
                                        </div>
                                        <div className="flex items-center justify-between px-5 py-3.5">
                                            <span className="text-xs uppercase tracking-widest text-[#888]">Hora</span>
                                            <span className="text-sm font-semibold">{time}</span>
                                        </div>
                                        <div className="flex items-center justify-between px-5 py-3.5">
                                            <span className="text-xs uppercase tracking-widest text-[#888]">Comensales</span>
                                            <span className="text-sm font-semibold">{party}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={closeBooking}
                                        className="w-full bg-[#2A2A2A] text-white py-4 rounded-full font-semibold text-sm hover:bg-black transition-colors"
                                    >
                                        Listo
                                    </button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={(e) => { e.preventDefault(); if (canConfirm) setBookingDone(true); }}
                                    className="p-6 md:p-8"
                                >
                                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">Oliva</p>
                                    <h2 className="text-2xl font-serif mb-6">Reservá tu mesa</h2>

                                    {/* Comensales */}
                                    <div className="mb-6">
                                        <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#888] mb-3">
                                            <Users size={12} /> Comensales
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {partySizes.map((n) => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    onClick={() => setParty(n)}
                                                    className={`w-11 h-11 rounded-full text-sm font-semibold border transition-all ${party === n
                                                        ? "bg-[#2A2A2A] text-white border-[#2A2A2A]"
                                                        : "bg-white border-[#E8E4DE] text-[#666] hover:border-[#2A2A2A]/30"
                                                        }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Fecha */}
                                    <div className="mb-6">
                                        <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#888] mb-3">
                                            <CalendarCheck size={12} /> Fecha
                                        </label>
                                        <div className="flex gap-2 overflow-x-auto pb-1">
                                            {dateOptions.map((d, i) => (
                                                <button
                                                    key={d.long}
                                                    type="button"
                                                    onClick={() => { setDateIdx(i); setTime(null); }}
                                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border whitespace-nowrap capitalize transition-all ${dateIdx === i
                                                        ? "bg-[#2A2A2A] text-white border-[#2A2A2A]"
                                                        : "bg-white border-[#E8E4DE] text-[#666] hover:border-[#2A2A2A]/30"
                                                        }`}
                                                >
                                                    {d.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hora */}
                                    <div className="mb-6">
                                        <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#888] mb-3">
                                            <Clock size={12} /> Hora
                                        </label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {serviceHours.map((h) => (
                                                <button
                                                    key={h.time}
                                                    type="button"
                                                    disabled={h.taken}
                                                    onClick={() => setTime(h.time)}
                                                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${h.taken
                                                        ? "bg-[#F5F2ED] border-[#EFEBE4] text-[#C4BDB2] line-through cursor-not-allowed"
                                                        : time === h.time
                                                            ? "bg-amber-500 border-amber-500 text-white"
                                                            : "bg-white border-[#E8E4DE] text-[#666] hover:border-amber-400"
                                                        }`}
                                                >
                                                    {h.time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Datos */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Nombre y apellido"
                                            aria-label="Nombre y apellido"
                                            className="bg-white border border-[#E8E4DE] rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors placeholder:text-[#BBB]"
                                        />
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Teléfono"
                                            aria-label="Teléfono"
                                            className="bg-white border border-[#E8E4DE] rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors placeholder:text-[#BBB]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!canConfirm}
                                        className={`w-full py-4 rounded-full font-semibold text-sm transition-colors ${canConfirm
                                            ? "bg-amber-500 text-white hover:bg-amber-600"
                                            : "bg-[#EFEBE4] text-[#B5AEA3] cursor-not-allowed"
                                            }`}
                                    >
                                        {time ? `Confirmar ${party} personas a las ${time}` : "Elegí un horario"}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

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
                        <button
                            onClick={openBooking}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2"
                        >
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
                                    {/* En touch no hay hover: el corazón queda siempre visible y
                                        sólo se esconde-hasta-hover de md para arriba. */}
                                    <button
                                        aria-label={favorites.includes(item.id) ? `Quitar ${item.name} de favoritos` : `Guardar ${item.name} en favoritos`}
                                        aria-pressed={favorites.includes(item.id)}
                                        className={`absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full transition-opacity shadow-sm md:group-hover:opacity-100 ${favorites.includes(item.id) ? "opacity-100" : "opacity-100 md:opacity-0"
                                            }`}
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
                    <button
                        onClick={openBooking}
                        className="bg-amber-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-600 transition-colors flex items-center gap-2"
                    >
                        <Phone size={16} /> Reservar Mesa
                    </button>
                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="border border-white/20 text-white/70 px-8 py-4 rounded-full font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
                    >
                        <Instagram size={16} /> @oliva.bsas
                    </a>
                </div>
            </section>

            <DemoNav />
        </div>
    );
}
