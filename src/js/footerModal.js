import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';

import footerTpl from '../templates/footerModal.hbs';

const openFooterModal = document.querySelector('#footer-modal');
openFooterModal.addEventListener('click', showFooterModal);

function showFooterModal() {
  const modal = basicLightbox.create(footerTpl());
  console.log(`modal`, modal);
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
      window.removeEventListener('keydown', closeModalEsc);
    }
  };
  document.addEventListener('keydown', closeModalByEsc);
}
