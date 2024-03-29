import { showErrorNotification } from './widgets/notification.js';
import { getPhotos } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { addFullImageFeatureToPictures } from './full-image.js';
import { addImageFiltersFeature } from './image-filters.js';
import './image-upload-form.js';
import './scale.js';
import './effects.js';

getPhotos().then((photos) => {
  renderThumbnails(photos);
  addFullImageFeatureToPictures(photos);
  addImageFiltersFeature(photos);

}).catch((err) => {
  showErrorNotification(err);
});
