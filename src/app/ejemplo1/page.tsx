"use client";

import { useState, useEffect } from "react";
import {
    BarChart3, Users, Zap, Terminal, Activity, Search, Bell, Settings,
    Cpu, Network, DollarSign, TrendingUp, LineChart, UserPlus, Menu, X
} from "lucide-react";
import DemoNav from "../components/DemoNav";

const metrics = [
    { id: 1, label: "Ingresos Totales", value: "$42.5K", change: "+14.5%", positive: true, icon: DollarSign },
    { id: 2, label: "Ventas Cerradas", value: "312", change: "+12", positive: true, icon: TrendingUp },
    { id: 3, label: "Nuevos Leads", value: "1,240", change: "+5%", positive: true, icon: UserPlus },
    { id: 4, label: "Tasa de Conversión", value: "4.2%", change: "-0.4%", positive: false, icon: LineChart },
];

const chartData: Record<string, { path: string; area: string; points: { cx: number; cy: number; val: string }[] }> = {
    "1M": {
        path: "M 0 150 C 100 100, 200 200, 300 120 C 400 40, 500 180, 600 90 C 700 0, 800 130, 900 60 C 950 25, 1000 100, 1000 100",
        area: "M 0 250 L 0 150 C 100 100, 200 200, 300 120 C 400 40, 500 180, 600 90 C 700 0, 800 130, 900 60 C 950 25, 1000 100, 1000 100 L 1000 250 Z",
        points: [
            { cx: 300, cy: 120, val: "$28.3K" },
            { cx: 600, cy: 90, val: "$35.1K" },
            { cx: 900, cy: 60, val: "$42.5K" },
        ],
    },
    "3M": {
        path: "M 0 200 C 120 180, 200 160, 300 170 C 400 120, 500 100, 600 130 C 700 80, 800 50, 900 70 C 950 40, 1000 60, 1000 60",
        area: "M 0 250 L 0 200 C 120 180, 200 160, 300 170 C 400 120, 500 100, 600 130 C 700 80, 800 50, 900 70 C 950 40, 1000 60, 1000 60 L 1000 250 Z",
        points: [
            { cx: 300, cy: 170, val: "$18.7K" },
            { cx: 600, cy: 130, val: "$29.4K" },
            { cx: 900, cy: 70, val: "$42.5K" },
        ],
    },
    "YTD": {
        path: "M 0 230 C 100 220, 200 210, 300 190 C 400 170, 500 150, 600 140 C 700 120, 800 90, 900 80 C 950 50, 1000 45, 1000 45",
        area: "M 0 250 L 0 230 C 100 220, 200 210, 300 190 C 400 170, 500 150, 600 140 C 700 120, 800 90, 900 80 C 950 50, 1000 45, 1000 45 L 1000 250 Z",
        points: [
            { cx: 300, cy: 190, val: "$12.1K" },
            { cx: 600, cy: 140, val: "$25.8K" },
            { cx: 900, cy: 80, val: "$42.5K" },
        ],
    },
};

const activityLogs = [
    { time: "12:34", tag: "VENTA", color: "text-emerald-400", msg: "Cierre de deal c/ Acme Corp ($4k)" },
    { time: "12:15", tag: "LEAD", color: "text-emerald-400", msg: "Nuevo registro orgánico website" },
    { time: "11:02", tag: "TAREA", color: "text-amber-400", msg: "Recordatorio: Llamar a Juan Perez" },
    { time: "10:45", tag: "PERDIDO", color: "text-red-400", msg: "Oportunidad en TechSA cancelada" },
    { time: "09:30", tag: "MEETING", color: "text-emerald-400", msg: "Kickoff proyecto Nexus cerrado" },
    { time: "08:00", tag: "SISTEMA", color: "text-emerald-400", msg: "Sincronización de base de datos OK" },
    { time: "07:15", tag: "LEAD", color: "text-emerald-400", msg: "Nuevo lead vía LinkedIn Ads" },
    { time: "06:00", tag: "SISTEMA", color: "text-emerald-400", msg: "Backup automático completado" },
];

