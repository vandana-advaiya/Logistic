const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(lnk => lnk.classList.remove('active'));
        link.classList.add('active');
    });
});

var swiper = new Swiper(".aboutSwiper", {
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
