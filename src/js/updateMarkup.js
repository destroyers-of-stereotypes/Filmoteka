import gallery from '../templates/gallery.hbs';
import contentObserver from './observer';
import refs from './refs'

export default function updateMarkupGallery(dataMovies) {
  const markup = gallery(dataMovies);
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  const leashRepeatFetch = document.querySelector('.image-slider li:nth-last-of-type(5)');
  contentObserver(leashRepeatFetch)
}