import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
import searchMovie from './searchMovie';
// import fetchInfoFilm from './apiService';
import updateMarkup from './updateMarkup';
// ('../sass/main.scss');
//========================================

function getFilmInfo(movie_id) {
  // fetchInfoFilm(movieID).then(dataMovie => {

  searchMovie(movie_id).then(dataMovie => {
    const cardMovie = updateMarkup(dataMovie);
    const modal = basicLightbox.create(cardMovie);
    // const cartFilm = updateMarkup(film);
    // const modal = basicLightbox.create(cartFilm);
    // modal.onclick = modal.show();
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
  basicLightbox.create(updateMarkup());
  getFilmInfo(event.target.dataset.id);
}
