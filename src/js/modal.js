import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
import { fetchInfoFilm } from './apiService';
import modalTpl from '../templates/modal.hbs';
import { addFilms, arrayQueueFilms, arrayWatchedFilms } from './localFilms';
import refs from './refs';

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
        let watchedLocalKey = 'arrayWatchedFilms';
        addFilms(movieId, arrayWatchedFilms, watchedLocalKey)
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
        queueBtn.innerText = 'REMOVE FROM QUEUE';
        queueBtn.classList.add('modal-info__btn--active');
      }
      queueBtn.onclick = () => {
        let queueLocalKey = 'arrayQueueFilms';
        addFilms(movieId, arrayQueueFilms, queueLocalKey)
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
refs.galleryContainer.addEventListener('click', event => {
  if (event.target.parentNode.nodeName === 'LI')
    showMovieModal(event.target.parentNode.dataset.id);
});
