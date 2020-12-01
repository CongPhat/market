export const debounce = (callback, delay) => {
    let timeoutHandler = null;
    return (...args) => {
        if (timeoutHandler) {
            clearTimeout(timeoutHandler);
        }
        timeoutHandler = setTimeout(() => {
            callback(...args);
            timeoutHandler = null;
        }, delay);
    };
};
