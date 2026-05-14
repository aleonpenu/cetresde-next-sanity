# Intro Image Placement

## Instructions

1. Export your intro image as:
   - `intro-landing.webp` (recommended for best performance)
   - or `intro-landing.jpg` as fallback

2. Place it in this directory:
   ```
   public/intro/intro-landing.webp
   ```

3. The component will load it from:
   ```
   /intro/intro-landing.webp
   ```

## Optimizations

- Use `.webp` format for 30-50% smaller file size vs JPEG
- Image will be preloaded in `app/layout.tsx` to avoid flashing
- Next.js Image component optimizes delivery per device

## Editing from Sanity

Once the image is in place:

1. Go to `/studio` (or your Sanity domain)
2. Open the **Configuración del Sitio** document
3. Expand **Intro Overlay (Landing VFX)**
4. Edit:
   - **Activar intro**: toggle on/off
   - **Imagen (ruta en /public)**: set to `/intro/intro-landing.webp`
   - **Título**: e.g., "Capricho Azahar 3D"
   - **Subtítulo**: e.g., "Donde las ideas toman forma"
   - **Duración (ms)**: default 4500 (4.5 seconds)

5. Save and refresh the page to see changes

## Notes

- Intro shows **only once per session** (managed by sessionStorage)
- Users can **skip** with ESC key or the "Saltar intro" button
- Progress bar shows remaining time
- Respects **prefers-reduced-motion** for accessibility
