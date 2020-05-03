import { INPUT_SEARCH, FILM_NAME, PAGE_NUMBER } from './constants';
import addLoader from './loader-indicator';
import swiper from './slider'

const regexpEnOrRu = /(^[А-я0-9\s]+)(?!.*[A-z])$|(^[A-z0-9\s]+)(?!.*[А-я])$/;
const regexpRu = /(^[А-я0-9\s]+)(?!.*[A-z])$/;

const createCard = function (filmLink, titleText, posterImg, year, rating) {
  const card = document.createElement('div');
  card.className = 'card swiper-slide';
  const cardContent = `<a href="https://www.imdb.com/title/${filmLink}/?ref_=nv_sr_srsg_3" class = "card-title">${titleText}</a> <div class="card-poster" style="background-image: url(${posterImg})"></div> <div class="card-year">${year}</div> <div class="card-imbd">${rating}</div>`;
  // const cardContent = `<a href="https://www.imdb.com/title/${filmLink}/?ref_=nv_sr_srsg_3" class = "card-title">${titleText}</a> <img data-src=${posterImg} data-srcset=${posterImg} class="swiper-lazy">
  // <div class="swiper-lazy-preloader"></div> <div class="card-year">${year}</div> <div class="card-imbd">${rating}</div>`;
  card.insertAdjacentHTML('beforeend', cardContent);
  return card;
}

function getMovieTitle(filmName, page) {
  document.querySelector('.info').innerHTML = '';
  addLoader();
  const url = `https://www.omdbapi.com/?s=${filmName}&page=${page}&apikey=3ea5ab5e`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.Search)
      if (data.Search === 'undefined') console.log('undefined')
      data.Search.forEach(film => {
        const title = film.Title;
        const year = film.Year;
        let poster;
        if (film.Poster !== 'N/A') {
          poster = film.Poster;
        } else {
          poster = '../img/not-availible.png';
        }
        const imbd = film.imdbID;
        const urlRating = `https://www.omdbapi.com/?i=${imbd}&apikey=3ea5ab5e`;
        fetch(urlRating)
          .then(res => res.json())
          .then(dat => new Promise((resolve) => {
            const rating = dat.imdbRating;
            const cards = [];
            cards.push(createCard(imbd, title, poster, year, rating));
            resolve(cards);
            swiper.update();
          })
          )
          .then(cards => {
            cards.forEach((card) => document.querySelector('.swiper-wrapper').append(card));
            swiper.update();
          })
      });
    })
    .finally(() => {
      document.querySelector('#fountainG').outerHTML = '';
    })
    .catch((error) => {
      document.querySelector('.info').innerHTML = `No result for "${filmName}"`;
      console.log(error);
    });
}

function getTranslateTitle(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200503T122912Z.00d59eb838b518b4.adec26279b03b0ca53aad2d5c048461dcc45df83&text=${word}&lang=ru-en`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const filmTranslated = data.text.join('');
      console.log(data.text.join(''));
      getMovieTitle(filmTranslated, '1');
      localStorage.setItem(FILM_NAME, filmTranslated);
      document.querySelector('.info').innerHTML = `Showing results for "${filmTranslated}"`;
    });

}

const searchHandler = (ev) => {
  if (ev) ev.preventDefault();
  // addLoader();
  document.querySelector('.swiper-wrapper').innerHTML = null;
  const inputSearchValue = INPUT_SEARCH.value;
  if (regexpEnOrRu.test(inputSearchValue)) console.log('не смешанный');
  if (regexpRu.test(inputSearchValue)) console.log('русский')
  if (regexpRu.test(inputSearchValue)) {
    getTranslateTitle(inputSearchValue);
  } else {
    getMovieTitle(inputSearchValue, '1');
  }
  localStorage.setItem(FILM_NAME, inputSearchValue);
  localStorage.setItem(PAGE_NUMBER, '1');
  swiper.update();
}

export { searchHandler, getMovieTitle };
