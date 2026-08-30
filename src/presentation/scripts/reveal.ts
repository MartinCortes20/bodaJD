/**
 * reveal.ts — IntersectionObserver para animaciones de entrada al scroll.
 *
 * Observa todos los elementos con [data-reveal].
 * Añade la clase .is-visible cuando entran al viewport.
 * Si prefers-reduced-motion está activo, marca todo visible inmediatamente.
 *
 * Este script se ejecuta una vez al cargar la página.
 * NO hace animaciones en loop.
 */

(function initReveal(): void {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

  if (elements.length === 0) return;

  // Con reduce motion: mostrar todo inmediatamente sin observer
  if (prefersReducedMotion) {
    elements.forEach((el) => {
      el.classList.add("is-visible");
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Dejar de observar una vez visible — la animación ocurre una sola vez
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
})();
