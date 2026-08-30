import type { RsvpRepository } from "../../domain/ports/RsvpRepository.js";
import type { Rsvp } from "../../domain/entities/Rsvp.js";
import { AttendanceStatus } from "../../domain/value-objects/AttendanceStatus.js";
import { weddingConfig } from "../content/wedding.config.js";

/**
 * Implementación alternativa de RsvpRepository que abre WhatsApp
 * con el mensaje prellenado. Sirve como respaldo si Google Form falla.
 */
export class WhatsAppRsvpRepository implements RsvpRepository {
  async submit(rsvp: Rsvp): Promise<void> {
    const attending =
      rsvp.attending === AttendanceStatus.ATTENDING
        ? "Si, confirmo mi asistencia"
        : "No podre asistir";

    const lines: string[] = [
      `Hola Dany y Jazmin`,
      ``,
      `Me llamo: ${rsvp.fullName.value}`,
      `Asistencia: ${attending}`,
    ];

    if (rsvp.guestCount != null) {
      lines.push(`Número de personas: ${rsvp.guestCount.value}`);
    }

    if (rsvp.companions) {
      lines.push(`Acompañantes: ${rsvp.companions}`);
    }

    if (rsvp.dietary) {
      lines.push(`Restricciones alimentarias: ${rsvp.dietary}`);
    }

    if (rsvp.song) {
      lines.push(`Canción que no puede faltar: ${rsvp.song}`);
    }

    const message = encodeURIComponent(lines.join("\n"));
    const number = weddingConfig.whatsapp.number;
    const url = `https://wa.me/${number}?text=${message}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }
}
