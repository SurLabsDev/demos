import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { collectionSchema } from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = `${SITE_NAME} | Doce productos funcionando`;

/**
 * Metadatos por defecto del subdominio.
 *
 * Antes este archivo definía el título de TODAS las páginas, así que las doce
 * demos se presentaban como "Demos | SurLabs" y competían entre sí. Ahora cada
 * demo trae el suyo desde src/lib/demos.ts, y esto queda solo para la portada.
 *
 * metadataBase tampoco existía: sin él las rutas de imagen de Open Graph quedan
 * relativas, y quien recibe el enlace no ve ninguna vista previa.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_UY",
    type: "website",
    images: [{ url: "/og/portada.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og/portada.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/*
          Datos estructurados. Declaran que este subdominio es un catálogo de
          obra de Surlabs, no un sitio suelto sin dueño. Es lo que ata los dos
          dominios como una sola entidad.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema()) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
