/**
 * Zen Café Lagos - Main Site Script
 * WDD 131 - Dynamic Web Fundamentals
 * Handles responsive navigation, footer dates, and real-time cafe operating hours status.
 */

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initFooterMeta();
    initCafeStatus();
});

/**
 * Initializes the mobile hamburger menu toggle and accessibility states.
 */
function initNavigation() {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const primaryNav = document.getElementById("primary-nav");

    if (!hamburgerBtn || !primaryNav) {
        return;
    }

    const closeMenu = () => {
        primaryNav.classList.remove("open");
        hamburgerBtn.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
    };

    hamburgerBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = primaryNav.classList.toggle("open");
        hamburgerBtn.classList.toggle("open", isOpen);
        hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close when clicking outside of the header navigation
    document.addEventListener("click", (e) => {
        if (primaryNav.classList.contains("open") && !primaryNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on Escape key press for accessibility
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && primaryNav.classList.contains("open")) {
            closeMenu();
            hamburgerBtn.focus();
        }
    });

    // Auto-close when resizing to desktop view
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 860 && primaryNav.classList.contains("open")) {
            closeMenu();
        }
    });
}

/**
 * Dynamically updates current copyright year and document last-modified timestamp.
 * Exclusively utilizes template literals for string formatting.
 */
function initFooterMeta() {
    const currentYearEl = document.getElementById("currentyear");
    if (currentYearEl) {
        currentYearEl.textContent = `${new Date().getFullYear()}`;
    }

    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
    }
}

/**
 * Checks current time and updates live operating status banner if present.
 * Zen Café Operating Hours:
 * Mon-Fri: 07:00 - 20:00 (7 AM - 8 PM)
 * Sat: 08:00 - 21:00 (8 AM - 9 PM)
 * Sun: 09:00 - 18:00 (9 AM - 6 PM)
 */
function initCafeStatus() {
    const statusContainer = document.getElementById("live-cafe-status");
    if (!statusContainer) {
        return;
    }

    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = (currentHour * 60) + currentMinute;

    let isOpen = false;
    let nextEvent = "";

    // Conditional branching based on day of week
    if (day >= 1 && day <= 5) {
        // Mon-Fri: 7:00 (420 min) to 20:00 (1200 min)
        const openTime = 7 * 60;
        const closeTime = 20 * 60;
        if (currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime) {
            isOpen = true;
            nextEvent = "Open today until 8:00 PM";
        } else {
            isOpen = false;
            nextEvent = "Closed now • Opens at 7:00 AM";
        }
    } else if (day === 6) {
        // Saturday: 8:00 (480 min) to 21:00 (1260 min)
        const openTime = 8 * 60;
        const closeTime = 21 * 60;
        if (currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime) {
            isOpen = true;
            nextEvent = "Open today until 9:00 PM";
        } else {
            isOpen = false;
            nextEvent = "Closed now • Opens Saturday at 8:00 AM";
        }
    } else {
        // Sunday: 9:00 (540 min) to 18:00 (1080 min)
        const openTime = 9 * 60;
        const closeTime = 18 * 60;
        if (currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime) {
            isOpen = true;
            nextEvent = "Open today until 6:00 PM";
        } else {
            isOpen = false;
            nextEvent = "Closed now • Opens Sunday at 9:00 AM";
        }
    }

    // Clean, human hours message using template literals
    const statusWord = isOpen ? `We're Open Today` : `Currently Closed`;

    statusContainer.innerHTML = `
        <span><strong>${statusWord}</strong> &bull; ${nextEvent}</span>
        <span>Plot 14, Admiralty Way, Lekki Phase 1</span>
    `;
}
