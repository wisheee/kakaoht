import scrollTrigger from './scrollTrigger';

(() => {
  // elements
  const header = document.querySelector('header');

  function handleScrollHeader() {
    if (window.pageYOffset < 1) {
      header.classList.remove('moving');
      return;
    }

    header.classList.add('moving');
  }

  window.addEventListener('scroll', e => {
    handleScrollHeader();
  });

  window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('before-load');
  });

  handleScrollHeader();
  scrollTrigger.init();
})();