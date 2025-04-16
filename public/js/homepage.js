// Homepage specific JavaScript

// Hero Text Animation
gsap.from('.hero-text', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    delay: 0.5
});

// Loader Animation
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-container');
    const letters = document.querySelectorAll('.letter');
    
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.animation = 'colorChange 2s ease infinite';
        }, index * 200);
    });
    
    setTimeout(() => {
        loader.classList.add('loaded');
        document.body.style.overflow = 'auto';
    }, 3000);
});

document.body.style.overflow = 'hidden';