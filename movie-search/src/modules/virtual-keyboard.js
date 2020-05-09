import { keyLayoutEnglishUnShift, keyLayoutEnglishShift, keyLayoutEnglishKeys, keyLayoutRussianUnShift, keyLayoutRussianShift, keyLayoutRussianKeys, KEY_TO_LANGUAGE, ENGLISH_VALUE, RUSSIAN_VALUE, INPUT_SEARCH } from './constants';
import searchHandler from './search';

export default class Keyboard {
  constructor() {
    this.language = localStorage.getItem(KEY_TO_LANGUAGE) || 'en';
    this.containerBoard = document.querySelector('.keyboard-container') || '';
    this.inputSearch = INPUT_SEARCH;
    this.cursor = 0;
    this.text = 0;
  }

  createKeyboardContainer() {
    const container = document.createElement('div');
    container.className = 'keyboard-container';
    document.querySelector('.search').append(container);
    this.containerBoard = document.querySelector('.keyboard-container');
  }

  createKeys(keyLayoutUnShift, keyLayoutShift, keyLayoutKeys) {
    if (keyLayoutUnShift === keyLayoutEnglishUnShift) {
      this.containerBoard.classList.add('english');
    }
    if (keyLayoutUnShift === keyLayoutRussianUnShift) {
      this.containerBoard.classList.add('russian');
    }
    for (let i = 0; i < keyLayoutUnShift.length; i += 1) {
      const div = document.createElement('div');
      div.className = 'key tap-shift';
      this.containerBoard.append(div);
      const sup = document.createElement('sup');
      sup.innerHTML = keyLayoutShift[i];
      div.append(sup);
      const span = document.createElement('span');
      span.innerHTML = keyLayoutUnShift[i];
      div.append(span);
    }

    keyLayoutKeys.forEach((key) => {
      const div = document.createElement('div');
      div.className = 'key';
      const divClassList = (f, a) => {
        div.classList.add(f);
        div.classList.add(a);
      };
      if (key === 'backspace') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'Shift') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'space') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'Left') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'Right') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'Enter') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'Del') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'en\\ru') {
        divClassList('lang-change', 'special');
      }
      div.innerHTML = key;
      this.containerBoard.append(div);
    });

    document.querySelector('.right').textContent = '';
    document.querySelector('.left').textContent = '';
  }

  init() {
    if (this.language === ENGLISH_VALUE) {
      this.createKeys(keyLayoutEnglishUnShift, keyLayoutEnglishShift, keyLayoutEnglishKeys);
    } else if (localStorage.getItem(KEY_TO_LANGUAGE) === RUSSIAN_VALUE) {
      this.createKeys(keyLayoutRussianUnShift, keyLayoutRussianShift, keyLayoutRussianKeys);
    } else {
      this.createKeys(keyLayoutEnglishUnShift, keyLayoutEnglishShift, keyLayoutEnglishKeys);
    }

    this.inputSearch.onblur = () => this.inputSearch.focus();

    this.containerBoard.addEventListener('mousedown', (event) => {
      const activeButton = event.target.closest('div');

      if (activeButton.classList.contains('space')) {
        this.clickOnSpace();
      }
      if (activeButton.classList.contains('enter')) {
        this.clickOnEnter();
      }
      if (activeButton.classList.contains('backspace')) {
        this.clickOnBackspace();
      }
      if (activeButton.classList.contains('shift')) {
        event.target.classList.toggle('active');
        const keys = this.containerBoard.querySelectorAll('div');
        if (event.target.classList.contains('active')) {
          this.changeToUpperCase(keys);
        } else {
          this.changeToLowerCase(keys);
        }
        const tapShiftKeys = this.containerBoard.querySelectorAll('.tap-shift');
        this.tapOnShiftSpecial(tapShiftKeys);
      }
      if (activeButton.classList.contains('del')) {
        this.clickOnDel();
      }
      if (activeButton.classList.contains('right')) {
        this.clickOnRightArrow();
      }
      if (activeButton.classList.contains('left')) {
        this.clickOnLeftArrow();
      }
      if (activeButton.classList.contains('lang-change')) {
        this.languageChange();
      }
      if (activeButton.classList.contains('special')) {
        return;
      }
      if (!activeButton.classList.contains('key')) {
        return;
      }
      if (!activeButton) {
        return;
      }
      activeButton.classList.remove('active');
      activeButton.classList.add('active');

      this.cursorPosition();
      this.text.splice(this.inputSearch.selectionEnd, 0, (activeButton.querySelector('span') ? activeButton.querySelector('span').textContent : activeButton.textContent));
      this.inputSearch.value = this.text.join('');
      this.inputSearch.selectionEnd = this.cursor + 1;

      this.containerBoard.onmouseup = () => activeButton.classList.remove('active');
    });
  }

  languageChange() {
    if (this.containerBoard.classList.contains('russian')) {
      this.containerBoard.classList.remove('russian');
      this.containerBoard.innerHTML = '';
      this.createKeys(keyLayoutEnglishUnShift, keyLayoutEnglishShift, keyLayoutEnglishKeys);
      localStorage.setItem(KEY_TO_LANGUAGE, ENGLISH_VALUE);
    } else if (this.containerBoard.classList.contains('english')) {
      this.containerBoard.classList.remove('english');
      this.containerBoard.innerHTML = '';
      this.createKeys(keyLayoutRussianUnShift, keyLayoutRussianShift, keyLayoutRussianKeys);
      localStorage.setItem(KEY_TO_LANGUAGE, RUSSIAN_VALUE);
    }
  }

  cursorPosition() {
    this.inputSearch.selectionEnd = this.inputSearch.selectionStart;
    this.cursor = this.inputSearch.selectionEnd;
    this.text = this.inputSearch.value.split('');
  }

  inputSearchToString() {
    this.inputSearch.value = this.text.join('');
  };

  clickOnBackspace() {
    if (this.inputSearch.selectionStart === 0) {
      return;
    }
    this.cursorPosition();
    this.text.splice(this.inputSearch.selectionEnd - 1, 1);
    this.inputSearchToString();
    this.inputSearch.selectionEnd = this.cursor - 1;
  }

  clickOnEnter() {
    searchHandler();
    this.addClassActive()
  }

  clickOnDel() {
    if (this.inputSearch.selectionStart === this.inputSearch.value.length) {
      return;
    }
    this.cursorPosition();
    this.text.splice(this.inputSearch.selectionEnd, 1);
    this.inputSearchToString();
    this.inputSearch.selectionEnd = this.cursor;
  }

  clickOnRightArrow() {
    if (this.inputSearch.selectionEnd === this.inputSearch.value.length) {
      return;
    }
    this.cursorPosition();
    this.inputSearch.selectionStart = this.cursor + 1;
  }

  clickOnLeftArrow() {
    if (this.inputSearch.selectionStart === 0) {
      return;
    }
    this.cursorPosition();
    this.inputSearch.selectionEnd = this.cursor - 1;
  }

  clickOnSpace() {
    this.cursorPosition();
    this.text.splice(this.inputSearch.selectionEnd, 0, ' ');
    this.inputSearchToString();
    this.inputSearch.selectionEnd = this.cursor + 1;
  }

  changeToUpperCase(keys) {
    keys.forEach((letter) => {
      const letterF = letter;
      if (!letter.classList.contains('tap-shift') && !letter.classList.contains('special')) {
        letterF.textContent = letter.textContent.toUpperCase();
      }
    });
  };

  changeToLowerCase(keys) {
    keys.forEach((letter) => {
      const letterF = letter;
      if (!letter.classList.contains('tap-shift') && !letter.classList.contains('special')) {
        letterF.textContent = letter.textContent.toLowerCase();
      }
    });
  };

  tapOnShiftSpecial(keys) {
    keys.forEach((key) => {
      const keyS = key;
      const supKeyContent = key.querySelector('sup').textContent;
      const spanKeyContent = key.querySelector('span').textContent;
      keyS.querySelector('sup').textContent = spanKeyContent;
      keyS.querySelector('span').textContent = supKeyContent;
    });
  };

  addClassActive() {
    document.querySelector('.keyboard-container').classList.toggle('active');
  }
}
