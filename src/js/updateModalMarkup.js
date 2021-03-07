// '../sass/main.scss';
import modalTpl from '../templates/modal.hbs';

function updateModalMarkup(data) {
  const markup = modalTpl(data);
  return markup;
}

export default updateModalMarkup;
