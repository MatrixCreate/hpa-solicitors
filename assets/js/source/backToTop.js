export function initBackToTop() {
  const backToTopBtn = document.querySelector('.js-btn-top');
  
  if (!backToTopBtn) {
    return;
  }
  
  // Get the threshold percentage from data attribute
  const thresholdStr = backToTopBtn.dataset.threshold || '20%';
  const thresholdPercent = parseFloat(thresholdStr) / 100;
  
  // Function to check if we should show the button
  function checkScrollPosition() {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const thresholdDistance = pageHeight * thresholdPercent;
    
    if (scrolled > thresholdDistance) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  }
  
  // Use throttling to improve performance
  let ticking = false;
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
  
  // Listen for scroll events
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', checkScrollPosition);
  
  // Handle click event for smooth scroll to top
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Optional: Focus management for accessibility
    setTimeout(() => {
      const target = document.getElementById('top') || document.body;
      target.focus();
    }, 500);
  });
  
  // Cleanup function (optional, for if you need to destroy the functionality)
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', checkScrollPosition);
  };
}