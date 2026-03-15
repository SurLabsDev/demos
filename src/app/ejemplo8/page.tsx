"use client";

import { useState } from "react";
import { Search, MapPin, Bed, Bath, Maximize, Heart, ChevronLeft, ChevronRight, Building2, Home, Trees, Star, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DemoNav from "../components/DemoNav";

const properties = [
    { id: 1, name: "Penthouse Vista al Mar", location: "Pocitos, Montevideo", price: 285000, beds: 3, baths: 2, area: 145, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", tag: "Destacado" },
    { id: 2, name: "Apartamento Moderno Centro", location: "Ciudad Vieja, Montevideo", price: 165000, beds: 2, baths: 1, area: 78, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Casa con Jardín Privado", location: "Carrasco, Montevideo", price: 420000, beds: 4, baths: 3, area: 220, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800", tag: "Nuevo" },
    { id: 4, name: "Loft Industrial Renovado", location: "Cordón, Montevideo", price: 135000, beds: 1, baths: 1, area: 65, image: "https://images.unsplash.com/photo-1600566753086-00f18f6b6df3?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "Dúplex con Terraza Panorámica", location: "Punta Carretas, Montevideo", price: 310000, beds: 3, baths: 2, area: 160, image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "Suite Ejecutiva Premium", location: "Buceo, Montevideo", price: 195000, beds: 2, baths: 2, area: 95, image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800", tag: "Oportunidad" },
];

const featuredImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200",
];

type FilterType = "Todos" | "Apartamento" | "Casa" | "Loft";
const typeFilters: { label: FilterType; icon: React.ReactNode }[] = [
    { label: "Todos", icon: <Search size={14} /> },
    { label: "Apartamento", icon: <Building2 size={14} /> },
    { label: "Casa", icon: <Home size={14} /> },
    { label: "Loft", icon: <Trees size={14} /> },
];

export default function RealEstatePage() {
    const [activeFilter, setActiveFilter] = useState<FilterType>("Todos");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [featuredIdx, setFeaturedIdx] = useState(0);
    const [priceRange, setPriceRange] = useState<"Todos" | "< $200K" | "$200K-$350K" | "> $350K">("Todos");

    const toggleFav = (id: number) => {
        setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
    };

    const filtered = properties.filter((p) => {
        const typeMatch = activeFilter === "Todos"
            || (activeFilter === "Apartamento" && (p.name.includes("Apartamento") || p.name.includes("Penthouse") || p.name.includes("Suite") || p.name.includes("Dúplex")))
            || (activeFilter === "Casa" && p.name.includes("Casa"))
            || (activeFilter === "Loft" && p.name.includes("Loft"));
        const priceMatch = priceRange === "Todos"
            || (priceRange === "< $200K" && p.price < 200000)
            || (priceRange === "$200K-$350K" && p.price >= 200000 && p.price <= 350000)
            || (priceRange === "> $350K" && p.price > 350000);
        return typeMatch && priceMatch;
    });

    return (
        <div className="min-h-screen bg-[#FAFAF7] text-[#1A1A1A] font-sans selection:bg-emerald-200">
            {/* Nav */}
            <nav className="sticky top-0 z-50 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#E8E6E0]">
                <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-[#2D5A3D] rounded-lg flex items-center justify-center">
                            <Building2 size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">Habitar</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#666]">
                        <a href="#" className="hover:text-[#2D5A3D] transition-colors">Propiedades</a>
                        <a href="#" className="hover:text-[#2D5A3D] transition-colors">Barrios</a>
                        <a href="#" className="hover:text-[#2D5A3D] transition-colors">Nosotros</a>
                    </div>
                    <button className="bg-[#2D5A3D] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#234A31] transition-colors flex items-center gap-2">
                        <Phone size={14} /> Contactar
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <p className="text-sm font-semibold text-[#2D5A3D] uppercase tracking-widest mb-4">Encontrá tu lugar</p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                            Propiedades que <span className="text-[#2D5A3D]">inspiran</span> una nueva forma de vivir.
                        </h1>
                        <p className="text-[#888] text-lg mb-10 max-w-lg">Explorá nuestra selección curada de inmuebles en las mejores zonas de Montevideo.</p>

                        {/* Search bar */}
                        <div className="bg-white rounded-2xl border border-[#E8E6E0] shadow-lg p-2 flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 flex items-center gap-2 px-4 py-2">
                                <MapPin size={18} className="text-[#2D5A3D] shrink-0" />
                                <input type="text" placeholder="Buscar por zona o barrio..." className="w-full bg-transparent outline-none text-sm placeholder:text-[#BBB]" />
                            </div>
                            <button className="bg-[#2D5A3D] text-white px-8 py-3 rounded-xl font-medium text-sm hover:bg-[#234A31] transition-colors flex items-center justify-center gap-2 shrink-0">
                                <Search size={16} /> Buscar
                            </button>
                        </div>
                    </motion.div>
                </div>
                {/* Decorative shape */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2D5A3D]/5 to-transparent pointer-events-none hidden lg:block" />
            </section>

            {/* Stats */}
            <section className="border-y border-[#E8E6E0] bg-white">
                <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { num: "120+", label: "Propiedades" },
                        { num: "15", label: "Barrios" },
                        { num: "98%", label: "Satisfacción" },
                        { num: "48h", label: "Tiempo de respuesta" },
                    ].map((s, i) => (
                        <div key={i}>
                            <p className="text-2xl md:text-3xl font-bold text-[#2D5A3D]">{s.num}</p>
                            <p className="text-sm text-[#888] mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Filters + Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Propiedades Disponibles</h2>
                        <p className="text-sm text-[#888] mt-1">{filtered.length} resultados</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {typeFilters.map((f) => (
                            <button
                                key={f.label}
                                onClick={() => setActiveFilter(f.label)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${activeFilter === f.label
                                    ? "bg-[#2D5A3D] text-white border-[#2D5A3D]"
                                    : "bg-white border-[#E8E6E0] text-[#666] hover:border-[#2D5A3D]/30"
                                    }`}
                            >
                                {f.icon} {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price range */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {(["Todos", "< $200K", "$200K-$350K", "> $350K"] as const).map((r) => (
                        <button
                            key={r}
                            onClick={() => setPriceRange(r)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${priceRange === r ? "bg-[#2D5A3D]/10 border-[#2D5A3D]/30 text-[#2D5A3D]" : "bg-white border-[#E8E6E0] text-[#888] hover:border-[#2D5A3D]/20"}`}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {/* Property grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p) => (
                            <motion.div
                                key={p.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="group bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    {p.tag && (
                                        <span className="absolute top-3 left-3 bg-[#2D5A3D] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                            {p.tag}
                                        </span>
                                    )}
                                    <button
                                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
                                        onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }}
                                    >
                                        <Heart size={16} className={favorites.includes(p.id) ? "fill-red-500 text-red-500" : "text-[#888]"} />
                                    </button>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-lg leading-tight">{p.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-[#888] mb-4">
                                        <MapPin size={14} /> {p.location}
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-[#666] mb-4">
                                        <span className="flex items-center gap-1"><Bed size={14} /> {p.beds} dorm.</span>
                                        <span className="flex items-center gap-1"><Bath size={14} /> {p.baths} baño{p.baths > 1 ? "s" : ""}</span>
                                        <span className="flex items-center gap-1"><Maximize size={14} /> {p.area} m²</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-[#F0EDE8]">
                                        <p className="text-xl font-bold text-[#2D5A3D]">${p.price.toLocaleString()}</p>
                                        <button className="text-xs font-semibold text-[#2D5A3D] bg-[#2D5A3D]/10 px-3 py-1.5 rounded-lg hover:bg-[#2D5A3D]/20 transition-colors">
                                            Agendar visita
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* Featured Property */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div className="bg-white rounded-3xl border border-[#E8E6E0] overflow-hidden shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={featuredIdx}
                                    src={featuredImages[featuredIdx]}
                                    alt="Featured"
                                    className="w-full h-full object-cover absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </AnimatePresence>
                            <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm" onClick={() => setFeaturedIdx((i) => i === 0 ? featuredImages.length - 1 : i - 1)}>
                                    <ChevronLeft size={18} />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm" onClick={() => setFeaturedIdx((i) => i === featuredImages.length - 1 ? 0 : i + 1)}>
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                            <div className="absolute top-4 left-4 bg-[#2D5A3D] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10">
                                <Star size={12} /> Propiedad Destacada
                            </div>
                        </div>

                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <p className="text-sm text-[#2D5A3D] font-semibold uppercase tracking-widest mb-3">Exclusivo</p>
                            <h3 className="text-3xl font-bold tracking-tight mb-2">Penthouse Vista al Mar</h3>
                            <p className="text-[#888] flex items-center gap-1 mb-6"><MapPin size={14} /> Pocitos, Montevideo</p>

                            <p className="text-[#666] leading-relaxed mb-8">
                                Espectacular penthouse con vista panorámica al Río de la Plata. Acabados de primera calidad, terraza privada de 40m², cocina Italiana importada y 2 garajes. Edificio con amenities premium.
                            </p>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-[#F6F5F2] rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold">3</p>
                                    <p className="text-xs text-[#888] mt-1">Dormitorios</p>
                                </div>
                                <div className="bg-[#F6F5F2] rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold">2</p>
                                    <p className="text-xs text-[#888] mt-1">Baños</p>
                                </div>
                                <div className="bg-[#F6F5F2] rounded-xl p-4 text-center">
                                    <p className="text-2xl font-bold">145</p>
                                    <p className="text-xs text-[#888] mt-1">m²</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-3xl font-bold text-[#2D5A3D]">$285,000</p>
                                <button className="bg-[#2D5A3D] text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#234A31] transition-colors">
                                    Agendar Visita
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <DemoNav />
        </div>
    );
}
