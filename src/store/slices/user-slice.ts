import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import { userApiEndpoints } from '../api/user-api/endpoints';

export type AuthState = {
  data: TypeUser | null
};

export const initialState: AuthState = {
  data: null,
};

const slice = createSlice({
  name: 'user',
  initialState: { data: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(userApiEndpoints.endpoints.getUserMe.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);
        return { ...state, data: action.payload };
      })
      .addMatcher(userApiEndpoints.endpoints.getUserMe.matchRejected, (state, action) => {
        console.log('rejected', action);
      });
  },
});

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.data;
