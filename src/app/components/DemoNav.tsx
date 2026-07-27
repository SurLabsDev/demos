"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { MAIN_SITE } from "@/lib/seo";

const demos = [
  { href: "/ejemplo1", title: "CRM Dashboard" },
  { href: "/ejemplo2", title: "E-Commerce" },
  { href: "/ejemplo3", title: "Agencia Creativa" },
  { href: "/ejemplo4", title: "Menú Arcade" },
  { href: "/ejemplo5", title: "Agenda Inteligente" },
  { href: "/ejemplo6", title: "Tienda Gastronómica" },
  { href: "/ejemplo7", title: "IA & Automatización" },
  { href: "/ejemplo8", title: "Portal Inmobiliario" },
  { href: "/ejemplo9", title: "SaaS Landing" },
  { href: "/ejemplo10", title: "App Fitness" },
  { href: "/ejemplo11", title: "E-Learning" },
  { href: "/ejemplo12", title: "Restaurante" },
];

export default function DemoNav() {
  const pathname = usePathname();
  // Esta barra flota por encima de la demo. Si en algún ancho llega a taparle un
  // control, el visitante puede plegarla en vez de quedarse trabado.
  const [collapsed, setCollapsed] = useState(false);
  const currentIndex = demos.findIndex((d) => d.href === pathname);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? demos[currentIndex - 1] : null;
  const next = currentIndex < demos.length - 1 ? demos[currentIndex + 1] : null;

  if (collapsed) {
    return (
      <motion.button
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={() => setCollapsed(false)}
        aria-label="Mostrar navegación de demos"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] w-10 h-10 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <ChevronUp className="w-4 h-4" />
      </motion.button>
    );
  }

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl"
    >
      <Link
        href="/"
        className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        title="Volver al inicio"
      >
        <Home className="w-4 h-4" />
      </Link>

      <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />

      {prev ? (
        <Link
          href={prev.href}
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          title={prev.title}
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      ) : (
        <span className="p-2 text-white/20">
          <ChevronLeft className="w-4 h-4" />
        </span>
      )}

      <span className="text-white/90 text-xs sm:text-sm font-medium px-2 min-w-0 truncate max-w-[140px] sm:max-w-none">
        {demos[currentIndex].title}
      </span>

      {next ? (
        <Link
          href={next.href}
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          title={next.title}
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="p-2 text-white/20">
          <ChevronRight className="w-4 h-4" />
        </span>
      )}

      <div className="w-px h-5 bg-white/10 mx-1" />

      {/*
        Enlace al sitio principal. Antes no había ninguno en todo el subdominio:
        las doce demos eran una isla sin salida. Cuesta dos cosas distintas.

        Para el visitante: está mirando el producto, convencido, y no tenía cómo
        llegar a quien lo hizo sin volver atrás en el navegador.

        Para los buscadores: un subdominio no hereda la identidad del dominio
        principal. Trece páginas enlazando a surlabs.tech son la señal que ata
        los dos dominios como una sola empresa.

        Sin rel="nofollow" a propósito, y sin target en blanco: es tráfico
        propio yendo a casa, no un enlace externo.
      */}
      <a
        href={`${MAIN_SITE}/?utm_source=demos`}
        className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/90 hover:text-white text-xs sm:text-sm font-medium whitespace-nowrap"
        title="Ir a Surlabs"
      >
        Lo quiero
      </a>

      <button
        onClick={() => setCollapsed(true)}
        aria-label="Ocultar navegación de demos"
        className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        title="Ocultar"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </motion.nav>
  );
}
