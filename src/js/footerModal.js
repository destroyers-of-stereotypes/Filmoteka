import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
import footerTpl from '../templates/footerModal.hbs';
import refs from './refs';

refs.openFooterModal.addEventListener('click', showFooterModal);

function showFooterModal() {
  const modal = basicLightbox.create(footerTpl());
  modal.show();
  const closeModalByBtn = function (event) {
    if (event.target.nodeName === 'BUTTON') {
      modal.close();
    }
  };
  document
    .querySelector('.closeModalBtn')
    .addEventListener('click', closeModalByBtn);

  const closeModalByEsc = function (event) {
    if (event.code === 'Escape') {
      modal.close();
      window.removeEventListener('up', closeModalByEsc);
    }
  };
  window.addEventListener('keydown', closeModalByEsc);
}
