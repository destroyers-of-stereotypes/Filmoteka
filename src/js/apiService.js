import axios from 'axios';
import updateMarkupGallery from './updateMarkup';
import debounce from 'lodash.debounce';
import renderOnSearch from './renderOnSearch';
import genres from './genres';
import message from './messages';

// данные для запроса
const token = '6b8ef447c2ce3d010bfcc7f710d71588';
let page = 1;
let oldValueInput = '';
const popularMoviesURL = `https://api.themoviedb.org/3/trending/movie/day`;

//слушатели поиска
const inputSearch = document.querySelector('.search__input');
inputSearch.addEventListener('input', debounce(onSearch, 300));
const errorWarning = document.querySelector('.search__warning');
const searchOpen = document.querySelector('.search__container');
searchOpen.addEventListener('click', openInputSearch);
function openInputSearch() {
  inputSearch.classList.add('search__input--active');
}

//слушатели кнопок хедера
const homeBtn = document.querySelector('.library-home');
homeBtn.addEventListener('click', e => {
  resertPage();
  fetchFilms(popularMoviesURL, updateMarkupGallery)
})

const libraryBtn = document.querySelector('.my-library'); 
libraryBtn.addEventListener('click', e => {
  document.querySelector('.image-slider').innerHTML = 'Here you can store movies that you have already watched, or would like to view in the future.';
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
      errorWarning.textContent = message.notFound;
      return;
    }
    //то что было раньше - при загрузке страници все жанры отображались
    // const changeGenre = [...results].map(el => genresMovie(el));
    const changeGenre = [...results].map(el => genresMovieShort(el));
    page += 1;
    return renderListFilms(changeGenre, callbackTemplate);
  } catch (error) {
    if (error.response.status === 422) {
      errorWarning.textContent = message.incorrectQuery;
    }
    if (error.response.status >= 500) {
      errorWarning.textContent = message.serverError;
    } else {
      console.log(error);
    }
  }
};
//стартовый запрос популярных фильмов
fetchFilms(popularMoviesURL, updateMarkupGallery);

//вспомогательные функции
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
  document.querySelector('.image-slider').innerHTML = '';
}
//функция поиска по ключевому слову
function onSearch() {
  errorWarning.textContent = '';
  if (inputSearch.value.length >= 3) {
    if (inputSearch.value.length != oldValueInput.length) {
      resertPage();
    }
    oldValueInput = inputSearch.value;
    let searchQuery = inputSearch.value.trim();
    const searchMoviesURL = `https://api.themoviedb.org/3/search/movie`;
    fetchFilms(searchMoviesURL, renderOnSearch, searchQuery);
  }

  if (inputSearch.value.length > 0 && inputSearch.value.length < 3) {
    errorWarning.textContent = message.manyMatches;
    if (inputSearch.value.length > oldValueInput.length) {
      return;
    }
    if (inputSearch.value.length < oldValueInput.length) {
      resertPage();
      oldValueInput = '';
      fetchFilms(popularMoviesURL, updateMarkupGallery);
      return;
    }
    oldValueInput = inputSearch.value;
  }
  if (inputSearch.value === '') {
    fetchFilms(popularMoviesURL, updateMarkupGallery);
    return;
  }
}



//функция запроса информации о фильме
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
