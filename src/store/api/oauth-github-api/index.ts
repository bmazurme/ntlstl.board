// https://redux-toolkit.js.org/rtk-query/overview
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRetry } from '../base-query';

// Define a service using a base URL and expected endpoints
const oauthGithubApi = createApi({
  reducerPath: 'oauthGithubApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['oauthGithub'],
  endpoints: () => ({}),
});

export default oauthGithubApi;
