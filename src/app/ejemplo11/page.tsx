"use client";

import { useState } from "react";
import { GraduationCap, BookOpen, Play, Clock, Trophy, Star, ChevronRight, BarChart3, Users, CheckCircle2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DemoNav from "../components/DemoNav";

const courses = [
    { id: 1, title: "Fundamentos de UX/UI Design", instructor: "Laura Méndez", lessons: 24, duration: "6h 30m", level: "Principiante", rating: 4.9, students: 1420, image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800", progress: 75, color: "from-violet-500 to-purple-600" },
    { id: 2, title: "React Avanzado: Patrones y Performance", instructor: "Diego Acosta", lessons: 32, duration: "10h 15m", level: "Avanzado", rating: 4.8, students: 890, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800", progress: 30, color: "from-cyan-500 to-blue-600" },
    { id: 3, title: "Marketing Digital para Startups", instructor: "Camila Reyes", lessons: 18, duration: "4h 45m", level: "Intermedio", rating: 4.7, students: 2100, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", progress: 0, color: "from-emerald-500 to-teal-600" },
    { id: 4, title: "Inteligencia Artificial Aplicada", instructor: "Martín Varela", lessons: 28, duration: "8h 20m", level: "Intermedio", rating: 4.9, students: 3200, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", progress: 0, color: "from-amber-500 to-orange-600" },
];

const curriculum = [
    { title: "Introducción al Design Thinking", duration: "12:30", completed: true },
    { title: "Investigación de Usuarios", duration: "18:45", completed: true },
    { title: "Wireframes y Prototipos", duration: "22:10", completed: true },
    { title: "Sistemas de Diseño", duration: "15:20", completed: false, current: true },
    { title: "Usability Testing", duration: "20:00", completed: false },
    { title: "Handoff a Desarrollo", duration: "14:30", completed: false },
];

export default function ElearningPage() {
    const [activeTab, setActiveTab] = useState<"cursos" | "mi-progreso">("cursos");
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

    const activeCourse = courses.find((c) => c.id === selectedCourse);

    return (
        <div className="min-h-screen bg-[#0F0F1A] text-white font-sans selection:bg-violet-500/30">
            {/* Ambient */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px]" />
            </div>

            {/* Nav */}
            <nav className="relative z-20 border-b border-white/5 bg-[#0F0F1A]/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <GraduationCap size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">Aprende<span className="text-violet-400">Lab</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-xl p-1">
                        {(["cursos", "mi-progreso"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === tab ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}
                            >
                                {tab === "mi-progreso" ? "Mi Progreso" : "Cursos"}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5">
                            <Trophy size={14} className="text-amber-400" />
                            <span className="text-xs font-bold text-amber-400">2,450 XP</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">A</div>
                    </div>
                </div>
            </nav>

            {/* Course Detail Modal */}
            <AnimatePresence>
                {activeCourse && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setSelectedCourse(null)} />
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            className="fixed inset-4 md:inset-x-auto md:inset-y-8 md:max-w-2xl md:mx-auto z-50 bg-[#16162A] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden shrink-0">
                                <img src={activeCourse.image} alt={activeCourse.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#16162A] via-[#16162A]/50 to-transparent" />
                                <button className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white" onClick={() => setSelectedCourse(null)}>✕</button>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h2 className="text-xl font-bold">{activeCourse.title}</h2>
                                    <p className="text-sm text-white/50 mt-1">por {activeCourse.instructor}</p>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="flex flex-wrap gap-3 mb-6">
                                    <span className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5"><BookOpen size={12} /> {activeCourse.lessons} lecciones</span>
                                    <span className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5"><Clock size={12} /> {activeCourse.duration}</span>
                                    <span className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5"><Star size={12} className="text-amber-400" /> {activeCourse.rating}</span>
                                    <span className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5"><Users size={12} /> {activeCourse.students.toLocaleString()}</span>
                                </div>

                                <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">Contenido del Curso</h3>
                                <div className="space-y-2">
                                    {curriculum.map((item, i) => (
                                        <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${item.current ? "bg-violet-500/10 border-violet-500/30" : "bg-white/[0.02] border-white/5"}`}>
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.completed ? "bg-emerald-500/20 text-emerald-400" : item.current ? "bg-violet-500/20 text-violet-400" : "bg-white/5 text-white/20"}`}>
                                                {item.completed ? <CheckCircle2 size={16} /> : item.current ? <Play size={14} /> : <Lock size={14} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium truncate ${item.completed ? "text-white/50" : "text-white/90"}`}>{item.title}</p>
                                            </div>
                                            <span className="text-xs text-white/30 shrink-0">{item.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 border-t border-white/5 shrink-0">
                                <button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-shadow">
                                    <Play size={16} /> {activeCourse.progress > 0 ? "Continuar Curso" : "Comenzar Curso"}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-10">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Descubrí tu próximo curso</h1>
                    <p className="text-white/40 text-lg">Aprende a tu ritmo con contenido creado por expertos.</p>
                </motion.div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: "Cursos Activos", value: "2", icon: BookOpen, color: "violet" },
                        { label: "Horas Aprendidas", value: "28", icon: Clock, color: "cyan" },
                        { label: "Racha Actual", value: "12 días", icon: Trophy, color: "amber" },
                        { label: "Certificados", value: "3", icon: Star, color: "emerald" },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.03] border border-white/5 rounded-2xl p-5"
                        >
                            <s.icon size={18} className={`mb-3 ${s.color === "violet" ? "text-violet-400" : s.color === "cyan" ? "text-cyan-400" : s.color === "amber" ? "text-amber-400" : "text-emerald-400"}`} />
                            <p className="text-2xl font-bold">{s.value}</p>
                            <p className="text-xs text-white/30 mt-1">{s.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Course grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            onClick={() => setSelectedCourse(course.id)}
                            className="group bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-white/10 hover:bg-white/[0.05] transition-all"
                        >
                            <div className="relative h-44 overflow-hidden">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-transparent to-transparent" />
                                <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r ${course.color} text-white`}>
                                    {course.level}
                                </span>
                                {course.progress > 0 && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                                        <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" style={{ width: `${course.progress}%` }} />
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg mb-1 group-hover:text-violet-300 transition-colors">{course.title}</h3>
                                <p className="text-sm text-white/40 mb-4">por {course.instructor}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-xs text-white/30">
                                        <span className="flex items-center gap-1"><BookOpen size={12} /> {course.lessons}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                                        <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" /> {course.rating}</span>
                                    </div>
                                    <ChevronRight size={16} className="text-white/20 group-hover:text-violet-400 transition-colors" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            <DemoNav />
        </div>
    );
}
