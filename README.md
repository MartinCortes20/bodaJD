# Boda de Dany & Jazmín — Sitio de Invitación

Landing page de invitación de boda. Construida con:

- **Astro 5** — SSG / SSR
- **Tailwind CSS v4** — vía `@tailwindcss/vite` (sin `tailwind.config.js`)
- **TypeScript strict**
- **Vercel** — deploy

---

## Antes de publicar — checklist

### 1. Datos de la boda (`src/infrastructure/content/wedding.config.ts`)

Abre el archivo y reemplaza todos los valores marcados con `"PENDIENTE"`:

| Campo | Qué poner |
|-------|-----------|
| `date` | Fecha real ISO 8601, p.ej. `"2026-09-20T17:00:00"` |
| `ceremony.name` | Nombre del lugar de la ceremonia |
| `ceremony.address` | Dirección completa |
| `ceremony.mapsUrl` | Link de Google Maps (clic derecho en el mapa → "Compartir") |
| `ceremony.coordinates` | Lat/lng (opcional, para uso futuro) |
| `reception.*` | Lo mismo para la recepción |
| `whatsapp.number` | Número en formato internacional, p.ej. `"5215512345678"` |
| `meta.siteUrl` | URL definitiva en Vercel |
| `meta.ogImage` | Imagen OG de 1200×630 en `/public/assets/og/og-image.jpg` |
| `gifts.options[0].name` | Nombre de la tienda o lista de regalos |
| `gifts.options[0].url` | Link a la lista |

El servidor de desarrollo muestra un **warning en consola** mientras algún campo siga en `"PENDIENTE"`.

---

### 2. Entry IDs de Google Form (`src/infrastructure/config/googleForm.ts`)

Los formularios de Google asignan IDs únicos a cada campo. Para obtenerlos:

1. Abre tu Google Form
2. Haz clic en "Ver formulario relleno" (ícono del ojo)
3. Abre las DevTools del navegador → pestaña **Network**
4. Rellena el formulario con datos de prueba y envíalo
5. Busca la petición a `formResponse` → revisa el **payload** (Form Data)
6. Copia cada `entry.XXXXXXX` al campo correspondiente en `googleForm.ts`

Los campos a mapear son:

```ts
fields: {
  fullName:   "entry.REAL_ID_AQUI",
  attending:  "entry.REAL_ID_AQUI",
  guestCount: "entry.REAL_ID_AQUI",
  companions: "entry.REAL_ID_AQUI",
  dietary:    "entry.REAL_ID_AQUI",
  song:       "entry.REAL_ID_AQUI",
}
```

> ⚠️ Los strings `attendingValues.yes` y `attendingValues.no` deben coincidir **carácter por carácter** con las opciones de tu formulario, incluyendo acentos. Si Google descarta el valor, la respuesta llega en blanco sin aviso.

---

### 3. Música de fondo (`src/infrastructure/content/wedding.config.ts`)

Por defecto la música está **desactivada**.

Para activarla:

1. Pon el archivo MP3 en: `public/assets/audio/cancion.mp3`
2. En `wedding.config.ts`, cambia:

```ts
music: {
  enabled: true,                          // ← cambiar a true
  src: "/assets/audio/cancion.mp3",       // ← poner la ruta real
  title: "Nombre de la canción — Artista", // ← para aria-label
}
```

3. El botón flotante de reproducción aparecerá automáticamente (esquina inferior derecha).

> El botón nunca hace autoplay. Requiere que el usuario haga clic.

---

### 4. Imágenes

Coloca las fotos en las carpetas correspondientes dentro de `public/assets/images/`:

| Carpeta | Uso | Tamaño sugerido |
|---------|-----|-----------------|
| `hero/` | Imagen de fondo del hero | 1920 × 1080 |
| `pareja/` | Fotos para ambas galerías | 800 × 1000 (vertical) o 1000 × 750 (horizontal) |
| `invitacion/` | Foto opcional en sección de invitación | 800 × 600 |
| `og/` | Imagen Open Graph (WhatsApp preview) | 1200 × 630 exacto |

Todas las imágenes necesitan `alt` descriptivo en español. Las que están fuera del hero deben usar `loading="lazy"`. El hero usa `loading="eager"` con `fetchpriority="high"`.

Para usar el hero como fondo de imagen: edita `01-Hero.astro` y reemplaza el `<div>` de degradado con un `<img>` posicionado `absolute inset-0 object-cover`.

---

## Desarrollo local

```bash
npm install
npm run dev
```

El sitio corre en `http://localhost:4321`.

---

## Deploy en Vercel

El proyecto ya tiene `@astrojs/vercel` configurado.

```bash
# Verifica que el build pasa sin errores
npm run build

# Deploy
npx vercel --prod
```

O conecta el repositorio en [vercel.com](https://vercel.com) para deploy automático en cada push.

---

## Arquitectura

```
presentation  →  application  →  domain
infrastructure →  application  →  domain
```

- `src/domain/` — TypeScript puro, sin dependencias externas
- `src/application/use-cases/` — casos de uso con inyección de dependencias
- `src/infrastructure/` — implementaciones concretas (Google Form, WhatsApp)
- `src/presentation/` — componentes Astro, estilos, scripts de cliente

Ningún dato de la boda está hardcodeado en los `.astro`. Todo viene de `wedding.config.ts`.
# bodaJD
