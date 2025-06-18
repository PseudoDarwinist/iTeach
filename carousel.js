let currentSlideIndex = 0;
const totalSlides = 3;

function showSlide(index) {
    const wrapper = document.querySelector('.carousel-wrapper');
    const dots = document.querySelectorAll('.dot');
    
    // Ensure index is within bounds
    currentSlideIndex = (index + totalSlides) % totalSlides;
    
    // Calculate the transform value - each card is 450px wide + 40px gap
    const cardWidth = 450;
    const gap = 40;
    const translateX = -currentSlideIndex * (cardWidth + gap);
    
    wrapper.style.transform = `translateX(${translateX}px)`;
    
    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

function currentSlide(index) {
    showSlide(index - 1); // Convert to 0-based index
}

// Auto-slide functionality (optional)
function autoSlide() {
    nextSlide();
}

// Auto-slide every 5 seconds
setInterval(autoSlide, 5000);

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Add touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    const carousel = document.querySelector('.carousel-wrapper');
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = startX - endX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                nextSlide(); // Swipe left, go to next slide
            } else {
                prevSlide(); // Swipe right, go to previous slide
            }
        }
    }
});