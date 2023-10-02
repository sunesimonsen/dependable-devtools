import { observable } from "@dependable/state";

function debounce(fn, wait = 1) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.call(this, ...args), wait);
  };
}

export const debouncedObservable = (input, timeoutMS = 300) => {
  const result = observable(input());
  input.subscribe(
    debounce(() => {
      result(input());
    }, timeoutMS)
  );

  return result;
};
