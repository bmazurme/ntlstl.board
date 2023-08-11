/* eslint-disable max-len */
// https://oauth.yandex.ru/authorize?response_type=code&client_id=c709762dfe3e447999beb343da0bee9f
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useGetYaTokenMutation, useSignInWitOauthYaMutation } from '../../store/api';

import { CLIENT_ID, CLIENT_SECRET } from '../../utils/dev-config';
import { Urls } from '../../utils';

import style from './oauth-layout.module.css';

export default function Oauth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [getYaToken] = useGetYaTokenMutation();
  const [signInWitOauthYa] = useSignInWitOauthYaMutation();

  const code = searchParams.get('code')!;
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const body = new FormData();
      body.append('grant_type', 'authorization_code');
      body.append('code', code);
      body.append('client_id', CLIENT_ID);
      body.append('client_secret', CLIENT_SECRET);

      const { data }: any = await getYaToken({ body });

      if (data?.access_token) {
        setToken(data.access_token);
      }
    };

    getToken();
  }, [code]);

  useEffect(() => {
    const signIn = async () => {
      if (token) {
        const { data }: any = await signInWitOauthYa({ token });

        if (data) {
          setUser(data);
          setTimeout(() => navigate(Urls.BASE.INDEX), 3000);
        }
      }
    };

    signIn();
  }, [token]);

  return (
    <section className={style.layout}>
      <div className={style.container}>
        <h2 className={style.title}>Welcome!</h2>
      </div>
    </section>
  );
}
