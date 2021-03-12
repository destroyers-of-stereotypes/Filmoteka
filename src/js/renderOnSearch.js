import searchResultTmpl from '../templates/searchResult.hbs';
import contentObserver from './observer';

const galleryContainer = document.querySelector('.image-slider');

export default function renderOnSearch(data) {
  const markup = searchResultTmpl(data);
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  const leashRepeatFetch = document.querySelector('.image-slider li:nth-last-of-type(5)');
contentObserver(leashRepeatFetch);  
}
