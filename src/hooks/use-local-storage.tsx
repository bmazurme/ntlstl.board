/* eslint-disable max-len */
import { useEffect, useState } from 'react';

const decode = (value: any) => JSON.stringify(value);
const encode = (value: any) => JSON.parse(value);

const useLocalStorage = (key: string, defaultState: string | boolean) => {
  const [value, setValue] = useState(encode(localStorage.getItem(key) || null) || defaultState);

  useEffect(() => {
    localStorage.setItem(key, decode(value));
  }, [value]);

  return [value, setValue];
};

export { useLocalStorage };
