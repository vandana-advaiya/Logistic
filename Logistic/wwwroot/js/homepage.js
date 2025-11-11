const awardsSwiper = new Swiper(".awardsSwiper", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 4000, 
    autoplay: {
        delay: 0, 
        disableOnInteraction: false,
    },
    freeMode: true,
    freeModeMomentum: false,
    allowTouchMove: false, 
    grabCursor: false,
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
    },
});
