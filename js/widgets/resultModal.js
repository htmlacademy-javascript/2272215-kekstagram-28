const showResultModal = (success = true) => {
  const templateSelector = success ? '#success' : '#error';
  const modalSelector = success ? '.success' : '.error';
  const buttonSelector = success ? '.success__button' : '.error__button';

  const template = document.querySelector(templateSelector).content.querySelector(modalSelector);
  const modal = template.cloneNode(true);
  const button = modal.querySelector(buttonSelector);

  document.body.append(modal);

  const removeModal = () => {
    modal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onButtonClick = () => {
    removeModal();
  };

  function onDocumentKeydown (evt) {
    if(evt.code === 'Escape') {
      removeModal();
    }
  }

  function onDocumentClick (evt) {
    // если кликаем по области за пределы модалки, то закрываем ее
    if(!evt.target.closest('.success__inner')) {
      removeModal();
    }
  }

  button.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showSuccessModal = () => {
  showResultModal(true);
};

const showErrorModal = () => {
  showResultModal(false);
};

export { showSuccessModal, showErrorModal };
