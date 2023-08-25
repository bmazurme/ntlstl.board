import { expect } from '@jest/globals';

import getAreaSumm from './index';

test('getAreaSumm', () => {
  expect(getAreaSumm({
    roof: 1, pavements: 2, tracks: 3, ground: 4, cobblestone: 5, stone: 6, lawns: 7,
  })).toEqual(28);
});
