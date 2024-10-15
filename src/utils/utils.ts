export const debounce = (func: any, delay: any) => {
    let timeoutId: any;
    const debouncedFunction = (...args: any) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  
    debouncedFunction.clear = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  
    return debouncedFunction;
};