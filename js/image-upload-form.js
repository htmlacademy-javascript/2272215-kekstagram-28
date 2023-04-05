import { validateHashtags, getValidationHashtagsMessage } from './validate-hashtags.js';
import { validateComment, getValidationCommentMessage } from './validate-comment.js';
import { sendPhoto } from './data.js';
import { clearEffects } from './effects.js';
import { clearScale } from './scale.js';
import { showSuccessModal } from './widgets/alert.js';

const form = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const modal = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const sendButton = document.querySelector('#upload-submit');
const hashtags = document.querySelector('.text__hashtags');
const comments = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeKeydown);
};

const hideModal = () => {
  uploadFileInput.value = '';
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKeydown);
  form.reset();
  pristine.reset();
};

const onUploadFileChange = () => {
  showModal();
};

const onUploadCancelClick = () => {
  hideModal();
};

function onEscapeKeydown(evt) {
  const hashtagsFocused = document.activeElement === hashtags;
  const commentsFocused = document.activeElement === comments;

  if(hashtagsFocused || commentsFocused) {
    return;
  }

  if(evt.code === 'Escape') {
    hideModal();
  }
}

const blockSendButton = () => {
  sendButton.disabled = true;
};

const unblockSendButton = () => {
  sendButton.disabled = false;
};

pristine.addValidator(hashtags, validateHashtags, getValidationHashtagsMessage);
pristine.addValidator(comments, validateComment, getValidationCommentMessage);

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if(isValid) {
    blockSendButton();

    try {
      await sendPhoto(new FormData(evt.target));

      hideModal();
      clearEffects();
      clearScale();

      showSuccessModal();
    } catch(err) {
      // eslint-disable-next-line
    }

    unblockSendButton();
  }
};

uploadFileInput.addEventListener('change', onUploadFileChange);
uploadCancel.addEventListener('click', onUploadCancelClick);
form.addEventListener('submit', onFormSubmit);
