/**
 * Value object que representa el número de personas que asisten.
 * Rango válido: 1 a 11 (límite máximo por evento).
 */
export class GuestCount {
  static readonly MIN = 1;
  static readonly MAX = 11;

  private constructor(readonly value: number) {}

  static create(raw: unknown): GuestCount {
    const n = Number(raw);
    if (!Number.isInteger(n)) {
      throw new DomainError(
        `El número de personas debe ser un entero, se recibió: ${String(raw)}`
      );
    }
    if (n < GuestCount.MIN || n > GuestCount.MAX) {
      throw new DomainError(
        `El número de personas debe estar entre ${GuestCount.MIN} y ${GuestCount.MAX}, se recibió: ${n}`
      );
    }
    return new GuestCount(n);
  }
}

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainError";
  }
}
