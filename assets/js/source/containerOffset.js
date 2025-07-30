// Measure the space between the container and the viewport edge and update the --container-offset custom property
// for use in CSS calculations, notably for the left padding of scrollsnap containers
export const initContainerOffset = () => {
  const offsetSlider = () => {
    // Create and append a faux container to measure dimensions dynamically
    const dummyDiv = document.createElement('div');
    dummyDiv.classList.add(
      'faux-container',
      'container-medium',
      'mx-auto',
      'p-var',
      '!py-0',
      'js-faux-container'
    );
    const main = document.querySelector('.main');

    if (!main) {
      return;
    }
    
    main.appendChild(dummyDiv);

    const containerEl = document.querySelector('.js-faux-container');
    if (containerEl === null) return;

    const containerPadding = 24;

    // Function to measure and set the container offset
    const updateContainerOffset = () => {
      // Use requestAnimationFrame to batch layout operations
      requestAnimationFrame(() => {
        const containerRect = containerEl.getBoundingClientRect();
        const containerOffset = Math.round(containerRect.x + containerPadding);
        document.documentElement.style.setProperty('--container-offset', `${containerOffset}px`);
      });
    };

    // Initial measurement
    updateContainerOffset();

    // Throttled resize event handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          updateContainerOffset();
          resizeTimeout = null;
        }, 100);
      }
    });
  };

  // Call the offsetSlider function
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', offsetSlider);
  } else {
    offsetSlider();
  }
};
