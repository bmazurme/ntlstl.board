// https://redux-toolkit.js.org/rtk-query/overview
import { createApi } from '@reduxjs/toolkit/query/react';
import { oauthQueryWithRetry } from '../oauth-query';

// Define a service using a base URL and expected endpoints
const oauthApi = createApi({
  reducerPath: 'oauthApi',
  baseQuery: oauthQueryWithRetry,
  tagTypes: ['oauth'],
  endpoints: () => ({}),
});

export default oauthApi;
