// About Us page specific JavaScript

// Team Members Animation
gsap.from('.team-member', {
    y: 60,
    opacity: 0,
    duration: 2.5,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.team-section',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
    }
});

// Destinations Animation
gsap.from('.destination-brand', {
    y: 60,
    opacity: 0,
    duration: 1.7,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.destinations-section',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
    }
});

// CTA Animation
gsap.from('.cta-content', {
    y: 60,
    opacity: 0,
    duration: 1.5,
    scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
    }
});