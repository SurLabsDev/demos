"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, Zap, MessageSquare, Activity, Play, Pause, CheckCircle2, AlertCircle, Clock, ArrowRight, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DemoNav from "../components/DemoNav";

const workflows = [
    { id: 1, name: "Lead Qualification Bot", status: "active", processed: 2847, icon: Bot },
    { id: 2, name: "Invoice Processor", status: "active", processed: 1203, icon: Zap },
    { id: 3, name: "Support Triage Agent", status: "active", processed: 8741, icon: MessageSquare },
    { id: 4, name: "Data Enrichment Pipeline", status: "paused", processed: 456, icon: Activity },
    { id: 5, name: "Email Sentiment Analyzer", status: "active", processed: 3122, icon: Sparkles },
];

const chatMessages = [
    { role: "user", text: "¿Cuántos leads calificados tenemos esta semana?" },
    { role: "ai", text: "Esta semana se calificaron 147 leads. 32 fueron marcados como alta prioridad y ya se asignaron al equipo de ventas automáticamente." },
    { role: "user", text: "¿Cuál es el tiempo promedio de respuesta del soporte?" },
    { role: "ai", text: "El tiempo promedio de primera respuesta es 1.2 minutos. El bot de triage resolvió el 68% de los tickets sin intervención humana." },
    { role: "user", text: "Activa el pipeline de enriquecimiento de datos." },
    { role: "ai", text: "Pipeline activado. Comenzando enriquecimiento para 456 registros pendientes. Tiempo estimado: 12 minutos." },
];

const workflowNodes = [
    { label: "Trigger", desc: "Webhook / Email", x: 0 },
    { label: "Process", desc: "AI Analysis", x: 1 },
    { label: "Decision", desc: "Route Logic", x: 2 },
    { label: "Action", desc: "CRM / Slack", x: 3 },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const interval = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(interval);
    }, [target]);
    return <>{count.toLocaleString()}{suffix}</>;
}

export default function AIDashboard() {
    const [visibleMessages, setVisibleMessages] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState(1);
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (visibleMessages >= chatMessages.length) return;
        const nextIsAI = chatMessages[visibleMessages]?.role === "ai";
        const delay = nextIsAI ? 1500 : 800;

        if (nextIsAI) {
            setIsTyping(true);
            const typingTimer = setTimeout(() => {
                setIsTyping(false);
                setVisibleMessages((v) => v + 1);
            }, delay);
            return () => clearTimeout(typingTimer);
        }

        const timer = setTimeout(() => {
            setVisibleMessages((v) => v + 1);
        }, delay);
        return () => clearTimeout(timer);
    }, [visibleMessages]);

    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }, [visibleMessages, isTyping]);

    return (
        <div className="min-h-screen bg-[#07070F] text-white font-sans selection:bg-cyan-500/30">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
                {/* Sidebar */}
                <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-white/5 bg-[#0A0A14]/80 backdrop-blur-xl shrink-0">
                    <div className="p-6 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <Sparkles size={20} className="text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg tracking-tight">NexusAI</h1>
                                <p className="text-xs text-white/40">Operations Hub</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3 px-2">Workflows Activos</p>
                        <div className="space-y-1">
                            {workflows.map((w) => (
                                <button
                                    key={w.id}
                                    onClick={() => setSelectedWorkflow(w.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${selectedWorkflow === w.id ? 'bg-white/5 border border-white/10' : 'hover:bg-white/[0.03]'}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${w.status === "active" ? "bg-cyan-500/10 text-cyan-400" : "bg-white/5 text-white/30"}`}>
                                        <w.icon size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{w.name}</p>
                                        <div className="flex items-center gap-2 text-xs text-white/40">
                                            <span className={`w-1.5 h-1.5 rounded-full ${w.status === "active" ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" : "bg-amber-400"}`} />
                                            {w.processed.toLocaleString()} proc.
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top bar */}
                    <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-[#07070F]/50 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
                            <span className="text-sm text-white/60">Todos los sistemas operativos</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-white/40 hidden sm:block">Última sincronización: hace 12s</span>
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                        {/* Metrics Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { label: "Mensajes Procesados", value: 12847, suffix: "", color: "cyan" },
                                { label: "Tiempo Resp. Promedio", value: 1.2, suffix: "s", color: "emerald" },
                                { label: "Tasa Automatización", value: 94, suffix: "%", color: "purple" },
                            ].map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-white/10 transition-colors"
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-20 ${m.color === "cyan" ? "bg-cyan-500" : m.color === "emerald" ? "bg-emerald-500" : "bg-purple-500"}`} />
                                    <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2">{m.label}</p>
                                    <p className="text-3xl font-bold tracking-tight">
                                        <AnimatedCounter target={m.value} suffix={m.suffix} />
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Chat + workflow row */}
                        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                            {/* Chat Interface */}
                            <div className="xl:col-span-3 bg-white/[0.03] border border-white/5 rounded-2xl flex flex-col overflow-hidden" style={{ minHeight: 420 }}>
                                <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                                        <Bot size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Asistente NexusAI</p>
                                        <p className="text-[10px] text-white/40">Modelo avanzado · Conectado a tus datos</p>
                                    </div>
                                </div>

                                <div ref={chatRef} className="flex-1 overflow-y-auto p-5 space-y-4">
                                    {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                                ? "bg-cyan-500/10 border border-cyan-500/20 text-white/90 rounded-br-md"
                                                : "bg-white/5 border border-white/5 text-white/70 rounded-bl-md"
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                            <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                                                {[0, 1, 2].map((d) => (
                                                    <motion.span
                                                        key={d}
                                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                                        transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }}
                                                        className="w-2 h-2 rounded-full bg-cyan-400"
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                <div className="p-4 border-t border-white/5">
                                    <div className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3">
                                        <input
                                            type="text"
                                            placeholder="Preguntá algo a NexusAI..."
                                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/20 text-white/80"
                                        />
                                        <button className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                                            <Send size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Workflow Builder */}
                            <div className="xl:col-span-2 bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-semibold">Workflow Builder</h3>
                                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Live</span>
                                </div>

                                <div className="flex-1 flex flex-col justify-center gap-4">
                                    {workflowNodes.map((node, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + i * 0.2 }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${i === 0 ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                                                    : i === 1 ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                                                        : i === 2 ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                                            : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                                    }`}>
                                                    {i === 0 ? <Zap size={16} /> : i === 1 ? <Sparkles size={16} /> : i === 2 ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold">{node.label}</p>
                                                    <p className="text-[10px] text-white/30">{node.desc}</p>
                                                </div>
                                                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                                            </div>
                                            {i < workflowNodes.length - 1 && (
                                                <div className="ml-5 h-4 w-px bg-gradient-to-b from-white/10 to-transparent" />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs text-white/30">4 nodos · 3 activos</span>
                                    <button className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors">
                                        Editar flujo <ArrowRight size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DemoNav />
        </div>
    );
}
