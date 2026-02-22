"use client";

import { useState } from "react";
import { Gamepad2, Coins, ArrowRight, Heart, HeartPulse, Sparkles, ChevronRight, Zap } from "lucide-react";

const menuItems = [
    // MAIN
    { id: "M1", name: "BURGER 8-BIT", desc: "Doble carne smash, queso cheddar líquido, bacon crujiente.", price: "$14.50", category: "MAIN", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=250", power: "HP +50" },
    { id: "M2", name: "PIZZA PIXEL", desc: "Muzzarella, pepperoni, borde relleno de queso.", price: "$18.00", category: "MAIN", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=250", power: "HP +80" },
    { id: "M3", name: "CYBER HOTDOG", desc: "Salchicha premium, cebolla crispy, salsa mayo-sriracha neón.", price: "$11.00", category: "MAIN", image: "https://images.unsplash.com/photo-1590122971295-6baef52026af?auto=format&fit=crop&q=80&w=250", power: "HP +40" },
    { id: "M4", name: "NEON SUSHI", desc: "Roll de salmón, aguacate, coronado con furikake brillante.", price: "$22.00", category: "MAIN", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=250", power: "HP +100" },
    { id: "M5", name: "TURBO TACOS", desc: "Trío de tacos al pastor con piña asada y cilantro.", price: "$16.00", category: "MAIN", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=250", power: "SPEED +15" },
    { id: "M6", name: "GLITCH WINGS", desc: "Alitas bañadas en salsa BBQ coreana ultra picante.", price: "$15.50", category: "MAIN", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=250", power: "ATK +20" },

    // DRINK
    { id: "D1", name: "POCIÓN ROJA", desc: "Refresco de frutos rojos y jengibre espaciado.", price: "$4.50", category: "DRINK", image: "https://images.unsplash.com/photo-1587223075055-82e9a937ddff?auto=format&fit=crop&q=80&w=250", power: "MANA +20" },
    { id: "D2", name: "POCIÓN AZUL", desc: "Limonada eléctrica con blue curaçao sin alcohol.", price: "$5.00", category: "DRINK", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=250", power: "MANA +40" },
    { id: "D3", name: "ELIXIR VERDE", desc: "Té matcha helado con boba de manzana verde.", price: "$6.50", category: "DRINK", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=250", power: "STM +50" },
    { id: "D4", name: "STEALTH COLA", desc: "Bebida de cola artesanal con toque de vainilla oscura.", price: "$3.50", category: "DRINK", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=250", power: "AGI +10" },

    // SWEET
    { id: "S1", name: "1UP CUPCAKE", desc: "Muffin de vainilla con frosting de menta y chispas.", price: "$6.00", category: "SWEET", image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&q=80&w=250", power: "LIFE +1" },
    { id: "S2", name: "DONA MÁGICA", desc: "Glaseado rosa con lluvia arcoíris, perfecta para guardar la partida.", price: "$4.00", category: "SWEET", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=250", power: "SPEED +10" },
    { id: "S3", name: "SAVE ICE CREAM", desc: "Helado de crema americana con sirope de chocolate oscuro.", price: "$5.50", category: "SWEET", image: "https://images.unsplash.com/photo-1532678465554-94846274c297?auto=format&fit=crop&q=80&w=250", power: "DEF +5" },
    { id: "S4", name: "LEVEL UP WAFFLES", desc: "Waffles belgas con miel de maple tibia y manteca.", price: "$8.00", category: "SWEET", image: "https://images.unsplash.com/photo-1562376552-0d160a2f9fa4?auto=format&fit=crop&q=80&w=250", power: "EXP +100" }
];

export default function ArcadeMenu() {
    const [activeCategory, setActiveCategory] = useState("MAIN");
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-[#000033] text-white font-mono overflow-hidden relative selection:bg-fuchsia-500 selection:text-white">

            {/* Retro Grid Background */}
            <div className="absolute inset-0 pointer-events-none perspective-[1000px] flex items-end">
                <div className="w-full h-[60vh] bg-[linear-gradient(rgba(255,0,255,0.2)_2px,transparent_2px),linear-gradient(90deg,rgba(0,255,255,0.2)_2px,transparent_2px)] bg-[size:40px_40px] [transform:rotateX(60deg)_translateY(100px)_scale(2.5)] animate-[gridMove_20s_linear_infinite] shadow-[0_-20px_50px_rgba(255,0,255,0.3)_inset]"></div>
            </div>

            {/* CRT Scanline Overlay */}
            <div className="fixed inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMCwwLDAsMC4yKSIvPjwvc3ZnPg==')] z-50 opacity-50 mix-blend-overlay"></div>

            {/* Screen Vignette */}
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)] z-40"></div>

            <nav className="fixed top-0 w-full p-4 md:p-6 z-30 flex justify-between items-center bg-gradient-to-b from-[#000033] to-transparent">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <Gamepad2 className="text-cyan-400 group-hover:text-fuchsia-500 transition-colors animate-pulse" size={28} />
                    <h1 className="text-xl md:text-2xl font-black italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 [text-shadow:2px_2px_0_rgba(255,0,255,0.5)]">
                        NEON BITE
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-black/50 border-2 border-yellow-400 rounded-sm px-3 py-1 shadow-[0_0_10px_rgba(250,204,21,0.5)] cursor-pointer hover:bg-yellow-400/20 transition-colors">
                        <Coins className="text-yellow-400 mr-2 animate-bounce" size={18} />
                        <span className="text-yellow-400 font-bold">2 COINS</span>
                    </div>
                </div>
            </nav>

            <main className="relative z-20 max-w-5xl mx-auto px-4 pt-28 pb-20 min-h-screen flex flex-col">

                {/* Header Text */}
                <div className="text-center mb-12">
                    <p className="text-cyan-400 text-xs md:text-sm font-bold tracking-[0.3em] mb-4 uppercase animate-pulse">
                        &gt; Insert Coin to Order
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black uppercase text-white [text-shadow:3px_3px_0_#f0f,6px_6px_0_#0ff] tracking-tighter hover:scale-105 transition-transform cursor-crosshair">
                        Player Menu
                    </h2>
                </div>

                {/* Category Selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {["MAIN", "DRINK", "SWEET"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`
                px-6 py-2 border-2 text-sm font-bold tracking-widest uppercase transition-all duration-300
                ${activeCategory === cat
                                    ? 'bg-fuchsia-500 border-fuchsia-300 text-white shadow-[0_0_15px_#f0f,inset_0_0_10px_#fff]'
                                    : 'bg-[#000033]/80 border-cyan-500 text-cyan-500 hover:bg-cyan-900/50 hover:border-cyan-300 hover:text-cyan-300 hover:shadow-[0_0_10px_#0ff]'
                                }
              `}
                        >
                            {activeCategory === cat && <span className="animate-pulse mr-2">▶</span>}
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 flex-1">
                    {menuItems.filter(i => i.category === activeCategory).map((item) => (
                        <div
                            key={item.id}
                            className={`
                relative bg-black/60 backdrop-blur-sm border-2 overflow-hidden group cursor-pointer transition-all duration-200
                ${selectedItem === item.id
                                    ? 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)] scale-105'
                                    : 'border-fuchsia-900/50 hover:border-fuchsia-500/80 hover:shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:-translate-y-1'
                                }
              `}
                            onClick={() => setSelectedItem(item.id)}
                        >
                            {/* Scanline effect on card */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50 z-10"></div>

                            <div className="p-4 md:p-6 flex gap-4 h-full relative z-20">
                                {/* Image instead of Sprite */}
                                <div className={`
                  w-20 h-20 md:w-24 md:h-24 shrink-0 border-2 bg-[#000] flex items-center justify-center overflow-hidden
                  ${selectedItem === item.id ? 'border-yellow-400 shadow-[0_0_10px_#ff0]' : 'border-cyan-500 group-hover:border-fuchsia-400'}
                `}>
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform contrast-125 saturate-150" />
                                </div>

                                <div className="flex flex-col justify-between w-full h-full">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className={`font-bold text-lg leading-tight uppercase ${selectedItem === item.id ? 'text-yellow-400' : 'text-white group-hover:text-fuchsia-400'}`}>
                                                {item.name}
                                            </h3>
                                            <span className="font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 border border-cyan-800 text-sm">
                                                {item.price}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-xs md:text-sm leading-snug line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                                        <span className="text-[10px] bg-green-900/50 text-green-400 border border-green-700 px-2 py-1 font-bold tracking-widest flex items-center gap-1">
                                            <HeartPulse size={10} />
                                            {item.power}
                                        </span>

                                        {selectedItem === item.id ? (
                                            <span className="text-yellow-400 text-xs font-bold animate-pulse flex items-center">
                                                SELECTED <Sparkles size={12} className="ml-1" />
                                            </span>
                                        ) : (
                                            <span className="text-fuchsia-500 text-[10px] uppercase font-bold group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                PRESS A
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Bottom Bar */}
                <div className="mt-12 flex justify-center sticky bottom-6 z-40">
                    <button
                        className={`
                group relative flex items-center gap-4 px-8 py-4 font-black tracking-widest text-lg md:text-xl uppercase transition-all duration-200
                ${selectedItem
                                ? 'bg-yellow-400 text-black border-4 border-white shadow-[0_0_20px_#ff0,inset_0_0_10px_#fff] cursor-pointer hover:bg-white hover:border-yellow-400 hover:text-yellow-600'
                                : 'bg-gray-800 text-gray-500 border-4 border-gray-600 cursor-not-allowed hidden'
                            }
              `}
                    >
                        {selectedItem && (
                            <>
                                <Zap size={24} className="animate-pulse" />
                                CONFIRM ORDER
                                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </main>

            {/* Global CSS overrides for the animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
      `}} />
        </div>
    );
}
