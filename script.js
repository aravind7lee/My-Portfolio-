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
        localStorage.theme = 'dark';
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