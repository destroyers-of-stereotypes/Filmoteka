export default {
    inputSearch: document.querySelector('.search__input'),
    errorWarning: document.querySelector('.search__warning'),
    searchOpen: document.querySelector('.search__container'),
    homeBtn: document.querySelector('.library-home'),
    libraryBtn: document.querySelector('.my-library'),
    headerRef: document.querySelector('.main-page'),
    libraryRef: document.querySelector('.library-page'),
    libraryWatchedBtn: document.querySelector('.library-watched'),
    libraryQueueBtn: document.querySelector('.library-queue'),
    localArrayWatchedFilms: localStorage.getItem('arrayWatchedFilms'),
    localArrayQueueFilms: localStorage.getItem('arrayQueueFilms'),
    galleryContainer: document.querySelector('.image-slider'),
    openFooterModal: document.querySelector('#footer-modal'),
    
}