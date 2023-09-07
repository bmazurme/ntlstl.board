// https://oauth.yandex.ru/authorize?response_type=code&client_id=c709762dfe3e447999beb343da0bee9f
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

import Preloader from '../../components/preloader/preloader';
import WelcomeBlock from '../../components/welcome-block/welcome-block';

import { useSignInWitOauthYaMutation } from '../../store/api';

import { Urls } from '../../utils';

export default function OauthLayout() {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [searchParams] = useSearchParams();
  const [signInWitOauthYa, { isError, isLoading, error }] = useSignInWitOauthYaMutation();
  const code = searchParams.get('code')!;

  useEffect(() => {
    const signIn = async () => {
      await signInWitOauthYa({ code });

      if (isError) {
        // @ts-ignore
        showBoundary(new Error(error?.status));
      }

      setTimeout(() => navigate(Urls.BASE.INDEX), 1000);
    };

    if (code) {
      signIn();
    }
  }, [code]);

  return (isLoading ? <Preloader /> : <WelcomeBlock />);
}
