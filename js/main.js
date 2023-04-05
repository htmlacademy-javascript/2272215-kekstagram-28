import { showErrorNotification } from './widgets/alert.js';
import { getPhotos } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { addFullImageFeatureToPictures } from './full-image.js';
import './image-upload-form.js';
import './scale.js';
import './effects.js';

getPhotos().then((photos) => {
  renderThumbnails(photos);
  addFullImageFeatureToPictures(photos);

}).catch((err) => {
  showErrorNotification(err);
});
