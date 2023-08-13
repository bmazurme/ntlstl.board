/* eslint-disable implicit-arrow-linebreak */
import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

import { BASE_API } from '../../utils';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
  prepareHeaders: (headers) => headers,
  credentials: 'include',
});

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });
