export const getPhotos = () => (
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((photos) => photos)
    .catch(() => {
      throw new Error('Не удалось загрузить фотографии. Попробуйте обновить страницу');
    })
);

export const sendPhoto = (formData) => (
  fetch('https://28.javascript.pages.academy/kekstagram/', {
    method: 'POST',
    body: formData,

  })
    .then((response) => {
      if(response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .catch(() => {
      // eslint-disable-next-line
    })
);
