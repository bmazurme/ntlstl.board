/* eslint-disable implicit-arrow-linebreak */
import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

import { Urls } from '../../utils';

// Create our baseQuery instance
const oauthQuery = fetchBaseQuery({
  baseUrl: Urls.OAUTH.YANDEX,
  prepareHeaders: (headers) => headers,
});

export const oauthQueryWithRetry = retry(oauthQuery, { maxRetries: 1 });
