import type { Rsvp } from "../entities/Rsvp.js";

/**
 * Puerto (interfaz) que define cómo se envía una confirmación de asistencia.
 * Las implementaciones concretas viven en src/infrastructure/repositories/.
 */
export interface RsvpRepository {
  submit(rsvp: Rsvp): Promise<void>;
}
