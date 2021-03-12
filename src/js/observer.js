import {onSearch} from './apiService';

export default function contentObserver(element){
  const options = {
    rootMargin: '100px',
  };
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onSearch()
      }
    });
  }, options);


  io.observe(element)

}