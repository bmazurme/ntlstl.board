/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { mock } from '../mocks/mock';

const getMockData = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send(mock);
  } catch (err) {
    next(err);
  }
};

export { mock, getMockData };
