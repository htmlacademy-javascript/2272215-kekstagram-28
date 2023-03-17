const createThumbnailElement = (photo) => {
  const pictureTemplateContent = document.querySelector('#picture').content;
  const thumbnailElement = pictureTemplateContent.cloneNode(true);

  // image
  const imgElement = thumbnailElement.querySelector('.picture__img');
  imgElement.src = photo.url;

  // likes
  const likeElement = thumbnailElement.querySelector('.picture__likes');
  likeElement.textContent = photo.likes;

  // comments
  const commentsElement = thumbnailElement.querySelector('.picture__comments');
  commentsElement.textContent = photo.comments.length;

  return thumbnailElement;
};

export const renderThumbnails = (photos) => {
  const picturesElement = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnailElement = createThumbnailElement(photo);
    fragment.appendChild(thumbnailElement);
  });

  picturesElement.appendChild(fragment);
};
