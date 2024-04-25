import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export default function () {
  document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.hero__swiper', {
      modules: [Navigation],
      slidesPerView: 1,
      loop: true,
      effect: 'fade',
      spaceBetween: 30,
      navigation: {
        nextEl: '.hero__next.swiper-button-next',
        prevEl: '.hero__prev.swiper-button-prev',
      },
    });
  });
}
