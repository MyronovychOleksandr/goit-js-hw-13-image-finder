export default {
  scrollPage() {
    const a = window.innerHeight;
    window.scrollBy({
      top: a,
      behavior: "smooth",
    });
  },

  scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
};
