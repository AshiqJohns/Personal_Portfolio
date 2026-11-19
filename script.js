
/* ==========================================
   ASHIQ JOHNS - PERSONAL PORTFOLIO
   JavaScript | Responsive Functionality
========================================== */


/* ==========================================
   1. MOBILE NAVIGATION
========================================== */

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
    if (!menuButton || !navLinks) return;

    navLinks.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");

    menuButton.textContent = "☰";
}

function openMenu() {
    if (!menuButton || !navLinks) return;

    navLinks.classList.add("open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");

    menuButton.textContent = "✕";
}

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    // Close menu after clicking a navigation link

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });

    // Close menu when clicking outside

    document.addEventListener("click", event => {

        if (
            !navLinks.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            closeMenu();
        }

    });

    // Close menu using Escape key

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    // Close menu when switching to desktop layout

    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {
            closeMenu();
        }

    });

}


/* ==========================================
   2. AUTOMATIC COPYRIGHT YEAR
========================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* ==========================================
   3. ACTIVE NAVIGATION ON SCROLL
========================================== */

const sections = document.querySelectorAll("main section[id]");
const navigationItems = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navigationItems.forEach(link => {

                        const sectionLink =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            sectionLink === `#${entry.target.id}`
                        );

                    });

                }

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px"
        }

    );

    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* ==========================================
   4. CONTACT FORM
========================================== */

// IMPORTANT:
// Replace this with your actual email address.

const portfolioEmail = "your.email@example.com";

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const formData = new FormData(contactForm);

        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");

        // Check email configuration

        if (portfolioEmail === "your.email@example.com") {

            if (formNote) {

                formNote.textContent =
                    "Please configure your email address in script.js.";

            }

            return;

        }

        // Create email subject and body

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(

            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`

        );

        // Open the user's default email application

        const mailtoLink =
            `mailto:${portfolioEmail}` +
            `?subject=${emailSubject}` +
            `&body=${emailBody}`;

        if (formNote) {

            formNote.textContent =
                "Opening your email application...";

        }

        window.location.href = mailtoLink;

    });

}


/* ==========================================
   5. IMAGE FALLBACK
========================================== */

// Show a fallback if the profile photograph is missing.

const profileImage = document.querySelector(
    ".hero-image img"
);

if (profileImage) {

    profileImage.addEventListener("error", () => {

        profileImage.style.display = "none";

    });

}
