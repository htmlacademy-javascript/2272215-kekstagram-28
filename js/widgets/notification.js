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

export { showErrorNotification };
