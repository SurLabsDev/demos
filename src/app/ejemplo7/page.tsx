"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, Zap, MessageSquare, Activity, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";
import DemoNav from "../components/DemoNav";

interface WorkflowNode {
    label: string;
    desc: string;
}

interface Workflow {
    id: number;
    name: string;
    status: "active" | "paused";
    processed: number;
    icon: typeof Bot;
    nodes: WorkflowNode[];
}

const workflows: Workflow[] = [
    {
        id: 1, name: "Lead Qualification Bot", status: "active", processed: 2847, icon: Bot,
        nodes: [
            { label: "Trigger", desc: "Formulario web" },
            { label: "Process", desc: "Scoring con IA" },
            { label: "Decision", desc: "Frío / tibio / caliente" },
            { label: "Action", desc: "Alta en CRM + Slack" },
        ],
    },
    {
        id: 2, name: "Invoice Processor", status: "active", processed: 1203, icon: Zap,
        nodes: [
            { label: "Trigger", desc: "Factura por email" },
            { label: "Process", desc: "OCR + extracción" },
            { label: "Decision", desc: "Match con orden de compra" },
            { label: "Action", desc: "Alta en contabilidad" },
        ],
    },
    {
        id: 3, name: "Support Triage Agent", status: "active", processed: 8741, icon: MessageSquare,
        nodes: [
            { label: "Trigger", desc: "Ticket entrante" },
            { label: "Process", desc: "Clasificación por tema" },
            { label: "Decision", desc: "Auto-resolver o escalar" },
            { label: "Action", desc: "Respuesta + asignación" },
        ],
    },
    {
        id: 4, name: "Data Enrichment Pipeline", status: "paused", processed: 456, icon: Activity,
        nodes: [
            { label: "Trigger", desc: "Registro sin datos" },
            { label: "Process", desc: "Búsqueda en fuentes" },
            { label: "Decision", desc: "Confianza del match" },
            { label: "Action", desc: "Actualizar ficha" },
        ],
    },
    {
        id: 5, name: "Email Sentiment Analyzer", status: "active", processed: 3122, icon: Sparkles,
        nodes: [
            { label: "Trigger", desc: "Respuesta de cliente" },
            { label: "Process", desc: "Análisis de sentimiento" },
            { label: "Decision", desc: "Riesgo de churn" },
            { label: "Action", desc: "Aviso a Customer Success" },
        ],
    },
];

interface ChatMessage {
    role: "user" | "ai";
    text: string;
}

const chatMessages: ChatMessage[] = [
    { role: "user", text: "¿Cuántos leads calificados tenemos esta semana?" },
    { role: "ai", text: "Esta semana se calificaron 147 leads. 32 fueron marcados como alta prioridad y ya se asignaron al equipo de ventas automáticamente." },
    { role: "user", text: "¿Cuál es el tiempo promedio de respuesta del soporte?" },
    { role: "ai", text: "El tiempo promedio de primera respuesta es 1.2 minutos. El bot de triage resolvió el 68% de los tickets sin intervención humana." },
    { role: "user", text: "Activa el pipeline de enriquecimiento de datos." },
    { role: "ai", text: "Pipeline activado. Comenzando enriquecimiento para 456 registros pendientes. Tiempo estimado: 12 minutos." },
];

/**
 * Respuestas guionadas del asistente. Se elige la primera cuyo keyword aparezca
 * en la pregunta; si no hay match se usa el fallback. Sin backend: la gracia es
 * que el visitante escriba y el panel le conteste algo coherente.
 */
const scriptedReplies: { keywords: string[]; reply: string }[] = [
    { keywords: ["lead", "prospecto", "contacto"], reply: "Tenés 147 leads calificados esta semana, 32 de alta prioridad. El bot de calificación los puntúa apenas entran y los asigna solo." },
    { keywords: ["venta", "factur", "ingreso", "cobr"], reply: "El pipeline de facturación procesó 1.203 documentos este mes con 99,2% de precisión. Se ahorraron unas 40 horas de carga manual." },
    { keywords: ["soporte", "ticket", "reclamo"], reply: "El agente de triage resolvió el 68% de los tickets sin intervención humana. Primera respuesta promedio: 1,2 segundos." },
    { keywords: ["client", "churn", "satisfac"], reply: "El análisis de sentimiento marcó 4 cuentas con riesgo de churn esta semana. Customer Success ya recibió el aviso con el historial de cada una." },
    { keywords: ["automatiz", "workflow", "flujo", "proceso"], reply: "Hay 5 workflows configurados, 4 activos. Entre todos procesaron 16.369 operaciones. La tasa de automatización está en 94%." },
    { keywords: ["cost", "ahorr", "roi", "precio"], reply: "Las automatizaciones activas equivalen a unas 320 horas de trabajo manual por mes. El retorno se dio en el segundo mes de operación." },
    { keywords: ["hola", "buenas", "qué tal", "que tal"], reply: "Hola. Puedo consultarte métricas de leads, soporte, facturación o el estado de cualquier workflow. ¿Por dónde arrancamos?" },
];

const fallbackReply = "Puedo responderte sobre leads, soporte, facturación, riesgo de churn o el estado de los workflows. Probá preguntarme por alguno de esos.";

