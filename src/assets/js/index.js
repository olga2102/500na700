import { Fancybox } from '@fancyapps/ui';
import Inputmask from 'maskedinput';
import sectionHero from '../../sections/hero/hero.js';
import sectionFaq from '../../sections/faq/faq.js';
import sectionNews from '../../sections/news/news.js';
// import $ from 'jquery';

import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'swiper/css/bundle';

Fancybox.bind('[data-fancybox]', {
  on: {
    init: () => {
      Inputmask('+7(999)999-99-99').mask('input[type="tel"]');
    },
  },
});

Inputmask('+7(999)999-99-99').mask('input[type="tel"]');

const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
const body = document.querySelector('body');

headerBurger.addEventListener('click', () => {
  headerBurger.classList.toggle('active');
  headerMenu.classList.toggle('active');
  body.classList.toggle('overflow');
});

if (window.innerWidth < 991) {
  const menuItems = document.querySelectorAll('.header__menu-item--hassubmenu');
  console.log(menuItems);
  menuItems.forEach((e) => {
    e.addEventListener('click', function () {
      const menuList = this.querySelector('.header__submenu-list');
      menuList.classList.toggle('active');
    });
  });
}

sectionHero();
sectionFaq();
sectionNews();
