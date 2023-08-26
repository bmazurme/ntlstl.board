import { expect } from '@jest/globals';

import getZ from './index';

test('getZ', () => {
  expect(getZ(0, 1)).toEqual(0.33);
});
