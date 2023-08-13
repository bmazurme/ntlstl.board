/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import { NextFunction, Request, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';
import jwt from 'jsonwebtoken';

import DEV_JWT_SECRET from '../../../utils/dev-config';

import { users } from '../../mocks/db';

dotEnvConfig();

const oauthYaSigninController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      redirect: 'follow',
    };

    const response = await fetch('https://login.yandex.ru/info', requestOptions);

    if (response.ok) {
      const result = await response.json();
      const { default_email } = result;
      let user = users.find((u) => u.defaultEmail === default_email);

      if (!user) {
        user = {
          defaultEmail: default_email,
          paid: '01.01.2024',
          project: { value: '0', label: 'Project 1' },
        };
        users.push(user);
      }

      const tokenNew = jwt.sign(
        { default_email },
        DEV_JWT_SECRET,
        { expiresIn: '7d' },
      );

      return res.cookie('token', tokenNew, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send(user);
    }

    return res.send({ message: 'error' });
  } catch (err) {
    next(err);
  }
};

export { oauthYaSigninController };
