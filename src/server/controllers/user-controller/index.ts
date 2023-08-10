/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { user } from '../../mocks/db';

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

  user.name = name;
  user.email = email;
  user.active = active;
  user.paid = paid;
  user.project = project;

  try {
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

export { getUserMe, updateUser, addUser };
