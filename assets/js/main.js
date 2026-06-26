'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');
  const menuLinks = document.querySelectorAll('.main-nav a');

  const closeMenu = () => {
    menuButton?.classList.remove('is-open');
    menu?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const opened = menuButton.classList.toggle('is-open');
    menu?.classList.toggle('is-open', opened);
    menuButton.setAttribute('aria-expanded', String(opened));
    document.body.classList.toggle('menu-open', opened);
  });

  menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  let heroSwiper = null;
  if (typeof Swiper !== 'undefined') {
    heroSwiper = new Swiper('.hero-swiper', {
      loop: true,
      speed: 900,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: { delay: 6200, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: '.hero-pagination', clickable: true },
      navigation: { nextEl: '.hero-arrow--next', prevEl: '.hero-arrow--prev' },
      keyboard: { enabled: true },
      a11y: {
        prevSlideMessage: 'Slide anterior',
        nextSlideMessage: 'Próximo slide',
        paginationBulletMessage: 'Ir para o slide {{index}}'
      }
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: reducedMotion ? 0 : 720,
      once: true,
      offset: 70,
      easing: 'ease-out-cubic',
      disable: reducedMotion
    });
  }

  const modal = document.querySelector('#gallery-modal');
  const modalImage = document.querySelector('#gallery-modal-image');
  const closeModal = document.querySelector('.gallery-modal__close');

  document.querySelectorAll('[data-gallery]').forEach((item) => {
    item.addEventListener('click', () => {
      if (!modal || !modalImage) return;
      modalImage.src = item.dataset.gallery;
      modal.showModal();
    });
  });

  closeModal?.addEventListener('click', () => modal?.close());
  modal?.addEventListener('click', (event) => {
    const bounds = modal.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) modal.close();
  });

  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeMenu();
    heroSwiper?.update();
  });
});
