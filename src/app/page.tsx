import Link from "next/link";
import { Briefcase, ShoppingBag, Palette, Gamepad2, CalendarCheck, Coffee } from "lucide-react";

export default function Home() {
  const demos = [
    {
      href: "/ejemplo1",
      title: "Gestión Comercial y CRM",
      description: "Panel de control técnico para métricas de ventas y operaciones.",
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      href: "/ejemplo2",
      title: "E-Commerce de Lujo",
      description: "Tienda online elegante enfocada en alta conversión de ventas.",
      icon: <ShoppingBag className="w-5 h-5" />
    },
    {
      href: "/ejemplo3",
      title: "Agencia Creativa",
      description: "Portfolio/Landing page con diseño brutalista y animaciones.",
      icon: <Palette className="w-5 h-5" />
    },
    {
      href: "/ejemplo4",
      title: "Menú Digital Arcade",
      description: "Menú interactivo con estética retro y animaciones Gamificadas.",
      icon: <Gamepad2 className="w-5 h-5" />
    },
    {
      href: "/ejemplo5",
      title: "Agenda Inteligente",
      description: "Sistema de reservas y calendario optimizado para servicios.",
      icon: <CalendarCheck className="w-5 h-5" />
    },
    {
      href: "/ejemplo6",
      title: "Tienda Concepto Gastronómico",
      description: "Landing page interactiva con menú, carrusel y club de beneficios.",
      icon: <Coffee className="w-5 h-5" />
    }
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 font-sans p-4 sm:p-8">
      <main className="flex flex-col gap-8 w-full max-w-3xl bg-white dark:bg-zinc-900/80 p-6 sm:p-12 rounded-[2rem] shadow-2xl border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-xl relative overflow-hidden">

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

        <div className="text-center space-y-4 relative z-10 pt-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-2">
            Showcase
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Demos SurLabs
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Selecciona uno de los prototipos interactivos para visualizar nuestras opciones de diseño y arquitectura.
          </p>
        </div>

        <div className="w-full grid gap-3 sm:gap-4 relative z-10 mt-4">
          {demos.map((demo, i) => (
            <Link
              key={i}
              href={demo.href}
              className="group relative flex items-center justify-between p-4 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* Hover highlight background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex items-start sm:items-center gap-4 sm:gap-6 relative z-10">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-zinc-500 dark:text-zinc-400 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 shrink-0">
                  {demo.icon}
                </div>
                <div className="space-y-1 mt-1 sm:mt-0">
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {demo.title}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
                    {demo.description}
                  </p>
                </div>
              </div>
              <div className="text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300 hidden sm:block shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
