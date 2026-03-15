"use client";

import { useState, useMemo } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, User, ChevronLeft, ChevronRight, CheckCircle2, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DemoNav from "../components/DemoNav";

const MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DAY_LABELS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

const timeSlotSets = [
    ["09:00", "09:45", "10:30", "11:15", "14:00", "14:45", "15:30", "16:15"],
    ["08:30", "09:15", "10:00", "11:00", "13:30", "14:30", "15:15", "16:00"],
    ["09:30", "10:15", "11:00", "14:00", "15:00", "15:45", "16:30", "17:00"],
];

const occupiedSlots: Record<number, number[]> = {
    0: [1, 4],
    1: [0, 3, 6],
    2: [2, 5],
};

export default function SmartBooking() {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const today = new Date();
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [viewYear, setViewYear] = useState(today.getFullYear());

    const services = [
        { id: "S1", name: "Consulta Especializada", duration: "45 min", price: "$60.00", icon: <User className="text-blue-500" /> },
        { id: "S2", name: "Estudio Completo", duration: "90 min", price: "$120.00", icon: <Activity className="text-emerald-500" /> },
        { id: "S3", name: "Sesión de Control", duration: "30 min", price: "$40.00", icon: <CalendarIcon className="text-purple-500" /> }
    ];

    const calendarData = useMemo(() => {
        const firstDay = new Date(viewYear, viewMonth, 1).getDay();
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        return { firstDay, daysInMonth };
    }, [viewMonth, viewYear]);

    const isDayPast = (day: number) => {
        const d = new Date(viewYear, viewMonth, day);
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return d < todayStart;
    };

    const isDayWeekend = (day: number) => {
        const d = new Date(viewYear, viewMonth, day).getDay();
        return d === 0 || d === 6;
    };

    const isToday = (day: number) => {
        return day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
    };

    const canGoBack = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

    const navigateMonth = (delta: number) => {
        let m = viewMonth + delta;
        let y = viewYear;
        if (m < 0) { m = 11; y--; }
        if (m > 11) { m = 0; y++; }
        if (delta < 0 && !canGoBack) return;
        setViewMonth(m);
        setViewYear(y);
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const getTimeSlotsForDay = (day: number) => {
        const setIndex = day % 3;
        const slots = timeSlotSets[setIndex];
        const occupied = occupiedSlots[setIndex] || [];
        return slots.map((time, i) => ({ time, occupied: occupied.includes(i) }));
    };

    const stepVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-800 font-sans selection:bg-blue-500/30">
            {/* Background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
                <div className="absolute top-1/2 -left-20 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
                <div className="absolute -bottom-40 right-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
            </div>

            <nav className="relative z-10 w-full p-6 flex justify-between items-center max-w-6xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-xl shadow-lg flex items-center justify-center text-white">
                        <CalendarIcon size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">AgendaSmart</span>
                </div>
                <div className="text-sm font-medium text-slate-500">
                    ¿Necesitas ayuda? <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">Contáctanos</a>
                </div>
            </nav>

            <main className="relative z-10 max-w-4xl mx-auto px-6 pt-10 pb-24">

                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full -z-10" />
                        <motion.div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full -z-10"
                            animate={{ width: `${(step - 1) * 50}%` }}
                            transition={{ duration: 0.4 }}
                        />

                        {[
                            { num: 1, label: "Servicio" },
                            { num: 2, label: "Fecha y Hora" },
                            { num: 3, label: "Confirmación" }
                        ].map((s) => (
                            <div key={s.num} className="flex flex-col items-center gap-2">
                                <motion.div
                                    animate={{
                                        backgroundColor: step >= s.num ? "#3b82f6" : "#ffffff",
                                        color: step >= s.num ? "#ffffff" : "#94a3b8",
                                    }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= s.num ? 'shadow-lg shadow-blue-500/30' : 'border-2 border-slate-100'}`}
                                >
                                    {step > s.num ? <CheckCircle2 size={20} /> : s.num}
                                </motion.div>
                                <span className={`text-xs font-semibold uppercase tracking-wider ${step >= s.num ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic Content */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white p-6 sm:p-8 md:p-12 transition-all duration-500">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Selecciona un servicio</h2>
                                <p className="text-slate-500 mb-8">Elige el tipo de atención que necesitas para continuar.</p>

                                <div className="grid gap-4">
                                    {services.map((service) => (
                                        <label
                                            key={service.id}
                                            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-6
                        ${selectedService === service.id
                                                    ? 'border-blue-500 bg-blue-50/50 shadow-md ring-4 ring-blue-500/10'
                                                    : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'}`}
                                        >
                                            <input type="radio" name="service" className="sr-only" checked={selectedService === service.id} onChange={() => setSelectedService(service.id)} />
                                            <div className="p-4 bg-white rounded-xl shadow-sm shrink-0">{service.icon}</div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-bold text-lg text-slate-900">{service.name}</h3>
                                                    <span className="font-semibold text-slate-900">{service.price}</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                                                    <span className="flex items-center gap-1"><Clock size={14} /> {service.duration}</span>
                                                    <span className="flex items-center gap-1"><MapPin size={14} /> Clínica Central</span>
                                                </div>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedService === service.id ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`}>
                                                {selectedService === service.id && <CheckCircle2 size={14} className="text-white" />}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                    {/* Calendar */}
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Selecciona Fecha</h2>
                                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                            <div className="flex items-center justify-between mb-6">
                                                <button
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${canGoBack ? 'hover:bg-slate-100 text-slate-600' : 'text-slate-200 cursor-not-allowed'}`}
                                                    onClick={() => navigateMonth(-1)}
                                                    disabled={!canGoBack}
                                                >
                                                    <ChevronLeft size={20} />
                                                </button>
                                                <span className="font-bold text-slate-800">{MONTH_NAMES[viewMonth]} {viewYear}</span>
                                                <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors" onClick={() => navigateMonth(1)}>
                                                    <ChevronRight size={20} />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                {DAY_LABELS.map(d => <div key={d}>{d}</div>)}
                                            </div>

                                            <div className="grid grid-cols-7 gap-1.5">
                                                {[...Array(calendarData.firstDay)].map((_, i) => <div key={`e-${i}`} />)}

                                                {[...Array(calendarData.daysInMonth)].map((_, i) => {
                                                    const day = i + 1;
                                                    const past = isDayPast(day);
                                                    const weekend = isDayWeekend(day);
                                                    const selected = selectedDate === day;
                                                    const todayMark = isToday(day);
                                                    const disabled = past || weekend;

                                                    return (
                                                        <button
                                                            key={day}
                                                            disabled={disabled}
                                                            onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                                                            className={`aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all relative
                                  ${selected
                                                                    ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/30 ring-2 ring-blue-500 ring-offset-2'
                                                                    : disabled
                                                                        ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                                                                        : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
                                                                }
                                `}
                                                        >
                                                            {day}
                                                            {todayMark && !selected && (
                                                                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-500" />
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Time Slots */}
                                    <div className="w-full md:w-64 shrink-0">
                                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                            {selectedDate ? `Horarios (${selectedDate} ${MONTH_NAMES[viewMonth].slice(0, 3)})` : 'Horarios'}
                                        </h2>

                                        {selectedDate ? (
                                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                                                {getTimeSlotsForDay(selectedDate).map(({ time, occupied }) => (
                                                    <button
                                                        key={time}
                                                        disabled={occupied}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all
                                    ${occupied
                                                                ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed line-through'
                                                                : selectedTime === time
                                                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/20'
                                                                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50'
                                                            }`}
                                                    >
                                                        <Clock size={16} className={selectedTime === time ? 'text-emerald-100' : occupied ? 'text-slate-300' : 'text-slate-400'} />
                                                        {time}
                                                        {occupied && <span className="text-[10px] font-normal ml-1">Ocupado</span>}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-slate-400">
                                                <CalendarIcon size={32} className="mb-4 opacity-50" />
                                                <p className="text-sm font-medium">Selecciona un día en el calendario para ver los horarios disponibles.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="text-center max-w-md mx-auto">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 12 }}
                                    className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 relative"
                                >
                                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
                                    <CheckCircle2 size={48} />
                                </motion.div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">¡Reserva Confirmada!</h2>
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    Hemos enviado todos los detalles a tu correo electrónico. Te esperamos en la sucursal Centro.
                                </p>

                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left mb-8 shadow-inner">
                                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                                        <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Fecha y Hora</span>
                                        <span className="font-bold text-slate-900">{selectedDate} {MONTH_NAMES[viewMonth]} {viewYear} - {selectedTime}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Servicio</span>
                                        <span className="font-bold text-blue-600 text-right">{services.find(s => s.id === selectedService)?.name}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { setStep(1); setSelectedService(null); setSelectedDate(null); setSelectedTime(null); }}
                                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg shadow-slate-900/20 transition-all"
                                >
                                    Volver al Inicio
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    {step < 3 && (
                        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                            {step > 1 ? (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="px-6 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl font-semibold transition-colors"
                                >
                                    Volver
                                </button>
                            ) : <div />}

                            <button
                                onClick={() => setStep(step + 1)}
                                disabled={(step === 1 && !selectedService) || (step === 2 && (!selectedDate || !selectedTime))}
                                className={`px-8 py-4 rounded-xl flex items-center gap-2 font-bold transition-all
                  ${((step === 1 && selectedService) || (step === 2 && selectedDate && selectedTime))
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                Continuar a {step === 1 ? 'Fecha' : 'Confirmación'}
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <DemoNav />
        </div>
    );
}
