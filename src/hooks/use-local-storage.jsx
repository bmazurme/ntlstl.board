/* eslint-disable max-len */
import { useEffect, useState } from 'react';

const decode = (value) => JSON.stringify(value);

const encode = (value) => JSON.parse(value);

const useLocalStorage = (key, defaultState) => {
  const [value, setValue] = useState(encode(localStorage.getItem(key) || null) || defaultState);

  useEffect(() => {
    localStorage.setItem(key, decode(value));
  }, [value]);

  return [value, setValue];
};

export { useLocalStorage };
