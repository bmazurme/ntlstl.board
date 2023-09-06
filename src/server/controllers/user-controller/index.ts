/* eslint-disable max-len */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { NotFoundError } from '../../errors';

import Users from '../../models/user-model';

const getUserMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const user = await Users.findOne({ defaultEmail: req.user.default_email });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    return res.send({ defaultEmail: user.defaultEmail, projectId: user.projectId });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { default_email } = req.user;
    const { projectId } = req.body;
    const options = { new: true };
    const user = await Users.findOneAndUpdate({ defaultEmail: default_email }, { projectId }, options);

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    return res.send({ defaultEmail: user.defaultEmail, projectId: user.projectId });
  } catch (err) {
    next(err);
  }
};

export { getUserMe, updateUser };
