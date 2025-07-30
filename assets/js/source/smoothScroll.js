/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links with data-smooth-scroll="true"
 * Temporarily disables header auto-hiding during smooth scrolls
 */

class SmoothScroll {
    constructor() {
        this.headerElement = document.querySelector('.js-header');
        this.cachedHeaderHeight = null;
        this.cacheTime = 0;
        this.cacheTimeout = null;
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

        // Use requestAnimationFrame to batch layout operations
        requestAnimationFrame(() => {
            const offset = this.calculateOffset();
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
        
        // No event handling needed - the new auto-hide system ignores programmatic scrolls
    }

    calculateOffset() {
        if (!this.headerElement) {
            return 0;
        }

        // Use cached header height if available and fresh (within 500ms)
        if (this.cachedHeaderHeight !== null && Date.now() - this.cacheTime < 500) {
            return this.cachedHeaderHeight;
        }

        // Get the CSS custom property as primary source
        const cssHeaderHeight = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height')) || 0;
        
        // Cache the result
        this.cachedHeaderHeight = cssHeaderHeight;
        this.cacheTime = Date.now();
        
        // Clear cache after a delay to ensure freshness
        clearTimeout(this.cacheTimeout);
        this.cacheTimeout = setTimeout(() => {
            this.cachedHeaderHeight = null;
        }, 1000);

        return cssHeaderHeight;
    }

    // detectScrollEnd method removed - no longer needed with new auto-hide system
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SmoothScroll();
});

// Export for potential external use
export default SmoothScroll;