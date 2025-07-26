export function initHeaderHide() {
  const header = document.querySelector('.js-header');
  
  if (!header) {
    return;
  }
  
  // Check if hide on scroll is enabled
  const hideEnabled = header.dataset.hideOnScroll;
  if (!hideEnabled || hideEnabled === '0') {
    return;
  }
  
  // Configuration
  const INITIAL_SCROLL_THRESHOLD = 500; // Must scroll past this before hide/show logic kicks in
  const SCROLL_DELTA_THRESHOLD = 15; // Optimal delta for direction change detection
  const SCROLL_SPEED_THRESHOLD = 50; // Fast scroll detection (pixels per frame)
  
  // State tracking
  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
  let isHeaderHidden = false;
  let scrollDirection = null; // 'down' or 'up'
  let scrollDelta = 0; // Accumulated scroll in current direction
  let ticking = false;
  let lastScrollTime = Date.now();
  let isManualScrolling = false; // Track if scroll is user-initiated
  let manualScrollTimeout = null;
  
  // Function to check scroll behavior and update header visibility
  function checkScrollBehavior() {
    // ONLY hide header during manual user scrolling - ignore all programmatic scrolls
    if (!isManualScrolling) {
      resetScrollTracking(window.pageYOffset || document.documentElement.scrollTop, Date.now());
      return;
    }
    
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const currentTime = Date.now();
    const timeDelta = currentTime - lastScrollTime;
    const scrollDiff = currentScrollY - lastScrollY;
    const scrollSpeed = Math.abs(scrollDiff) / Math.max(timeDelta, 1);
    
    // Don't do anything if we haven't scrolled past the initial threshold
    if (currentScrollY <= INITIAL_SCROLL_THRESHOLD) {
      if (isHeaderHidden) {
        showHeader();
      }
      resetScrollTracking(currentScrollY, currentTime);
      return;
    }
    
    // Determine scroll direction
    const newDirection = scrollDiff > 0 ? 'down' : scrollDiff < 0 ? 'up' : null;
    
    // If direction changed, reset delta accumulation
    if (newDirection && newDirection !== scrollDirection) {
      scrollDirection = newDirection;
      scrollDelta = Math.abs(scrollDiff);
    } else if (newDirection) {
      // Accumulate scroll distance in current direction
      scrollDelta += Math.abs(scrollDiff);
    }
    
    // Fast scroll detection - show/hide immediately on fast scrolling
    if (scrollSpeed > SCROLL_SPEED_THRESHOLD) {
      if (scrollDirection === 'down' && !isHeaderHidden) {
        hideHeader();
      } else if (scrollDirection === 'up' && isHeaderHidden) {
        showHeader();
      }
    }
    // Normal scroll - use delta threshold to prevent stuttering
    else if (scrollDelta >= SCROLL_DELTA_THRESHOLD) {
      if (scrollDirection === 'down' && !isHeaderHidden) {
        hideHeader();
      } else if (scrollDirection === 'up' && isHeaderHidden) {
        showHeader();
      }
      
      // Reset delta after action
      scrollDelta = 0;
    }
    
    resetScrollTracking(currentScrollY, currentTime);
  }
  
  function hideHeader() {
    if (!isHeaderHidden) {
      isHeaderHidden = true;
      header.classList.add('header-hidden');
      
      // Dispatch custom event for other components that might need to know
      window.dispatchEvent(new CustomEvent('headerHidden'));
      
      // Update header height measurement after transition completes (300ms duration)
      setTimeout(() => {
        // Import and call measureHeaderHeight
        import('./headerHeight.js').then(module => {
          module.measureHeaderHeight(header);
        });
      }, 350);
    }
  }
  
  function showHeader() {
    if (isHeaderHidden) {
      isHeaderHidden = false;
      header.classList.remove('header-hidden');
      
      // Dispatch custom event for other components that might need to know
      window.dispatchEvent(new CustomEvent('headerShown'));
      
      // Update header height measurement after transition completes (300ms duration)
      setTimeout(() => {
        // Import and call measureHeaderHeight
        import('./headerHeight.js').then(module => {
          module.measureHeaderHeight(header);
        });
      }, 350);
    }
  }
  
  function resetScrollTracking(scrollY, time) {
    lastScrollY = scrollY;
    lastScrollTime = time;
  }
  
  // Functions to detect manual vs programmatic scrolling
  function startManualScrolling() {
    isManualScrolling = true;
    clearTimeout(manualScrollTimeout);
  }
  
  function stopManualScrolling() {
    clearTimeout(manualScrollTimeout);
    manualScrollTimeout = setTimeout(() => {
      isManualScrolling = false;
      // Reset tracking to prevent immediate hide/show after programmatic scroll
      resetScrollTracking(window.pageYOffset || document.documentElement.scrollTop, Date.now());
      scrollDelta = 0;
      scrollDirection = null;
    }, 100); // Short delay to ensure scroll events finish
  }
  
  // Throttled scroll handler using requestAnimationFrame
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkScrollBehavior();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Handle window focus - show header when user returns to tab
  function handleFocus() {
    if (isHeaderHidden) {
      showHeader();
      scrollDelta = 0; // Reset delta to prevent immediate hide
    }
  }
  
  // Handle resize - ensure header is visible during resize
  function handleResize() {
    if (isHeaderHidden) {
      showHeader();
    }
  }
  
  // Initial setup
  resetScrollTracking(window.pageYOffset || document.documentElement.scrollTop, Date.now());
  
  // Event listeners for scroll
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('focus', handleFocus);
  window.addEventListener('resize', handleResize);
  
  // Track user interactions to detect manual scrolling
  window.addEventListener('wheel', startManualScrolling, { passive: true });
  window.addEventListener('touchstart', startManualScrolling, { passive: true });
  window.addEventListener('touchmove', startManualScrolling, { passive: true });
  window.addEventListener('keydown', (e) => {
    // Arrow keys, page up/down, space, home, end
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', 'Home', 'End'].includes(e.code)) {
      startManualScrolling();
    }
  });
  
  // Stop manual scrolling after user interaction ends
  window.addEventListener('wheel', stopManualScrolling, { passive: true });
  window.addEventListener('touchend', stopManualScrolling, { passive: true });
  window.addEventListener('keyup', stopManualScrolling);
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('wheel', startManualScrolling);
    window.removeEventListener('wheel', stopManualScrolling);
    window.removeEventListener('touchstart', startManualScrolling);
    window.removeEventListener('touchmove', startManualScrolling);
    window.removeEventListener('touchend', stopManualScrolling);
    window.removeEventListener('keydown', startManualScrolling);
    window.removeEventListener('keyup', stopManualScrolling);
    clearTimeout(manualScrollTimeout);
  };
}