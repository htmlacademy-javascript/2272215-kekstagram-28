import { createPhotos} from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { addFullImageFeatureToPictures } from './full-image.js';
import './image-upload-form.js';
import './scale.js';
import './effects.js';

const photos = createPhotos();
renderThumbnails(photos);
addFullImageFeatureToPictures(photos);
