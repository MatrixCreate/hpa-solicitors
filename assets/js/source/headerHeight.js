// Measure the header and update the --header-height custom property
export const measureHeaderHeight = (header) => {
  const headerHeight = header.offsetHeight;
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
};

// Throttled resize event listener
const addResizeListener = (header) => {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      measureHeaderHeight(header);
    }, 150);
  });
};

// Initialize the header height functionality
export const initHeaderHeight = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.js-header');
    if (!header) return;

    // Measure and set the header height on page load
    measureHeaderHeight(header);

    // Add throttled resize listener
    addResizeListener(header);

    // Listen for header hide/show events to maintain accurate height
    // Note: We keep measuring the actual header height even when hidden
    // because other layout calculations might still need the header's dimensions
    window.addEventListener('headerHidden', () => {
      // Header is still in DOM, just transformed, so height calculation remains valid
      measureHeaderHeight(header);
    });

    window.addEventListener('headerShown', () => {
      // Re-measure when header becomes visible again
      measureHeaderHeight(header);
    });
  });
};
