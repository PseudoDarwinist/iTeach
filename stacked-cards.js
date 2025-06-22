/**
 * Stacked Cards Animation for iTeach Courses Page
 * Handles the click interaction to animate cards from stacked to grid layout
 */

document.addEventListener('DOMContentLoaded', function() {
    const courseGrid = document.getElementById('courseGrid');
    let hasExploded = false;

    // Add click event listener to the grid when it's in stacked mode
    function handleStackClick(event) {
        // Only trigger if we haven't exploded yet and we're in stacked mode
        if (!hasExploded && courseGrid.classList.contains('stacked')) {
            explodeCards();
        }
    }

    // Function to animate cards from stacked to grid layout
    function explodeCards() {
        if (hasExploded) return;
        
        hasExploded = true;
        
        // Hide the annotation immediately
        const annotation = document.getElementById('stackAnnotation');
        if (annotation) {
            annotation.style.opacity = '0';
            annotation.style.pointerEvents = 'none';
        }
        
        // Remove stacked class and add exploded class
        courseGrid.classList.remove('stacked');
        courseGrid.classList.add('exploded');
        
        // Remove the click listener since animation is one-time only
        courseGrid.removeEventListener('click', handleStackClick);
        
        // Remove individual card click listeners to prevent interference
        const cards = courseGrid.querySelectorAll('.widget-card');
        cards.forEach(card => {
            card.style.pointerEvents = 'auto'; // Re-enable normal interactions
        });
    }

    // Add click listener to the grid container
    courseGrid.addEventListener('click', handleStackClick);
    
    // Ensure cards start with proper stacked styling
    const cards = courseGrid.querySelectorAll('.widget-card');
    cards.forEach(card => {
        // Add a slight hover effect for the stack
        card.addEventListener('mouseenter', function() {
            if (!hasExploded && courseGrid.classList.contains('stacked')) {
                this.style.transform += ' scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!hasExploded && courseGrid.classList.contains('stacked')) {
                // Reset to original stacked position
                this.style.transform = this.style.transform.replace(' scale(1.02)', '');
            }
        });
    });

    // Add visual indicator that the stack is clickable
    if (courseGrid.classList.contains('stacked')) {
        courseGrid.style.cursor = 'pointer';
        
        // Add a subtle pulsing effect to indicate interactivity
        courseGrid.style.animation = 'stackPulse 2s ease-in-out infinite';
    }
});

// Add CSS for the stack pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes stackPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.01);
        }
    }
`;
document.head.appendChild(style);