import searchResultTmpl from '../templates/searchResult.hbs';
import contentObserver from './observer';
import refs from './refs'

export default function renderOnSearch(data) {
  const markup = searchResultTmpl(data);
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  const leashRepeatFetch = document.querySelector('.image-slider li:nth-last-of-type(5)');
  contentObserver(leashRepeatFetch);  
}
