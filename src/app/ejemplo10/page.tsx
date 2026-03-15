"use client";

import { useState } from "react";
import { Home, Activity, Apple, User, Bell, ChevronRight, Flame, Droplets, Footprints, Play, Clock, Dumbbell, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DemoNav from "../components/DemoNav";

function ProgressRing({ progress, size = 56, stroke = 4, color = "#F97316" }: { progress: number; size?: number; stroke?: number; color?: string }) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={stroke} />
            <motion.circle
                cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeDasharray={circumference}
            />
        </svg>
    );
}

const summaryCards = [
    { label: "Pasos", value: "8,432", target: "/ 10,000", progress: 84, icon: Footprints, color: "#F97316" },
    { label: "Calorías", value: "1,240", target: "/ 2,000", progress: 62, icon: Flame, color: "#EF4444" },
    { label: "Agua", value: "6", target: "/ 8 vasos", progress: 75, icon: Droplets, color: "#3B82F6" },
];

const workouts = [
    { id: 1, name: "HIIT Matutino", duration: "25 min", difficulty: "Intermedio", muscles: "Full Body", calories: 320, exercises: ["Burpees x12", "Mountain Climbers x20", "Jump Squats x15", "Plank 45s"] },
    { id: 2, name: "Fuerza Superior", duration: "40 min", difficulty: "Avanzado", muscles: "Pecho, Espalda, Hombros", calories: 280, exercises: ["Press Banca x10", "Remo con Barra x12", "Press Militar x10", "Pull-ups x8"] },
    { id: 3, name: "Yoga Flow", duration: "30 min", difficulty: "Principiante", muscles: "Flexibilidad", calories: 150, exercises: ["Saludo al Sol x5", "Guerrero I/II", "Perro boca abajo", "Savasana 5 min"] },
];

const weekData = [
    { day: "Lun", mins: 45, active: true },
    { day: "Mar", mins: 30, active: true },
    { day: "Mié", mins: 60, active: true },
    { day: "Jue", mins: 0, active: false },
    { day: "Vie", mins: 50, active: true },
    { day: "Sáb", mins: 25, active: true },
    { day: "Dom", mins: 0, active: false },
];
const maxMins = Math.max(...weekData.map((d) => d.mins), 1);

