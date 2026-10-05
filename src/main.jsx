import React from 'react';
import { createRoot } from 'react-dom/client';
import './site.css';
import './food-flip.css';
import GalleryFlipCards from './GalleryFlipCards';
import HeroTechTitle from './HeroTechTitle';
import './legacy.js';

const heroTitleRoot = document.getElementById('heroTechTitle');
if (heroTitleRoot) {
  createRoot(heroTitleRoot).render(
    <React.StrictMode>
      <HeroTechTitle />
    </React.StrictMode>
  );
}

const galleryRoot = document.getElementById('galleryGrid');
if (galleryRoot) {
  createRoot(galleryRoot).render(
    <React.StrictMode>
      <GalleryFlipCards />
    </React.StrictMode>
  );
}
