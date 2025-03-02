const handleCart = () => {
  const cards = document.querySelectorAll('.js-card');

  cards.forEach((card) => {
    const cartButton = card.querySelector('.js-card-cart');
    const countSection = card.querySelector('.js-card-counts');
    const countIncrease = card.querySelector('.js-card-counts-increase');
    const countDecrease = card.querySelector('.js-card-counts-decrease');
    const countDisplay = card.querySelector('.js-card-count');

    const updateCart = (isIncrease) => {
      const currentCount = parseInt(countDisplay.textContent, 10);
      const newCount = isIncrease ? currentCount + 1 : currentCount - 1;

      if (newCount >= 1) {
        countDisplay.textContent = newCount;
        const action = isIncrease ? 'добавлен' : 'удален';
        alert(`Товар ${action} в корзину\nКоличество: ${newCount}`);
      } else {
        countSection.classList.remove('--active');
        cartButton.classList.add('--active');
        alert('Товар удален из корзины');
      }
    };

    cartButton.addEventListener('click', (e) => {
      e.preventDefault();
      cartButton.classList.remove('--active');
      countSection.classList.add('--active');
      countDisplay.textContent = 1;
      alert('Товар добавлен в корзину\nКоличество: 1');
    });

    countIncrease.addEventListener('click', (e) => {
      e.preventDefault();
      updateCart(true);
    });

    countDecrease.addEventListener('click', (e) => {
      e.preventDefault();
      updateCart(false);
    });
  });
};

document.addEventListener('DOMContentLoaded', handleCart);
