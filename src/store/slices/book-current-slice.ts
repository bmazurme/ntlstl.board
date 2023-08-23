import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

type TypeBookIdState = { data: TypeBook | null };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeBookIdState = {
  data: null,
};

const slice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setCurrentBook: (
      state,
      { payload: data }: PayloadAction<TypeBook>,
    ) => ({ ...state, data }),
  },
});

export const { setCurrentBook } = slice.actions;
export default slice.reducer;
export const selectCurrentBook = (state: RootState) => state.bookid.data;
