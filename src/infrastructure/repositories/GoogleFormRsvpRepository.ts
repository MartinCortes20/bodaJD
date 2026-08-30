import type { RsvpRepository } from "../../domain/ports/RsvpRepository.js";
import type { Rsvp } from "../../domain/entities/Rsvp.js";
import { AttendanceStatus } from "../../domain/value-objects/AttendanceStatus.js";
import { GOOGLE_FORM } from "../config/googleForm.js";

/**
 * Implementación concreta de RsvpRepository que envía los datos a Google Forms.
 *
 * Google Forms no devuelve headers CORS, por lo que la respuesta es opaca
 * (mode: "no-cors"). No podemos leer el status de la respuesta.
 * Por eso validamos TODO en cliente antes de llamar a submit().
 */
export class GoogleFormRsvpRepository implements RsvpRepository {
  async submit(rsvp: Rsvp): Promise<void> {
    const formData = new FormData();

    formData.append(GOOGLE_FORM.fields.fullName, rsvp.fullName.value);

    const attendingValue =
      rsvp.attending === AttendanceStatus.ATTENDING
        ? GOOGLE_FORM.attendingValues.yes
        : GOOGLE_FORM.attendingValues.no;
    formData.append(GOOGLE_FORM.fields.attending, attendingValue);

    if (rsvp.guestCount != null) {
      formData.append(
        GOOGLE_FORM.fields.guestCount,
        String(rsvp.guestCount.value)
      );
    }

    if (rsvp.companions != null) {
      formData.append(GOOGLE_FORM.fields.companions, rsvp.companions);
    }

    if (rsvp.dietary != null) {
      formData.append(GOOGLE_FORM.fields.dietary, rsvp.dietary);
    }

    if (rsvp.song != null) {
      formData.append(GOOGLE_FORM.fields.song, rsvp.song);
    }

    await fetch(GOOGLE_FORM.endpoint, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });
    // No podemos leer el status — la respuesta es opaque.
    // El redirect optimista a /gracias ocurre en el componente.
  }
}
