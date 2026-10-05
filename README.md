# The Savory Bar — React Liquid Glass + FlipCard + TechText

Interactive Vite/React build of The Savory Bar website.

## Included interactions

- Liquid-glass / glassmorphism interface
- Animated ambient canvas and cursor lighting
- React Bits-style FlipCard food gallery using `motion/react`
  - click/tap flip
  - drag/flick flip
  - spring physics
  - 3D tilt and glare
  - keyboard and reduced-motion support
- TechText hero title for **THE SAVORY BAR**
  - interactive letter selection
  - dashed reveal
  - animated sweep
  - draggable glyphs with spring return
  - selection frames / labels
  - animated specks
  - responsive canvas sizing
  - dark/light theme-aware brand colors
- Existing custom-box builder and packing rules
- Delivery / pickup pricing
- Bouquet add-on
- Printable order summary
- WhatsApp order generation
- Responsive navigation and theme switching

## Run

```bash
npm install
npm run dev
```

Open the local URL Vite prints, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Main source files

- `src/TechText.jsx` — interactive canvas title engine
- `src/TechText.css` — TechText canvas styling
- `src/HeroTechTitle.jsx` — THE SAVORY BAR TechText configuration
- `src/FlipCard.jsx` — interactive food FlipCard component
- `src/FlipCard.css` — FlipCard styles
- `src/GalleryFlipCards.jsx` — food gallery renderer
- `src/galleryData.js` — gallery content
- `src/site.css` — full glassmorphism website styles
- `src/legacy.js` — original ordering/site behavior
- `src/main.jsx` — React mounts

## Food images

Put your real food images in `public/images/` using the filenames referenced in `src/galleryData.js`. Fallback images are used when local assets are absent.


## Hero title animation fix
The original three-line THE / SAVORY / BAR typography is preserved as normal DOM text. TechText is rendered as a transparent canvas overlay, so only its interaction/outline animation is added without changing the original title size, font, spacing, color, or layout.
