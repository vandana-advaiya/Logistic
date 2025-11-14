const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(lnk => lnk.classList.remove('active'));
        link.classList.add('active');
    });
});

var aboutUsSwiper = new Swiper(".aboutSwiper", {
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

var ourWebsiteSwiper = new Swiper(".websitesSwiper", {
    slidesPerView: 1.5,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        576: {
            slidesPerView: 2.5,
        },
        768: {
            slidesPerView: 3.5,
        },
        992: {
            slidesPerView: 4.5,
        },
        1200: {
            slidesPerView: 7,
        },
    },
});

var heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
});

const pins = document.querySelectorAll(".map-pin");
const tooltip = document.getElementById("tooltip");

// ✅ Tooltip logic
pins.forEach(pin => {
    pin.addEventListener("mouseenter", e => {
        tooltip.style.display = "block";
        tooltip.textContent = pin.dataset.title;

        const rect = e.target.getBoundingClientRect();
        const parentRect = e.target.offsetParent.getBoundingClientRect();

        // Position tooltip slightly above the pin
        tooltip.style.top = `${rect.top - parentRect.top - 25}px`;
        tooltip.style.left = `${rect.left - parentRect.left + rect.width / 2}px`;
    });

    pin.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });
});

// ✅ Click logic for active pin
pins.forEach(pin => {
    pin.addEventListener("click", () => {
        pins.forEach(p => p.classList.remove("active"));
        pin.classList.add("active");

        // (Optional) Update right info panel dynamically later
        // updateRightPanel(pin.dataset.location);
    });
});

// ✅ Tabs logic
// ✅ Tabs logic + value switching
const tabs = document.querySelectorAll(".tab-btn");
const operationalValue = document.querySelector(".location-details .operational-value");
const upcomingValue = document.querySelector(".location-details .upcoming-value");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // Activate tab
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // Update values based on tab
        if (tab.dataset.tab === "operational") {
            operationalValue.textContent = "6.8";   // Actual value
            upcomingValue.textContent = "-";        // Hide upcoming
        }
        else if (tab.dataset.tab === "upcoming") {
            operationalValue.textContent = "-";     // Hide operational
            upcomingValue.textContent = "4.2";      // Example value (replace with real)
        }
    });
});

const buttons = document.querySelectorAll(".toggle-btn");
const centerText = document.getElementById("centerText");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        centerText.textContent = btn.dataset.solution;
    });
});
