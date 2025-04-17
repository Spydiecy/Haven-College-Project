// Contact page specific JavaScript

// Location card animations
gsap.utils.toArray('.location-card').forEach(card => {
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

// Contact form animations
gsap.from('.contact-info', {
    x: -50,
    opacity: 0,
    duration: 1.2,
    scrollTrigger: {
        trigger: '.contact-container',
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    }
});

gsap.from('.contact-form', {
    x: 50,
    opacity: 0,
    duration: 1.2,
    scrollTrigger: {
        trigger: '.contact-container',
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    }
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // In a real application, you would send this data to your server
            console.log('Form submitted with data:', formData);
            
            // Show success message (in real app, this would happen after successful API call)
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
});