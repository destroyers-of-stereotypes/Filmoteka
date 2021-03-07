import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
import fetchInfoFilm from './apiService';
//========================================

function getFilmInfo(movieID) {
  fetchInfoFilm(movieID).then(dataMovie => {
    const cardMovie = updateMarkup(dataMovie);
    const modal = basicLightbox.create(cardMovie);

    modal.show();
    window.addEventListener('keydown', closeModalByEscape);
    function closeModalByEscape(event) {
      if (event.code === 'Escape') {
        modal.close();
      }
    }
  });
}

const cardIdRef = document.querySelector('#modal');
cardIdRef.addEventListener('click', openModal);
function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'DIV') {
    return;
  }
  const instance = basicLightbox.create(`fetchInfoFilm()`);
  getFilmInfo(event.target.dataset.id);

  window.addEventListener('keydown', closeModal);
  const closeBtnModal = document.querySelector('.closeBtnModal');
  closeBtnModal.addEventListener('click', closeModalBtn);

  function closeModal(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModal);
    }
  }
  function closeModalBtn(event) {
    instance.close();
  }
}