export default function FitnessApp() {
    const [activeTab, setActiveTab] = useState("home");
    const [expandedWorkout, setExpandedWorkout] = useState<number | null>(null);

    const tabs = [
        { id: "home", icon: Home, label: "Inicio" },
        { id: "activity", icon: Activity, label: "Actividad" },
        { id: "nutrition", icon: Apple, label: "Nutrición" },
        { id: "profile", icon: User, label: "Perfil" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FFF7ED] to-[#FEF3E2] flex items-start justify-center font-sans selection:bg-orange-200 p-4 sm:py-10">

            {/* Phone Frame */}
            <div className="w-full max-w-[430px] relative">
                {/* Phone border (desktop only) */}
                <div className="hidden sm:block absolute inset-0 -m-3 rounded-[3rem] border-[8px] border-[#1A1A1A] shadow-2xl shadow-black/20 pointer-events-none z-20" />
                <div className="hidden sm:block absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1A1A1A] rounded-b-2xl z-30" />

                <div className="bg-gradient-to-b from-[#FFECD2] to-[#FFF5EB] min-h-[85vh] sm:min-h-[780px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative flex flex-col">

                    {/* Status bar */}
                    <div className="flex items-center justify-between px-6 pt-4 pb-2 text-xs font-semibold text-[#8B6914]">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-2 rounded-sm border border-[#8B6914]/60 relative">
                                <div className="absolute inset-0.5 bg-[#8B6914]/60 rounded-[1px]" style={{ width: "75%" }} />
                            </div>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="px-6 pt-2 pb-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#A68A3E]">Buenos días</p>
                            <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Ana 👋</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="relative p-2">
                                <Bell size={22} className="text-[#6B5B30]" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
                            </button>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-pink-300 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-200">
                                A
                            </div>
                        </div>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-6">

                        {/* Streak banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-4 flex items-center gap-4 text-white shadow-lg shadow-orange-500/20"
                        >
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Trophy size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">¡Racha de 5 días! 🔥</p>
                                <p className="text-xs text-white/80">Seguí así, estás imparable.</p>
                            </div>
                            <ChevronRight size={20} className="text-white/50" />
                        </motion.div>

                        {/* Summary Cards */}
                        <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
                            {summaryCards.map((card, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    className="bg-white rounded-2xl p-4 min-w-[130px] flex-1 shadow-sm border border-orange-100/50 snap-start"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <card.icon size={18} style={{ color: card.color }} />
                                        <ProgressRing progress={card.progress} size={40} stroke={3} color={card.color} />
                                    </div>
                                    <p className="text-xl font-bold text-[#1A1A1A] leading-tight">{card.value}</p>
                                    <p className="text-[10px] text-[#999] mt-0.5">{card.target}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Workout Section */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="font-bold text-[#1A1A1A]">Tu Rutina de Hoy</h2>
                                <button className="text-xs font-semibold text-orange-500">Ver todas</button>
                            </div>

                            <div className="space-y-3">
                                {workouts.map((w, i) => (
                                    <motion.div
                                        key={w.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="bg-white rounded-2xl border border-orange-100/50 shadow-sm overflow-hidden"
                                    >
                                        <button
                                            className="w-full p-4 flex items-center gap-4 text-left"
                                            onClick={() => setExpandedWorkout(expandedWorkout === w.id ? null : w.id)}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${i === 0 ? "bg-orange-100 text-orange-600" : i === 1 ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"}`}>
                                                {i === 0 ? <Flame size={22} /> : i === 1 ? <Dumbbell size={22} /> : <Activity size={22} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-sm text-[#1A1A1A]">{w.name}</h3>
                                                <div className="flex items-center gap-3 text-xs text-[#999] mt-0.5">
                                                    <span className="flex items-center gap-1"><Clock size={10} /> {w.duration}</span>
                                                    <span className="flex items-center gap-1"><Flame size={10} /> {w.calories} cal</span>
                                                </div>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${w.difficulty === "Avanzado" ? "bg-red-50 text-red-500" : w.difficulty === "Intermedio" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                                                {w.difficulty}
                                            </span>
                                        </button>

                                        <AnimatePresence>
                                            {expandedWorkout === w.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 pb-4 pt-1 border-t border-orange-50">
                                                        <p className="text-[10px] text-[#999] uppercase tracking-wider font-semibold mb-2">Ejercicios</p>
                                                        <ul className="space-y-1.5">
                                                            {w.exercises.map((ex, j) => (
                                                                <li key={j} className="flex items-center gap-2 text-xs text-[#666]">
                                                                    <div className="w-5 h-5 rounded-md bg-orange-50 text-orange-400 flex items-center justify-center text-[9px] font-bold">{j + 1}</div>
                                                                    {ex}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <button className="mt-3 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm shadow-orange-300/30">
                                                            <Play size={14} /> Comenzar
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Weekly Chart */}
                        <div>
                            <h2 className="font-bold text-[#1A1A1A] mb-3">Actividad Semanal</h2>
                            <div className="bg-white rounded-2xl p-5 border border-orange-100/50 shadow-sm">
                                <div className="flex items-end justify-between gap-2 h-32">
                                    {weekData.map((d, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                            <motion.div
                                                className="w-full rounded-t-lg"
                                                initial={{ height: 0 }}
                                                animate={{ height: `${d.mins > 0 ? (d.mins / maxMins) * 100 : 4}%` }}
                                                transition={{ duration: 0.8, delay: i * 0.08 }}
                                                style={{
                                                    background: d.active
                                                        ? `linear-gradient(to top, #F97316, #FB923C)`
                                                        : "#F3F4F6",
                                                    minHeight: d.mins > 0 ? 8 : 4,
                                                }}
                                            />
                                            <span className={`text-[10px] font-semibold ${d.active ? "text-[#1A1A1A]" : "text-[#CCC]"}`}>
                                                {d.day}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                                    <span className="text-xs text-[#999]">Total esta semana</span>
                                    <span className="text-sm font-bold text-[#1A1A1A]">{weekData.reduce((s, d) => s + d.mins, 0)} min</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-orange-100/50 px-4 py-2 flex items-center justify-around safe-bottom">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${activeTab === tab.id ? "text-orange-500" : "text-[#BBB]"}`}
                            >
                                <tab.icon size={22} className={activeTab === tab.id ? "stroke-[2.5]" : ""} />
                                <span className="text-[9px] font-semibold">{tab.label}</span>
                                {activeTab === tab.id && (
                                    <motion.div layoutId="tab-indicator" className="w-1 h-1 rounded-full bg-orange-500 mt-0.5" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <DemoNav />
        </div>
    );
}
