import { useEffect } from 'react';

/**
 * Adds (and later removes) a resize event listener on the window
 * @param {function} callback - the callback you want to execute
 * @example: useWindowResize(calculateTableHeight)
 */
const useWindowResize = (callback: Function): void => {
  useEffect(() => {
    const eventHandler = (): void => {
      callback();
    };

    window.addEventListener('resize', eventHandler);
    return () => {
      window.removeEventListener('resize', eventHandler);
    };
  }, [callback]);
};

export default useWindowResize;
