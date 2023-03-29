import { declOfNum } from './utils.js';

const MAX_COMMENT_COUNT = 140;

const errorMessages = {
  maxCommentCount: `Текст комментария не может быть более ${MAX_COMMENT_COUNT} ${declOfNum(MAX_COMMENT_COUNT, ['символа', 'символов', 'символов'])}`,
};

let errorMessage = '';

const validateComment = (value) => {
  errorMessage = '';

  if(value.length > MAX_COMMENT_COUNT) {
    errorMessage = errorMessages.maxCommentCount;
    return false;
  }

  return true;
};

const getValidationCommentMessage = () => (errorMessage);

export { validateComment, getValidationCommentMessage };
