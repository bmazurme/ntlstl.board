// https://redux-toolkit.js.org/rtk-query/overview
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRetry } from '../base-query';

// Define a service using a base URL and expected endpoints
const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['book'],
  endpoints: () => ({}),
});

export default bookApi;
