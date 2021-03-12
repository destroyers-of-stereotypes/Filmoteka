import gallery from '../templates/gallery.hbs';
import contentObserver from './observer';

const galleryContainer = document.querySelector('.image-slider');

export default function updateMarkupGallery(dataMovies) {
  const markup = gallery(dataMovies);
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  const leashRepeatFetch = document.querySelector('.image-slider li:nth-last-of-type(5)');
  contentObserver(leashRepeatFetch)
}