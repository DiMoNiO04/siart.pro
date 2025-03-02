const closeModalBtns = document.querySelectorAll('.js-close-modal');
const { body } = document;

export const showModal = (modal) => {
  modal.classList.add('--open');
  body.classList.add('no-scroll');
};

export const closeModal = (modal) => {
  modal.classList.remove('--open');
  body.classList.remove('no-scroll');
};

closeModalBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const modal = e.target.closest('.modal');
    closeModal(modal);
  });
});
