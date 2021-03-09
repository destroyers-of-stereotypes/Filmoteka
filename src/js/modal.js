import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
import { fetchInfoFilm } from './apiService';

const cardIdRef = document.querySelector('.image-slider');
// cardIdRef.addEventListener('click', showMovieModal);
console.log(`cardIdRef.getAttribute('data-id'): `, cardIdRef);
const showMovieModal = async movieId => {
  const movieMarkup = await fetchInfoFilm(movieId);
  const modal = basicLightbox.create(movieMarkup, {
    onShow: instance => {
      instance.element().querySelector('.closeModalBtn').onclick =
        instance.close;
    },
  });
  modal.show();
};
cardIdRef.addEventListener(
  'click',
  () => showMovieModal(cardIdRef.getAttribute('data-id')),
  // showMovieModal(512897),
);

//   //=========close modal by Esc===============
//   window.addEventListener('keydown', closeModal);
//   function closeModal(event) {
//     if (event.code === 'Escape') {
//       instance.close();
//       window.removeEventListener('keydown', closeModal);
//     }
//   }
