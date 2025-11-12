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
const tabs = document.querySelectorAll(".tab-btn");
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
    });
});
