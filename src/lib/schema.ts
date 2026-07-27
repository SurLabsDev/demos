import { demoSeo } from "@/lib/demos";
import { MAIN_SITE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Datos estructurados del subdominio de demos.
 *
 * EL TRABAJO QUE HACEN: sin esto, demos.surlabs.tech es un dominio suelto que
 * casualmente se parece a otro. Un subdominio no hereda la identidad del
 * dominio principal, así que hay que declararla.
 *
 * El nodo Organization se declara con el MISMO @id que usa el sitio principal
 * (www.surlabs.tech/#organizacion). Eso es lo que le dice a un buscador que las
 * dos webs son la misma empresa y no dos negocios distintos.
 *
 * La lista va como CollectionPage con un ItemList adentro: describe lo que esto
 * realmente es, un catálogo de trabajos, y le da a los asistentes de IA las 12
 * demos con su nombre y su enlace en un formato que pueden leer sin adivinar.
 */
export function collectionSchema() {
    const ORG_ID = `${MAIN_SITE}/#organizacion`;

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": ORG_ID,
                name: "Surlabs",
                url: MAIN_SITE,
            },
            {
                "@type": "CollectionPage",
                "@id": `${SITE_URL}/#catalogo`,
                url: SITE_URL,
                name: SITE_NAME,
                description: SITE_DESCRIPTION,
                inLanguage: "es",
                isPartOf: { "@id": ORG_ID },
                publisher: { "@id": ORG_ID },
                mainEntity: {
                    "@type": "ItemList",
                    numberOfItems: demoSeo.length,
                    itemListElement: demoSeo.map((demo, i) => ({
                        "@type": "ListItem",
                        position: i + 1,
                        url: `${SITE_URL}/${demo.slug}`,
                        name: demo.title.split(" | ")[0],
                    })),
                },
            },
        ],
    };
}
