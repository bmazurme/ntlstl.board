import { expect } from '@jest/globals';

import getZMid from './index';

test('getZMid', () => {
  expect(getZMid({
    roof: 1, pavements: 2, tracks: 3, ground: 4, cobblestone: 5, stone: 6, lawns: 7,
  }, 1, 2)).toEqual(4.710000000000001);
});
