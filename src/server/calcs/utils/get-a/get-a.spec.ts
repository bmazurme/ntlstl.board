import { expect } from '@jest/globals';

import getA from './index';

test('get A', () => {
  expect(getA(1, 2, 3, 4)).toEqual(32400);
});
