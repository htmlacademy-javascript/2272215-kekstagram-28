const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateId = () => {
  let objectId = 0;

  const getObjectId = () => {
    objectId++;
    return objectId;
  };

  return getObjectId;
};

/** Функция возвращает слово в нужном склонении */
const declOfNum = (value, words) => {
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

const hasDuplicates = (values) => {
  const duplicates = values
    .map((value) => value.toLowerCase())
    .filter((value, index, array) => array.indexOf(value) !== index);
  return !!duplicates.length;
};

export { getRandomInteger, generateId, declOfNum, hasDuplicates };
