/**
 * Itinerario del día de la boda.
 * Los iconos corresponden a nombres en Icon.astro.
 * TODO: Actualizar horas y descripciones con el programa real.
 */
export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export const itinerary: ItineraryItem[] = [
  {
    time: "16:30",
    title: "Llegada de invitados",
    description:
      "Te esperamos con la puerta abierta. Hay tiempo para acomodarte y encontrar a tus seres queridos antes de que empiece la magia.", // TODO: revisar copy
    icon: "users",
  },
  {
    time: "17:00",
    title: "Ceremonia", // TODO: Especificar tipo (civil / religiosa / simbólica)
    description:
      "El momento que tanto esperamos. Por favor, toma asiento cinco minutos antes.", // TODO: revisar copy
    icon: "ring",
  },
  {
    time: "18:00",
    title: "Cóctel de bienvenida",
    description:
      "Un espacio para brindar, abrazar y tomarte la primera foto antes de la recepción.", // TODO: revisar copy
    icon: "wine",
  },
  {
    time: "19:00",
    title: "Recepción y cena",
    description:
      "La noche que no querrás que termine. Buena mesa, buena música y las mejores personas.", // TODO: revisar copy
    icon: "fork-knife",
  },
  {
    time: "20:30",
    title: "Corte del pastel",
    description: "El momento dulce de la noche — en todos los sentidos.", // TODO: revisar copy
    icon: "cake",
  },
  {
    time: "21:00",
    title: "Baile y fiesta",
    description:
      "La pista es tuya. Prometemos que la playlist no decepcionará.", // TODO: revisar copy
    icon: "music-note",
  },
  {
    time: "01:00",
    title: "Cierre", // TODO: Confirmar hora de cierre del evento
    description: "Porque toda buena historia tiene un final a la altura.", // TODO: revisar copy
    icon: "moon",
  },
];
