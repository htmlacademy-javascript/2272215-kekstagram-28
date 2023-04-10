import { Effects, sliderConfig } from './effects-constants.js';

const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectRadioInputs = document.querySelectorAll('.effects__radio');
const effectLevelInput = document.querySelector('.effect-level__value');

const getEffectClass = (effect) => `effects__preview--${effect}`;

// активный класс эффекта для картинки, напр. 'effects__preview--none'
let activeEffectClass;
// активная конфигурация слайдера
let activeSliderConfig;

const initialize = () => {
  activeEffectClass = getEffectClass(Effects.ORIGINAL);
  activeSliderConfig = null;

  hideSliderContainer();

  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
  });
};

// Инициализируем переменные модуля
initialize();

const updateSliderOptions = (effect) => {
  const config = sliderConfig[effect];
  if(config) {
    slider.noUiSlider.updateOptions(config.sliderOptions);
  }
};

const clearImageEffect = () => {
  imagePreview.style.filter = 'none';
  effectLevelInput.value = '';
};

const updateImageEffectClass = (newEffectClass) => {
  imagePreview.classList.remove(activeEffectClass);
  activeEffectClass = newEffectClass;
  imagePreview.classList.add(activeEffectClass);
};

const updateImageEffect = () => {
  if(!activeSliderConfig) {
    return;
  }

  const sliderValue = slider.noUiSlider.get();
  const func = activeSliderConfig.func;
  const unit = activeSliderConfig.unit || '';

  // Пример функции эффекта: 'blur(10px)';
  imagePreview.style.filter = `${func}(${sliderValue}${unit})`;

  // Уровень эффекта для отправки на сервер
  effectLevelInput.value = sliderValue;
};

// используем ключевое слово function для всплытия и использования в initialize()
function hideSliderContainer () {
  sliderContainer.style.display = 'none';
}

const showSliderContainer = () => {
  sliderContainer.style.display = 'block';
};

const onEffectRadioChange = (evt) => {
  const newEffect = evt.target.value;

  if(newEffect === Effects.ORIGINAL) {
    clearEffects();
    return;
  }

  showSliderContainer();

  activeSliderConfig = sliderConfig[newEffect];

  // обновляем настройки слайдера
  updateSliderOptions(newEffect);

  // обновляем css-класс на картинке и значение активного класса
  updateImageEffectClass(getEffectClass(newEffect));

  // обновляем эффект на картинке
  updateImageEffect();
};

slider.noUiSlider.on('update', updateImageEffect);

effectRadioInputs.forEach((input) => input.addEventListener('change', onEffectRadioChange));

export function clearEffects () {
  activeSliderConfig = null;
  updateImageEffectClass(getEffectClass(Effects.ORIGINAL));

  hideSliderContainer();
  clearImageEffect();
}
