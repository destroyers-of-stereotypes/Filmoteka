// '../sass/main.scss';
import modalTpl from '../templates/modal.hbs';

function updateMarkup(film) {
  const markup = modalTpl(film);
  return markup;
}
// console.log(updateModal(512896));
// console.log(updateModal);

export default updateMarkup;
