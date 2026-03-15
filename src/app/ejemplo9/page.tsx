"use client";

import { useState } from "react";
import { Check, ArrowRight, Zap, Shield, BarChart3, Star, ChevronRight, Mail, Users, Clock, Layers } from "lucide-react";
import { motion } from "framer-motion";
import DemoNav from "../components/DemoNav";

const features = [
    { icon: Layers, title: "Tableros Inteligentes", desc: "Organiza tus proyectos con vistas Kanban, listas y cronogramas que se adaptan a tu flujo de trabajo." },
    { icon: Zap, title: "Automatizaciones", desc: "Elimina tareas repetitivas con reglas personalizadas que mueven, asignan y notifican automáticamente." },
    { icon: BarChart3, title: "Reportes en Tiempo Real", desc: "Dashboards dinámicos con las métricas que importan. Exporta en un click." },
];

const pricing = [
    {
        name: "Starter",
        price: "$0",
        period: "para siempre",
        desc: "Perfecto para equipos pequeños empezando a organizarse.",
        features: ["Hasta 5 usuarios", "3 proyectos activos", "Tableros básicos", "500 MB almacenamiento"],
        cta: "Empezar Gratis",
        popular: false,
    },
    {
        name: "Pro",
        price: "$29",
        period: "por usuario/mes",
        desc: "Para equipos que necesitan potencia y flexibilidad total.",
        features: ["Usuarios ilimitados", "Proyectos ilimitados", "Automatizaciones avanzadas", "Reportes personalizados", "Integraciones (Slack, Notion)", "Soporte prioritario"],
        cta: "Iniciar Prueba Gratis",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "facturación anual",
        desc: "Para organizaciones que requieren control total y compliance.",
        features: ["Todo de Pro", "SSO & SAML", "SLA garantizado", "Onboarding dedicado", "API avanzada", "Auditoría completa"],
        cta: "Contactar Ventas",
        popular: false,
    },
];

const testimonials = [
    { name: "Valentina Rojas", role: "Head of Product, TechFlow", text: "FlowOS transformó nuestra manera de trabajar. Pasamos de 3 herramientas a una sola y el equipo nunca fue tan productivo.", avatar: "VR" },
    { name: "Martín Aguirre", role: "CTO, ScaleUp Labs", text: "La mejor herramienta de gestión que probamos en 5 años. Las automatizaciones nos ahorran 15 horas semanales.", avatar: "MA" },
    { name: "Camila Torres", role: "PM, Innovatech", text: "Implementamos FlowOS en 2 días y ya teníamos a todo el equipo usándolo. La curva de aprendizaje es cero.", avatar: "CT" },
];

const logos = ["Meridian", "Quantum", "Vertex", "Helios", "Nextera", "Pulsar"];

