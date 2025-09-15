const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");
const backToTopButton = document.getElementById("backToTop");
let lastFocusedTrigger = null;
let focusableMenuEls = [];
let touchStartX = 0;
let touchCurrentX = 0;
let isDraggingMenu = false;

function openMobileMenu() {
  const overlay = document.getElementById("mobile-menu-overlay");
  const container = document.getElementById("mobile-menu-container");
  overlay.classList.add("active");
  container.classList.add("active");
  container.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const trigger = document.querySelector(
    'nav button[aria-controls="mobile-menu-container"]'
  );
  lastFocusedTrigger = trigger || document.activeElement;

  // Focus trap setup
  focusableMenuEls = Array.from(
    container.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
  ).filter((el) => !el.hasAttribute("disabled"));
  if (focusableMenuEls.length) {
    focusableMenuEls[0].focus();
  } else {
    container.focus();
  }
  if (trigger) trigger.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  const overlay = document.getElementById("mobile-menu-overlay");
  const container = document.getElementById("mobile-menu-container");
  overlay.classList.remove("active");
  container.classList.remove("active");
  container.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";

  const trigger = document.querySelector(
    'nav button[aria-controls="mobile-menu-container"]'
  );
  if (trigger) trigger.setAttribute("aria-expanded", "false");
  if (lastFocusedTrigger) {
    try {
      lastFocusedTrigger.focus();
    } catch (e) {}
  }
}

// Unified scroll work (90fps target via RAF with minimal DOM writes)
const __floatEls = Array.from(
  document.querySelectorAll(".animate-float, .animate-float-delayed")
);
let __ticking = false;
let __navScrolled = null;
let __showBackToTop = null;

function __onScroll() {
  if (__ticking) return;
  __ticking = true;
  window.requestAnimationFrame(() => {
    const y = window.scrollY;

    // Parallax transforms (GPU)
    for (let i = 0; i < __floatEls.length; i++) {
      const el = __floatEls[i];
      const dir = i % 2 === 0 ? 1 : -1;
      el.style.transform = `translate3d(0, ${y * 0.05 * dir}px, 0)`;
    }

    // Navbar state
    const scrolled = y > 50;
    if (scrolled !== __navScrolled) {
      __navScrolled = scrolled;
      if (scrolled) {
        navBar.classList.add(
          "bg-white",
          "bg-opacity-50",
          "backdrop-blur-lg",
          "shadow-sm",
          "dark:bg-darkTheme",
          "dark:shadow-white/20"
        );
        navLinks.classList.remove(
          "bg-white",
          "shadow-sm",
          "bg-opacity-50",
          "dark:border",
          "dark:border-white/50",
          "dark:bg-transparent"
        );
      } else {
        navBar.classList.remove(
          "bg-white",
          "bg-opacity-50",
          "backdrop-blur-lg",
          "shadow-sm",
          "dark:bg-darkTheme",
          "dark:shadow-white/20"
        );
        navLinks.classList.add(
          "bg-white",
          "shadow-sm",
          "bg-opacity-50",
          "dark:border",
          "dark:border-white/50",
          "dark:bg-transparent"
        );
      }
    }

    // Back to top visibility
    if (backToTopButton) {
      const show = y > 300;
      if (show !== __showBackToTop) {
        __showBackToTop = show;
        if (show) {
          backToTopButton.classList.remove("opacity-0", "invisible");
          backToTopButton.classList.add("opacity-100", "visible");
        } else {
          backToTopButton.classList.remove("opacity-100", "visible");
          backToTopButton.classList.add("opacity-0", "invisible");
        }
      }
    }

    __ticking = false;
  });
}

window.addEventListener("scroll", __onScroll, { passive: true });

// light mode and dark mode toggle
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
);

function toggleTheme() {
  document.documentElement.classList.toggle("dark");

  // Add transition for smooth theme change
  document.documentElement.classList.add("transition-colors", "duration-700");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.theme = "dark";
  } else {
    localStorage.theme = "light";
  }

  // Remove transition class after animation completes
  setTimeout(() => {
    document.documentElement.classList.remove(
      "transition-colors",
      "duration-700"
    );
  }, 700);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      if (window.innerWidth < 768) {
        closeMenu();
      }

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Time-of-Day Theming
function setTimeBasedTheme() {
  const hour = new Date().getHours();
  const body = document.body;

  // Remove any existing time-based classes
  body.classList.remove("day-mode", "night-mode");

  // Add appropriate class based on time of day
  if (hour >= 6 && hour < 18) {
    body.classList.add("day-mode");
  } else {
    body.classList.add("night-mode");
  }
}

