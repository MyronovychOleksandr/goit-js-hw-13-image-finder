export default function scroll() {
    const a = window.innerHeight;
    window.scrollBy({
        top: a,
        behavior: 'smooth'
      });
}