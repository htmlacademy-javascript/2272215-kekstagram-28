import { renderThumbnails } from './thumbnails.js';
import { generateRandomUniqueNumbers, debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

const ImageFilterIds = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imgFiltersElement = document.querySelector('.img-filters');
const defaultFilterButton = imgFiltersElement.querySelector('#filter-default');
const randomFilterButton = imgFiltersElement.querySelector('#filter-random');
const discussedFilterButton = imgFiltersElement.querySelector('#filter-discussed');
const activeFilterButtonClassName = 'img-filters__button--active';

let activeFilterId = ImageFilterIds.DEFAULT;
let photos = [];

const addImageFiltersFeature = (serverPhotos = []) => {
  photos = serverPhotos;
  imgFiltersElement.classList.remove('img-filters--inactive');
};

const renderPhotos = (filterId) => {
  let filteredPhotos = [];

  if(filterId === ImageFilterIds.DEFAULT) {
    filteredPhotos = photos;
  } else if(filterId === ImageFilterIds.RANDOM) {
    if(RANDOM_PHOTOS_COUNT <= photos.length) {
      // Учитываем, что id фоток равно индексам массива фоток
      const randomIds = generateRandomUniqueNumbers(RANDOM_PHOTOS_COUNT, photos.length - 1);

      filteredPhotos = randomIds
        .map((id) => photos.find((photo) => photo.id === id))
        .filter((photo) => photo);
    }
  } else if(filterId === ImageFilterIds.DISCUSSED) {
    filteredPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
  }

  renderThumbnails(filteredPhotos);
};

const debounceRenderPhotos = debounce(renderPhotos, RERENDER_DELAY);

const updateActiveFilter = (newFilterId) => {
  const activeButton = imgFiltersElement.querySelector(`#${activeFilterId}`);
  const newActiveButton = imgFiltersElement.querySelector(`#${newFilterId}`);

  activeButton.classList.remove(activeFilterButtonClassName);
  newActiveButton.classList.add(activeFilterButtonClassName);

  activeFilterId = newFilterId;
};

const onFilterButtonClick = (evt) => {
  const newFilterId = evt.target.id;

  if(activeFilterId !== newFilterId) {
    updateActiveFilter(newFilterId);
    debounceRenderPhotos(newFilterId);
  }
};

defaultFilterButton.addEventListener('click', onFilterButtonClick);
randomFilterButton.addEventListener('click', onFilterButtonClick);
discussedFilterButton.addEventListener('click', onFilterButtonClick);

export { addImageFiltersFeature };
