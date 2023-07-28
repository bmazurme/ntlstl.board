/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

const addUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send('user created');
  } catch (err) {
    next(err);
  }
};

const getUserMe = (req: Request, res: Response, next: NextFunction) => {
  const user = {
    id: 'id',
    name: 'User Name',
    email: 'User Email',
    active: true,
    paid: '01.01.2024',
  };

  try {
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send('updated');
  } catch (err) {
    next(err);
  }
};

export { getUserMe, updateUser, addUser };
