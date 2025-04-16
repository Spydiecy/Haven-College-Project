// Common JS functions for all pages

// Navigation Menu Functionality
const hamburger = document.querySelector('.hamburger');
const closeMenu = document.querySelector('.close-menu');
const overlayMenu = document.querySelector('.overlay-menu');
const navbar = document.querySelector('.navbar');

if (hamburger && closeMenu && overlayMenu) {
    function openMenu() {
        hamburger.classList.add('active');
        overlayMenu.classList.add('active');
    }

    function closeMenuFunction() {
        hamburger.classList.remove('active');
        overlayMenu.classList.remove('active');
    }

    hamburger.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunction);
}

// Navbar scroll effect
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0,0,0,0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Common Animation for Parallax Images
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.parallax-image').forEach((image) => {
    if (!image) return;
    
    gsap.fromTo(image,
        {
            y: -100
        },
        {
            y: 100,
            ease: "none",
            scrollTrigger: {
                trigger: image.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                toggleActions: "play none none reverse"
            }
        }
    );

    // Scale effect
    gsap.fromTo(image,
        {
            scale: 1.1
        },
        {
            scale: 1.3,
            ease: "none",
            scrollTrigger: {
                trigger: image.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        }
    );
});

// Content Animation
gsap.utils.toArray('.content').forEach((content) => {
    if (!content) return;
    
    gsap.from(content, {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: content,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            scrub: false
        }
    });
});

// Marquee Animation
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
    gsap.to(marqueeContent, {
        x: "-50%",
        ease: "none",
        duration: 20,
        repeat: -1
    });
}