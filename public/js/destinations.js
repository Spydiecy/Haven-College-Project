// Destinations page specific JavaScript

// Hero content animation
gsap.from('.hero-content', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
});

// Destination cards animation
gsap.utils.toArray('.destination-card').forEach(card => {
    gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        }
    });
});