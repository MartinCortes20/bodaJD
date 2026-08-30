/**
 * countdown.ts — Cuenta regresiva en vivo hasta la fecha de la boda.
 *
 * Lee la fecha objetivo del atributo data-target en el contenedor.
 * Actualiza los valores cada segundo.
 * Se detiene cuando la fecha ya pasó.
 */

(function initCountdown(): void {
  const container = document.getElementById("countdown-container");
  if (!container) return;

  const targetStr = container.dataset.target;
  if (!targetStr) return;

  const targetDate = new Date(targetStr).getTime();

  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMinutes = document.getElementById("cd-minutes");
  const elSeconds = document.getElementById("cd-seconds");
  const elMessage = document.getElementById("cd-message");

  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  function pad(n: number): string {
    return String(n).padStart(2, "0");
  }

  function tick(): void {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      elDays!.textContent = "00";
      elHours!.textContent = "00";
      elMinutes!.textContent = "00";
      elSeconds!.textContent = "00";
      if (elMessage) {
        elMessage.textContent = "¡Hoy es el gran día!";
      }
      return; // Detener
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    elDays!.textContent = String(days);
    elHours!.textContent = pad(hours);
    elMinutes!.textContent = pad(minutes);
    elSeconds!.textContent = pad(seconds);

    setTimeout(tick, 1000);
  }

  tick();
})();
