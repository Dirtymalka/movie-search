import Swiper from 'swiper';

const swiper = new Swiper(document.querySelector('.swiper-container'), {
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 1,
  loop: true,
  // loopFillGroupWithBlank: true,
  // preloadImages: false,
  // lazy: true,
  pagination: {
    el: document.querySelector('.swiper-pagination'),
    clickable: true,
  },
  navigation: {
    nextEl: document.querySelector('.swiper-button-next'),
    prevEl: document.querySelector('.swiper-button-prev'),
  },
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


// $(document).ready(function(){
//   $('.swiper-wrapper').slick({
//   });
// });