function replyFor(question: string): string {
    const q = question.toLowerCase();
    const match = scriptedReplies.find((r) => r.keywords.some((k) => q.includes(k)));
    return match ? match.reply : fallbackReply;
}

/**
 * Cuenta hasta `target` con easing. Interpola en float y formatea al final:
 * la versión anterior usaba Math.floor y dejaba el 1.2s clavado en "0" durante
 * los dos segundos de animación.
 */
function AnimatedCounter({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        let raf = 0;
        let startTime: number | null = null;

        const tick = (now: number) => {
            if (startTime === null) startTime = now;
            const t = Math.min((now - startTime) / duration, 1);
            // easeOutCubic
            setCount(target * (1 - Math.pow(1 - t, 3)));
            if (t < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target]);

    const formatted = count.toLocaleString("es-UY", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    return <>{formatted}{suffix}</>;
}

const suggestedQuestions = [
    "¿Cómo viene el soporte?",
    "¿Hay clientes en riesgo?",
    "¿Cuánto ahorramos este mes?",
];

export default function AIDashboard() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [input, setInput] = useState("");
    const [userStarted, setUserStarted] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState(1);
    const chatRef = useRef<HTMLDivElement>(null);
    const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const activeWorkflow = workflows.find((w) => w.id === selectedWorkflow) ?? workflows[0];

    /**
     * Guión de arranque: se reproduce solo para que el panel no se vea muerto.
     * Todo el guión se agenda de una y cada mensaje aparece desde su timer, así
     * el efecto nunca llama a setState en su cuerpo. Apenas el visitante escribe,
     * `userStarted` cambia, la limpieza cancela lo que quedaba y la conversación
     * pasa a ser suya.
     */
    useEffect(() => {
        if (userStarted) return;
        let cancelled = false;
        const timers: ReturnType<typeof setTimeout>[] = [];
        let elapsed = 0;

        for (const msg of chatMessages) {
            const isAI = msg.role === "ai";
            if (isAI) {
                const showTypingAt = elapsed;
                timers.push(setTimeout(() => { if (!cancelled) setIsTyping(true); }, showTypingAt));
            }
            elapsed += isAI ? 1500 : 800;
            timers.push(setTimeout(() => {
                if (cancelled) return;
                setIsTyping(false);
                setMessages((m) => [...m, msg]);
            }, elapsed));
        }

        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, [userStarted]);

    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => () => {
        if (replyTimer.current) clearTimeout(replyTimer.current);
    }, []);

    const ask = (question: string) => {
        const clean = question.trim();
        if (!clean || isTyping) return;
        setUserStarted(true);
        setInput("");
        setMessages((m) => [...m, { role: "user", text: clean }]);
        setIsTyping(true);
        replyTimer.current = setTimeout(() => {
            setIsTyping(false);
            setMessages((m) => [...m, { role: "ai", text: replyFor(clean) }]);
        }, 900);
    };

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
                                { label: "Mensajes Procesados", value: 12847, suffix: "", decimals: 0, color: "cyan" },
                                { label: "Tiempo Resp. Promedio", value: 1.2, suffix: "s", decimals: 1, color: "emerald" },
                                { label: "Tasa Automatización", value: 94, suffix: "%", decimals: 0, color: "purple" },
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
                                        <AnimatedCounter target={m.value} suffix={m.suffix} decimals={m.decimals} />
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
                                    {messages.map((msg, i) => (
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

                                <div className="p-4 border-t border-white/5 space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedQuestions.map((q) => (
                                            <button
                                                key={q}
                                                type="button"
                                                onClick={() => ask(q)}
                                                disabled={isTyping}
                                                className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/50 hover:text-white/80 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>

                                    <form
                                        onSubmit={(e) => { e.preventDefault(); ask(input); }}
                                        className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 focus-within:border-cyan-500/30 transition-colors"
                                    >
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Preguntá algo a NexusAI..."
                                            aria-label="Escribí tu consulta"
                                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/20 text-white/80"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!input.trim() || isTyping}
                                            aria-label="Enviar consulta"
                                            className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <Send size={16} />
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Workflow Builder */}
                            <div className="xl:col-span-2 bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col">
                                <div className="flex items-start justify-between gap-3 mb-6">
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-semibold">Workflow Builder</h3>
                                        <p className="text-[11px] text-white/40 truncate mt-0.5">{activeWorkflow.name}</p>
                                    </div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 border ${activeWorkflow.status === "active"
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                        }`}>
                                        {activeWorkflow.status === "active" ? "Live" : "En pausa"}
                                    </span>
                                </div>

                                <div className="flex-1 flex flex-col justify-center gap-4">
                                    {activeWorkflow.nodes.map((node, i) => (
                                        <motion.div
                                            key={`${activeWorkflow.id}-${i}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}
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
                                            {i < activeWorkflow.nodes.length - 1 && (
                                                <div className="ml-5 h-4 w-px bg-gradient-to-b from-white/10 to-transparent" />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs text-white/30">
                                        {activeWorkflow.nodes.length} nodos · {activeWorkflow.processed.toLocaleString("es-UY")} procesados
                                    </span>
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
