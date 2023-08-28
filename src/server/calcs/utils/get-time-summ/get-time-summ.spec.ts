import { expect } from '@jest/globals';

import getTimeSumm from './index';

test('getTimeSumm', () => {
  expect(getTimeSumm(0, 1, 2)).toEqual(3);
});
