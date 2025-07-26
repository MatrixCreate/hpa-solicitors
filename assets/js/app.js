import '../css/app.css';
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
// Import Fancybox library - this makes it available globally as window.Fancybox
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { initHeaderHeight } from './source/headerHeight.js';
import { initHeaderShrink } from './source/headerShrink.js';
import { initHeaderHide } from './source/headerHide.js';
import { initHeroCarousel } from './source/heroCarousel.js';
import { initContainerOffset } from './source/containerOffset.js';
import { initBackToTop } from './source/backToTop.js';
import SmoothScroll from './source/smoothScroll.js';

// Make Fancybox available globally
window.Fancybox = Fancybox;

Alpine.plugin(collapse);
window.Alpine = Alpine;
Alpine.start();

initHeaderHeight();
initHeaderShrink();
initHeaderHide();
initHeroCarousel();
initContainerOffset();
initBackToTop();

document.addEventListener('DOMContentLoaded', () => {
  // FancyBox 
  if (document.querySelector("[data-fancybox]")) {
    Fancybox.bind("[data-fancybox]", {
      // Your options go here
    });
  };
});