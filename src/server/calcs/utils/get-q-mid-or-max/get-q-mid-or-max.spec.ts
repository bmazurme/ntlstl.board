import { expect } from '@jest/globals';

import getQMidOrMax from './index';

test('getQMidOrMax', () => {
  expect(getQMidOrMax(1, 2, 3, 4)).toEqual(2.84);
});
