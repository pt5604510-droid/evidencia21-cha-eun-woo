# Evidencia 21 · Desarrollo de aplicativo Bootstrap

Aplicativo web responsive sobre **Cha Eun-woo** (biografía, trayectoria y obras).
Técnico en Programación de Software (233104) · SENA · Guía de actividad de proyecto 6.

## Cómo verlo
Abre `index.html` en el navegador. Necesita internet para cargar Bootstrap 5.3.8 y las tipografías desde CDN.
Para activar la base de datos sigue **`GUIA_BASE_DE_DATOS.md`** (Supabase + GitHub + Netlify/Vercel).

## Qué pide la evidencia y dónde está

| Requisito de la guía | Dónde se cumple |
|---|---|
| Estructurar la navegación | `navbar` con `collapse` y `dropdown` en `index.html` |
| Formularios de captura de datos | `#formVisitas` (texto, correo, select, radio, textarea, checkbox) validado en `js/visitas.js` |
| Tarjetas de contenido | Sección **Obras** (`card`) |
| Componentes dinámicos / modales | Modal de detalle de obra, carousel, accordion, toast y filtros |
| Base de datos | Supabase (`supabase/schema.sql`) con RLS; acceso en `js/datos.js` |
| Sistema de rejilla (grid) | `container` / `row` / `col-*` en todas las secciones |
| Diseño adaptativo | Breakpoints de Bootstrap para móvil, tableta y escritorio |
| HTML5 y CSS3 limpio, comentado y modular | CSS en 4 archivos (`variables`, `base`, `components`, `sections`) y JS en 5 módulos |
| Accesibilidad | Enlace "saltar al contenido", `aria-*`, foco visible, `lang="es"`, `prefers-reduced-motion` |

## Estructura
```
evidencia21-cha-eun-woo/
├── index.html
├── css/   variables.css · base.css · components.css · sections.css
├── js/    config.js · datos.js · obras.js · visitas.js · main.js
├── img/   fotografías
├── supabase/schema.sql
├── GUIA_BASE_DE_DATOS.md
└── README.md
```

## Publicar
Todo el proceso (Supabase, GitHub, Netlify/Vercel) está en `GUIA_BASE_DE_DATOS.md`.

Las fotografías pertenecen a sus respectivos autores y se usan con fines académicos. Proyecto educativo sin fines comerciales; no está afiliado a Cha Eun-woo ni a su agencia.
