import React, { type ComponentType } from 'react';

import { useGetUserMeQuery } from '../store/api';

export default function withUser<P extends Record<string, unknown>>(
  Page: ComponentType<P>,
  shouldBeAuthorized = false,
) {
  return function WithUser(pageProps: P) {
    const { data: user } = useGetUserMeQuery() as { data: TypeUser };
    const pagePropsWithUser = { ...pageProps, user };

    if (shouldBeAuthorized) {
      return <div>Something went wrong</div>;
    }

    return <Page {...pagePropsWithUser} />;
  };
}
