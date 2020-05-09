import getMovieCards from './movie-cards';
import { INPUT_SEARCH, FILM_NAME, DEFAULT_PAGE } from './constants';

function getTranslateTitle(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200503T122912Z.00d59eb838b518b4.adec26279b03b0ca53aad2d5c048461dcc45df83&text=${word}&lang=ru-en`;
  fetch(url)
    .then(res => res.json())
    .then(data => new Promise((resolve) => {
      const filmTranslated = data.text.join('');
      resolve(filmTranslated);
    }))
    .then(filmTranslated => new Promise((resolve) => {
      localStorage.setItem(FILM_NAME, filmTranslated);
      INPUT_SEARCH.value = filmTranslated;
      getMovieCards(filmTranslated, DEFAULT_PAGE);
      resolve(filmTranslated);
    }))
    .then((filmTranslated) => {
      document.querySelector('.info').innerHTML = `Showing results for "${filmTranslated}"`;
    })
}

export default getTranslateTitle;
