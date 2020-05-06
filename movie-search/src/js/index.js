import '../css/style.css';
// import '../css/style.scss';
import swiper from '../modules/slider';
import Keyboard from '../modules/virtual-keyboard';
import * as constants from '../modules/constants';
import addLoader from '../modules/loader-indicator';
import { searchHandler, getMovieTitle } from '../modules/search';


window.onload = () => {
  swiper.init();
  getMovieTitle('batman', '1');
  localStorage.setItem(constants.FILM_NAME, 'batman');
  localStorage.setItem(constants.PAGE_NUMBER, '1');
  const keyboard = new Keyboard;
  keyboard.createKeyboardContainer();
  keyboard.init();
  document.querySelector('.keyboard').onclick = () => {
    document.querySelector('.keyboard-container').classList.toggle('active');
  }
  constants.BUTTON_SEARCH.onclick = searchHandler;

  swiper.on('reachEnd', endSliderHandler);
  // swiper.on('imagesReady', console.log('img ready'));
}

const endSliderHandler = () => {
  console.log('the end');
  console.log(swiper.activeIndex);
  const numberPage = localStorage.getItem(constants.PAGE_NUMBER);
  const filmName = localStorage.getItem(constants.FILM_NAME);
  getMovieTitle(filmName, +numberPage + 1);
  localStorage.setItem(constants.PAGE_NUMBER, +numberPage + 1);
}
