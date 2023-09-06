/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.clearCookie('token', { path: '/' }).send({ message: 'logout' });
  } catch (err) {
    next(err);
  }
};

export { logout };
