// import Swiper from 'swiper';

const swiper = new Swiper(document.querySelector('.swiper-container'), {
  init: false,
  dynamicBullets: true,
  dynamicMainBullets: 10,
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 1,
  // loop: true,
  grabCursor: true,
  pagination: {
    el: document.querySelector('.swiper-pagination'),
    clickable: true,
  },
  navigation: {
    nextEl: document.querySelector('.swiper-button-next'),
    prevEl: document.querySelector('.swiper-button-prev'),
  },
  // preloadImages: true,
  // updateOnImagesReady: true,
  breakpoints: {
    1440: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    1100: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    780: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
  },
});


export default swiper;
