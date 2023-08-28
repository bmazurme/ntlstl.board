/* eslint-disable max-len */
// https://oauth.yandex.ru/authorize?response_type=code&client_id=c709762dfe3e447999beb343da0bee9f
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

import { useSignInWitOauthGithubMutation } from '../../store/api';

import { Urls } from '../../utils';

import style from './oauth-github-layout.module.css';

export default function Oauth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showBoundary } = useErrorBoundary();
  const [signInWitOauthGithub] = useSignInWitOauthGithubMutation();
  const code = searchParams.get('code')!;

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data }: any = await signInWitOauthGithub({ code });

        if (data) {
          setTimeout(() => navigate(Urls.BASE.INDEX), 1000);
        }
      } catch (error) {
        showBoundary(error);
      }
    };

    getToken();
  }, [code]);

  return (
    <section className={style.layout}>
      <div className={style.container}>
        <h2 className={style.title}>Welcome!</h2>
      </div>
    </section>
  );
}
