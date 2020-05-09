import searchHandler from './search';
import { INPUT_SEARCH } from './constants'

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const addMicrophoneHandler = () => {
  recognition.start();
}

const addSpeakHandler = (e) => {
  INPUT_SEARCH.value = e.results[0][0].transcript;
  searchHandler();
}

export { addMicrophoneHandler, recognition, addSpeakHandler };
