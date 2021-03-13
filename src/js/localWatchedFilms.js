import refs from './refs';
import message from './messages';
import galleryItem from '../templates/galleryItem.hbs';
import { fetchInfoFilm } from './apiService';

let arrayWatchedFilms = [];
if (refs.localArrayWatchedFilms) {
  arrayWatchedFilms = JSON.parse(refs.localArrayWatchedFilms);
}

refs.libraryBtn.addEventListener('click', () => {
  refs.libraryRef.style.display = 'block';
  refs.headerRef.style.display = 'none';
});

refs.libraryWatchedBtn.addEventListener('click', () => {
  refs.galleryContainer.innerHTML = '';
  async function getElement(arr, parent) {
  if (arr.length === 0){
    refs.galleryContainer.innerHTML = message.libraryWatched;
    return;
  }
   refs.galleryContainer.innerHTML = '';
    let itemElementList = await arr.reduce(async (acc, el) => {
      let list = await acc;
      const movieMarkup = await fetchInfoFilm(el, galleryItem);
      list += movieMarkup;
      return list;
    }, '');
    return parent.insertAdjacentHTML('afterbegin', itemElementList);
  }
  getElement(arrayWatchedFilms, refs.galleryContainer);
});

refs.homeBtn.addEventListener('click', () => {
  refs.libraryRef.style.display = 'none';
  refs.headerRef.style.display = 'block';
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

