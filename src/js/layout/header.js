// elements
const header = document.querySelector('header');
const menuBtn = document.querySelector('.js-menu-btn');
const MENU_ACTIVE_CLASS = 'side-menu-open';

// 스크롤 위치에 따른 header 처리
const handleScrollHeader = () => {
  if (window.pageYOffset < 1) {
    header.classList.remove('moving');
    return;
  }

  header.classList.add('moving');
}

// 메뉴 버튼 클릭 이벤트(모바일 버전)
const onMenuBtnClick = () => {
  menuBtn.addEventListener('click', () => {
    if (document.body.classList.contains(MENU_ACTIVE_CLASS)) {
      document.body.classList.remove(MENU_ACTIVE_CLASS)
    } else {
      document.body.classList.add(MENU_ACTIVE_CLASS)
    }
  });
}

export default {
  handleScrollHeader,
  onMenuBtnClick
}