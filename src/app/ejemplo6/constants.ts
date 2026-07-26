/**
 * Datos del local. Estaban repetidos en Header y Footer, y por eso el link al
 * mapa quedó como "YourMapLink" en los tres lugares. Ahora se define una vez.
 */
export const ADDRESS = "Canelones 2370, Montevideo, Uruguay";

/** Búsqueda de Google Maps por dirección: no depende de un short link generado a mano. */
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export const PHONE_DISPLAY = "091 661 552";
export const PHONE_HREF = "tel:+59891661552";

export const INSTAGRAM_HANDLE = "chahaus.uy";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
