import { INPUT_SEARCH, FILM_NAME, PAGE_NUMBER, DEFAULT_PAGE, DEFAULT_FILM_NAME } from './constants';
import { addLoader, removeLoader } from './loader-indicator';
import appendCards from './creatingCards';
import swiper from './slider';


async function getRating(card) {
  const cardFilm = card;
  const url = `https://www.omdbapi.com/?i=${cardFilm.imbd}&apikey=4c7b0119`;
  const res = await fetch(url);
  const data = await res.json();
  const rating = await data.imdbRating;
  cardFilm.rating = rating;
  return rating;
}

async function createCardsFilm(cards) {
  const filmsData = cards;
  const promises = filmsData.map(getRating);
  await Promise.all(promises);
  return filmsData;
}

function getFilms(data) {
  const cards = [];
  data.forEach(film => {
    const movie = {};
    movie.title = film.Title;
    movie.year = film.Year;
    if (film.Poster !== 'N/A') {
      movie.poster = film.Poster;
    } else {
      movie.poster = '../img/not-availible.png';
    }
    movie.imbd = film.imdbID;
    cards.push(movie);
  });
  return cards;
}

async function getMovieCards(filmName, page) {
  document.querySelector('.info').innerHTML = '';
  if (localStorage.getItem(FILM_NAME) === DEFAULT_FILM_NAME && localStorage.getItem(PAGE_NUMBER) === DEFAULT_PAGE) {
    addLoader();
  }
  try {
    const url = `https://www.omdbapi.com/?s=${filmName}&page=${page}&apikey=4c7b0119`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "False") {
      if (localStorage.getItem(PAGE_NUMBER) !== '1' && data.Error === 'Movie not found!') {
        return;
      }
      removeLoader();
      document.querySelector('.info').innerHTML = data.Error;
      INPUT_SEARCH.value = '';
    } else {
      const films = await getFilms(data.Search);
      const cardsFilms = await createCardsFilm(films);
      await appendCards(cardsFilms);
      await removeLoader();
      await swiper.update();
    }
  } catch (error) {
    removeLoader();
    document.querySelector('.info').innerHTML = 'Sorry, something went wrong, we are already fixing the error.';
  }
}

const endSliderHandler = () => {
  const slides = document.querySelectorAll('.card');
  if (swiper.activeIndex >= slides.length - 7) {
    const numberPage = localStorage.getItem(PAGE_NUMBER);
    const filmName = localStorage.getItem(FILM_NAME);
    getMovieCards(filmName, +numberPage + 1);
    localStorage.setItem(PAGE_NUMBER, +numberPage + 1);
  }
}

export { getMovieCards, endSliderHandler };
