const createThumbnailElement = (photo) => {
  const { id: photoId, url, description, likes, comments } = photo;
  const pictureTemplateContent = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnail = pictureTemplateContent.cloneNode(true);

  const pictureImage = thumbnail.querySelector('.picture__img');
  const pictureLikes = thumbnail.querySelector('.picture__likes');
  const commentsElement = thumbnail.querySelector('.picture__comments');

  pictureImage.src = url;
  pictureImage.alt = description;
  pictureLikes.textContent = likes;
  commentsElement.textContent = comments.length;
  thumbnail.dataset.thumbnailId = photoId;

  return thumbnail;
};

const removeThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => thumbnail.remove());
};

export const renderThumbnails = (photos) => {
  removeThumbnails();

  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnailElement(photo);
    fragment.appendChild(thumbnail);
  });

  pictures.appendChild(fragment);
};
