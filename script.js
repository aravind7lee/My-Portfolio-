const sidemenu = document.querySelector("#sidemenu");
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");

function openMenu() {
    sidemenu.style.transform = 'translateX(-20rem)';
}

function closeMenu() {
    sidemenu.style.transform = 'translateX(20rem)';
}

window.addEventListener('scroll', ()=> {
    if(scrollY > 50) {
        navBar.classList.add('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20' );
        navLinks.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/50', 'dark:bg-transparent');
    } else {
         navBar.classList.remove('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20' );
         navLinks.classList.add('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/50', 'dark:bg-transparent');
    }
})

// light mode and dark mode toggle
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);

function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    
    // Add transition for smooth theme change
    document.documentElement.classList.add('transition-colors', 'duration-700');
    
    if(document.documentElement.classList.contains("dark")) {
        localStorage.the极速me = 'dark';
    } else {
        localStorage.theme = 'light';
    }
    
    // Remove transition class after animation completes
    setTimeout(() => {
        document.documentElement.classList.remove('transition-colors', 'duration-700');
    }, 700);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (window.innerWidth < 768) {
                closeMenu();
            }
            
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.animate-float, .animate-float-delayed').forEach((el, index) => {
        el.style.transform = `translateY(${scrollY * 0.05 * (index % 2 === 0 ? 1 : -1)}px)`;
    });
});

// Time-of-Day Theming
function setTimeBasedTheme() {
    const hour = new Date().getHours();
    const body = document.body;
    
    // Remove any existing time-based classes
    body.classList.remove('day-mode', 'night-mode');
    
    // Add appropriate class based on time of day
    if (hour >= 6 && hour < 18) {
        body.classList.add('day-mode');
    } else {
        body.classList.add('night-mode');
    }
}

// Cinematic Intro Animation
function playCinematicIntro() {
    const cinematicIntro = document.getElementById('cinematic-intro');
    const cinematicLogo = document.getElementById('cinematic-logo');
    const cinematicProgress = document.getElementById('cinematic-progress');
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after 2 seconds
    setTimeout(() => {
        preloader.classList.add('opacity-0');
        setTimeout(() => {
            preloader.style.display = 'none';
            
            // Start cinematic intro
            setTimeout(() => {
                cinematicLogo.classList.add('animate-cinematic-appear');
                cinematicProgress.style.animation = 'width-grow 2s forwards';
            }, 500);
            
            // Hide cinematic intro after 3 seconds
            setTimeout(() => {
                cinematicIntro.classList.add('opacity-0');
                setTimeout(() => {
                    cinematicIntro.style.display = 'none';
                    
                    // Animate hero elements sequentially
                    animateHeroElements();
                    
                    // Show navigation with animation
                    const mainNav = document.getElementById('main-nav');
                    mainNav.classList.remove('opacity-0', '-translate-y-5');
                    mainNav.classList.add('opacity-100', 'translate-y-0');
                    
                }, 1000);
            }, 3000);
        }, 1000);
    }, 2000);
}

// Animate hero elements sequentially
function animateHeroElements() {
    const heroElements = [
        document.getElementById('hero-profile'),
        document.getElementById('hero-greeting'),
        document.getElementById('hero-title'),
        document.getElementById('hero-description'),
        document.getElementById('hero-buttons')
    ];
    
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            if (el.id === 'hero-profile') {
                el.classList.add('animate-image-reveal');
            } else if (el.id === 'hero-title') {
                el.classList.add('animate-text-reveal');
            } else {
                el.classList.add('animate-fade-in-delayed');
            }
        }, index * 300);
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-slide-down, .reveal-slide-left, .reveal-slide-right, .reveal-scale');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }, delay * 300);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// Hover Glow Trails
function initGlowTrails() {
    document.addEventListener('mousemove', (e) => {
        // Create trail dot
        const trailDot = document.createElement('div');
        trailDot.className = 'trail-dot';
        trailDot.style.left = `${e.clientX}px`;
        trailDot.style.top = `${e.clientY}px`;
        
        document.body.appendChild(trailDot);
        
        // Remove trail dot after animation completes
        setTimeout(() => {
            trailDot.remove();
        }, 800);
    });
}

// Social Share Button Animations
function initSocialButtons() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Add burst animation
            link.classList.add('social-burst');
            
            // Remove animation class after it completes
            setTimeout(() => {
                link.classList.remove('social-burst');
            }, 500);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set time-based theme
    setTimeBasedTheme();
    
    // Play cinematic intro
    playCinematicIntro();
    
    // Initialize scroll reveal
    initScrollReveal();
    
    // Initialize glow trails
    initGlowTrails();
    
    // Initialize social buttons
    initSocialButtons();
    
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 3D card effect
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Create particles on click
    document.addEventListener('click', (e) => {
        createParticles(e.clientX, e.clientY);
    });
    
    function createParticles(x, y) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9c74极速f', '#ffafcc'];
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = `${Math.random() * 10 + 5}px`;
            particle.style.height = particle.style.width;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.position = 'fixed';
            particle.style.borderRadius = '50%';
            particle.style.top = `${y}px`;
            particle.style.left = `${x}px`;
            particle.style.zIndex = '1000';
            particle.style.pointerEvents = 'none';
            
            // Random direction and rotation
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * speed;
            const ty = Math.sin(angle) * speed;
            const r = Math.random() * 360;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.setProperty('--r', `${r}deg`);
            
            document.body.appendChild(particle);
            
            // Remove particle after animation completes
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }
});


