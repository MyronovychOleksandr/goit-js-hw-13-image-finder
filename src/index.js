import css from "./css/style.css";
import refs from "./js/refs.js";
import debounce from "lodash.debounce";
import galleryTpl from "./js/galleryTpl.hbs";
import apiService from "./js/apiService.js";
import scroll from "./js/scroll.js";

window.addEventListener("scroll", function (e) {
  if (window.pageYOffset > 20) {
    refs.scrollUpBtn.classList.remove("is-hidden");
  } else {
    refs.scrollUpBtn.classList.add("is-hidden");
  }
});

refs.search.addEventListener(
  "input",
  debounce((e) => {
    refs.loadMoreBtn.classList.add("is-hidden");
    apiService.page = 1;
    if (e.target.value === "") {
      refs.gallery.innerHTML = "";
      return;
    }

    apiService.query = e.target.value;
    apiService.toGetFetch().then((data) => {
      if (data.length >= 12) {
        refs.loadMoreBtn.classList.remove("is-hidden");
      }
      refs.gallery.innerHTML = galleryTpl(data);
    });
  }, 1500),
);

refs.loadMoreBtn.addEventListener("click", () => {
  console.log();
  apiService.setPage();
  refs.loadMoreBtn.disabled = true;
  apiService.toGetFetch().then((data) => {
    if (data.length < 12) {
      refs.loadMoreBtn.classList.add("is-hidden");
    }
    refs.gallery.insertAdjacentHTML("beforeend", galleryTpl(data));
  });
  refs.loadMoreBtn.disabled = false;
  setTimeout(scroll.scrollPage, 1000);
});

refs.scrollUpBtn.addEventListener("click", scroll.scrollUp);
