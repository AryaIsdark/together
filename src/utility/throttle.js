const throttle = (cb, limit) => {
  let wait = false;
  return function() {
    if (wait) return null;

    cb.apply(null, arguments);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, limit);
  };
};

export default throttle;
