import { expect } from '@jest/globals';

import getPa from './index';

test('getPa', () => {
  expect(getPa(1, 3)).toEqual(1);
});
