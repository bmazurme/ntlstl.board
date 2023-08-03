/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

let user = {
  id: 'id',
  name: 'User Name',
  email: 'User Email',
  active: true,
  paid: '01.01.2024',
  project: null,
};

const addUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send('user created');
  } catch (err) {
    next(err);
  }
};

const getUserMe = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    id, name, email, active, paid, project,
  } = req.body;

  user = {
    id, name, email, active, paid, project,
  };

  try {
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

export { getUserMe, updateUser, addUser };
