import scrollTrigger from './vendors/scrollTrigger';
import header from './layout/header';

(() => {
  window.addEventListener('scroll', e => {
    header.handleScrollHeader();
  });

  window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('before-load');
  });

  header.handleScrollHeader();
  header.onMenuBtnClick();
  scrollTrigger.init();
})();