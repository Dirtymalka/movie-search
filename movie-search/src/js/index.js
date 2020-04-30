import '../css/style.css';
// import '../css/style.scss';
import swiper from '../modules/slider'
import Keyboard from '../modules/virtual-keyboard';
import * as constants from '../modules/constants';


window.onload = () => {
  const keyboard = new Keyboard;
  keyboard.createKeyboardContainer();
  keyboard.init();
}

const createCard = function(titleText, posterImg, year) {
  const card = document.createElement('div');
  card.className = 'card swiper-slide';
  const cardContent = `<a class = "card-title">${titleText}</a> <div class="card-poster" style="background-image: url(${posterImg})"></div> <div class="card-year">${year}</div> <div class="card-imbd">34</div>`;
  card.insertAdjacentHTML('beforeend', cardContent);
  document.querySelector('.swiper-wrapper').append(card);
}

function getMovieTitle(page) {
  const url = `https://www.omdbapi.com/?s=dream&page=${page}&apikey=9b67fc54`;

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.Search);
      data.Search.forEach(film => {
        const title = film.Title;
        const year = film.Year;
        const poster = film.Poster;
        createCard(title, poster, year);
      });
      swiper();
    });
 }
console.log('before');


 getMovieTitle('dream');


 console.log('after');
