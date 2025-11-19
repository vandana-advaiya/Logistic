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

// Tooltip hover
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

    // Card elements
    const locImg = document.getElementById("locImg");
    const locName = document.getElementById("locName");
    const locState = document.getElementById("locState");
    const operationalVal = document.getElementById("operationalVal");
    const upcomingVal = document.getElementById("upcomingVal");
    const exploreLink = document.getElementById("exploreLink");

    // Function to update card
    function updateCard(pin) {
        locImg.src = pin.dataset.img;
    locName.textContent = pin.dataset.name;
    locState.textContent = pin.dataset.state;
    operationalVal.textContent = pin.dataset.operational;
    upcomingVal.textContent = pin.dataset.upcoming;
    exploreLink.href = pin.dataset.link;
}

// Auto-init on page load
document.addEventListener("DOMContentLoaded", () => {
    const activePin = document.querySelector(".map-pin.active") || pins[0];
    if (activePin) {
        activePin.classList.add("active");
    updateCard(activePin);
    }
});

// Click update
pins.forEach(pin => {
        pin.addEventListener("click", () => {
            pins.forEach(p => p.classList.remove("active"));
            pin.classList.add("active");
            updateCard(pin);
        });
});

const buttons = document.querySelectorAll(".toggle-btn");
const centerText = document.getElementById("centerText");

const bubble1 = document.querySelector(".bubble1");
const bubble2 = document.querySelector(".bubble2");
const bubble3 = document.querySelector(".bubble3");
const bubble4 = document.querySelector(".bubble4");

// 🔥 Function to update diagram content
function updateBubbles(btn) {
    centerText.textContent = btn.dataset.solution;
    bubble1.textContent = btn.dataset.bubble1;
    bubble2.textContent = btn.dataset.bubble2;
    bubble3.textContent = btn.dataset.bubble3;
    bubble4.textContent = btn.dataset.bubble4;
}

// 🔥 Initialize on page load from first active button
document.addEventListener("DOMContentLoaded", () => {
    const activeBtn = document.querySelector(".toggle-btn.active") || buttons[0];
    updateBubbles(activeBtn);
});

// 🔥 Handle click
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        updateBubbles(btn);
    });
});

/* ---------------------------------------------------
   YOUR EXISTING SWIPER (AMENITIES)
------------------------------------------------------*/
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


/* ---------------------------------------------------
   MEDIA TAB SWITCHING + SLIDER CREATION
------------------------------------------------------*/
const mediaTabs = document.querySelectorAll(".tab-btn-media");
const mediaGrids = document.querySelectorAll(".media-grid");
const dotsContainer = document.querySelector(".pagination-dots");


function setupSlider(grid) {
    const slider = grid.querySelector(".media-slider");

    const items = Array.from(slider.querySelectorAll(".media-item"));
    slider.innerHTML = "";
    dotsContainer.innerHTML = "";

    const itemsPerSlide = 6;
    const totalSlides = Math.ceil(items.length / itemsPerSlide);

    dotsContainer.style.display = totalSlides <= 1 ? "none" : "flex";

    const slides = [];

    for (let i = 0; i < totalSlides; i++) {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        slide.style.display = i === 0 ? "grid" : "none";

        items.slice(i * itemsPerSlide, (i + 1) * itemsPerSlide)
            .forEach(item => slide.appendChild(item));

        slider.appendChild(slide);
        slides.push(slide);
    }

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

            currentSlide = index; // syncing for swipe
        });
    });

    /* ------------------------------
       DRAG / SWIPE SLIDING
    --------------------------------*/
    let currentSlide = 0;

    slider.addEventListener("touchstart", startSwipe);
    slider.addEventListener("mousedown", startSwipe);

    function startSwipe(e) {
        let startX = e.touches ? e.touches[0].clientX : e.clientX;

        function move(e2) {
            let moveX = e2.touches ? e2.touches[0].clientX : e2.clientX;

            if (moveX - startX < -50 && currentSlide < slides.length - 1) {
                dots[currentSlide + 1].click();
                currentSlide++;
                cleanup();
            }
            if (moveX - startX > 50 && currentSlide > 0) {
                dots[currentSlide - 1].click();
                currentSlide--;
                cleanup();
            }
        }

        function cleanup() {
            slider.removeEventListener("touchmove", move);
            slider.removeEventListener("mousemove", move);
        }

        slider.addEventListener("touchmove", move);
        slider.addEventListener("mousemove", move);
    }

    // Enable popup clicking
    enablePopup(grid);
}


/* ---------------------------------------------------
   TAB CLICK HANDLER
------------------------------------------------------*/
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


/* ---------------------------------------------------
   FIRST TAB INITIALIZATION
------------------------------------------------------*/
const firstGrid = document.getElementById("operational");
setupSlider(firstGrid);


/* ---------------------------------------------------
   POPUP MODAL + POPUP SWIPER
------------------------------------------------------*/
const modal = document.getElementById("mediaModal");
const popupSlides = document.getElementById("popupSlides");
const closeModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".media-overlay");

/* FIX: CLOSE MODAL */
closeModal.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.add("d-none");
});

overlay.addEventListener("click", () => {
    modal.classList.add("d-none");
});


/* ENABLE POPUP CLICK */
function enablePopup(grid) {
    const items = grid.querySelectorAll(".media-item");

    items.forEach((item, index) => {
        item.addEventListener("click", () => {
            openPopup(grid, index);
        });
    });
}


/* OPEN POPUP + AUTOSLIDE SWIPER */
function openPopup(grid, startIndex) {
    popupSlides.innerHTML = "";

    const mediaItems = grid.querySelectorAll(".media-item");
    let containsVideo = false; // <- NEW

    mediaItems.forEach(item => {
        const type = item.dataset.type || "image";
        const src = item.querySelector("img, video").getAttribute("src");

        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        if (type === "video") {
            containsVideo = true; // <- NEW
            slide.innerHTML = `<video src="${src}" controls></video>`;
        } else {
            slide.innerHTML = `<img src="${src}" />`;
        }

        popupSlides.appendChild(slide);
    });

    modal.classList.remove("d-none");

    /* -------------------------------------
       AUTO SLIDE LOGIC BASED ON CONTENT
       -------------------------------------*/

    let swiperOptions = {
        initialSlide: startIndex,
        slidesPerView: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    };

    // Only enable autoplay if NO video exists
    if (!containsVideo) {
        swiperOptions.autoplay = {
            delay: 2000,
            disableOnInteraction: false
        };
    }

    new Swiper(".popupSwiper", swiperOptions);
}

var visionSwiper = new Swiper(".commitSwiper", {
    loop: true,
    navigation: {
        nextEl: ".commit-next",
        prevEl: ".commit-prev",
    }
});