const pipelineRows = [
    { id: "Tech Innovators Latam", status: "En Negociación", prob: "75%", val: "$12,500", rep: "Ana Gomez" },
    { id: "Grupo Constructor BA", status: "Propuesta Enviada", prob: "45%", val: "$8,200", rep: "Carlos Ruiz" },
    { id: "Logística Express", status: "Reunión Inicial", prob: "20%", val: "$4,500", rep: "Ana Gomez" },
    { id: "Vanguardia Textiles", status: "Cierre Inminente", prob: "95%", val: "$18,000", rep: "Lorena Paz" },
];

export default function CRMDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chartPeriod, setChartPeriod] = useState("1M");
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
    const [typedText, setTypedText] = useState("");

    const currentChart = chartData[chartPeriod];

    // Typewriter effect for newest log
    useEffect(() => {
        const fullText = "Nuevo lead calificado vía campaña Q1 ($2.8k est.)";
        let i = 0;
        setTypedText("");
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 40);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#06080A] text-zinc-300 font-mono selection:bg-emerald-500/30">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 border-r border-emerald-900/30 bg-[#090b0e] z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="flex h-16 items-center border-b border-emerald-900/30 px-6 justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center justify-center">
                            <Terminal size={14} className="text-[#06080A]" />
                        </div>
                        <span className="font-bold text-emerald-400 tracking-wider">NEXUS_CRM</span>
                    </div>
                    <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    <div className="text-xs font-semibold text-zinc-600 mb-2 uppercase tracking-wider px-2 mt-4">Comercial</div>
                    <NavItem icon={<BarChart3 size={18} />} label="Panel Principal" active />
                    <NavItem icon={<Users size={18} />} label="Leads & Clientes" />
                    <NavItem icon={<TrendingUp size={18} />} label="Pipeline de Ventas" />

                    <div className="text-xs font-semibold text-zinc-600 mb-2 uppercase tracking-wider px-2 mt-8">Operaciones</div>
                    <NavItem icon={<Activity size={18} />} label="Rendimiento de Equipo" />
                    <NavItem icon={<Settings size={18} />} label="Configuración" />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:pl-64 flex flex-col min-h-screen">
                {/* Topbar */}
                <header className="h-16 border-b border-emerald-900/30 bg-[#06080A]/80 backdrop-blur shrink-0 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="lg:hidden text-zinc-400 hover:text-emerald-400 transition-colors" onClick={() => setSidebarOpen(true)}>
                            <Menu size={22} />
                        </button>
                        <div className="relative w-64 hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="text"
                                placeholder="Buscar clientes o métricas..."
                                className="w-full bg-[#0d1116] border border-emerald-900/30 text-sm rounded-md pl-9 pr-4 py-2 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-emerald-100 placeholder:text-zinc-600"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative text-zinc-400 hover:text-emerald-400 transition-colors">
                            <Bell size={20} />
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-500 font-bold text-sm">
                            AD
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 p-4 sm:p-6 space-y-8 overflow-y-auto">
                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Gestión Comercial y CRM</h1>
                        <p className="text-zinc-500 text-sm">Métricas de ventas en tiempo real y rendimiento del equipo.</p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {metrics.map((m) => (
                            <div key={m.id} className="bg-[#0d1116] border border-emerald-900/20 rounded-lg p-5 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-emerald-500/10 transition-colors" />
                                <div className="flex items-start justify-between relative z-10">
                                    <div>
                                        <p className="text-zinc-500 text-sm mb-1">{m.label}</p>
                                        <p className="text-3xl font-bold text-white tracking-tight">{m.value}</p>
                                    </div>
                                    <div className="p-2 bg-emerald-950/30 rounded-md text-emerald-500">
                                        <m.icon size={20} />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2 relative z-10 text-sm">
                                    <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${m.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                        {m.change}
                                    </span>
                                    <span className="text-zinc-600 text-xs">vs mes anterior</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Chart Area */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 bg-[#0d1116] border border-emerald-900/20 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold text-white">Evolución de Ventas e Ingresos</h3>
                                <div className="flex gap-2 text-xs">
                                    {(["1M", "3M", "YTD"] as const).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setChartPeriod(p)}
                                            className={`px-3 py-1 rounded transition-colors ${chartPeriod === p ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="h-64 w-full relative mt-4">
                                <div className="absolute inset-0 flex flex-col justify-between">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-full h-[1px] bg-emerald-900/10" />
                                    ))}
                                </div>

                                <svg viewBox="0 0 1000 250" className="w-full h-full overflow-visible absolute inset-0">
                                    <defs>
                                        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
                                            <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                                        </linearGradient>
                                    </defs>
                                    <path d={currentChart.area} fill="url(#glow)" className="transition-all duration-500" />
                                    <path d={currentChart.path} fill="none" stroke="#10b981" strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-500" />

                                    {currentChart.points.map((pt, i) => (
                                        <g key={i}>
                                            <circle
                                                cx={pt.cx} cy={pt.cy} r={hoveredPoint === i ? 7 : 4}
                                                fill="#06080A" stroke="#10b981" strokeWidth="2"
                                                className="transition-all duration-200 cursor-pointer"
                                                onMouseEnter={() => setHoveredPoint(i)}
                                                onMouseLeave={() => setHoveredPoint(null)}
                                            />
                                            {hoveredPoint === i && (
                                                <>
                                                    <rect x={pt.cx - 35} y={pt.cy - 32} width="70" height="22" rx="4" fill="#0d1116" stroke="#10b981" strokeWidth="1" />
                                                    <text x={pt.cx} y={pt.cy - 17} textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">{pt.val}</text>
                                                </>
                                            )}
                                        </g>
                                    ))}
                                </svg>
                            </div>
                        </div>

                        {/* Activity Feed */}
                        <div className="bg-[#0b0f14] border border-emerald-900/30 rounded-lg p-5 flex flex-col font-mono relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-0" />
                            <div className="flex items-center gap-2 mb-4 text-emerald-500 z-10">
                                <Activity size={18} />
                                <h3 className="font-semibold">Actividad Reciente</h3>
                                <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>

                            <div className="flex-1 space-y-2 text-xs text-zinc-400 z-10 overflow-y-auto max-h-64 pr-1">
                                {/* Typewriter entry */}
                                <div className="flex gap-2">
                                    <span className="text-zinc-500 shrink-0">12:40</span>
                                    <span className="text-cyan-400 shrink-0">[LEAD]</span>
                                    <span className="text-emerald-300">{typedText}<span className="animate-pulse">▌</span></span>
                                </div>

                                {activityLogs.map((log, i) => (
                                    <div key={i} className="flex gap-2">
                                        <span className="text-zinc-500 shrink-0">{log.time}</span>
                                        <span className={`${log.color} shrink-0`}>[{log.tag}]</span>
                                        <span>{log.msg}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-[#0d1116] border border-emerald-900/20 rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-emerald-900/20 flex items-center justify-between">
                            <h3 className="font-semibold text-white">Negocios en Curso (Pipeline)</h3>
                            <button className="text-emerald-400 text-sm hover:text-emerald-300">Ver Todos</button>
                        </div>
                        {/* Scroll container with fade hints */}
                        <div className="relative">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left min-w-[600px]">
                                    <thead className="text-xs text-zinc-500 uppercase bg-[#090b0e]">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">Empresa / Cliente</th>
                                            <th className="px-6 py-3 font-medium">Estado</th>
                                            <th className="px-6 py-3 font-medium">Probabilidad</th>
                                            <th className="px-6 py-3 font-medium">Valor Estimado</th>
                                            <th className="px-6 py-3 font-medium">Responsable</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-emerald-900/10">
                                        {pipelineRows.map((row, i) => (
                                            <tr key={i} className="hover:bg-emerald-900/5 transition-colors">
                                                <td className="px-6 py-4 font-medium text-emerald-100">{row.id}</td>
                                                <td className="px-6 py-4 text-emerald-400">
                                                    <span className={`flex items-center gap-1.5 ${row.status.includes('Inicial') ? 'text-amber-400' : ''}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${row.status.includes('Inicial') ? 'bg-amber-400' : 'bg-emerald-500 ring-4 ring-emerald-500/20'}`}></span>
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-zinc-300">{row.prob}</td>
                                                <td className="px-6 py-4 text-zinc-300">{row.val}</td>
                                                <td className="px-6 py-4 text-zinc-500">{row.rep}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <DemoNav />
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <a
            href="#"
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${active
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[inset_2px_0_0_0_rgba(16,185,129,1)]'
                : 'text-zinc-400 hover:text-emerald-100 hover:bg-[#0d1116]'
                }`}
        >
            <span className={active ? 'text-emerald-400' : 'text-zinc-500'}>{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </a>
    );
}
