import { expect } from '@jest/globals';

import convertJouleToCalories from './index';

test('convert joule to calories', () => {
  expect(convertJouleToCalories(1)).toEqual(0.0008598);
});
