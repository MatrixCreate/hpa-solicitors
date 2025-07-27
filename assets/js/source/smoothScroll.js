/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links with data-smooth-scroll="true"
 * Temporarily disables header auto-hiding during smooth scrolls
 */

class SmoothScroll {
    constructor() {
        this.headerElement = document.querySelector('.js-header');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Find all links with data-smooth-scroll="true" that link to anchor elements
        const smoothScrollLinks = document.querySelectorAll('a[data-smooth-scroll="true"][href^="#"]');
        
        smoothScrollLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        
        const href = e.currentTarget.getAttribute('href');
        const targetId = href.substring(1); // Remove the # symbol
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) {
            console.warn(`SmoothScroll: Target element with id "${targetId}" not found`);
            return;
        }

        // Show header if it's hidden (In-Page Links should always show header)
        if (this.headerElement && this.headerElement.classList.contains('header-hidden')) {
            this.headerElement.classList.remove('header-hidden');
        }

        const offset = this.calculateOffset();
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // No event handling needed - the new auto-hide system ignores programmatic scrolls
    }

    calculateOffset() {
        if (!this.headerElement) {
            return 0;
        }

        // Measure actual header height directly for accuracy
        const actualHeaderHeight = this.headerElement.offsetHeight;
        
        // Also get the CSS custom property as a fallback
        const cssHeaderHeight = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height')) || 0;
        
        // Use the actual height if it differs significantly from CSS property
        const headerHeight = Math.abs(actualHeaderHeight - cssHeaderHeight) > 5 
            ? actualHeaderHeight 
            : cssHeaderHeight;

        // Remove padding to eliminate gap
        const padding = 0;

        return headerHeight + padding;
    }

    // detectScrollEnd method removed - no longer needed with new auto-hide system
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SmoothScroll();
});

// Export for potential external use
export default SmoothScroll;