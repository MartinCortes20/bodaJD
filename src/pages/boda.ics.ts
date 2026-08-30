import type { APIRoute } from "astro";
import { weddingConfig } from "../../src/infrastructure/content/wedding.config";

export const GET: APIRoute = async () => {
  const dtstart = weddingConfig.date.replace(/[-:]/g, "").split(".")[0];
  
  // Asumimos 5 horas de duración para el evento
  const startDate = new Date(weddingConfig.date);
  const endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000);
  const dtend = endDate.toISOString().replace(/[-:]/g, "").split(".")[0];

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Boda Dany y Jazmín//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:Boda de ${weddingConfig.couple.name1} y ${weddingConfig.couple.name2}`,
    `DESCRIPTION:¡Nos casamos! Confirma tu asistencia en la invitación.`,
    `LOCATION:${weddingConfig.ceremony.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="boda-dany-jazmin.ics"',
    },
  });
};
