# Iván Gallego — Portfolio / CV

Portfolio personal de **Iván Gallego Vela**, Full Stack Developer (Laravel · React / Next.js · TypeScript).

Estética terminal/dev con modelos **3D reales** de las tecnologías del stack (React, Laravel, Next.js, TypeScript, Docker…) renderizados en tiempo real con **React Three Fiber**.

## Stack del proyecto

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens en `globals.css`)
- **three.js** / **@react-three/fiber** / **@react-three/drei** — átomo de React y logos 3D extruidos desde SVG
- **lucide-react** — iconos SVG
- Fuentes: **JetBrains Mono** + **Inter** (`next/font`, self-hosted)

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start        # servir el build
```

## Estructura

```
src/
  app/
    layout.tsx        # fuentes + metadata (SEO, Open Graph)
    page.tsx          # ensambla las secciones + JSON-LD
    globals.css       # sistema de diseño (tokens, animaciones, utilidades)
    icon.svg          # favicon de marca
  components/
    Nav · Hero · Stats · About · Experience · Stack · Education · Contact · Footer
    Reveal.tsx        # scroll-reveal (IntersectionObserver)
    three/
      HeroScene.tsx   # canvas del hero + parallax de ratón
      ReactAtom.tsx   # átomo de React procedural
      TechScene.tsx   # anillo de logos 3D
      ExtrudedLogo.tsx# extruye cualquier path SVG a un modelo 3D
  lib/
    content.ts        # todo el contenido del CV (edítalo aquí)
    logos.ts          # paths de marca (auto-generado desde public/logos)
public/
  CV-Ivan-Gallego.pdf # CV descargable
  logos/*.svg         # logos de marca (simple-icons)
```

## Editar el contenido

Todo el texto del CV vive en **`src/lib/content.ts`** (perfil, experiencia, stack, formación, contacto). No hace falta tocar los componentes.

Para cambiar el CV descargable, reemplaza `public/CV-Ivan-Gallego.pdf`.

## Desplegar en Vercel

**Opción A — Importar desde GitHub (recomendada):**

1. Sube el proyecto a un repo de GitHub (ver más abajo).
2. Entra en [vercel.com/new](https://vercel.com/new) e importa el repo.
3. Vercel detecta Next.js automáticamente → **Deploy**. Cero configuración.

**Opción B — Vercel CLI:**

```bash
npm i -g vercel
vercel          # primera vez: login + configurar proyecto
vercel --prod   # desplegar a producción
```

### Subir a GitHub

```bash
git add -A
git commit -m "Portfolio 3D en Next.js"
gh repo create ivanote-portfolio --public --source=. --push
# o crea el repo en github.com y:
# git remote add origin https://github.com/<usuario>/ivanote-portfolio.git
# git push -u origin main
```

## Accesibilidad y rendimiento

- Respeta `prefers-reduced-motion` (desactiva animaciones y typewriter).
- Escenas 3D cargadas con `dynamic(..., { ssr: false })` — no bloquean el render inicial.
- Contraste AA, foco visible, navegación por teclado, metadata + JSON-LD (schema.org/Person).
