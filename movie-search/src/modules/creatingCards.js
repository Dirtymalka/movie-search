import { INPUT_SEARCH, FILM_NAME, PAGE_NUMBER, DEFAULT_PAGE, DEFAULT_FILM_NAME } from './constants';
import { swiper } from './slider';

const createCard = (filmLink, titleText, posterImg, year, rating) => {
  const card = document.createElement('div');
  card.className = 'card swiper-slide';
  const cardContent = `<div class="card-poster" style="background-image: url(${posterImg})"></div> <a href="https://www.imdb.com/title/${filmLink}/?ref_=nv_sr_srsg_3" class = "card-title"  target="_blank">${titleText}</a> <div class="card-year">${year}</div> <div class="card-imbd">${rating}</div>`;
  card.insertAdjacentHTML('beforeend', cardContent);
  return card;
}

async function appendCards(dataFilms) {
  const inputSearchValue = INPUT_SEARCH.value;
  localStorage.setItem(FILM_NAME, inputSearchValue || DEFAULT_FILM_NAME);
  const filmName = localStorage.getItem(FILM_NAME);
  if (inputSearchValue === filmName && filmName !== DEFAULT_FILM_NAME && localStorage.getItem(PAGE_NUMBER) === DEFAULT_PAGE) {
    swiper.removeAllSlides();
  }
  dataFilms.forEach((film) => {
    // const img = new Image();
    // img.src = film.poster;
    // img.className = 'card-poster';
    // console.log(img);
    // img.onload = () => {
    //   console.log('process');
    const cardFilm = createCard(film.imbd, film.title, film.poster, film.year, film.rating);
    swiper.appendSlide(cardFilm);
  });
  document.querySelector('.info').innerHTML = `Showing results for "${localStorage.getItem(FILM_NAME)}"`;
  swiper.update();
}

export default appendCards;
