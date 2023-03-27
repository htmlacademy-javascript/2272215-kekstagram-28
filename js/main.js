import { createPhotos} from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { addFullImageFeatureToPictures } from './full-image.js';

const photos = createPhotos();
renderThumbnails(photos);
addFullImageFeatureToPictures(photos);
