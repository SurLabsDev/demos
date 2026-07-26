/**
 * Datos de la tienda ficticia de esta demo.
 *
 * IMPORTANTE: esta demo es un prototipo, no la web de ningún local real. La
 * marca, la dirección y las redes son inventadas a propósito y no deben
 * reemplazarse por las de un cliente. Si hace falta mostrarle la demo a alguien
 * con su propia identidad, se hace una copia, no se edita esta.
 *
 * Todo vive acá para que cambiar el nombre sea un solo archivo.
 */
export const BRAND = "NUBE*TEA";

/** Sin calle ni número: alcanza el barrio para que el link al mapa funcione. */
export const ADDRESS = "Punta Carretas, Montevideo, Uruguay";

/** Búsqueda de Google Maps por dirección: no depende de un short link generado a mano. */
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export const PHONE_DISPLAY = "091 661 552";
export const PHONE_HREF = "tel:+59891661552";

/**
 * El handle es de utilería y el link apunta a la raíz de Instagram, para no
 * mandarle tráfico a una cuenta real que casualmente coincida con el nombre.
 */
export const INSTAGRAM_HANDLE = "nubetea.uy";
export const INSTAGRAM_URL = "https://www.instagram.com/";
