import { INPUT_SEARCH, PAGE_NUMBER, DEFAULT_PAGE, LANGUAGE_CHECK } from './constants';
import { addLoader } from './loader-indicator';
import getMovieCards from './movie-cards';
import getTranslateTitle from './translation';

const searchHandler = (ev) => {
  if (ev) ev.preventDefault();
  const inputSearchValue = INPUT_SEARCH.value;
  if (inputSearchValue === '') {
    return;
  }
  if (LANGUAGE_CHECK.test(inputSearchValue)) {
    getTranslateTitle(inputSearchValue);
  } else {
    getMovieCards(inputSearchValue, DEFAULT_PAGE);
  }
  localStorage.setItem(PAGE_NUMBER, DEFAULT_PAGE);
  addLoader();
}

export default searchHandler;





// const createCard = (filmLink, titleText, posterImg, year, rating) => {
//   const card = document.createElement('div');
//   card.className = 'card swiper-slide';
//   const cardContent = `<div class="card-poster" style="background-image: url(${posterImg})"></div> <a href="https://www.imdb.com/title/${filmLink}/?ref_=nv_sr_srsg_3" class = "card-title">${titleText}</a> <div class="card-year">${year}</div> <div class="card-imbd">${rating}</div>`;
//   card.insertAdjacentHTML('beforeend', cardContent);
//   return card;
// }

// async function getMovieCards(filmName, page) {
//   document.querySelector('.info').innerHTML = '';
//   if (localStorage.getItem(FILM_NAME) === DEFAULT_FILM_NAME && localStorage.getItem(PAGE_NUMBER) === DEFAULT_PAGE) {
//     addLoader();
//   }
//   try {
//     const url = `https://www.omdbapi.com/?s=${filmName}&page=${page}&apikey=f7df6c11`;
//     const res = await fetch(url);
//     const data = await res.json();
//     if (data.Response === "False") {
//       if (localStorage.getItem(PAGE_NUMBER) !== '1' && data.Error === 'Movie not found!') {
//         return;
//       }
//       removeLoader();
//       console.log(data.Error)
//       document.querySelector('.info').innerHTML = data.Error;
//       INPUT_SEARCH.value = '';
//     } else {
//       const films = await getFilms(data.Search);
//       const cardsFilms = await createCardsFilm(films);
//       await appendCards(cardsFilms);
//       await removeLoader();
//       await swiper.update();
//     }
//   } catch (error) {
//     console.log(error);
//     removeLoader();
//     document.querySelector('.info').innerHTML = 'Sorry, something went wrong, we are already fixing the error.';
//   }
// }

// function getFilms(data) {
//   const cards = [];
//   data.forEach(film => {
//     const movie = {};
//     movie.title = film.Title;
//     movie.year = film.Year;
//     if (film.Poster !== 'N/A') {
//       movie.poster = film.Poster;
//     } else {
//       movie.poster = '../img/not-availible.png';
//     }
//     movie.imbd = film.imdbID;
//     cards.push(movie);
//   });
//   return cards;
// }

// async function createCardsFilm(cards) {
//   const filmsData = cards;
//   const promises = filmsData.map(getRating);
//   await Promise.all(promises);
//   return filmsData;
// }

// async function appendCards(dataFilms) {
//   const inputSearchValue = INPUT_SEARCH.value;
//   localStorage.setItem(FILM_NAME, inputSearchValue || DEFAULT_FILM_NAME);
//   const filmName = localStorage.getItem(FILM_NAME);
//   if (inputSearchValue === filmName && filmName !== DEFAULT_FILM_NAME && localStorage.getItem(PAGE_NUMBER) === DEFAULT_PAGE) {
//     swiper.removeAllSlides();
//   }
//   dataFilms.forEach((film) => {
//     // const img = new Image();
//     // img.src = film.poster;
//     // img.className = 'card-poster';
//     // console.log(img);
//     // img.onload = () => {
//     //   console.log('process');
//     const cardFilm = createCard(film.imbd, film.title, film.poster, film.year, film.rating);
//     swiper.appendSlide(cardFilm);
//   });
//   document.querySelector('.info').innerHTML = `Showing results for "${localStorage.getItem(FILM_NAME)}"`;
//   swiper.update();
// }


// async function getRating(card) {
//   const url = `https://www.omdbapi.com/?i=${card.imbd}&apikey=f7df6c11`;
//   const res = await fetch(url);
//   const data = await res.json();
//   const rating = await data.imdbRating;
//   card.rating = rating;
//   return rating;
// }

// function getTranslateTitle(word) {
//   const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200503T122912Z.00d59eb838b518b4.adec26279b03b0ca53aad2d5c048461dcc45df83&text=${word}&lang=ru-en`;
//   fetch(url)
//     .then(res => res.json())
//     .then(data => new Promise((resolve) => {
//       const filmTranslated = data.text.join('');
//       resolve(filmTranslated);
//     }))
//     .then(filmTranslated => new Promise((resolve) => {
//       localStorage.setItem(FILM_NAME, filmTranslated);
//       INPUT_SEARCH.value = filmTranslated;
//       getMovieCards(filmTranslated, DEFAULT_PAGE);
//       resolve(filmTranslated);
//     }))
//     .then((filmTranslated) => {
//       document.querySelector('.info').innerHTML = `Showing results for "${filmTranslated}"`;
//     })
// }
