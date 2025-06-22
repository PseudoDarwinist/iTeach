// Simple flip card functionality
function flipCard() {
    console.log('Flip function called!');
    const card = document.getElementById('profileFlipCard');
    if (card) {
        card.classList.toggle('flipped');
        console.log('Card flipped, current classes:', card.className);
    } else {
        console.log('Card not found!');
    }
}