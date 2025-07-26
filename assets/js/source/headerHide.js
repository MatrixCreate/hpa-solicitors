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
  let isTemporarilyDisabled = false; // Flag to temporarily disable auto-hiding
  
  // Function to check scroll behavior and update header visibility
  function checkScrollBehavior() {
    // Skip auto-hiding if temporarily disabled
    if (isTemporarilyDisabled) {
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
    }
  }
  
  function showHeader() {
    if (isHeaderHidden) {
      isHeaderHidden = false;
      header.classList.remove('header-hidden');
      
      // Dispatch custom event for other components that might need to know
      window.dispatchEvent(new CustomEvent('headerShown'));
    }
  }
  
  function resetScrollTracking(scrollY, time) {
    lastScrollY = scrollY;
    lastScrollTime = time;
  }
  
  // Functions to temporarily disable/enable auto-hiding
  function temporarilyDisableAutoHide() {
    isTemporarilyDisabled = true;
    // Ensure header is visible when disabling auto-hide
    if (isHeaderHidden) {
      showHeader();
    }
  }
  
  function enableAutoHide() {
    isTemporarilyDisabled = false;
    // Reset tracking to current position to prevent immediate hide/show
    resetScrollTracking(window.pageYOffset || document.documentElement.scrollTop, Date.now());
    scrollDelta = 0;
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
  
  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('focus', handleFocus);
  window.addEventListener('resize', handleResize);
  
  // Listen for smooth scroll events to temporarily disable auto-hiding
  window.addEventListener('smoothScrollStart', temporarilyDisableAutoHide);
  window.addEventListener('smoothScrollEnd', enableAutoHide);
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('smoothScrollStart', temporarilyDisableAutoHide);
    window.removeEventListener('smoothScrollEnd', enableAutoHide);
  };
}