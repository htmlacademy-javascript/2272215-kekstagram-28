const INITIAL_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const socialComments = document.querySelector('.social__comments');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const shownCommentsCountElement = document.querySelector('.shown-comments-count');
const loadComments = document.querySelector('.comments-loader');
const socialCaption = document.querySelector('.social__caption');
const closeButton = document.querySelector('#picture-cancel');

// Количество показанных комментариев
let shownCommentsCount = 0;
// Комментарии выбранного фото
let selectedPhotoComments = [];

const onCloseButtonClick = () => {
  closeModal();
};

const onEscapeKeydown = (evt) => {
  if(evt.code === 'Escape') {
    closeModal();
  }
};

const addSocialComments = (commentsToAdd) => {
  commentsToAdd.forEach((comment) => {
    const { name, avatar, message } = comment;
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');

    const socialPicture = document.createElement('img');
    socialPicture.classList.add('social__picture');
    socialPicture.src = avatar;
    socialPicture.alt = name;
    socialPicture.width = 35;
    socialPicture.height = 35;

    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = message;

    socialComment.append(socialPicture, socialText);
    socialComments.append(socialComment);
  });
};

const updateLoadMoreComments = () => {
  if(shownCommentsCount >= selectedPhotoComments.length) {
    loadComments.style.display = 'none';
  }
};

const updateComments = () => {
  const allCommentsCount = selectedPhotoComments.length;
  const nextIndex = shownCommentsCount + INITIAL_COMMENTS_COUNT;
  const toAdd = nextIndex > allCommentsCount ? allCommentsCount - shownCommentsCount : INITIAL_COMMENTS_COUNT;

  const commentsToAdd = selectedPhotoComments.slice(shownCommentsCount, shownCommentsCount + toAdd);
  shownCommentsCount += toAdd;

  addSocialComments(commentsToAdd);
  updateLoadMoreComments();
  shownCommentsCountElement.textContent = shownCommentsCount;
};

const onLoadCommentsButtonClick = () => {
  updateComments();
};

function closeModal () {
  shownCommentsCount = 0;
  selectedPhotoComments = [];
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialComments.innerHTML = '';
  loadComments.style.display = 'block';

  loadComments.removeEventListener('click', onLoadCommentsButtonClick);
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscapeKeydown);
}

const openModal = (photo) => {
  const { url, likes, description, comments } = photo;
  shownCommentsCount = 0;
  selectedPhotoComments = comments;

  bigPicture.classList.remove('hidden');
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  shownCommentsCountElement.textContent = shownCommentsCount;
  socialCaption.textContent = description;

  updateComments();

  loadComments.addEventListener('click', onLoadCommentsButtonClick);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscapeKeydown);

  // чтобы контейнер с фотографиями позади не прокручивался при скролле
  document.body.classList.add('modal-open');
};

export const addFullImageFeatureToPictures = (photos) => {
  const picturesElement = document.querySelector('.pictures');

  picturesElement.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if(!thumbnail) {
      return;
    }

    const photo = photos.find((p) => p.id === parseInt(thumbnail.dataset.thumbnailId, 10));

    if(photo) {
      openModal(photo);
    }
  });
};

