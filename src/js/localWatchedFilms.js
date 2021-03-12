const libraryBtn = document.querySelector('.my-library');
const homeBtn = document.querySelector('.library-home');
const libraryRef = document.querySelector('.library-page');
const headerRef = document.querySelector('.main-page');
const modalRef = document.querySelector('.modal');
const galleryContainer = document.querySelector('.image-slider');
import updateMarkupGallery from './updateMarkup';
import galleryItem from '../templates/galleryItem.hbs';

import { popularMoviesURL, fetchInfoFilm, fetchFilms } from './apiService';

let arrayWatchedFilms = [];
const localArrayWatchedFilms = localStorage.getItem('arrayWatchedFilms');
if (localArrayWatchedFilms) {
  arrayWatchedFilms = JSON.parse(localArrayWatchedFilms);
}

libraryBtn.addEventListener('click', () => {
  libraryRef.style.display = 'block';
  headerRef.style.display = 'none';
  const libraryWatched = document.querySelector('.library-watched');
  libraryWatched.addEventListener('click', () => {
    galleryContainer.innerHTML = '';
    async function getElement(arr, parent) {
    if (arr.length === 0){
      galleryContainer.innerHTML = 'We cannot find anything in the bookmarks for this request';
      return;
    }
     galleryContainer.innerHTML = '';
      let itemElementList = await arr.reduce(async (acc, el) => {
        let list = await acc;
        const movieMarkup = await fetchInfoFilm(el, galleryItem);
        list += movieMarkup;
        return list;
      }, '');
      return parent.insertAdjacentHTML('afterbegin', itemElementList);
    }
    getElement(arrayWatchedFilms, galleryContainer);
  });
});

homeBtn.addEventListener('click', () => {
  libraryRef.style.display = 'none';
  headerRef.style.display = 'block';
});

const addWatchedFilms = movieId => {
  if (arrayWatchedFilms.includes(movieId)) {
    const idFilm = arrayWatchedFilms.indexOf(movieId);
    arrayWatchedFilms.splice(idFilm, 1);

    localStorage.setItem('arrayWatchedFilms', JSON.stringify(arrayWatchedFilms));
    return;
  }
  arrayWatchedFilms.push(movieId);
  localStorage.setItem('arrayWatchedFilms', JSON.stringify(arrayWatchedFilms));
};

export { addWatchedFilms, arrayWatchedFilms };

