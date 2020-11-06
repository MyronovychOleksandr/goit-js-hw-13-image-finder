import css from "./css/style.css";
import refs from "./js/refs.js"
import debounce from "lodash.debounce"
import galleryTpl from "./js/galleryTpl.hbs"
import apiService from "./js/apiService.js"
import scroll from "./js/scroll.js"

refs.search.addEventListener('input', debounce((e) => {
    apiService.page = 1;
    if(e.target.value === "") {
        refs.gallery.innerHTML = '';
        refs.loadMoreBtn.classList.add('is-hidden')
        return;
    }
    
    apiService.query = e.target.value;
    apiService.toGetFetch()
    .then(data => {
        if(data.length >= 12) {
            refs.loadMoreBtn.classList.remove('is-hidden')
        } 
        refs.gallery.innerHTML = galleryTpl(data)
    })
}, 1500))

refs.loadMoreBtn.addEventListener('click', () => {
    
    apiService.setPage();
    refs.loadMoreBtn.disabled = true;
    apiService.toGetFetch().then(data => refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(data)))
    refs.loadMoreBtn.disabled = false;
    setTimeout(scroll, 1000)
})

