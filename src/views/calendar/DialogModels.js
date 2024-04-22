export class DialogOption {
  constructor(data) {
    if (!data) return;
    for (const key in data) {
      this[key] = data[key];
    }
  }

  type = 'alert';
  title = '';
  message = '';
  confirmLabel = '확인';
  cancelLabel = '취소';
  confirmDisabled = false;
  size = 'small';
  hideCallback = null;

  confirmCallback = null;

  cancelCallback = null;
}
