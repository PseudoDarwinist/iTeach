// Profile Card Animation System - Exact Implementation from User's ProfileCard Component
class ProfileCardManager {
    constructor() {
        this.cards = [];
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupProfileCards();
            });
        } else {
            this.setupProfileCards();
        }
    }

    setupProfileCards() {
        const cardWrappers = document.querySelectorAll('.pc-card-wrapper');
        
        cardWrappers.forEach((wrapper, index) => {
            const card = wrapper.querySelector('.pc-card');
            
            if (card) {
                const cardInstance = new ProfileCard(wrapper, card);
                this.cards.push(cardInstance);
            }
        });
    }
}

class ProfileCard {
    constructor(wrapper, card) {
        this.wrapper = wrapper;
        this.card = card;
        this.animationId = null;
        this.isHovering = false;
        
        this.config = {
            SMOOTH_DURATION: 600,
            INITIAL_DURATION: 1500,
            INITIAL_X_OFFSET: 70,
            INITIAL_Y_OFFSET: 60,
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startInitialAnimation();
    }

    setupEventListeners() {
        // Touch and pointer events for holographic effects
        this.card.addEventListener('pointerenter', (e) => this.handlePointerEnter(e));
        this.card.addEventListener('pointermove', this.throttle((e) => this.handlePointerMove(e), 16));
        this.card.addEventListener('pointerleave', (e) => this.handlePointerLeave(e));
        
        // Mouse events as fallback
        this.card.addEventListener('mouseenter', (e) => this.handlePointerEnter(e));
        this.card.addEventListener('mousemove', this.throttle((e) => this.handlePointerMove(e), 16));
        this.card.addEventListener('mouseleave', (e) => this.handlePointerLeave(e));
        
        // Touch events for mobile
        this.card.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.card.addEventListener('touchmove', this.throttle((e) => this.handleTouchMove(e), 16));
        this.card.addEventListener('touchend', (e) => this.handleTouchEnd(e));
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    clamp(value, min = 0, max = 100) {
        return Math.min(Math.max(value, min), max);
    }

    round(value, precision = 3) {
        return parseFloat(value.toFixed(precision));
    }

    adjust(value, fromMin, fromMax, toMin, toMax) {
        return this.round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
    }

    easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    updateCardTransform(offsetX, offsetY) {
        const rect = this.card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const percentX = this.clamp((100 / width) * offsetX);
        const percentY = this.clamp((100 / height) * offsetY);

        const centerX = percentX - 50;
        const centerY = percentY - 50;

        // Calculate distance from center for holographic effects
        const distanceFromCenter = Math.hypot(centerX, centerY) / 50;
        const clampedDistance = this.clamp(distanceFromCenter, 0, 1);

        const properties = {
            '--pointer-x': `${percentX}%`,
            '--pointer-y': `${percentY}%`,
            '--background-x': `${this.adjust(percentX, 0, 100, 35, 65)}%`,
            '--background-y': `${this.adjust(percentY, 0, 100, 35, 65)}%`,
            '--pointer-from-center': `${clampedDistance}`,
            '--pointer-from-top': `${percentY / 100}`,
            '--pointer-from-left': `${percentX / 100}`,
            '--rotate-x': `${this.round(-(centerX / 3.5))}deg`,
            '--rotate-y': `${this.round(centerY / 2.5)}deg`,
        };

        // Apply holographic gradient based on pointer position
        const hueShift = (percentX + percentY) * 1.8;
        const saturation = 50 + (clampedDistance * 50);
        const lightness = 70 + (clampedDistance * 20);
        
        this.wrapper.style.setProperty('--sunpillar-clr-1', `hsl(${hueShift}, ${saturation}%, ${lightness}%)`);
        this.wrapper.style.setProperty('--sunpillar-clr-2', `hsl(${hueShift + 60}, ${saturation}%, ${lightness}%)`);
        this.wrapper.style.setProperty('--sunpillar-clr-3', `hsl(${hueShift + 120}, ${saturation}%, ${lightness}%)`);
        this.wrapper.style.setProperty('--sunpillar-clr-4', `hsl(${hueShift + 180}, ${saturation}%, ${lightness}%)`);
        this.wrapper.style.setProperty('--sunpillar-clr-5', `hsl(${hueShift + 240}, ${saturation}%, ${lightness}%)`);
        this.wrapper.style.setProperty('--sunpillar-clr-6', `hsl(${hueShift + 300}, ${saturation}%, ${lightness}%)`);

        Object.entries(properties).forEach(([property, value]) => {
            this.wrapper.style.setProperty(property, value);
        });
    }

    createSmoothAnimation(duration, startX, startY) {
        const startTime = performance.now();
        const targetX = this.wrapper.clientWidth / 2;
        const targetY = this.wrapper.clientHeight / 2;

        const animationLoop = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = this.clamp(elapsed / duration, 0, 1);
            const easedProgress = this.easeInOutCubic(progress);

            const currentX = this.adjust(easedProgress, 0, 1, startX, targetX);
            const currentY = this.adjust(easedProgress, 0, 1, startY, targetY);

            this.updateCardTransform(currentX, currentY);

            if (progress < 1) {
                this.animationId = requestAnimationFrame(animationLoop);
            }
        };

        this.animationId = requestAnimationFrame(animationLoop);
    }

    cancelAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    handlePointerEnter(event) {
        this.isHovering = true;
        this.cancelAnimation();
        this.wrapper.classList.add('active');
        this.card.classList.add('active');
    }

    handlePointerMove(event) {
        if (!this.isHovering) return;
        
        const rect = this.card.getBoundingClientRect();
        this.updateCardTransform(
            event.clientX - rect.left,
            event.clientY - rect.top
        );
    }

    handlePointerLeave(event) {
        this.isHovering = false;
        
        const rect = this.card.getBoundingClientRect();
        this.createSmoothAnimation(
            this.config.SMOOTH_DURATION,
            event.clientX - rect.left,
            event.clientY - rect.top
        );
        
        this.wrapper.classList.remove('active');
        this.card.classList.remove('active');
    }

    handleTouchStart(event) {
        event.preventDefault();
        this.isHovering = true;
        this.cancelAnimation();
        this.wrapper.classList.add('active');
        this.card.classList.add('active');
        
        const touch = event.touches[0];
        const rect = this.card.getBoundingClientRect();
        this.updateCardTransform(
            touch.clientX - rect.left,
            touch.clientY - rect.top
        );
    }

    handleTouchMove(event) {
        if (!this.isHovering) return;
        
        event.preventDefault();
        const touch = event.touches[0];
        const rect = this.card.getBoundingClientRect();
        this.updateCardTransform(
            touch.clientX - rect.left,
            touch.clientY - rect.top
        );
    }

    handleTouchEnd(event) {
        event.preventDefault();
        this.isHovering = false;
        
        const touch = event.changedTouches[0];
        const rect = this.card.getBoundingClientRect();
        this.createSmoothAnimation(
            this.config.SMOOTH_DURATION,
            touch.clientX - rect.left,
            touch.clientY - rect.top
        );
        
        this.wrapper.classList.remove('active');
        this.card.classList.remove('active');
    }

    startInitialAnimation() {
        // Wait for element to be fully rendered
        if (this.wrapper.clientWidth === 0) {
            setTimeout(() => this.startInitialAnimation(), 100);
            return;
        }

        const initialX = this.wrapper.clientWidth - this.config.INITIAL_X_OFFSET;
        const initialY = this.config.INITIAL_Y_OFFSET;

        this.updateCardTransform(initialX, initialY);
        
        // Start the smooth animation to center
        setTimeout(() => {
            this.createSmoothAnimation(
                this.config.INITIAL_DURATION,
                initialX,
                initialY
            );
        }, 500);
    }
}

// Initialize the profile card manager
const profileCardManager = new ProfileCardManager();