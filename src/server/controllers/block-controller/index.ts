/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { blocks } from '../../mocks/db';

const getBlocks = (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    return res.send(blocks[req.params.id].value);
  } catch (err) {
    next(err);
  }
};

export { getBlocks };
