export const keyLayoutEnglishUnShift = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
export const keyLayoutEnglishShift = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];
export const keyLayoutEnglishKeys = [
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '\\', 'backspace',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
  'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', 'Shift', 'Del',
  'en\\ru', 'space', 'Left', 'Right',
];
export const keyLayoutRussianUnShift = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
export const keyLayoutRussianShift = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+'];
export const keyLayoutRussianKeys = [
  'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'backspace',
  'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift', 'Del',
  'en\\ru', 'space', 'Left', 'Right',
];
export const KEY_TO_LANGUAGE = 'keyboard';
export const ENGLISH_VALUE = 'en';
export const RUSSIAN_VALUE = 'ru';

export const INPUT_SEARCH = document.querySelector('.search-input');

export const BUTTON_SEARCH = document.querySelector('.search-button');

export const MICROPHONE = document.querySelector('.micro');

export const CLEAR_BUTTON = document.querySelector('.clear');

export const FILM_NAME = 'filmName';
export const PAGE_NUMBER = 'pageNumber';
export const DEFAULT_PAGE = '1';
export const DEFAULT_FILM_NAME = 'batman';

export const LANGUAGE_CHECK = /(^[А-я0-9\s]+)(?!.*[A-z])$/;
