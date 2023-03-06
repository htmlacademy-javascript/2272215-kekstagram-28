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

export { getRandomInteger, generateId };
