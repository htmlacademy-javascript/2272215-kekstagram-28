export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const generateId = () => {
  let objectId = 0;

  const getObjectId = () => {
    objectId++;
    return objectId;
  };

  return getObjectId;
};

/**
 * Функция генерирует {count} случайных уникальных чисел в диапазоне от 0..{maxValue}
 * @param {Number} count
 * @param {Number} maxValue
 * @param {Array} Массив случайных уникальных чисел
*/
export const generateRandomUniqueNumbers = (count = 5, maxValue = 10) => {
  const results = [];

  while(results.length < count) {
    const random = getRandomInteger(0, maxValue);
    const foundIndex = results.findIndex((current) => current === random);

    if(foundIndex === -1) {
      results.push(random);
    }
  }

  return results;
};

/** Функция возвращает слово в нужном склонении */
export const declOfNum = (value, words) => {
  const num = Math.abs(value) % 100;
  const num1 = num % 10;

  if (num > 10 && num < 20) {
    return words[2];
  }

  if (num1 > 1 && num1 < 5) {
    return words[1];
  }

  if (num1 === 1) {
    return words[0];
  }

  return words[2];
};

export const hasDuplicates = (values) => {
  const duplicates = values
    .map((value) => value.toLowerCase())
    .filter((value, index, array) => array.indexOf(value) !== index);
  return !!duplicates.length;
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
