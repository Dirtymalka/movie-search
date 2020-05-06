import { INPUT_SEARCH, FILM_NAME, PAGE_NUMBER, DEFAULT_PAGE } from './constants';
import addLoader from './loader-indicator';
import swiper from './slider'

// const regexpEnOrRu = /(^[А-я0-9\s]+)(?!.*[A-z])$|(^[A-z0-9\s]+)(?!.*[А-я])$/;
const regexpRu = /(^[А-я0-9\s]+)(?!.*[A-z])$/;

const createCard = (filmLink, titleText, posterImg, year, rating) => {
  const card = document.createElement('div');
  card.className = 'card swiper-slide';
  // const cardContent = `<a href="https://www.imdb.com/title/${filmLink}/?ref_=nv_sr_srsg_3" class = "card-title">${titleText}</a> <div class="card-poster" style="background-image: url(${posterImg})"></div> <div class="card-year">${year}</div> <div class="card-imbd">${rating}</div>`;
  const cardContent = `<a href="https://www.imdb.com/title/${filmLink}/?ref_=nv_sr_srsg_3" class = "card-title">${titleText}</a> <img class="card-poster" src="${posterImg}"></img> <div class="card-year">${year}</div> <div class="card-imbd">${rating}</div>`;
  card.insertAdjacentHTML('beforeend', cardContent);
  return card;
}

// function getMovieTitle(filmName, page) {
//   document.querySelector('.info').innerHTML = '';
//   addLoader();
//   const url = `https://www.omdbapi.com/?s=${filmName}&page=${page}&apikey=3ea5ab5e`;
//   return fetch(url)
//     .then(res => (res.json()))
//     .then(data => new Promise((resolve) => {
//       const filmList = data.Search;
//       filmList.forEach(film => {

//         const title = film.Title;
//         const year = film.Year;
//         let poster;
//         if (film.Poster !== 'N/A') {
//           poster = film.Poster;
//         } else {
//           poster = '../img/not-availible.png';
//         }
//         const imbd = film.imdbID;
//         const urlRating = `https://www.omdbapi.com/?i=${imbd}&apikey=3ea5ab5e`;
//         console.log(1.1)
//         fetch(urlRating)
//           .then(res => res.json())
//           .then(dat => new Promise((resolve) => {
//             const rating = dat.imdbRating;
//             console.log(2)
//             const card = createCard(imbd, title, poster, year, rating);
//             resolve(card);
//             // swiper.update();
//           })
//           )
//           .then(card => {
//             console.log(3)
//             console.log(card)
//             // swiper.appendSlide(cards)
//             document.querySelector('.swiper-wrapper').append(card); console.log(card);
//             const cards = [];
//             cards.push(card);
//             console.log(cards)
//             if (cards.length === 10) return resolve('');
//             console.log(4)
//             // swiper.init();
//             swiper.update();
//           })
//       });

//     }))
//     .then(() => {
//       console.log(4)
//       document.querySelector('#fountainG').outerHTML = '';
//       swiper.update();
//     })
//     // .catch((error) => {
//     //   document.querySelector('.info').innerHTML = `No result for "${filmName}"`;
//     //   console.log(error);
//     // });
// }





async function getMovieTitle(filmName, page) {
  document.querySelector('.info').innerHTML = '';
  await addLoader();
  const url = `https://www.omdbapi.com/?s=${filmName}&page=${page}&apikey=3ea5ab5e`;
  const res = await fetch(url);
  console.log(res)
  const data = await res.json();

  const films = await getFilms(data.Search);
  const cardsFilms = await createCardsFilm(films);

  await console.log(10);
  await appendCards(cardsFilms);
  // await document.querySelectorAll('.card-poster')[0].onload = () => removeLoader();
  await removeLoader();
}

function removeLoader () {
  // document.querySelector('#fountainG').outerHTML = '';
  document.querySelectorAll('.card-poster')[0].onload = () => {document.querySelector('#fountainG').outerHTML = '';}
  console.log('ready')
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

async function createCardsFilm(cards) {
  const filmsData = cards;
  const promises = filmsData.map(getRating)
  console.log(promises)
  await Promise.all(promises)
  // for await (let card of cards) {
  //   await getRating(card);
  // }
  // filmsData.forEach(async (item) => {
  //   console.log(1)
  //   await getRating(item);
  // });
  // return filmsData;

  // for (let item of filmsData) {
  //   console.log(1)
  //  await getRating(item);
  // }
  console.log(23)
  return filmsData;
}

function appendCards(dataFilms) {
  dataFilms.forEach((film) => {
    const cardFilm = createCard(film.imbd, film.title, film.poster, film.year, film.rating);
    swiper.appendSlide(cardFilm);
  })
}


async function getRating(card) {
  const url = `https://www.omdbapi.com/?i=${card.imbd}&apikey=3ea5ab5e`;

  const res = await fetch(url);
  const data = await res.json();
  const rating = await data.imdbRating;
  card.rating = rating;
  // const cardFilm = await createCard(card.imbd, card.title, card.poster, card.year, card.rating);
  // await swiper.appendSlide(cardFilm);
  await console.log(2)
  return rating;
}






function getTranslateTitle(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200503T122912Z.00d59eb838b518b4.adec26279b03b0ca53aad2d5c048461dcc45df83&text=${word}&lang=ru-en`;
  fetch(url)
    .then(res => res.json())
    .then(data => new Promise((resolve) => {
      const filmTranslated = data.text.join('');
      resolve(filmTranslated);
    }))
    .then(filmTranslated => new Promise((resolve) => {
      getMovieTitle(filmTranslated, DEFAULT_PAGE);
      localStorage.setItem(FILM_NAME, filmTranslated);
      resolve(filmTranslated)
    }))
    .then((filmTranslated) => {
      document.querySelector('.info').innerHTML = `Showing results for "${filmTranslated}"`;
    })
}

const searchHandler = (ev) => {
  if (ev) ev.preventDefault();
  // addLoader();
  document.querySelector('.swiper-wrapper').innerHTML = '';
  // swiper.removeAllSlides();
  const inputSearchValue = INPUT_SEARCH.value;
  if (regexpRu.test(inputSearchValue)) {
    console.log('ru')
    getTranslateTitle(inputSearchValue);
  } else {
    console.log('en')
    getMovieTitle(inputSearchValue, DEFAULT_PAGE);
  }
  localStorage.setItem(FILM_NAME, inputSearchValue);
  localStorage.setItem(PAGE_NUMBER, DEFAULT_PAGE);
  // swiper.update();
}

export { searchHandler, getMovieTitle };
