/* eslint-disable import/no-extraneous-dependencies */
import { NextFunction, Request, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';
import jwt from 'jsonwebtoken';

import { users } from '../../mocks/db';

dotEnvConfig();

const oauthYaSigninController = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    redirect: 'follow',
  };

  fetch('https://login.yandex.ru/info', requestOptions)
    .then((response) => response.json())
    .then((result) => {
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

      console.log(tokenNew);

      return res.cookie('token', tokenNew, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send(result);
    })
    .catch((error) => console.log('error', error));
};

export { oauthYaSigninController };
