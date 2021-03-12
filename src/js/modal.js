import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
import { fetchInfoFilm } from './apiService';
import modalTpl from '../templates/modal.hbs';
import { addWatchedFilms, arrayWatchedFilms } from './localWatchedFilms';
import { addQueueFilms, arrayQueueFilms } from './localQueueFilms';
const selectedMovie = document.querySelector('.image-slider');

const showMovieModal = async movieId => {
  const movieMarkup = await fetchInfoFilm(movieId, modalTpl);
  const modal = basicLightbox.create(movieMarkup, {
    onShow: instance => {
      const watchedBtn = instance
        .element()
        .querySelector('.modal-info__btn-watched');
      instance.element().querySelector('.closeModalBtn').onclick =
        instance.close;
      if (arrayWatchedFilms.includes(movieId)) {
        watchedBtn.innerText = 'REMOVE FROM WATCHED';
        watchedBtn.classList.add('modal-info__btn--active');
      }

      watchedBtn.onclick = () => {
        addWatchedFilms(movieId);
        console.log(arrayWatchedFilms);
        if (watchedBtn.classList.contains('modal-info__btn--active')) {


          watchedBtn.innerText = 'ADD TO WATCHED';
          watchedBtn.classList.remove('modal-info__btn--active');
          return;
        }
        watchedBtn.innerText = 'REMOVE FROM WATCHED';
        watchedBtn.classList.add('modal-info__btn--active');
      };
      // ! Просмотреные фильмы
      const queueBtn = instance
        .element()
        .querySelector('.modal-info__btn-queue');
      if (arrayQueueFilms.includes(movieId)) {
        console.log(queueBtn);
        queueBtn.innerText = 'REMOVE FROM QUEUE';
        queueBtn.classList.add('modal-info__btn--active');
      }
      queueBtn.onclick = () => {
        addQueueFilms(movieId);
        console.log(arrayQueueFilms);
        if (queueBtn.classList.contains('modal-info__btn--active')) {
          queueBtn.innerText = 'ADD TO QUEUE';
          queueBtn.classList.remove('modal-info__btn--active');
          return;
        }
        queueBtn.innerText = 'REMOVE FROM QUEUE';
        queueBtn.classList.add('modal-info__btn--active');
      };

    },
  });
  modal.show();
  window.addEventListener('keydown', closeModal);
  function closeModal(event) {
    if (event.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModal);
    }
  }
};

selectedMovie.addEventListener('click', event => {
  if (event.target.parentNode.nodeName === 'LI')
    showMovieModal(event.target.parentNode.dataset.id);
});
