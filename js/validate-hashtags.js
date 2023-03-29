import { declOfNum, hasDuplicates } from './utils.js';

const MAX_HASHTAGS_COUNT = 5;
const HASHTAGS_REGEXP = /^#[a-zа-яё0-8]{1,19}$/i;

const errorMessages = {
  maxHashtagsCount: `Можно указать не более ${MAX_HASHTAGS_COUNT} ${declOfNum(MAX_HASHTAGS_COUNT, ['хэш-тега', 'хэш-тегов', 'хэш-тега'])}`,
  noMatch: 'Хэш-тег должен начинаться с символа #, может содержать только латинские и русские символы, цифры и его длина не должна быть более 20-ти символов',
  noUnique: 'Хэш-тег не может быть использован более одного раза',
};

let errorMessage = '';

const validateHashtags = (value) => {
  errorMessage = '';
  const hashtags = value.trim().split(' ').filter((hashtag) => hashtag);

  // Проверка на количество хэш-тегов
  if(hashtags.length > MAX_HASHTAGS_COUNT) {
    errorMessage = errorMessages.maxHashtagsCount;
    return false;
  }

  // Проверка на допустимые символы
  const atLeastOneNoMatch = hashtags.some((hashtag) => !hashtag.match(HASHTAGS_REGEXP));
  if(atLeastOneNoMatch) {
    errorMessage = errorMessages.noMatch;
    return false;
  }

  // Проверка на уникальность
  if(hasDuplicates(hashtags)) {
    errorMessage = errorMessages.noUnique;
    return false;
  }

  return true;
};

const getValidationHashtagsMessage = () => (errorMessage);

export { validateHashtags, getValidationHashtagsMessage };
