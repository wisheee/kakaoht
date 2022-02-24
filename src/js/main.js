import scrollTrigger from './scrollTrigger';

(() => {
  // elements
  const header = document.querySelector('header');
  const menuBtn = document.querySelector('.js-menu-btn');
  const navMenu = document.querySelector('.js-nav-menu');
  const MENU_ACTIVE_CLASS = 'side-menu-open';

  function handleScrollHeader() {
    if (window.pageYOffset < 1) {
      header.classList.remove('moving');
      return;
    }

    header.classList.add('moving');
  }

  menuBtn.addEventListener('click', () => {
    if (document.body.classList.contains(MENU_ACTIVE_CLASS)) {
      document.body.classList.remove(MENU_ACTIVE_CLASS)
    } else {
      document.body.classList.add(MENU_ACTIVE_CLASS)
    }
  });

  window.addEventListener('scroll', e => {
    handleScrollHeader();
  });

  window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('before-load');
  });

  handleScrollHeader();
  scrollTrigger.init();
})();