import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

import { BASE_API } from '../../utils';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
  prepareHeaders: (headers) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    // const token = localStorage.getItem('accessToken');
    //
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`);
    // }

    return headers;
  },
});

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });
