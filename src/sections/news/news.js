import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export default function () {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 599) {
      new Swiper('.news__wrapper', {
        modules: [Navigation],
        slidesPerView: 1,
        loop: false,
        navigation: {
          nextEl: '.news__next.swiper-button-next',
          prevEl: '.news__prev.swiper-button-prev',
        },
      });
    }
  });
}
