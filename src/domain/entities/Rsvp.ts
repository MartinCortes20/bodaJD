import {
  AttendanceStatus,
} from "../value-objects/AttendanceStatus.js";
import { DomainError } from "../value-objects/GuestCount.js";
import { FullName } from "../value-objects/FullName.js";
import { GuestCount } from "../value-objects/GuestCount.js";

/**
 * Datos crudos que ingresan desde el formulario antes de validación.
 */
export interface RsvpInput {
  fullName: string;
  attending: string;
  guestCount?: number | string;
  companions?: string;
  dietary?: string;
  song?: string;
}

/**
 * Entidad Rsvp. Representa la confirmación de asistencia de un invitado.
 * Invariante de negocio: si el invitado NO asiste, no puede haber
 * guestCount ni companions (son irrelevantes y se descartan).
 */
export class Rsvp {
  private constructor(
    readonly fullName: FullName,
    readonly attending: AttendanceStatus,
    readonly guestCount: GuestCount | null,
    readonly companions: string | null,
    readonly dietary: string | null,
    readonly song: string | null
  ) {}

  static create(input: RsvpInput): Rsvp {
    const fullName = FullName.create(input.fullName);

    if (
      input.attending !== AttendanceStatus.ATTENDING &&
      input.attending !== AttendanceStatus.NOT_ATTENDING
    ) {
      throw new DomainError(
        "El campo de asistencia tiene un valor no reconocido."
      );
    }
    const attending = input.attending as AttendanceStatus;

    if (attending === AttendanceStatus.NOT_ATTENDING) {
      // Regla: si no asiste, los campos de acompañantes no aplican
      return new Rsvp(fullName, attending, null, null, null, input.song?.trim() || null);
    }

    // Asiste — guestCount es obligatorio en este path
    const guestCount =
      input.guestCount != null
        ? GuestCount.create(input.guestCount)
        : GuestCount.create(1);

    const companions = input.companions?.trim() || null;
    const dietary = input.dietary?.trim() || null;
    const song = input.song?.trim() || null;

    return new Rsvp(fullName, attending, guestCount, companions, dietary, song);
  }
}
