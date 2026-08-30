/**
 * Value object que representa la decisión de asistencia de un invitado.
 * Solo dos estados posibles: confirma o no puede asistir.
 */
export const AttendanceStatus = {
  ATTENDING: "ATTENDING",
  NOT_ATTENDING: "NOT_ATTENDING",
} as const;

export type AttendanceStatus =
  (typeof AttendanceStatus)[keyof typeof AttendanceStatus];

export function isAttendanceStatus(value: unknown): value is AttendanceStatus {
  return (
    value === AttendanceStatus.ATTENDING ||
    value === AttendanceStatus.NOT_ATTENDING
  );
}
