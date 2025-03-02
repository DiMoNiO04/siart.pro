const ERROR_MESSAGES = {
  required: 'Обязательное поле для заполнения',
  invalidCharacters: 'Поле должно содержать только буквы',
  invalidEmail: 'Некорректный email',
  invalidPhone: 'Некорректный номер телефона',
  requiredCheckbox: 'Необходимо согласие с условиями',
};

export const validateName = (e) => {
  const nameValue = e.target.value.trim();
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;

  let message = '';
  let isValid = true;

  if (nameValue.length === 0) {
    message = ERROR_MESSAGES.required;
    isValid = false;
  } else if (!nameRegex.test(nameValue)) {
    message = ERROR_MESSAGES.invalidCharacters;
    isValid = false;
  }

  return { message, isValid };
};

export const validateEmail = (e) => {
  const emailValue = e.target.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let message = '';
  let isValid = true;

  if (emailValue.length === 0) {
    message = ERROR_MESSAGES.required;
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    message = ERROR_MESSAGES.invalidEmail;
    isValid = false;
  }

  return { message, isValid };
};

export const validatePhone = (e) => {
  const phoneValue = e.target.value.trim();
  const phoneRegex = /^(?:\+375|375|80)(?:\s?)(29|33|44|25)(?:\s?)(\d{3})(?:\s?)(\d{2})(?:\s?)(\d{2})$/;

  let message = '';
  let isValid = true;

  if (phoneValue.length === 0) {
    message = ERROR_MESSAGES.required;
    isValid = false;
  } else if (!phoneRegex.test(phoneValue)) {
    message = ERROR_MESSAGES.invalidPhone;
    isValid = false;
  }

  return { message, isValid };
};

export const validateComment = (e) => {
  const commentValue = e.target.value.trim();
  let message = '';
  let isValid = true;

  if (commentValue.length === 0) {
    message = ERROR_MESSAGES.required;
    isValid = false;
  }

  return { message, isValid };
};

export const validateCheckbox = (e) => {
  const isChecked = e.target.checked;
  let message = '';
  let isValid = true;

  if (!isChecked) {
    message = ERROR_MESSAGES.required;
    isValid = false;
  }

  return { message, isValid };
};
