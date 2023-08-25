import { expect } from '@jest/globals';

import getFlow from './index';

test('getFlow', () => {
  expect(getFlow(1, 2, 3, 4, 5)).toEqual(0.0019328729161712307);
});
