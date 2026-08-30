// WeddingEvent type available for reference but not used as satisfies constraint

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  CONFIGURACIÓN CENTRAL DE LA BODA                               ║
 * ║                                                                  ║
 * ║  TODO: Completar todos los campos marcados con "PENDIENTE"       ║
 * ║        antes de publicar el sitio.                               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

export const weddingConfig = {
  couple: {
    name1: "Dany",
    name2: "Jazmín",
    /** Nombre para el título <title> de la página */
    displayNames: "Dany & Jazmín",
  },

  /**
   * Fecha y hora de la ceremonia en ISO 8601.
   * TODO: Actualizar con la fecha real.
   */
  date: "2026-12-31T17:00:00", // TODO: Fecha real de la ceremonia

  ceremony: {
    name: "PENDIENTE", // TODO: Nombre del lugar de la ceremonia
    address: "PENDIENTE", // TODO: Dirección completa de la ceremonia
    mapsUrl: "https://maps.google.com/?q=PENDIENTE", // TODO: Link real de Google Maps
    coordinates: {
      lat: 0, // TODO: Latitud real
      lng: 0, // TODO: Longitud real
    },
  },

  reception: {
    name: "PENDIENTE", // TODO: Nombre del salón / lugar de recepción
    address: "PENDIENTE", // TODO: Dirección completa de la recepción
    mapsUrl: "https://maps.google.com/?q=PENDIENTE", // TODO: Link real de Google Maps
    date: "2026-12-31T19:00:00", // TODO: Hora real de la recepción
    coordinates: {
      lat: 0, // TODO: Latitud real
      lng: 0, // TODO: Longitud real
    },
  },

  dressCode: {
    title: "Código de vestimenta",
    description:
      "Formal. Te pedimos evitar el blanco, el negro y los tonos muy claros que puedan confundirse con el look de las novias. Apuesta por colores tierra, rosados, azules y verdes.",
    /**
     * Colores sugeridos como referencia visual (swatches en la sección de vestimenta).
     * Formato: { name, hex }
     */
    suggestedColors: [
      { name: "Terracota", hex: "#C1715B" },
      { name: "Salvia", hex: "#7C9E8A" },
      { name: "Malva", hex: "#C1A0B0" },
      { name: "Camel", hex: "#C09A6B" },
      { name: "Azul Noche", hex: "#3A5275" },
      { name: "Champagne", hex: "#F0DFC0" },
    ],
    avoidColors: "Blanco, negro, y tonos muy pálidos.",
  },

  gifts: {
    description:
      "Tu presencia es el mejor regalo que nos puedes dar. Si quieres compartir algo más con nosotras, aquí algunas opciones:", // TODO: revisar copy
    options: [
      {
        name: "PENDIENTE", // TODO: Nombre de la tienda departamental / lista de regalos
        url: "PENDIENTE", // TODO: Link a la lista de regalos
        icon: "gift",
      },
      {
        name: "Transferencia / sobre",
        description:
          "Si prefieres darnos algo en efectivo, con mucho gusto lo recibimos en el evento.",
        icon: "envelope",
      },
    ],
  },

  warnings: [
    {
      icon: "clock",
      title: "Puntualidad",
      body: "La ceremonia inicia en punto. Te pedimos llegar 15 minutos antes para acomodarte con calma.", // TODO: revisar copy
    },
    {
      icon: "no-phone",
      title: "Momento sin pantallas",
      body: "Durante la ceremonia te pedimos guardar el celular. Hay un fotógrafo profesional que capturará todo — prometemos compartir las fotos.", // TODO: revisar copy
    },
    {
      icon: "wine",
      title: "Mesa redonda",
      body: "La recepción es con barra libre. Por favor cuida tu consumo para que todos disfruten la noche.", // TODO: revisar copy
    },
  ],

  whatsapp: {
    number: "PENDIENTE", // TODO: Número de WhatsApp en formato internacional (ej: 521XXXXXXXXXX)
    backupMessage:
      "Hola Dany y Jazmin, confirmo mi asistencia a su boda. Me llamo [nombre] y voy [número de personas].", // TODO: revisar copy
  },

  music: {
    /** Cambia a true para mostrar el botón de música y activar el reproductor. */
    enabled: false,
    /**
     * Ruta al archivo de audio. Ponlo en public/assets/audio/cancion.mp3
     * y cambia src a "/assets/audio/cancion.mp3".
     */
    src: null as string | null,
    title: null as string | null, // TODO: Título de la canción (para aria-label)
  },

  meta: {
    title: "Dany & Jazmín — Nos casamos",
    description:
      "Estás invitado/a a la boda de Dany y Jazmín. Confirma tu asistencia y celebra con nosotras.", // TODO: revisar copy
    ogImage: "/assets/og/og-image.jpg", // TODO: Crear imagen OG de 1200×630
    siteUrl: "PENDIENTE", // TODO: URL definitiva del sitio en Vercel
  },
} as const;

export type WeddingConfig = typeof weddingConfig;

/**
 * Validación de campos PENDIENTE — llama en el arranque para alertar en consola.
 */
export function validateWeddingConfig(): void {
  const pending: string[] = [];

  function check(key: string, value: unknown) {
    if (value === "PENDIENTE" || value === 0) {
      pending.push(key);
    }
  }

  check("ceremony.name", weddingConfig.ceremony.name);
  check("ceremony.address", weddingConfig.ceremony.address);
  check("ceremony.coordinates.lat", weddingConfig.ceremony.coordinates.lat);
  check("reception.name", weddingConfig.reception.name);
  check("reception.address", weddingConfig.reception.address);
  check("whatsapp.number", weddingConfig.whatsapp.number);
  check("meta.siteUrl", weddingConfig.meta.siteUrl);

  if (pending.length > 0) {
    console.error(
      `\n⚠️  WEDDING CONFIG — Campos sin completar: [${pending.join(", ")}]\n` +
      `   Edita src/infrastructure/content/wedding.config.ts antes de publicar.\n`
    );
  }
}
