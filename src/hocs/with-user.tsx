import React, { type ComponentType } from 'react';

export default function withUser<P extends Record<string, unknown>>(
  Page: ComponentType<P>,
  shouldBeAuthorized = false,
  ) {
  return function WithUser(pageProps: P) {
    const pagePropsWithUser = { ...pageProps };

    if (shouldBeAuthorized) {
      return <div>Something went wrong</div>;
    }

    return <Page {...pagePropsWithUser} />;
  };
}
