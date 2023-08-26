import { expect } from '@jest/globals';

import getPa from './index';

test('getPa', () => {
  expect(getPa(2, 80)).toEqual(1280);
});
