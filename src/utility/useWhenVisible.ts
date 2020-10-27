import { useEffect } from 'react';

/**
 * Triggers a callback when an element becomes visible.
 *
 * @param target    The target element to inspect.
 * @param callback  Function to call when element becomes visible.
 * @param root      (Optional) Bounds where to look for the target.
 */
const useWhenVisible = (
  target: Element | null,
  callback: () => void,
  root: Element | null = document.body,
) => {
  useEffect(() => {
    if (!target || !root) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        root,
      },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [target, callback, root]);
};

export default useWhenVisible;
