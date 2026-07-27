/**
 * Catálogo de las demos, con sus datos para buscadores.
 *
 * EL PROBLEMA QUE RESUELVE: las 12 demos heredaban el título del layout raíz,
 * así que las 12 se presentaban como "Demos | SurLabs". Doce páginas con el
 * mismo título son doce páginas compitiendo entre sí, y ninguna le dice a un
 * buscador de qué se trata.
 *
 * QUÉ BUSCAN LOS TÍTULOS: "ejemplo de carta digital", "demo sistema de
 * reservas", "cómo se ve un menú digital". Deliberadamente NO apuntan a
 * "restaurante Montevideo": estas páginas son demostraciones, no negocios
 * reales, y alguien que busca un restaurante y cae acá se va enojado. La
 * intención que sí calza es la de quien está averiguando cómo se vería lo suyo,
 * que es exactamente el visitante que después escribe.
 */
export interface DemoSeo {
    slug: string;
    /** Título para buscadores. Único por demo, alrededor de 60 caracteres. */
    title: string;
    description: string;
    /** Captura de la propia demo, para la vista previa al compartir el enlace. */
    image: string;
}

const SUFIJO = "Demo de Surlabs";

export const demoSeo: DemoSeo[] = [
    {
        slug: "ejemplo1",
        title: `Ejemplo de panel de gestión y CRM | ${SUFIJO}`,
        description:
            "Panel de control con métricas de ventas, clientes y operaciones. Es una demo funcionando: entrá y usala para ver cómo se vería la gestión de tu negocio fuera de la planilla.",
        image: "/og/ejemplo1.jpg",
    },
    {
        slug: "ejemplo2",
        title: `Ejemplo de tienda online | ${SUFIJO}`,
        description:
            "Tienda online pensada para cerrar la venta, con catálogo, ficha de producto y carrito. Demo abierta y sin registro: probala como si fueras el cliente.",
        image: "/og/ejemplo2.jpg",
    },
    {
        slug: "ejemplo3",
        title: `Ejemplo de portfolio para un estudio creativo | ${SUFIJO}`,
        description:
            "Portfolio con diseño brutalista y animaciones, para estudios y agencias que necesitan que el sitio muestre cómo trabajan. Demo abierta, entrá y recorrela.",
        image: "/og/ejemplo3.jpg",
    },
    {
        slug: "ejemplo4",
        title: `Ejemplo de menú digital interactivo | ${SUFIJO}`,
        description:
            "Carta digital con estética retro y juego, para locales que le hablan a público joven. Demo funcionando: armá un pedido y mirá cómo se siente del lado del cliente.",
        image: "/og/ejemplo4.jpg",
    },
    {
        slug: "ejemplo5",
        title: `Ejemplo de sistema de reservas y turnos | ${SUFIJO}`,
        description:
            "Agenda online con calendario, reserva y confirmación automática, para consultorios, peluquerías, gimnasios y estudios. Demo abierta: reservá un turno de mentira y mirá qué pasa.",
        image: "/og/ejemplo5.jpg",
    },
    {
        slug: "ejemplo6",
        title: `Ejemplo de web para cafetería o tienda gastronómica | ${SUFIJO}`,
        description:
            "Menú, carrusel y club de beneficios en una sola página, para cafeterías y tiendas gastronómicas. Demo funcionando y sin registro.",
        image: "/og/ejemplo6.jpg",
    },
    {
        slug: "ejemplo7",
        title: `Ejemplo de panel con IA y automatizaciones | ${SUFIJO}`,
        description:
            "Centro de operaciones con asistente, automatizaciones y métricas en vivo, para equipos que repiten las mismas tareas todos los días. Demo abierta.",
        image: "/og/ejemplo7.jpg",
    },
    {
        slug: "ejemplo8",
        title: `Ejemplo de portal inmobiliario | ${SUFIJO}`,
        description:
            "Propiedades con filtros, favoritos y galería, para inmobiliarias que hoy mandan fotos por WhatsApp. Demo funcionando: filtrá y buscá como lo haría un cliente.",
        image: "/og/ejemplo8.jpg",
    },
    {
        slug: "ejemplo9",
        title: `Ejemplo de landing de producto | ${SUFIJO}`,
        description:
            "Página de producto con precios, funciones y testimonios, pensada para convertir visitas en consultas. Demo abierta y sin registro.",
        image: "/og/ejemplo9.jpg",
    },
    {
        slug: "ejemplo10",
        title: `Ejemplo de app para gimnasio y wellness | ${SUFIJO}`,
        description:
            "Rutinas, métricas y seguimiento, diseñada para el teléfono, para gimnasios y entrenadores. Demo funcionando: abrila del celular y usala.",
        image: "/og/ejemplo10.jpg",
    },
    {
        slug: "ejemplo11",
        title: `Ejemplo de plataforma de cursos online | ${SUFIJO}`,
        description:
            "Campus con cursos, progreso y contenido interactivo, para quien hoy tiene sus clases repartidas en un Drive. Demo abierta, entrá y recorré un curso.",
        image: "/og/ejemplo11.jpg",
    },
    {
        slug: "ejemplo12",
        title: `Ejemplo de carta digital para restaurante | ${SUFIJO}`,
        description:
            "Carta digital con categorías, reseñas y reservas, para restaurantes que hoy usan un PDF o una foto del menú. Demo funcionando: recorrela y reservá una mesa de prueba.",
        image: "/og/ejemplo12.jpg",
    },
];

export function findDemo(slug: string): DemoSeo | undefined {
    return demoSeo.find((d) => d.slug === slug);
}
