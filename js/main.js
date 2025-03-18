// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initial animations using GSAP
document.addEventListener('DOMContentLoaded', () => {
    // Hero section animations
    gsap.from('.hero-label', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });

    gsap.from('.cta-group', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.9,
        ease: 'power3.out'
    });

    // Stats animation
    gsap.from('.stat-item', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        delay: 1.2,
        ease: 'power3.out'
    });

    // Gallery items animation with stagger
    gsap.from('.gallery-item', {
        opacity: 0,
        x: 100,
        duration: 1,
        stagger: 0.3,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Animate stats when they come into view
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const targetNumber = parseInt(stat.textContent);
        gsap.to(stat, {
            textContent: targetNumber,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            stagger: {
                each: 0.2,
                onUpdate: function() {
                    stat.textContent = Math.ceil(this.targets()[0].textContent) + '+';
                },
            },
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
            }
        });
    });
});

// Enhanced hover effects for gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    let isHovered = false;
    let mouseX = 0;
    let mouseY = 0;
    const maxRotation = 10;

    item.addEventListener('mouseenter', () => {
        isHovered = true;
        gsap.to(item, {
            scale: 1.05,
            duration: 0.5,
            ease: 'power2.out'
        });
        
        gsap.to(item.querySelector('.image-overlay'), {
            opacity: 1,
            duration: 0.3
        });

        gsap.to(item.querySelector('.item-caption'), {
            opacity: 1,
            y: 0,
            duration: 0.3
        });

        // Add depth effect to other items
        document.querySelectorAll('.gallery-item').forEach(otherItem => {
            if (otherItem !== item) {
                gsap.to(otherItem, {
                    scale: 0.95,
                    opacity: 0.7,
                    filter: 'blur(2px)',
                    duration: 0.3
                });
            }
        });
    });

    item.addEventListener('mousemove', (e) => {
        if (!isHovered) return;

        const rect = item.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        gsap.to(item, {
            rotationY: mouseX * maxRotation,
            rotationX: -mouseY * maxRotation,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        isHovered = false;
        gsap.to(item, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: 'power2.out'
        });

        gsap.to(item.querySelector('.image-overlay'), {
            opacity: 0,
            duration: 0.3
        });

        gsap.to(item.querySelector('.item-caption'), {
            opacity: 0,
            y: 20,
            duration: 0.3
        });

        // Reset other items
        document.querySelectorAll('.gallery-item').forEach(otherItem => {
            gsap.to(otherItem, {
                scale: 1,
                opacity: 1,
                filter: 'none',
                duration: 0.3
            });
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: 'power2.inOut'
            });
        }
    });
});
// Custom cursor effect
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', (e) => {
    cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    cursorOutline.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
});

document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = 1;
    cursorOutline.style.opacity = 1;
});

document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = 0;
    cursorOutline.style.opacity = 0;
});
document.addEventListener('mousemove', (e) => {
    console.log('Mouse moved:', e.clientX, e.clientY); // Debugging line
    cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    cursorOutline.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
});