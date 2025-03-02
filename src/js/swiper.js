import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const initArrivalsSlider = () => {
  const slider = document.querySelector('.arrivals__swiper');
  const btnPrev = document.querySelector('.swiper-navigation__arrivals--prev');
  const btnNext = document.querySelector('.swiper-navigation__arrivals--next');
  const bullets = document.querySelector('.arrivals__bullets');

  if (!slider) return;

  new Swiper(slider, {
    modules: [Navigation, Pagination],
    spaceBetween: 20,
    loop: true,
    observer: true,
    slidesPerView: 5,
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
    pagination: {
      el: bullets,
      clickable: true,
    },
    breakpoints: {
      200: {
        slidesPerView: 1,
      },
      360: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 4,
        spaceBetween: 8,
      },
      1024: {
        slidesPerView: 5,
      },
      1400: {
        spaceBetween: 16,
      },
      1920: {
        spaceBetween: 20,
      },
    },
  });
};

const initSliders = () => {
  initArrivalsSlider();
};

window.addEventListener('DOMContentLoaded', initSliders);
