import { INPUT_SEARCH, PAGE_NUMBER, DEFAULT_PAGE, LANGUAGE_CHECK } from './constants';
import { addLoader } from './loader-indicator';
import { getMovieCards } from './movie-cards';
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
