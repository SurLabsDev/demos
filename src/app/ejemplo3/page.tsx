"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Play, Star, Zap } from "lucide-react";

export default function CreativeAgencyPage() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#E5E5E5] text-black font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white">

            {/* Navigation */}
            <nav className="fixed w-full z-50 p-6 mix-blend-difference text-white">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-black tracking-tighter uppercase">SUR*STUDIO</div>
                    <div className="flex gap-8 font-bold text-sm tracking-widest uppercase hidden md:flex">
                        {["Trabajo", "Estudio", "Contacto"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="hover:italic transition-all"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <button className="md:hidden font-bold uppercase tracking-widest">Menú</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center px-6 relative pt-20">
                <div className="max-w-[1400px] mx-auto w-full relative z-10">
                    <h1 className="text-[12vw] leading-[0.85] font-black uppercase tracking-tighter flex flex-col items-start w-full">
                        <span className="flex items-center gap-4 md:gap-8">
                            HACEMOS
                            <div className="w-24 h-12 md:w-48 md:h-24 bg-purple-600 rounded-full flex items-center justify-center animate-pulse">
                                <Star className="text-white w-6 h-6 md:w-12 md:h-12" />
                            </div>
                        </span>
                        <span className="italic font-serif font-medium text-purple-600">COSAS RARAS</span>
                        <span className="flex justify-between w-full items-end">
                            <span>QUE</span>
                            <span className="text-[4vw] font-bold tracking-normal text-gray-500 max-w-sm text-right leading-tight hidden lg:block pb-4">
                                Estudio de diseño radical construyendo interfaces que se sienten vivas.
                            </span>
                        </span>
                        <span>FUNCIONAN.</span>
                    </h1>
                </div>

                {/* Spinning Badge */}
                <div className="absolute right-10 bottom-10 md:right-20 md:bottom-20 w-32 h-32 md:w-48 md:h-48 z-20">
                    <div className="w-full h-full relative animate-[spin_10s_linear_infinite]">
                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                            <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                            <text className="text-[10px] font-bold uppercase tracking-widest" fill="black">
                                <textPath href="#circlePath" startOffset="0%">
                                    • Disponible para proyectos • Basados en Latam • 2026
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ArrowUpRight className="w-8 h-8" />
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <div className="bg-black text-white py-4 overflow-hidden -rotate-2 scale-110 relative z-20 shadow-2xl">
                <div className="whitespace-nowrap flex animate-[marquee_20s_linear_infinite]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8 mx-4 text-4xl font-black uppercase tracking-tighter">
                            <span>Diseño Frontend</span>
                            <Zap className="text-purple-500 fill-purple-500" />
                            <span>Desarrollo Web</span>
                            <Zap className="text-purple-500 fill-purple-500" />
                            <span>Identidad Visual</span>
                            <Zap className="text-purple-500 fill-purple-500" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <section className="py-32 px-6 max-w-[1400px] mx-auto relative z-10">
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-16 border-b-8 border-black pb-4">
                    Trabajo Seleccionado (3)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
                    {[
                        { id: "01", name: "Festival Neón", type: "Identidad & Web", color: "bg-[#FF3366]", img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800" },
                        { id: "02", name: "Laboratorios Acme", type: "App Corporativa", color: "bg-[#33CC99]", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800", offset: true },
                        { id: "03", name: "Oasis Resort", type: "E-Commerce", color: "bg-[#FF9900]", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800" },
                    ].map((project, i) => (
                        <div
                            key={i}
                            className={`group cursor-pointer ${project.offset ? 'md:mt-48' : ''}`}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <div className={`relative aspect-[4/5] overflow-hidden ${project.color} mb-6`}>
                                <img
                                    src={project.img}
                                    alt={project.name}
                                    className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out"
                                />

                                {/* Hover Reveal Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-24 h-24 bg-white text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        Ver
                                    </div>
                                </div>
                            </div>

                            <div className="flex border-t-2 border-black pt-4 justify-between items-start">
                                <div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-purple-600 transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-500 font-bold tracking-widest uppercase text-sm mt-1">{project.type}</p>
                                </div>
                                <div className="text-3xl font-black text-gray-300 group-hover:text-black transition-colors">
                                    {project.id}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white px-6 py-24 flex flex-col items-center justify-center text-center">
                <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none mb-12 hover:text-purple-500 hover:italic transition-all duration-300 cursor-pointer">
                    HABLEMOS.
                </h2>

                <div className="flex flex-col md:flex-row gap-8 text-sm font-bold uppercase tracking-widest border-t border-gray-800 w-full max-w-[1400px] pt-12 justify-between">
                    <span>&copy; 2026 SUR*STUDIO</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-purple-500">Instagram</a>
                        <a href="#" className="hover:text-purple-500">Twitter</a>
                        <a href="#" className="hover:text-purple-500">LinkedIn</a>
                    </div>
                    <span>hola@sur.studio</span>
                </div>
            </footer>

            {/* Add Marquee Keyframes to global css implicitly via simple style block */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
        </div>
    );
}
