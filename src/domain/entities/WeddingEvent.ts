/**
 * Entidad que representa un evento de la boda (ceremonia o recepción).
 * Este contrato es compartido por el dominio y la capa de contenido.
 */
export interface WeddingEvent {
  readonly name: string;
  readonly address: string;
  readonly mapsUrl: string;
  readonly coordinates: {
    readonly lat: number;
    readonly lng: number;
  };
  /** Fecha y hora del evento en ISO 8601 (opcional para flexibilidad) */
  readonly date?: string;
}
