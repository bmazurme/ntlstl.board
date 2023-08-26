import { expect } from '@jest/globals';

import getN from './index';

test('getN', () => {
  expect(getN(1, 2, 3)).toEqual(2);
});
