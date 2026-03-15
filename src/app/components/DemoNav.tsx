"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";

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
];

export default function DemoNav() {
  const pathname = usePathname();
  const currentIndex = demos.findIndex((d) => d.href === pathname);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? demos[currentIndex - 1] : null;
  const next = currentIndex < demos.length - 1 ? demos[currentIndex + 1] : null;

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
    </motion.nav>
  );
}
