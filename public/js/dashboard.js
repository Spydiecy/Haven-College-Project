// Dashboard specific JavaScript

// Animation for elements when they come into view
gsap.registerPlugin(ScrollTrigger);

// Animate department cards
gsap.utils.toArray('.department-card').forEach(card => {
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

// Animate stat cards
gsap.utils.toArray('.stat-card').forEach(card => {
    gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
        }
    });
});