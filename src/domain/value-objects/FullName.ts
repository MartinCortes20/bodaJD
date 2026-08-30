import { DomainError } from "./GuestCount.js";

/**
 * Value object para el nombre completo del invitado.
 * Valida que no esté vacío y que no exceda la longitud máxima.
 */
export class FullName {
  static readonly MAX_LENGTH = 120;

  private constructor(readonly value: string) {}

  static create(raw: unknown): FullName {
    if (typeof raw !== "string") {
      throw new DomainError("El nombre debe ser texto.");
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new DomainError("El nombre no puede estar vacío.");
    }
    if (trimmed.length > FullName.MAX_LENGTH) {
      throw new DomainError(
        `El nombre no puede exceder ${FullName.MAX_LENGTH} caracteres.`
      );
    }
    return new FullName(trimmed);
  }
}
