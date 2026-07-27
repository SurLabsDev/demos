import type { MetadataRoute } from "next";
import { demoSeo } from "@/lib/demos";
import { SITE_URL } from "@/lib/seo";

/**
 * Trece URLs: la portada y las doce demos. Antes no existía ninguno, así que
 * las demos solo se descubrían siguiendo enlaces desde el sitio principal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    return [
        { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
        ...demoSeo.map((demo) => ({
            url: `${SITE_URL}/${demo.slug}`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ];
}
