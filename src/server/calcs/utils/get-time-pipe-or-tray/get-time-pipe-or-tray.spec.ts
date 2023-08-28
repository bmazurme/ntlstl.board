import { expect } from '@jest/globals';

import getTimePipeOrTray from './index';

test('getTimePipeOrTray', () => {
  expect(getTimePipeOrTray('pipe', 1, 2)).toEqual(0.0085);
});
