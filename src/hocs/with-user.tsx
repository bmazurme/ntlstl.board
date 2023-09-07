import React, { type ComponentType, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Preloader from '../components/preloader/preloader';

import { useGetIamMutation } from '../store/api';
import useUser from '../hooks/use-user';
import { Urls } from '../utils';

export default function withUser<P extends Record<string, unknown>>(
  Page: ComponentType<P>,
  shouldBeAuthorized = false,
) {
  return function WithUser(pageProps: P & { user?: TypeUser }) {
    let user: TypeUser | null = useUser();
    const [getUser, {
      isUninitialized,
      isLoading,
      isError,
      error,
      data,
    }] = useGetIamMutation();

    useEffect(() => {
      if (isUninitialized && !user) {
        getUser();

        if (data && !isError) {
          user = data;
        }
      }
    }, [getUser, isError, isLoading, isUninitialized, user, data]);

    if (isLoading || (isUninitialized && !user)) {
      return <Preloader />;
    }

    if (!shouldBeAuthorized || user) {
      const pagePropsWithUser = { ...pageProps, user };
      return <Page {...pagePropsWithUser} />;
    }

    if (isError && (error as any).response?.status !== 401 && !shouldBeAuthorized) {
      return <div>Something went wrong</div>;
    }

    return <Navigate to={Urls.SIGN.IN} />;
  };
}
