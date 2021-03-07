import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
import fetchInfoFilm from './apiService';
//========================================

console.log(`fetchInfoFilm: `, fetchInfoFilm());

// function getFilmInfo(movieIDs) {
//   fetchInfoFilm(movieID).then(data => {
//     const modal = basicLightbox.create(markupModal);
//   });
// }

// let movieID = 512896;

//=====================================
//=====================================
//=====================================
const cardIdRef = document.querySelector('#modal');
cardIdRef.addEventListener('click', openModal);

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'DIV') {
    return;
  }
  const filmId = event.target.dataset.id;
  const instance = basicLightbox.create(`fetchInfoFilm(filmId)`);
  // const instance = basicLightbox.create(markupModal);
  instance.show();
  // console.log(`filmId: `, filmId);
  // console.log(`fetchInfoFilm(filmId): `, fetchInfoFilm(filmId));
  // getFilmInfo(event.target.dataset.id);
  // console.log(`getFilmInfo: `, getFilmInfo(event.target.dataset.id));

  //=========close modal by Esc===============
  window.addEventListener('keydown', closeModal);
  function closeModal(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModal);
    }
  }

  //=========close modal by X-button===============
  const closeBtnModal = document.querySelector('.closeModalBtn');
  closeBtnModal.addEventListener('click', closeModalBtn);
  function closeModalBtn(event) {
    instance.close();
  }
}
