/**
 * Configuración del Google Form para el RSVP.
 *
 * ⚠️  PENDIENTE ANTES DE PUBLICAR:
 *     Reemplaza cada "entry.__PENDIENTE__" con el entry ID real de tu formulario.
 *     Pasos:
 *       1. Abre tu Google Form → "Ver formulario relleno".
 *       2. Abre las DevTools → Network.
 *       3. Rellena y envía el formulario.
 *       4. Busca la petición a "formResponse" → revisa el payload.
 *       5. Copia los "entry.XXXXXXX" que corresponden a cada campo.
 */
export const GOOGLE_FORM = {
  endpoint:
    "https://docs.google.com/forms/d/e/1FAIpQLSe3PQblc4fp2k5a2cjKMHopHbaY7-_lb9faAJKBWYhmL1xa7Q/formResponse",
  fields: {
    fullName:   "entry.__PENDIENTE__", // TODO: Nombre completo
    attending:  "entry.__PENDIENTE__", // TODO: ¿Nos acompañas?
    guestCount: "entry.__PENDIENTE__", // TODO: Número de personas (1–11)
    companions: "entry.__PENDIENTE__", // TODO: Nombres de acompañantes
    dietary:    "entry.__PENDIENTE__", // TODO: Restricciones alimentarias
    song:       "entry.__PENDIENTE__", // TODO: Canción que no puede faltar
  },
  attendingValues: {
    // ⚠️  Estos strings deben coincidir CARÁCTER POR CARÁCTER con las
    // opciones del formulario de Google, incluyendo acentos.
    yes: "Si, confirmo mi asistencia",
    no:  "No podré asistir",
  },
} as const;

/**
 * Valida que todos los entry IDs hayan sido reemplazados.
 * Lanza un error visible en consola durante desarrollo.
 * Llama esta función en el arranque de la aplicación (BaseLayout / index.astro).
 */
export function validateFormConfig(): void {
  const pending = Object.entries(GOOGLE_FORM.fields).filter(([, v]) =>
    v.includes("__PENDIENTE__")
  );
  if (pending.length > 0) {
    const fields = pending.map(([k]) => k).join(", ");
    console.error(
      `\n⚠️  GOOGLE FORM — Campos sin configurar: [${fields}]\n` +
      `   Edita src/infrastructure/config/googleForm.ts antes de publicar.\n`
    );
  }
}
