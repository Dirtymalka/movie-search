import Swiper from 'swiper';

const swiper = () => { return new Swiper(document.querySelector('.swiper-container'), {
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: document.querySelector('.swiper-pagination'),
    clickable: true,
  },
  navigation: {
    nextEl: document.querySelector('.swiper-button-next'),
    prevEl: document.querySelector('.swiper-button-prev'),
  },
});}


export default swiper;


// $(document).ready(function(){
//   $('.swiper-wrapper').slick({
//   });
// });
