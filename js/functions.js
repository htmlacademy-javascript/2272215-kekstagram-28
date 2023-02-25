const checkStringLength = (value, maxLength) => {
  if(typeof value !== 'string') {
    return false;
  }

  return value.length <= maxLength;
};

const isPalindrome = (value) => {
  if(typeof value !== 'string') {
    return false;
  }

  const baseValue = value.toLowerCase().replaceAll(' ', '');

  let reversedValue = '';
  for(let i = baseValue.length - 1; i >= 0; i--) {
    reversedValue += baseValue[i];
  }

  return baseValue === reversedValue;
};

const getPositiveInteger = (value) => {
  if(typeof value === 'number') {
    return value;
  }

  if(typeof value !== 'string') {
    return NaN;
  }

  let newValue = '';

  for(let i = 0; i < value.length; i++) {
    const char = value[i];
    const parsed = parseInt(char, 10);

    if(!Number.isNaN(parsed)) {
      newValue += char;
    }
  }

  return parseInt(newValue, 10);
};

const padStart = (text, minLength, addonText) => {
  if(text.length >= minLength) {
    return text;
  }

  let newText = text;

  while(newText.length < minLength) {
    let addonPart = '';

    for(let i = 0; i < addonText.length; i++) {
      addonPart += addonText[i];

      if(newText.length + addonPart.length === minLength) {
        break;
      }
    }

    newText = addonPart + newText;
  }

  return newText;

};


checkStringLength('проверяемая строка', 20);

isPalindrome('Лёша на полке клопа нашёл ');

getPositiveInteger('1 кефир, 0.5 батона');

padStart('q', 4, 'we');