// Cinematic Intro Animation
function playCinematicIntro() {
  const cinematicIntro = document.getElementById("cinematic-intro");
  const cinematicLogo = document.getElementById("cinematic-logo");
  const cinematicProgress = document.getElementById("cinematic-progress");
  const preloader = document.getElementById("preloader");

  // Hide preloader after 2 seconds
  setTimeout(() => {
    preloader.classList.add("opacity-0");
    setTimeout(() => {
      preloader.style.display = "none";

      // Start cinematic intro
      setTimeout(() => {
        cinematicLogo.classList.add("animate-cinematic-appear");
        cinematicProgress.style.transformOrigin = "left";
        cinematicProgress.style.transition = "transform 2s ease";
        cinematicProgress.style.transform = "scaleX(1)";
      }, 500);

      // Hide cinematic intro after 3 seconds
      setTimeout(() => {
        cinematicIntro.classList.add("opacity-0");
        setTimeout(() => {
          cinematicIntro.style.display = "none";

          // Animate hero elements sequentially
          animateHeroElements();

          // Show navigation with animation
          const mainNav = document.getElementById("main-nav");
          mainNav.classList.remove("opacity-0", "-translate-y-5");
          mainNav.classList.add("opacity-100", "translate-y-0");
        }, 1000);
      }, 3000);
    }, 1000);
  }, 2000);
}

// Animate hero elements sequentially
function animateHeroElements() {
  const heroElements = [
    document.getElementById("hero-profile"),
    document.getElementById("hero-greeting"),
    document.getElementById("hero-title"),
    document.getElementById("hero-description"),
    document.getElementById("hero-buttons"),
  ];

  heroElements.forEach((el, index) => {
    setTimeout(() => {
      if (el.id === "hero-profile") {
        el.classList.add("animate-image-reveal");
      } else if (el.id === "hero-title") {
        el.classList.add("animate-text-reveal");
      } else {
        el.classList.add("animate-fade-in-delayed");
      }
    }, index * 300);
  });
}

// Scroll reveal animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".reveal-fade, .reveal-slide-up, .reveal-slide-down, .reveal-slide-left, .reveal-slide-right, .reveal-scale"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-delay") || 0;

          setTimeout(() => {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }, delay * 300);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((el) => {
    observer.observe(el);
  });
}

// Social Share Button Animations
function initSocialButtons() {
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.stopPropagation();

      // Add burst animation
      link.classList.add("social-burst");

      // Remove animation class after it completes
      setTimeout(() => {
        link.classList.remove("social-burst");
      }, 500);
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set time-based theme
  setTimeBasedTheme();

  // Play cinematic intro
  playCinematicIntro();

  // Initialize scroll reveal
  initScrollReveal();

  // Initialize social buttons
  initSocialButtons();

  // Mobile menu interactions
  const overlay = document.getElementById("mobile-menu-overlay");
  const container = document.getElementById("mobile-menu-container");
  const menuLinks = container.querySelectorAll(".mobile-menu-item a");
  const closeBtn = container.querySelector(".mobile-menu-close");

  // Close on overlay click (already handled inline), close button, and links
  closeBtn.addEventListener("click", closeMenu);
  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

  // Close on Escape and focus trap
  document.addEventListener("keydown", (e) => {
    const isMenuOpen = container.classList.contains("active");
    if (!isMenuOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    } else if (e.key === "Tab") {
      // focus trap
      if (!focusableMenuEls.length) return;
      const first = focusableMenuEls[0];
      const last = focusableMenuEls[focusableMenuEls.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Swipe to close (drag from right to left)
  container.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchCurrentX = touchStartX;
      isDraggingMenu = true;
      container.style.transition = "none";
    },
    { passive: true }
  );

  container.addEventListener(
    "touchmove",
    (e) => {
      if (!isDraggingMenu) return;
      touchCurrentX = e.touches[0].clientX;
      const delta = Math.min(0, touchCurrentX - touchStartX); // negative when moving left
      container.style.transform = `translateX(${Math.abs(delta)}px)`;
      overlay.style.opacity = String(Math.max(0, 1 - Math.abs(delta) / 200));
    },
    { passive: true }
  );

  container.addEventListener("touchend", () => {
    if (!isDraggingMenu) return;
    const delta = touchCurrentX - touchStartX;
    isDraggingMenu = false;
    container.style.transition = "";
    overlay.style.opacity = "";
    if (delta < -80) {
      closeMenu();
    } else {
      container.classList.add("active");
      container.style.transform = "";
    }
  });

  // Back to top button click
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
