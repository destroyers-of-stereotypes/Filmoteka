import refs from './refs';
import message from './messages';
import galleryItem from '../templates/galleryItem.hbs';
import { fetchInfoFilm } from './apiService';

let arrayQueueFilms = [];
if (refs.localArrayQueueFilms) {
  arrayQueueFilms = JSON.parse(refs.localArrayQueueFilms);
}
refs.libraryQueueBtn.addEventListener('click', () => {
  refs.galleryContainer.innerHTML = '';
  async function getElement(arr, parent) {
    if (arr.length === 0){
        refs.galleryContainer.innerHTML = message.libraryQueue;
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
  getElement(arrayQueueFilms, refs.galleryContainer);
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
