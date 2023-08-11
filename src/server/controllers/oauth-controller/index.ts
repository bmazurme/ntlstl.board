/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import { NextFunction, Request, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';
import jwt from 'jsonwebtoken';

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
      const user = users.find((u) => u.defaultEmail === default_email);

      if (!user) {
        users.push({ defaultEmail: default_email });
      }

      const tokenNew = jwt.sign(
        { default_email },
        'JWT_SECRET',
        { expiresIn: '7d' },
      );

      return res.cookie('token', tokenNew, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send(result);
    }

    return res.send({ message: 'error' });
  } catch (err) {
    next(err);
  }
};

export { oauthYaSigninController };
