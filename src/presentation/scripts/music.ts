/**
 * music.ts — Control de reproducción de música de fondo.
 *
 * Reglas:
 * - NUNCA autoplay: requiere gesto explícito del usuario.
 * - Recuerda preferencia en sessionStorage.
 * - Se pausa si la pestaña pierde foco (visibilitychange).
 * - El botón tiene aria-pressed para indicar el estado.
 */

(function initMusicToggle(): void {
  const btn = document.getElementById("music-toggle-btn") as HTMLButtonElement | null;
  const audio = document.getElementById("bg-audio") as HTMLAudioElement | null;
  const iconPlay = document.getElementById("icon-play");
  const iconPause = document.getElementById("icon-pause");

  if (!btn || !audio) return;

  const SESSION_KEY = "boda-music-playing";
  let isPlaying = false;

  function setPlaying(playing: boolean): void {
    isPlaying = playing;

    if (playing) {
      audio!.play().catch(() => {
        // El navegador bloqueó la reproducción — revertir estado
        setPlaying(false);
      });
      btn!.setAttribute("aria-pressed", "true");
      btn!.setAttribute("aria-label", "Pausar música de fondo");
      iconPlay?.classList.add("hidden");
      iconPause?.classList.remove("hidden");
      sessionStorage.setItem(SESSION_KEY, "true");
    } else {
      audio!.pause();
      btn!.setAttribute("aria-pressed", "false");
      btn!.setAttribute("aria-label", "Reproducir música de fondo");
      iconPlay?.classList.remove("hidden");
      iconPause?.classList.add("hidden");
      sessionStorage.removeItem(SESSION_KEY);
    }
  }

  // Toggle al hacer click
  btn.addEventListener("click", () => {
    setPlaying(!isPlaying);
  });

  // Pausar si la pestaña pierde foco
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && isPlaying) {
      audio.pause();
      // No cambiar el estado — reanudar cuando vuelva
    } else if (!document.hidden && isPlaying) {
      audio.play().catch(() => {});
    }
  });

  // Restaurar preferencia de sessionStorage
  // (solo si el usuario ya interactuó en esta sesión)
  if (sessionStorage.getItem(SESSION_KEY) === "true") {
    // No hacemos autoplay — solo actualizamos la UI
    // El usuario tendrá que volver a hacer click
    sessionStorage.removeItem(SESSION_KEY);
  }
})();
