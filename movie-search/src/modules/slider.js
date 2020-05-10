import Swiper from 'swiper';

const swiper = new Swiper(document.querySelector('.swiper-container'), {
  init: false,
  dynamicBullets: true,
  dynamicMainBullets: 10,
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 1,
  grabCursor: true,
  preloadImages: true,
  navigation: {
    nextEl: document.querySelector('.swiper-button-next'),
    prevEl: document.querySelector('.swiper-button-prev'),
  },
  breakpoints: {
    1336: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    780: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    560: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
  },
});

export default swiper;
