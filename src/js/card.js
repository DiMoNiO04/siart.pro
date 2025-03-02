const CLASS_COMPARISON_BTN = '.js-toggle-comparison';
const CLASS_LIKE_BTN = '.js-toggle-like';
const CLASS_QUICK_VIEW = '.js-quick-view-card';

const BODY = document.body;

const toggleClickBtn = (buttonClass) => {
  BODY.addEventListener('click', (e) => {
    const btn = e.target.closest(buttonClass);

    if (btn) {
      e.preventDefault();
      btn.classList.toggle('--active');
    }
  });
};

const quickViewCard = () => {
  BODY.addEventListener('click', (e) => {
    const btn = e.target.closest(CLASS_QUICK_VIEW);

    if (btn) {
      e.preventDefault();
      alert('Быстрый промотр карточки');
    }
  });
};

window.addEventListener('DOMContentLoaded', () => {
  toggleClickBtn(CLASS_COMPARISON_BTN);
  toggleClickBtn(CLASS_LIKE_BTN);

  quickViewCard();
});
