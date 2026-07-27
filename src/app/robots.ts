import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * No había robots.txt: daba 404, y con él se iba la declaración del sitemap.
 *
 * Se permite todo, incluidos los rastreadores de IA. Estas demos son
 * exactamente el material que conviene que un asistente pueda mirar: si alguien
 * le pregunta cómo se ve un sistema de reservas, que tenga doce ejemplos
 * abiertos para citar.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: "*", allow: "/" }],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
