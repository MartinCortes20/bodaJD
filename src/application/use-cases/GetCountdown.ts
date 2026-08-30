/**
 * Resultado de la cuenta regresiva.
 */
export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

/**
 * Caso de uso: calcular tiempo restante hasta la fecha de la boda.
 * Función pura — sin side effects, sin dependencias externas.
 *
 * @param targetDate - Fecha objetivo en ISO 8601 o cualquier formato que Date() acepte
 * @param now - Fecha de referencia (por defecto, el momento actual). Inyectable para testing.
 */
export function getCountdown(
  targetDate: string,
  now: Date = new Date()
): CountdownResult {
  const target = new Date(targetDate).getTime();
  const current = now.getTime();
  const diff = target - current;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isPast: false };
}
