// Wellness page specific JavaScript

// Program card animations
gsap.utils.toArray('.program-card').forEach(card => {
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

// Expert card animations
gsap.utils.toArray('.expert-card').forEach((card, index) => {
    gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: index * 0.2, // Staggered animation
        scrollTrigger: {
            trigger: '.experts-grid',
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
        }
    });
});

// Testimonial animations
gsap.utils.toArray('.testimonial').forEach((testimonial, index) => {
    gsap.from(testimonial, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: index * 0.3, // Staggered animation
        scrollTrigger: {
            trigger: '.testimonials-container',
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
        }
    });
});

// CTA section animation
gsap.from('.cta-content', {
    y: 50,
    opacity: 0,
    duration: 1.2,
    scrollTrigger: {
        trigger: '.cta-section',
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    }
});

// Enhance image hover effects
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const image = card.querySelector('.program-image img');
        gsap.to(image, {
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.program-image img');
        gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});