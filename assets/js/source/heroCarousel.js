// Enhanced hero carousel functionality
// Timing synchronization system:
// 1. CSS sets default timing values as custom properties (--hero-transition-speed, --hero-autoplay-speed)
// 2. Twig template can override via data attributes (data-autoplay-speed, data-transition-speed)
// 3. JavaScript reads data attributes and updates CSS custom properties
// 4. JavaScript then reads the computed CSS values to ensure perfect synchronization
// 5. CSS transitions automatically use the --hero-transition-speed custom property
export const heroCarousel = () => {
  const hero = document.querySelector('.js-hero-carousel');
  if (!hero) return;

  // Get carousel settings from data attributes
  const transitionType = hero.dataset.transitionType || 'fade';
  const autoplayEnabled = hero.dataset.autoplayEnabled === 'true';
  const pauseOnHover = hero.dataset.pauseOnHover === 'true';
  const slidesCount = parseInt(hero.dataset.slidesCount) || 0;
  
  // Get timing values from data attributes or CSS custom properties
  const dataAutoplaySpeed = parseInt(hero.dataset.autoplaySpeed);
  const dataTransitionSpeed = parseInt(hero.dataset.transitionSpeed);
  
  // Set CSS custom properties if data attributes are provided
  if (dataAutoplaySpeed) {
    hero.style.setProperty('--hero-autoplay-speed', `${dataAutoplaySpeed}ms`);
  }
  if (dataTransitionSpeed) {
    hero.style.setProperty('--hero-transition-speed', `${dataTransitionSpeed}ms`);
  }
  
  // Read the computed values from CSS custom properties
  // This ensures JavaScript timing matches CSS transition duration
  const computedStyles = getComputedStyle(hero);
  const autoplaySpeedStr = computedStyles.getPropertyValue('--hero-autoplay-speed').trim();
  const transitionSpeedStr = computedStyles.getPropertyValue('--hero-transition-speed').trim();
  
  // Parse values, removing 'ms' suffix if present
  const autoplaySpeed = parseInt(autoplaySpeedStr.replace('ms', '')) || 5000;
  const transitionSpeed = parseInt(transitionSpeedStr.replace('ms', '')) || 700;
  

  // Select all slides
  const slides = Array.from(hero.querySelectorAll('.js-carousel-slide'));
  
  // Early exit if not enough slides
  if (slides.length <= 1) return;

  // Carousel state
  let currentIndex = 0;
  let isCarouselStopped = false;
  let isPaused = false;
  let slideInterval;
  let isTransitioning = false;

  // Set initial slide positioning for slide transition
  if (transitionType === 'slide') {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * 100}%)`;
    });
  }

  // Updates active slide with proper transition handling
  const updateSlides = (index, direction = 'next') => {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Remove active from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (transitionType === 'fade') {
      // Fade transition
      slides[index].classList.add('active');
      
      // Wait for transition to complete
      setTimeout(() => {
        isTransitioning = false;
      }, transitionSpeed);
      
    } else if (transitionType === 'slide') {
      // Slide transition
      slides.forEach((slide, i) => {
        const offset = (i - index) * 100;
        slide.style.transform = `translateX(${offset}%)`;
      });
      
      // Add active class to current slide
      slides[index].classList.add('active');
      
      // Wait for transition to complete
      setTimeout(() => {
        isTransitioning = false;
      }, transitionSpeed);
    }
  };

  // Advances the carousel to the next slide
  const autoSlide = () => {
    if (isTransitioning) return;
    
    const nextIndex = (currentIndex + 1) % slides.length;
    currentIndex = nextIndex;
    updateSlides(currentIndex, 'next');
  };

  // Goes to previous slide
  const prevSlide = () => {
    if (isTransitioning) return;
    
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    currentIndex = prevIndex;
    updateSlides(currentIndex, 'prev');
  };

  // Goes to specific slide
  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    
    const direction = index > currentIndex ? 'next' : 'prev';
    currentIndex = index;
    updateSlides(currentIndex, direction);
  };

  // Starts the carousel
  const startCarousel = () => {
    clearInterval(slideInterval);
    if (!isCarouselStopped && !isPaused && autoplayEnabled && slides.length > 1) {
      slideInterval = setInterval(autoSlide, autoplaySpeed);
    }
  };

  // Stops the carousel
  const stopCarousel = () => {
    clearInterval(slideInterval);
  };

  // Permanently stops the carousel
  const permanentlyStopCarousel = () => {
    stopCarousel();
    isCarouselStopped = true;
  };

  // Autoplay toggle functionality
  const autoplayToggle = hero.querySelector('.hero-autoplay-toggle');
  if (autoplayToggle && autoplayEnabled) {
    const toggleAutoplay = () => {
      isPaused = !isPaused;
      
      if (isPaused) {
        stopCarousel();
        autoplayToggle.setAttribute('data-state', 'paused');
        autoplayToggle.setAttribute('aria-label', 'Resume slideshow');
      } else {
        startCarousel();
        autoplayToggle.setAttribute('data-state', 'playing');
        autoplayToggle.setAttribute('aria-label', 'Pause slideshow');
      }
    };
    
    autoplayToggle.addEventListener('click', toggleAutoplay);
  }

  // Event listeners
  if (pauseOnHover) {
    hero.addEventListener('mouseenter', stopCarousel);
    hero.addEventListener('mouseleave', startCarousel);
  }

  // Optional: Add click to pause functionality
  hero.addEventListener('click', (e) => {
    // Only stop on direct clicks, not on button clicks
    if (!e.target.closest('a, button')) {
      //permanentlyStopCarousel();
    }
  });

  // Optional: Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      permanentlyStopCarousel();
    } else if (e.key === 'ArrowRight') {
      autoSlide();
      permanentlyStopCarousel();
    }
  });

  // Initialize carousel
  const initCarousel = () => {
    // Don't call updateSlides(0) - first slide is already active from HTML
    // Just ensure currentIndex matches the active slide
    currentIndex = 0;
    
    // Start autoplay only if enabled
    if (slides.length > 1 && autoplayEnabled) {
      startCarousel();
    }
  };

  // Wait for images to load before initializing
  const images = hero.querySelectorAll('img');
  if (images.length > 0) {
    let loadedImages = 0;
    const totalImages = images.length;
    
    images.forEach(img => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            initCarousel();
          }
        });
        img.addEventListener('error', () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            initCarousel();
          }
        });
      }
    });
    
    // Initialize immediately if all images are already loaded
    if (loadedImages === totalImages) {
      initCarousel();
    }
  } else {
    // No images, initialize immediately
    initCarousel();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    stopCarousel();
  });
};

// Initialize the hero carousel
export const initHeroCarousel = () => {
  // Use a more specific ready state check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', heroCarousel);
  } else {
    heroCarousel();
  }
};