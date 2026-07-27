import type { Metadata } from "next";
import { findDemo } from "@/lib/demos";

/** Este subdominio se sirve tal cual, sin www y sin redirección. */
export const SITE_URL = "https://demos.surlabs.tech";

/** El sitio principal. Todas las demos tienen que enlazar de vuelta acá. */
export const MAIN_SITE = "https://www.surlabs.tech";

export const SITE_NAME = "Demos de Surlabs";

export const SITE_DESCRIPTION =
    "Doce productos funcionando y abiertos, uno por rubro, de Surlabs: desarrollo de software a medida en Montevideo, Uruguay. Entrá y usalos, no son capturas de pantalla.";

/**
 * Metadatos de una demo.
 *
 * La imagen es la captura de la propia demo, y eso no es un detalle: el canal
 * por el que más se comparten estos enlaces es WhatsApp y el mensaje directo de
 * Instagram. Sin imagen, el enlace llega como una línea de texto gris; con
 * imagen, llega mostrando el producto del que se está hablando.
 */
export function demoMetadata(slug: string): Metadata {
    const demo = findDemo(slug);
    if (!demo) return {};

    const url = `${SITE_URL}/${demo.slug}`;
    return {
        title: demo.title,
        description: demo.description,
        alternates: { canonical: `/${demo.slug}` },
        openGraph: {
            title: demo.title,
            description: demo.description,
            url,
            siteName: SITE_NAME,
            locale: "es_UY",
            type: "website",
            images: [{ url: demo.image, width: 1200, height: 630, alt: demo.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: demo.title,
            description: demo.description,
            images: [demo.image],
        },
    };
}
