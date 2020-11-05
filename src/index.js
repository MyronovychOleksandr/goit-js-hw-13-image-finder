import css from "./css/style.css";
import refs from "./js/refs.js"
import debounce from "lodash.debounce"
import galleryTpl from "./js/galleryTpl.hbs"
import apiService from "./js/apiService.js"

apiService.toGetFetch();

refs.search.addEventListener('input', debounce((e) => {
    if(e.target.value === "") {
        refs.gallery.innerHTML = '';
        refs.loadMoreBtn.classList.add('is-hidden')
        return;
    }
    refs.loadMoreBtn.classList.remove('is-hidden')
    apiService.query = e.target.value;
    apiService.toGetFetch().then(data => refs.gallery.innerHTML = galleryTpl(data))

}, 1500))

refs.loadMoreBtn.addEventListener('click', () => {
    apiService.setPage();
    refs.loadMoreBtn.disabled = true;
    apiService.toGetFetch().then(data => refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(data)))
    refs.loadMoreBtn.disabled = false;
})