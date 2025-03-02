import { showModal } from './modal';
import { validateName, validateEmail, validatePhone, validateComment, validateCheckbox } from './validations';

const SUCCESS_MESSAGES = {
  nameValid: 'Имя введено правильно',
  emailValid: 'Email введен корректно',
  phoneValid: 'Телефон введен корректно',
  commentValid: 'Комментарий введен корректно',
};

const form = document.querySelector('.js-form');
const inputName = form.querySelector('[name="name"]');
const inputEmail = form.querySelector('[name="email"]');
const inputPhone = form.querySelector('[name="phone"]');
const inputComment = form.querySelector('[name="comment"]');
const inputAgree = form.querySelector('[name="agree"]');
const modalThanks = document.querySelector('[data-modal="success-submit-form"]');

const showError = (input, message) => {
  const inputContainer = input.closest('.input, .textarea, .checkbox');
  inputContainer.classList.add('--error');
  inputContainer.classList.remove('--success');
  const errorMessage = inputContainer.querySelector('.input__error, .textarea__error, .checkbox__error');
  if (errorMessage) errorMessage.textContent = message;
};

const showSuccess = (input, message) => {
  const inputContainer = input.closest('.input, .textarea, .checkbox');
  inputContainer.classList.remove('--error');
  inputContainer.classList.add('--success');
  const successMessage = inputContainer.querySelector('.input__success, .textarea__success, .checkbox__success');
  if (successMessage) successMessage.textContent = message;
};

const validateInput = (input) => {
  let validationResult;

  if (input.name === 'name') {
    validationResult = validateName({ target: input });
  } else if (input.name === 'email') {
    validationResult = validateEmail({ target: input });
  } else if (input.name === 'phone') {
    validationResult = validatePhone({ target: input });
  } else if (input.name === 'comment') {
    validationResult = validateComment({ target: input });
  } else if (input.name === 'agree') {
    validationResult = validateCheckbox({ target: input });
  }

  if (validationResult.isValid) {
    showSuccess(input, SUCCESS_MESSAGES[`${input.name}Valid`]);
    return true;
  }
  showError(input, validationResult.message);
  return false;
};

const clearForm = () => {
  [inputName, inputEmail, inputPhone, inputComment, inputAgree].forEach((input) => {
    input.value = '';
    const inputContainer = input.closest('.input, .textarea, .checkbox');
    inputContainer.classList.remove('--error', '--success');
    const errorMessage = inputContainer.querySelector('.input__error, .textarea__error, .checkbox__error');
    const successMessage = inputContainer.querySelector('.input__success, .textarea__success, .checkbox__success');

    if (errorMessage) errorMessage.textContent = '';
    if (successMessage) successMessage.textContent = '';
  });

  inputAgree.checked = false;
};

const submitForm = (e) => {
  e.preventDefault();

  const isNameValid = validateInput(inputName);
  const isEmailValid = validateInput(inputEmail);
  const isPhoneValid = validateInput(inputPhone);
  const isCommentValid = validateInput(inputComment);
  const isAgreeValid = validateInput(inputAgree);

  if (isNameValid && isEmailValid && isPhoneValid && isCommentValid && isAgreeValid) {
    showModal(modalThanks);
    clearForm();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  inputName.addEventListener('input', () => validateInput(inputName));
  inputEmail.addEventListener('input', () => validateInput(inputEmail));
  inputPhone.addEventListener('input', () => validateInput(inputPhone));
  inputComment.addEventListener('input', () => validateInput(inputComment));
  inputAgree.addEventListener('change', () => validateInput(inputAgree));

  form.addEventListener('submit', submitForm);
});
