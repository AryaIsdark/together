import { useEffect } from 'react';

/**
 * Adds (and later removes) a keydown event listener on the window
 * @param {string} targetKey - the key you want to target
 * @param {function} callback - the callback you want to execute
 * @example: useWindowKey('Escape', handleClose)
 */
const useWindowKey = (
  targetKey: string,
  callback: (event: KeyboardEvent) => any,
): void => {
  useEffect(() => {
    const eventHandler = (keyboardEvent: KeyboardEvent): void => {
      if (keyboardEvent.key === targetKey) {
        callback(keyboardEvent);
      }
    };

    // cannot use 'keypress', as event propagation is being stopped somewhere
    // use 'capture' to make sure our hook receives the event before it will
    // be dispatched to the EventTarget beneath it in the DOM.
    window.addEventListener('keydown', eventHandler, { capture: true });
    return () => {
      window.removeEventListener('keydown', eventHandler, { capture: true });
    };
  }, [targetKey, callback]);
};

export default useWindowKey;
