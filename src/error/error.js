const error = {
  translationPrefix: 'errors',
  dispatchError(event, elementId = 'root') {
    const element = document.getElementById(elementId);
    if (event && element) {
      window.dispatchEvent(event);
    }
  },
  addErrorEvent(err) {
    const event = new CustomEvent('ON_API_ERROR', {
      detail: { message: err },
      bubbles: false,
      cancelable: true,
    });
    this.dispatchError(event);
  },
};

export default error;
