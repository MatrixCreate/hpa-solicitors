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

        // Disable header auto-hiding for the duration of the smooth scroll
        window.dispatchEvent(new CustomEvent('smoothScrollStart'));

        const offset = this.calculateOffset();
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Re-enable header auto-hiding after scroll completes
        this.detectScrollEnd(() => {
            window.dispatchEvent(new CustomEvent('smoothScrollEnd'));
        });
    }

    calculateOffset() {
        if (!this.headerElement) {
            return 0;
        }

        // Get the current header height from CSS custom property
        const headerHeight = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height')) || 0;

        // Add some padding for visual breathing room
        const padding = 20;

        return headerHeight + padding;
    }

    detectScrollEnd(callback) {
        let scrollTimeout;
        
        const scrollHandler = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                window.removeEventListener('scroll', scrollHandler);
                callback();
            }, 150); // Wait 150ms after scrolling stops
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
        
        // Fallback: ensure callback is called even if scroll doesn't fire
        setTimeout(() => {
            window.removeEventListener('scroll', scrollHandler);
            callback();
        }, 2000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SmoothScroll();
});

// Export for potential external use
export default SmoothScroll;