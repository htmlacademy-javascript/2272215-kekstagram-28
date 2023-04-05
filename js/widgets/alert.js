const ALERT_SHOW_TIME = 5000;

const showErrorNotification = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 4px';
  alertContainer.style.fontSize = '16px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;

  const close = document.createElement('span');
  close.style.position = 'absolute';
  close.style.right = '12px';
  close.style.fontSize = '11px';
  close.style.cursor = 'pointer';
  close.textContent = 'Закрыть';
  close.addEventListener('click', () => closeAlert());

  alertContainer.append(close);
  document.body.append(alertContainer);

  function closeAlert () {
    alertContainer.remove();
  }

  setTimeout(() => {
    closeAlert();
  }, ALERT_SHOW_TIME);
};

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

export { showErrorNotification, showSuccessModal, showErrorModal };
