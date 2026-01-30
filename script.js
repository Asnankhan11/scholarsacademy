/* ===================================================
   SCHOLARS ACADEMY v2 - Interactive Script
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // 1. NAVBAR SCROLL EFFECT
    // ===========================
    const navbar = document.querySelector('.navbar');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ===========================
    // 2. MOBILE MENU TOGGLE
    // ===========================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });

        // Close menu when link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            });
        });
    }

    // ===========================
    // 3. SCROLL REVEAL ANIMATIONS
    // ===========================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 120;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ===========================
    // 4. SECTION TITLE UNDERLINE ANIMATION
    // ===========================
    const sectionTitles = document.querySelectorAll('.section-title');

    const animateTitles = () => {
        sectionTitles.forEach(title => {
            const titleTop = title.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (titleTop < windowHeight - 100) {
                title.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateTitles);
    animateTitles(); // Initial check

    // ===========================
    // 5. PROGRAM CARDS - TILT & SPOTLIGHT EFFECT
    // ===========================
    const programCards = document.querySelectorAll('.program-card');

    programCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            // Set CSS variables for spotlight effect
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);

            // Calculate tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((e.clientY - rect.top) - centerY) / 15;
            const rotateY = (centerX - (e.clientX - rect.left)) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===========================
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================
    // 7. COUNTER ANIMATION (if stats section exists)
    // ===========================
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer for counters
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ===========================
    // 8. TYPING EFFECT (Optional Hero Subtitle)
    // ===========================
    const typingElement = document.querySelector('.typing-text');

    if (typingElement) {
        const phrases = ['Building Skills.', 'Building Trust.', 'Building Futures.'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 300;
            }

            setTimeout(type, typingSpeed);
        };

        setTimeout(type, 1000);
    }

    console.log('🎓 Scholars Academy v2 loaded successfully!');
});
