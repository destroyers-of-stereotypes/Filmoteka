import axios from 'axios';
import updateMarkupGallery from './updateMarkup';
import debounce from 'lodash.debounce';
import renderOnSearch from './renderOnSearch';
import genres from './genres';
import message from './messages';
import refs from './refs'

// данные для запроса
const token = '6b8ef447c2ce3d010bfcc7f710d71588';
let page = 1;
let oldValueInput = '';
const popularMoviesURL = `https://api.themoviedb.org/3/trending/movie/day`;

//слушатели поиска
refs.inputSearch.addEventListener('input', debounce(onSearch, 300));
refs.searchOpen.addEventListener('click', openInputSearch);

//слушатели кнопок хедера
refs.homeBtn.addEventListener('click', e => {
  refs.inputSearch.classList.remove('search__input--active');
  resertPage();
  fetchFilms(popularMoviesURL, updateMarkupGallery)
})
refs.libraryBtn.addEventListener('click', e => {
  refs.galleryContainer.innerHTML = message.libraryMain;
})

//базовая функция запроса списка фильмов
const fetchFilms = async (moviesURL, callbackTemplate, searchQuery = '') => {
  try {
    console.log(page);
    const {
      data: { results },
    } = await axios.get(
      `${moviesURL}?api_key=${token}&page=${page}&query=${searchQuery}`,
    );
    console.log(results);
    if (results.length === 0) {
      refs.errorWarning.textContent = message.notFound;
      return;
    }
    const changeGenre = [...results].map(el => genresMovieShort(el));
    page += 1;
    return renderListFilms(changeGenre, callbackTemplate);
  } catch (error) {
    if (error.response.status === 422) {
      refs.errorWarning.textContent = message.incorrectQuery;
    }
    if (error.response.status >= 500) {
      refs.errorWarning.textContent = message.serverError;
    } else {
      console.log(error);
    }
  }
};
//стартовый запрос популярных фильмов
fetchFilms(popularMoviesURL, updateMarkupGallery);

//вспомогательные функции
//открытие поиска
function openInputSearch() {
  refs.inputSearch.classList.add('search__input--active');
}
//преобразование id жанров в названия
function genresMovieShort(element) {
  element.genre_ids = element.genre_ids
    .map(genreMovie => (genreMovie = genres[genreMovie]))
    .slice(0, 3)
    .join(', ');
  return element;
}
//передает результат запроса в шаблон
function renderListFilms(arrayFilms, template) {
  return template(arrayFilms);
}
//очищает страницу 
function resertPage (){
  page = 1;
  refs.galleryContainer.innerHTML = '';
}
//поиск по ключевому слову
function onSearch() {
  refs.errorWarning.textContent = '';
  if (refs.inputSearch.value.length >= 3) {
    if (refs.inputSearch.value.length != oldValueInput.length) {
      resertPage();
    }
    oldValueInput = refs.inputSearch.value;
    let searchQuery = refs.inputSearch.value.trim();
    const searchMoviesURL = `https://api.themoviedb.org/3/search/movie`;
    fetchFilms(searchMoviesURL, renderOnSearch, searchQuery);
  }

  if (refs.inputSearch.value.length > 0 && refs.inputSearch.value.length < 3) {
    refs.errorWarning.textContent = message.manyMatches;
    if (refs.inputSearch.value.length > oldValueInput.length) {
      return;
    }
    if (refs.inputSearch.value.length < oldValueInput.length) {
      resertPage();
      oldValueInput = '';
      fetchFilms(popularMoviesURL, updateMarkupGallery);
      return;
    }
    oldValueInput = refs.inputSearch.value;
  }
  if (refs.inputSearch.value === '') {
    fetchFilms(popularMoviesURL, updateMarkupGallery);
    return;
  }
}
//базовый запрос информации о фильме
const fetchInfoFilm = async (movieID, template) => {
  const infoMovieURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${token}`;
  try {
    const { data } = await axios.get(infoMovieURL);

    return template(data);
  } catch (error) {
    if (!error.response) {
      console.error(error);
      return;
    }
    if (error.response.status === 404) {
      console.error(message.notFound);
    }
    if (error.response.status >= 500) {
      console.error(message.serverError);
    }
  }
};

export { popularMoviesURL, fetchInfoFilm, fetchFilms, onSearch};
