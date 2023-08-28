import { expect } from '@jest/globals';

import getSummRoofArea from './index';

test('getSummRoofArea', () => {
  expect(getSummRoofArea(1, 2)).toEqual(1.6);
});
