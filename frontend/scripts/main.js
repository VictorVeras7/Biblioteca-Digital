"use strict";
const swiper = new Swiper('.swiper', {
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            sliderPerView: 3
        },
        620: {
            slidesPerView: 5
        },
        1024: {
            slidesPerView: 9
        }
    }
});
