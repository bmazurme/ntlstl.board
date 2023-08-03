// https://redux-toolkit.js.org/rtk-query/overview
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRetry } from '../base-query';

// Define a service using a base URL and expected endpoints
const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['project'],
  endpoints: () => ({}),
});

export default projectApi;
