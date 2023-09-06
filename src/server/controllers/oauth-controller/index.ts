/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import { NextFunction, Request, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';
import jwt from 'jsonwebtoken';

import DEV_JWT_SECRET, { OAUTH } from '../../../utils/dev-config';

import Users from '../../models/user-model';

dotEnvConfig();

const oauthYaSigninController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.body;
    const formdata = new FormData();
    formdata.append('code', code);
    formdata.append('client_id', OAUTH.YANDEX.CLIENT_ID);
    formdata.append('client_secret', OAUTH.YANDEX.CLIENT_SECRET);
    formdata.append('grant_type', 'authorization_code');
    const options: RequestInit = { method: 'POST', body: formdata, redirect: 'follow' };
    const rlst = await fetch('https://oauth.yandex.ru/token', options);
    const rs = await rlst.json();
    const { access_token: token } = rs;
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      redirect: 'follow',
    };

    const response = await fetch('https://login.yandex.ru/info', requestOptions);

    if (response.ok) {
      const { default_email } = await response.json();
      let user = await Users.findOne({ defaultEmail: default_email });

      if (!user) {
        user = await Users.create({ defaultEmail: default_email });
      }

      const tokenNew = jwt.sign(
        { default_email, _id: user._id },
        DEV_JWT_SECRET,
        { expiresIn: '7d' },
      );

      return res.status(200).cookie('token', tokenNew, {
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

const oauthGithubSigninController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.body;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const body = JSON.stringify({
      code,
      client_id: OAUTH.GITHUB.CLIENT_ID,
      client_secret: OAUTH.GITHUB.CLIENT_SECRET,
    });
    const requestOptions: RequestInit = {
      method: 'POST', headers: myHeaders, body, redirect: 'follow',
    };
    const response = await fetch('https://github.com/login/oauth/access_token', requestOptions);
    const rs = await response.text();
    const token = rs.replace('access_token=', '').replace('&scope=&token_type=bearer', '');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    const options: RequestInit = { method: 'GET', headers, redirect: 'follow' };
    const r = await fetch('https://api.github.com/user/public_emails', options);

    if (r.ok) {
      const emails = await r.json();
      const { email } = emails[0];
      let user = await Users.findOne({ defaultEmail: email });

      if (!user) {
        user = await Users.create({ defaultEmail: email });
      }

      const tokenNew = jwt.sign(
        { default_email: email, _id: user._id },
        DEV_JWT_SECRET,
        { expiresIn: '7d' },
      );

      return res.status(200).cookie('token', tokenNew, {
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

export { oauthYaSigninController, oauthGithubSigninController };
