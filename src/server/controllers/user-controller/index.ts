/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { users } from '../../mocks/db';

const addUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send('user created');
  } catch (err) {
    next(err);
  }
};

const getUserMe = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = 0;
    const user = users[id];

    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { defaultEmail, project } = req.body;
  try {
    const user = users.find((u) => u.defaultEmail === defaultEmail)!;
    user.defaultEmail = defaultEmail;
    user.project = project;

    return res.send(user);
  } catch (err) {
    next(err);
  }
};

export {
  getUserMe, updateUser, addUser,
};
