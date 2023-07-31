import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

export type TypeNotificationState = { data: TypeNotification[] };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeNotificationState = {
  data: [],
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (
      state,
      { payload: data }: PayloadAction<TypeNotification[]>,
    ) => ({ ...state, data }),
  },
});

export const { setNotification } = slice.actions;

export default slice.reducer;

export const selectNotification = (state: RootState) => state.notification.data;