export default function SaaSLanding() {
    const [emailSent, setEmailSent] = useState(false);

    return (
        <div className="min-h-screen bg-white text-[#111827] font-sans selection:bg-indigo-100">
            {/* Nav */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Zap size={16} className="text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">FlowOS</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
                        <a href="#features" className="hover:text-indigo-600 transition-colors">Funciones</a>
                        <a href="#pricing" className="hover:text-indigo-600 transition-colors">Precios</a>
                        <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Clientes</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">Iniciar Sesión</button>
                        <button className="bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors">
                            Prueba Gratis
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-8">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-xs font-semibold text-indigo-600">Nuevo: Integraciones con IA generativa</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight max-w-4xl mx-auto mb-6">
                            Gestioná tu equipo <span className="text-indigo-600">sin fricción.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                            FlowOS reúne proyectos, tareas y comunicación en una plataforma intuitiva. Menos herramientas, más resultados.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2">
                                Empezar Gratis <ArrowRight size={18} />
                            </button>
                            <button className="text-gray-600 px-8 py-4 rounded-xl font-medium text-base border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2">
                                Ver Demo <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Product mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-16 max-w-4xl mx-auto"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                            {/* Window chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="flex-1 text-center text-xs text-gray-400">app.flowos.com</div>
                            </div>
                            {/* Fake dashboard */}
                            <div className="p-6 bg-gray-50/30">
                                <div className="grid grid-cols-4 gap-3 mb-4">
                                    {[
                                        { label: "Tareas Activas", val: "24", color: "indigo" },
                                        { label: "Completadas Hoy", val: "8", color: "emerald" },
                                        { label: "En Revisión", val: "5", color: "amber" },
                                        { label: "Bloqueadas", val: "2", color: "red" },
                                    ].map((m, i) => (
                                        <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 text-left">
                                            <p className="text-[10px] text-gray-400 font-medium">{m.label}</p>
                                            <p className="text-xl font-bold mt-1">{m.val}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {["Por hacer", "En progreso", "Completado"].map((col, i) => (
                                        <div key={i} className="bg-white rounded-xl p-3 border border-gray-100">
                                            <p className="text-xs font-semibold text-gray-500 mb-2">{col}</p>
                                            {[1, 2].map((_, j) => (
                                                <div key={j} className="bg-gray-50 rounded-lg p-2 mb-1.5 border border-gray-100">
                                                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-1.5" />
                                                    <div className="h-2 bg-gray-100 rounded w-1/2" />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Logos */}
            <section className="border-y border-gray-100 py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Empresas que confían en nosotros</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
                        {logos.map((l) => (
                            <span key={l} className="text-xl font-bold text-gray-200 tracking-tight">{l}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Funcionalidades</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Todo lo que tu equipo necesita</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <f.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="bg-gray-50/50 py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Precios</p>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple, transparente, justo</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {pricing.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-2xl p-8 flex flex-col ${p.popular
                                    ? "bg-indigo-600 text-white ring-4 ring-indigo-600/20 shadow-xl shadow-indigo-500/15 relative"
                                    : "bg-white border border-gray-200"
                                    }`}
                            >
                                {p.popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                        Más Popular
                                    </span>
                                )}
                                <h3 className="text-lg font-bold">{p.name}</h3>
                                <div className="mt-4 mb-2">
                                    <span className="text-4xl font-bold">{p.price}</span>
                                    <span className={`text-sm ml-1 ${p.popular ? "text-indigo-200" : "text-gray-400"}`}>{p.period}</span>
                                </div>
                                <p className={`text-sm mb-8 ${p.popular ? "text-indigo-200" : "text-gray-500"}`}>{p.desc}</p>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {p.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm">
                                            <Check size={16} className={`shrink-0 mt-0.5 ${p.popular ? "text-indigo-200" : "text-indigo-600"}`} />
                                            <span className={p.popular ? "text-indigo-100" : "text-gray-600"}>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${p.popular
                                    ? "bg-white text-indigo-600 hover:bg-indigo-50"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                                    }`}>
                                    {p.cta}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Testimonios</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Lo que dicen nuestros clientes</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-gray-100 rounded-2xl p-8"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{t.name}</p>
                                    <p className="text-xs text-gray-400">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-[#111827] text-white py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Empezá a construir mejor, hoy.</h2>
                    <p className="text-gray-400 mb-10 text-lg">Unite a las empresas que ya gestionan sus equipos con FlowOS. Sin tarjeta de crédito.</p>
                    {emailSent ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-4 rounded-xl font-medium">
                            <Check size={20} /> ¡Te enviamos un enlace de acceso!
                        </motion.div>
                    ) : (
                        <form
                            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                            onSubmit={(e) => { e.preventDefault(); setEmailSent(true); }}
                        >
                            <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4">
                                <Mail size={16} className="text-gray-500 shrink-0" />
                                <input type="email" required placeholder="tu@empresa.com" className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-500" />
                            </div>
                            <button type="submit" className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-indigo-500 transition-colors whitespace-nowrap flex items-center justify-center gap-2">
                                Empezar <ArrowRight size={16} />
                            </button>
                        </form>
                    )}
                </div>
            </section>

            <DemoNav />
        </div>
    );
}
