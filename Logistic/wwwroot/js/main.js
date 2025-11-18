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

// ✔ Tooltip on hover
pins.forEach(pin => {
    pin.addEventListener("mouseenter", e => {
        tooltip.style.display = "block";
        tooltip.textContent = pin.dataset.name + ", " + pin.dataset.state;

        const rect = e.target.getBoundingClientRect();
        const parentRect = e.target.offsetParent.getBoundingClientRect();

        tooltip.style.top = `${rect.top - parentRect.top - 25}px`;
        tooltip.style.left = `${rect.left - parentRect.left + rect.width / 2}px`;
    });

    pin.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });
});

// ✔ Card elements
const locImg = document.getElementById("locImg");
const locName = document.getElementById("locName");
const locState = document.getElementById("locState");
const operationalVal = document.getElementById("operationalVal");
const upcomingVal = document.getElementById("upcomingVal");
const exploreLink = document.getElementById("exploreLink");

// ✔ On pin click → highlight pin + update right panel
pins.forEach(pin => {
    pin.addEventListener("click", () => {

        // Highlight active pin
        pins.forEach(p => p.classList.remove("active"));
        pin.classList.add("active");

        // Update right panel using HTML attributes
        locImg.src = pin.dataset.img;
        locName.textContent = pin.dataset.name;
        locState.textContent = pin.dataset.state;
        operationalVal.textContent = pin.dataset.operational;
        upcomingVal.textContent = pin.dataset.upcoming;
        exploreLink.href = pin.dataset.link;
    });
});

const buttons = document.querySelectorAll(".toggle-btn");
const centerText = document.getElementById("centerText");

const bubble1 = document.querySelector(".bubble1");
const bubble2 = document.querySelector(".bubble2");
const bubble3 = document.querySelector(".bubble3");
const bubble4 = document.querySelector(".bubble4");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Center text
        centerText.textContent = btn.dataset.solution;

        // Bubble text (pulled 100% from HTML attributes)
        bubble1.textContent = btn.dataset.bubble1;
        bubble2.textContent = btn.dataset.bubble2;
        bubble3.textContent = btn.dataset.bubble3;
        bubble4.textContent = btn.dataset.bubble4;
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


var visionSwiper = new Swiper(".commitSwiper", {
    loop: true,
    navigation: {
        nextEl: ".commit-next",
        prevEl: ".commit-prev",
    }
});
