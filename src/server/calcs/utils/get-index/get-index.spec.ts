import { expect } from '@jest/globals';

import getIndex from './index';

test('getIndex 0', () => {
  expect(getIndex(0)).toEqual(0);
});

test('getIndex 10', () => {
  expect(getIndex(10)).toEqual(0);
});

test('getIndex 70', () => {
  expect(getIndex(70)).toEqual(1);
});

test('getIndex 90', () => {
  expect(getIndex(90)).toEqual(2);
});
