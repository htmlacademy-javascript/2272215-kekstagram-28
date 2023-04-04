const INITIAL_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const loadComments = document.querySelector('.comments-loader');
const shownCommentsCountElement = document.querySelector('.shown-comments-count');

// Количество показанных комментариев
let shownCommentsCount = 0;

const addCloseButtonClickHandler = () => {
  const closeButton = document.querySelector('#picture-cancel');

  closeButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
};

const addEscapeClickHanlder = () => {
  document.addEventListener('keydown', (evt) => {
    if(bigPicture.classList.contains('hidden')) {
      return;
    }

    if(evt.code === 'Escape') {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};


const addSocialComments = (commentsToAdd) => {
  const socialComments = document.querySelector('.social__comments');

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

const updateLoadMoreComments = (allCommentsCount) => {
  if(shownCommentsCount >= allCommentsCount) {
    loadComments.style.display = 'none';
  }
};

const updateComments = (allComments) => {
  const allCommentsCount = allComments.length;
  const nextIndex = shownCommentsCount + INITIAL_COMMENTS_COUNT;
  const toAdd = nextIndex > allCommentsCount ? allCommentsCount - shownCommentsCount : INITIAL_COMMENTS_COUNT;

  const commentsToAdd = allComments.slice(shownCommentsCount, shownCommentsCount + toAdd);
  shownCommentsCount += toAdd;

  addSocialComments(commentsToAdd);
  updateLoadMoreComments(allCommentsCount);
  shownCommentsCountElement.textContent = shownCommentsCount;
};

const addLoadMoreCommentsButtonClickHandler = (allComments) => {
  loadComments.addEventListener('click', () => {
    updateComments(allComments);
  });
};

const fillBigPicture = (photo) => {
  const { url, likes, description, comments } = photo;

  const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
  const likesCount = document.querySelector('.likes-count');
  const commentsCount = document.querySelector('.comments-count');
  const socialCaption = document.querySelector('.social__caption');

  bigPicture.classList.remove('hidden');
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  shownCommentsCountElement.textContent = shownCommentsCount;
  socialCaption.textContent = description;

  addLoadMoreCommentsButtonClickHandler(comments);
  updateComments(comments);

  // чтобы контейнер с фотографиями позади не прокручивался при скролле
  document.body.classList.add('modal-open');
};

export const addFullImageFeatureToPictures = (photos) => {
  const picturesElement = document.querySelector('.pictures');

  addCloseButtonClickHandler();
  addEscapeClickHanlder();

  picturesElement.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if(!thumbnail) {
      return;
    }

    const photo = photos.find((p) => p.id === parseInt(thumbnail.dataset.thumbnailId, 10));

    if(photo) {
      fillBigPicture(photo);
    }
  });
};

