import {getRandomInteger, generateId } from './utils.js';

const PHOTO_COUNT = 4;
const MAX_COMMENT_COUNT = 4;
const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const MAX_AVATAR_ID = 6;

const COMMENT_TEXT_MOCK = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENT_NAME_MOCK = [
  'Артём',
  'Олеся',
  'Илон',
  'Константин',
  'Родион',
  'Ева',
  'Илья',
  'Алиса',
  'Вероника',
  'Лев',
  'Максим'
];

const getPhotoId = generateId();
const getCommentId = generateId();

/**
 * Функция генерирует случайное число N в диапазоне от options.minCount и options.maxCount.
 * Из массива textArray выбираются N неповторяющихся элементов.
 * Возвращаемый результат - это строка из склееных выбранных элементов массива.
 * @param {*} textArray Массив, из элементов которого генерируются данные
 * @param {*} options Объект с полями minCount и maxCount
 * @returns возвращает сгенерированную строку из склееных выбранных элементов массива
 */
const generateCommentData = (textArray, options = {minCount: 1, maxCount: 1}) => {
  let textCount = 1;
  const { minCount, maxCount } = options;
  const indexes = [];
  const bothIsOne = minCount === 1 && maxCount === 1;

  if(!bothIsOne) {
    textCount = getRandomInteger(minCount, maxCount);
  }

  for(let i = 0; i < textCount; i++) {
    let index = getRandomInteger(0, textArray.length - 1);

    if(!indexes.includes(index)) {
      indexes.push(index);
    } else {
      // генерируем индекс массива, пока не получим неповторяющийся индекс
      while(indexes.includes(index)) {
        index = getRandomInteger(0, textArray.length - 1);

        if(!indexes.includes(index)) {
          indexes.push(index);
          break;
        }
      }
    }
  }

  const commentText = indexes.map((inx) => textArray[inx]).join(' ');
  return commentText;
};

const createComment = () => {
  const commentId = getCommentId();
  const avatarId = getRandomInteger(1, MAX_AVATAR_ID);

  return {
    id: commentId,
    avatar: `img/avatar-${avatarId}.svg`,
    message: generateCommentData(COMMENT_TEXT_MOCK, { minCount: 1, maxCount: 2 }),
    name: generateCommentData(COMMENT_NAME_MOCK)
  };
};

const createPhoto = () => {
  const photoId = getPhotoId();
  const likesCount = getRandomInteger(MIN_LIKE_COUNT, MAX_LIKE_COUNT);
  const commentCount = getRandomInteger(1, MAX_COMMENT_COUNT);

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: `Фотография ${photoId}`,
    likes: likesCount,
    comments: Array.from({length: commentCount}, createComment),
  };
};

export const createPhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);
