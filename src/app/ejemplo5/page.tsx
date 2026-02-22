"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, User, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function SmartBooking() {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const services = [
        { id: "S1", name: "Consulta Especializada", duration: "45 min", price: "$60.00", icon: <User className="text-blue-500" /> },
        { id: "S2", name: "Estudio Completo", duration: "90 min", price: "$120.00", icon: <ActivityIcon className="text-emerald-500" /> },
        { id: "S3", name: "Sesión de Control", duration: "30 min", price: "$40.00", icon: <CalendarIcon className="text-purple-500" /> }
    ];

    const timeSlots = ["09:00", "09:45", "10:30", "11:15", "14:00", "14:45", "15:30", "16:15"];

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-800 font-sans selection:bg-blue-500/30">
            {/* Abstract Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                <div className="absolute top-1/2 -left-20 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                <div className="absolute -bottom-40 right-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
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
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full -z-10"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full transition-all duration-500 -z-10" style={{ width: `${(step - 1) * 50}%` }}></div>

                        {[
                            { num: 1, label: "Servicio" },
                            { num: 2, label: "Fecha y Hora" },
                            { num: 3, label: "Confirmación" }
                        ].map((s) => (
                            <div key={s.num} className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= s.num ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-400 border-2 border-slate-100'
                                    }`}>
                                    {step > s.num ? <CheckCircle2 size={20} /> : s.num}
                                </div>
                                <span className={`text-xs font-semibold uppercase tracking-wider ${step >= s.num ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic Content based on Step */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white p-8 md:p-12 transition-all duration-500">

                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Selecciona un servicio</h2>
                            <p className="text-slate-500 mb-8">Elige el tipo de atención que necesitas para continuar.</p>

                            <div className="grid gap-4">
                                {services.map((service) => (
                                    <label
                                        key={service.id}
                                        className={`
                      relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-6
                      ${selectedService === service.id
                                                ? 'border-blue-500 bg-blue-50/50 shadow-md ring-4 ring-blue-500/10'
                                                : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                                            }
                    `}
                                    >
                                        <input
                                            type="radio"
                                            name="service"
                                            className="sr-only"
                                            checked={selectedService === service.id}
                                            onChange={() => setSelectedService(service.id)}
                                        />
                                        <div className="p-4 bg-white rounded-xl shadow-sm shrink-0">
                                            {service.icon}
                                        </div>
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

                                        {/* Check indicator */}
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedService === service.id ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`}>
                                            {selectedService === service.id && <CheckCircle2 size={14} className="text-white" />}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex flex-col md:flex-row gap-12">

                                {/* Calendar Section */}
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Selecciona Fecha</h2>
                                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                                                <ChevronLeft size={20} />
                                            </button>
                                            <span className="font-bold text-slate-800">Octubre 2026</span>
                                            <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => <div key={d}>{d}</div>)}
                                        </div>

                                        <div className="grid grid-cols-7 gap-2">
                                            {/* Empty slots for offset */}
                                            {[...Array(3)].map((_, i) => <div key={`e-${i}`} />)}

                                            {/* Days */}
                                            {[...Array(31)].map((_, i) => {
                                                const day = i + 1;
                                                const isWeekend = (day + 3) % 7 === 0 || (day + 3) % 7 === 6;
                                                const isSelected = selectedDate === day;
                                                const isPast = day < 12; // Mock current date

                                                return (
                                                    <button
                                                        key={day}
                                                        disabled={isPast || isWeekend}
                                                        onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                                                        className={`
                                aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all
                                ${isSelected
                                                                ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/30 ring-2 ring-blue-500 ring-offset-2'
                                                                : isPast || isWeekend
                                                                    ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                                                                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
                                                            }
                              `}
                                                    >
                                                        {day}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Time Section */}
                                <div className="w-full md:w-64 shrink-0">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                        {selectedDate ? `Horarios (Oct ${selectedDate})` : 'Horarios'}
                                    </h2>

                                    {selectedDate ? (
                                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 animate-in fade-in duration-300">
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`
                                py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all
                                ${selectedTime === time
                                                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/20'
                                                            : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50'
                                                        }
                              `}
                                                >
                                                    <Clock size={16} className={selectedTime === time ? 'text-emerald-100' : 'text-slate-400'} />
                                                    {time}
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
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center max-w-md mx-auto">
                            <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">¡Reserva Confirmada!</h2>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                Hemos enviado todos los detalles a tu correo electrónico. Te esperamos en la sucursal Centro.
                            </p>

                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left mb-8 shadow-inner">
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                                    <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Fecha y Hora</span>
                                    <span className="font-bold text-slate-900">Oct {selectedDate}, 2026 - {selectedTime}</span>
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
                        </div>
                    )}

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
                            ) : <div></div>}

                            <button
                                onClick={() => setStep(step + 1)}
                                disabled={(step === 1 && !selectedService) || (step === 2 && (!selectedDate || !selectedTime))}
                                className={`
                  px-8 py-4 rounded-xl flex items-center gap-2 font-bold transition-all
                  ${((step === 1 && selectedService) || (step === 2 && selectedDate && selectedTime))
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 translate-y-0 opacity-100'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed translate-y-0 opacity-100'
                                    }
                `}
                            >
                                Continuar a {step === 1 ? 'Fecha' : 'Confirmación'}
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function ActivityIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    );
}
