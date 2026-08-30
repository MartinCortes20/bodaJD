/**
 * Opciones de mesa de regalos.
 * Los iconos corresponden a nombres en Icon.astro.
 * TODO: Actualizar con los links y tiendas reales.
 */
export interface GiftOption {
  name: string;
  description: string;
  url?: string;
  icon: string;
}

export const giftOptions: GiftOption[] = [
  {
    name: "PENDIENTE", // TODO: Nombre de la tienda o plataforma de lista de regalos
    description:
      "Tenemos una lista de regalos con cosas que nos encantaría recibir.", // TODO: revisar copy
    url: "PENDIENTE", // TODO: URL de la lista de regalos
    icon: "gift",
  },
  {
    name: "Lluvia de sobres",
    description:
      "Si prefieres darnos algo en efectivo, con todo el amor lo recibimos. Tu contribución nos ayudará a hacer realidad nuestra luna de miel.", // TODO: revisar copy
    icon: "envelope",
  },
];
