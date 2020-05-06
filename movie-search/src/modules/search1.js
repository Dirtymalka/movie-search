import { INPUT_SEARCH, FILM_NAME, PAGE_NUMBER, DEFAULT_PAGE } from './constants';
import addLoader from './loader-indicator';
import swiper from './slider'

const regexpEnOrRu = /(^[А-я0-9\s]+)(?!.*[A-z])$|(^[A-z0-9\s]+)(?!.*[А-я])$/;
const regexpRu = /(^[А-я0-9\s]+)(?!.*[A-z])$/;

const createCard = (filmLink, titleText, posterImg, year, rating) => {
  const card = document.createElement('div');
  card.className = 'card swiper-slide';
  // const cardContent = `<a href="https://www.imdb.com/title/${filmLink}/?ref_=nv_sr_srsg_3" class = "card-title">${titleText}</a> <div class="card-poster" style="background-image: url(${posterImg})"></div> <div class="card-year">${year}</div> <div class="card-imbd">${rating}</div>`;
  const cardContent = `<a href="https://www.imdb.com/title/${filmLink}/?ref_=nv_sr_srsg_3" class = "card-title">${titleText}</a> <img class="card-poster" src="${posterImg}"></img> <div class="card-year">${year}</div> <div class="card-imbd">${rating}</div>`;
  card.insertAdjacentHTML('beforeend', cardContent);
  return card;
}

const createRatingCard = (rating) => {
  const cardContentRating = `</div> <div class="card-imbd">${rating}</div>`;
  return cardContentRating;
}


async function getMovieTitle(filmName, page) {
  const url = `https://www.omdbapi.com/?s=${filmName}&page=${page}&apikey=3ea5ab5e`;

  const res = await fetch(url);
  const data = await res.json();
  const films = await getFilms(data);
  const filmsRating = await createCardsFilm(films);
  await createCard(filmsRating.imbd, filmsRating.title, filmsRating.poster, filmsRating.year, filmsRating.rating);

  // return data
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
    return cards;
    // const urlRating = `https://www.omdbapi.com/?i=${imbd}&apikey=3ea5ab5e`;
  });
}

function createCardsFilm(cards) {
  const filmsData = cards;
  filmsData.forEach((item) => {
    const rating = getRating(item);
    filmsData.rating = rating;
  })
  return filmsData;
}

  async function getRating(card) {
      const url = `https://www.omdbapi.com/?i=${card.imbd}&apikey=3ea5ab5e`;

      const res = await fetch(url);
      const data = await res.json();
      const rating = await data.imdbRating;
      return rating;
    }
