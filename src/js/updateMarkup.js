import gallery from '../js/templates/gallery.hbs';
import swiper from './components/swiper';

const galleryContainer = document.querySelector('.image-slider').swiper;

export default function updateMarkupGallery(data) {
  if (!data) {
    return console.log('ниче не пришло');
  }
  const markup = gallery(data);
  return galleryContainer.insertAdjacentHtml('beforeend', markup);
}

//  swiper.document.querySelector('.swiper-container').swiper;
