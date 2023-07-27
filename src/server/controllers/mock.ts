/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

const getMockData = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send(['mock']);
  } catch (err) {
    next(err);
  }
};

export { getMockData };
