/* eslint-disable implicit-arrow-linebreak */
import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

// import { BASE_API } from '../../utils';

// Create our baseQuery instance
const oauthQuery = fetchBaseQuery({
  baseUrl: 'https://oauth.yandex.ru',
  prepareHeaders: (headers) => headers,
});

export const oauthQueryWithRetry = retry(oauthQuery, { maxRetries: 1 });
