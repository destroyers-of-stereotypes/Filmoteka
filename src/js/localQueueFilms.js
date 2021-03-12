const libraryBtn = document.querySelector('.my-library');
const homeBtn = document.querySelector('.library-home');
const libraryRef = document.querySelector('.library-page');
const headerRef = document.querySelector('.main-page');
const modalRef = document.querySelector('.modal');
const galleryContainer = document.querySelector('.image-slider');
import updateMarkupGallery from './updateMarkup';
import galleryItem from '../templates/galleryItem.hbs';

import { popularMoviesURL, fetchInfoFilm, fetchFilms } from './apiService';

let arrayQueueFilms = [];
const localArrayWatchedFilms = localStorage.getItem('arrayQueueFilms');

if (localArrayWatchedFilms) {
  arrayQueueFilms = JSON.parse(localArrayWatchedFilms);
}

libraryBtn.addEventListener('click', () => {
  libraryRef.style.display = 'block';
  headerRef.style.display = 'none';
  galleryContainer.innerHTML = '';
  const libraryWatched = document.querySelector('.library-queue');
  libraryWatched.addEventListener('click', () => {
    galleryContainer.innerHTML = '';

    async function getElement(arr, parent) {
      let itemElementList = await arr.reduce(async (acc, el) => {
        let list = await acc;
        const movieMarkup = await fetchInfoFilm(el, galleryItem);
        list += movieMarkup;
        return list;
      }, '');
      return parent.insertAdjacentHTML('afterbegin', itemElementList);
    }

    getElement(arrayQueueFilms, galleryContainer);

  });
});

homeBtn.addEventListener('click', () => {
  libraryRef.style.display = 'none';
  headerRef.style.display = 'block';
  fetchFilms(popularMoviesURL, updateMarkupGallery);
});

const addQueueFilms = movieId => {
  if (arrayQueueFilms.includes(movieId)) {
    const idFilm = arrayQueueFilms.indexOf(movieId);
    arrayQueueFilms.splice(idFilm, 1);

    localStorage.setItem('arrayQueueFilms', JSON.stringify(arrayQueueFilms));
    return;
  }
  arrayQueueFilms.push(movieId);
  localStorage.setItem('arrayQueueFilms', JSON.stringify(arrayQueueFilms));
};

export { addQueueFilms, arrayQueueFilms };
