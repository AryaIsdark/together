export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number = 100,
) => {
  let timeout: NodeJS.Timeout;

  const debounced = (...args: any[]) => {
    !!timeout && clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
  return debounced as (...args: Parameters<F>) => void;
};
