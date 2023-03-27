const bigPicture = document.querySelector('.big-picture');

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

const addSocialComments = (comments) => {
  const socialComments = document.querySelector('.social__comments');
  socialComments.innerHTML = '';

  comments.forEach((comment) => {
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
  socialCaption.textContent = description;

  addSocialComments(comments);

  // чтобы контейнер с фотографиями позади не прокручивался при скролле
  document.body.classList.add('modal-open');

  // скрываем временно блоки
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
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

