import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

type TypeBookId = Record<string, string> | null;
type TypeBookIdState = { data: TypeBookId };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeBookIdState = {
  data: null,
};

const slice = createSlice({
  name: 'bookid',
  initialState,
  reducers: {
    setBookId: (
      state,
      { payload: data }: PayloadAction<TypeBookId>,
    ) => ({ ...state, data }),
  },
});

export const { setBookId } = slice.actions;

export default slice.reducer;

export const selectBookId = (state: RootState) => state.bookid.data;
