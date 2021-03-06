import updateMarkupGallery from './updateMarkup';

const token = '6b8ef447c2ce3d010bfcc7f710d71588';
let page = 1;
const baseURL = `api_key=${token}&page=${page}`;
const popularMoviesURL = `https://api.themoviedb.org/3/trending/movie/day?${baseURL}`;
const genres = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

function fetchMyFilms() {
  return fetch(popularMoviesURL)
    .then(res => res.json())
    .then(({ results }) => {
      return [...results].map(el => {
        el.genre_ids = el.genre_ids.map(genreMovie => (genreMovie = genres[genreMovie])).join(',');
        page += 1;
        console.log(el);
        return el;
      });
    })
    .catch(error => console.log('ERROR', error));
}

// function genresMovie(element) {
//   element.genre_ids
//     .map(genreMovie => (genreMovie = genres[genreMovie]))
//     .join(',');
//   return element;
// }

function fetchGallery() {
  fetchMyFilms().then(films => {
    updateMarkupGallery(films);
  });
}

export default fetchGallery;
