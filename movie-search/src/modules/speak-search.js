import searchHandler from './search';
import { INPUT_SEARCH } from './constants'

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const addMicrophoneHandler = () => {
  recognition.start();
  document.querySelector('.micro').classList.add('active');
  setTimeout(() => {
    recognition.stop();
    document.querySelector('.micro').classList.remove('active');
  }, 3000);
}

const addSpeakHandler = (e) => {
  INPUT_SEARCH.value = e.results[0][0].transcript;
  searchHandler();
  document.querySelector('.micro').classList.remove('active');
}

export { addMicrophoneHandler, recognition, addSpeakHandler };
