import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

type TypeHistory = { user: string; state: TypeBlock; };
type TypeHistoryState = { data: TypeHistory[] };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeHistoryState = {
  data: [],
};

const slice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory: (
      state,
      { payload: data }: PayloadAction<TypeHistory>,
    ) => ({ ...state, data: [...state.data, data] }),
  },
});

export const { setHistory } = slice.actions;
export default slice.reducer;
export const selectHistory = (state: RootState) => state.history.data;
