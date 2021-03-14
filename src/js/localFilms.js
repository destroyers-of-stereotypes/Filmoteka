import refs from './refs';
import message from './messages';
import galleryItem from '../templates/galleryItem.hbs';
import { fetchInfoFilm } from './apiService';

let arrayQueueFilms = [];
let arrayWatchedFilms = [];

if (refs.localArrayQueueFilms) {
  arrayQueueFilms = JSON.parse(refs.localArrayQueueFilms);
}
if (refs.localArrayWatchedFilms) {
  arrayWatchedFilms = JSON.parse(refs.localArrayWatchedFilms);
}

refs.libraryBtn.addEventListener('click', () => {
  refs.libraryRef.style.display = 'block';
  refs.headerRef.style.display = 'none';
});
refs.homeBtn.addEventListener('click', () => {
  refs.libraryRef.style.display = 'none';
  refs.headerRef.style.display = 'block';
});

refs.libraryQueueBtn.addEventListener('click', contentLibraryQueue)
refs.libraryWatchedBtn.addEventListener('click', contentLibraryWatched)

function contentLibraryQueue () {
  refs.galleryContainer.innerHTML = '';
  getElement(arrayQueueFilms, refs.galleryContainer, message.libraryQueue);
}

function contentLibraryWatched () {
  refs.galleryContainer.innerHTML = '';
  getElement(arrayWatchedFilms, refs.galleryContainer, message.libraryWatched);
}

async function getElement(arr, parent, message) {
  if (arr.length === 0){
    refs.galleryContainer.innerHTML = message;
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

function addFilms  (movieId, arr, localKey) {
  if (arr.includes(movieId)) {
    const idFilm = arr.indexOf(movieId);
    arr.splice(idFilm, 1);
    localStorage.setItem(localKey, JSON.stringify(arr));
    return;
  }
  arr.push(movieId);
  localStorage.setItem(localKey, JSON.stringify(arr));
};

export { addFilms, arrayQueueFilms, arrayWatchedFilms };

