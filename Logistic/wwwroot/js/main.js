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

var warehouseAmeities = new Swiper(".amenitiesSwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
    },
    breakpoints: {
        320: { slidesPerView: 1.5, spaceBetween: 15 },
        576: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 25 },
        992: { slidesPerView: 5, spaceBetween: 30 },
    }
});

    const mediaTabs = document.querySelectorAll(".tab-btn-media");
    const mediaGrids = document.querySelectorAll(".media-grid");

function setupSlider(grid) {
    const slider = grid.querySelector(".media-slider");

    // GET ITEMS SAFELY BEFORE CLEARING
    const items = Array.from(slider.querySelectorAll(".media-item"));

    slider.innerHTML = ""; // now safe to clear

    const dotsContainer = document.querySelector(".pagination-dots");
    dotsContainer.innerHTML = "";

    const itemsPerSlide = 6;
    const totalSlides = Math.ceil(items.length / itemsPerSlide);

    dotsContainer.style.display = totalSlides <= 1 ? "none" : "flex";

    const slides = [];

    for (let i = 0; i < totalSlides; i++) {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        slide.style.display = i === 0 ? "grid" : "none";

        items
            .slice(i * itemsPerSlide, (i + 1) * itemsPerSlide)
            .forEach(item => slide.appendChild(item));

        slider.appendChild(slide);
        slides.push(slide);
    }

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll(".dot");

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.dataset.index);

            slides.forEach(sl => sl.style.display = "none");
            dots.forEach(d => d.classList.remove("active"));

            slides[index].style.display = "grid";
            dot.classList.add("active");
        });
    });
}

    mediaTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            mediaTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const target = tab.dataset.tab;

            mediaGrids.forEach(grid => grid.classList.add("d-none"));

            const activeGrid = document.getElementById(target);
            activeGrid.classList.remove("d-none");

            setupSlider(activeGrid);
        });
    });

    setupSlider(document.getElementById("operational"));
