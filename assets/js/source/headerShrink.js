// Import the header height measurement function
import { measureHeaderHeight } from './headerHeight.js';

export function initHeaderShrink() {
  const header = document.querySelector('.js-header');
  
  if (!header) {
    return;
  }
  
  // Check if shrink on scroll is enabled
  const shrinkEnabled = header.dataset.shrinkOnScroll;
  if (!shrinkEnabled || shrinkEnabled === '0') {
    return;
  }
  
  // Hysteresis thresholds to prevent stuttering
  const SHRINK_THRESHOLD = 100; // px scrolled down to shrink
  const EXPAND_THRESHOLD = 80;  // px scrolled up to expand (20px buffer)
  
  let isHeaderShrunk = false;
  let ticking = false;
  
  // Function to check scroll position and update header state
  function checkScrollPosition() {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    let shouldShrink = false;
    
    // Determine if header should be shrunk based on hysteresis
    if (isHeaderShrunk) {
      // Currently shrunk - only expand if we scroll up past expand threshold
      shouldShrink = scrolled > EXPAND_THRESHOLD;
    } else {
      // Currently normal - only shrink if we scroll down past shrink threshold
      shouldShrink = scrolled > SHRINK_THRESHOLD;
    }
    
    // Only update if state actually changes
    if (shouldShrink !== isHeaderShrunk) {
      isHeaderShrunk = shouldShrink;
      
      if (isHeaderShrunk) {
        header.classList.add('header-shrunk');
      } else {
        header.classList.remove('header-shrunk');
      }
      
      // Update the header height CSS variable when state changes
      // Use setTimeout to allow CSS transition to complete (300ms duration from CSS)
      setTimeout(() => {
        measureHeaderHeight(header);
      }, 350);
    }
  }
  
  // Throttled scroll handler using requestAnimationFrame
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkScrollPosition();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Initial check
  checkScrollPosition();
  
  // Listen for scroll events with passive listener for performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', checkScrollPosition);
  
  // Cleanup function (optional, for if you need to destroy the functionality)
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', checkScrollPosition);
  };
}