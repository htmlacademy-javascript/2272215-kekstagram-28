export const Effects = {
  ORIGINAL: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

export const sliderConfig = {
  [Effects.CHROME]: {
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    unit: null,
    func: 'grayscale',
  },
  [Effects.SEPIA]: {
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    unit: null,
    func: 'sepia',
  },
  [Effects.MARVIN]: {
    sliderOptions: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    unit: '%',
    func: 'invert',
  },
  [Effects.PHOBOS]: {
    sliderOptions: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    unit: 'px',
    func: 'blur',
  },
  [Effects.HEAT]: {
    sliderOptions: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    unit: null,
    func: 'brightness',
  },
};
