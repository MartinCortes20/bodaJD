import type { RsvpRepository } from "../../domain/ports/RsvpRepository.js";
import { Rsvp, type RsvpInput } from "../../domain/entities/Rsvp.js";

/**
 * Caso de uso: enviar confirmación de asistencia.
 * Recibe su repositorio por constructor — nunca instancia implementaciones concretas.
 */
export class SubmitRsvp {
  constructor(private readonly repository: RsvpRepository) {}

  async execute(input: RsvpInput): Promise<void> {
    const rsvp = Rsvp.create(input);
    await this.repository.submit(rsvp);
  }
}
