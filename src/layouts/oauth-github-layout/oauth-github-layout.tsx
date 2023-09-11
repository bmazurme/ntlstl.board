/* eslint-disable max-len */
// https://oauth.yandex.ru/authorize?response_type=code&client_id=c709762dfe3e447999beb343da0bee9f
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

import Preloader from '../../components/preloader';
import WelcomeBlock from '../../components/welcome-block';

import { useSignInWitOauthGithubMutation } from '../../store/api';

import { Urls } from '../../utils';

export default function OauthGithubLayout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showBoundary } = useErrorBoundary();
  const [signInWitOauthGithub, { isError, isLoading, error }] = useSignInWitOauthGithubMutation();
  const code = searchParams.get('code')!;

  useEffect(() => {
    const getToken = async () => {
      await signInWitOauthGithub({ code });

      if (isError) {
        // @ts-ignore
        showBoundary(error?.status);
      }

      setTimeout(() => navigate(Urls.PROJECTS.INDEX), 1000);
    };

    if (code) {
      getToken();
    }
  }, [code]);

  return (isLoading ? <Preloader /> : <WelcomeBlock />);
}
