const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');

const scaleImage = (scale) => {
  const value = scale / 100;
  imagePreview.style.transform = `scale(${value})`;
};

const onScaleBiggerClick = () => {
  const value = parseInt(scaleValueInput.value, 10);
  const newValue = value + SCALE_STEP;

  if(newValue <= SCALE_MAX) {
    scaleValueInput.value = `${newValue}%`;
    scaleImage(newValue);
  }
};

const onScaleSmallerClick = () => {
  const value = parseInt(scaleValueInput.value, 10);
  const newValue = value - SCALE_STEP;

  if(newValue >= SCALE_MIN) {
    scaleValueInput.value = `${newValue}%`;
    scaleImage(newValue);
  }
};

scaleBigger.addEventListener('click', onScaleBiggerClick);
scaleSmaller.addEventListener('click', onScaleSmallerClick);
