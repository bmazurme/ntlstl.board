import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

type TypeBook =  { name: string };
type TypeBookState =  { data: TypeBook };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeBookState = {
  data: { name: 'Title book' },
};

const slice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookName: (
      state,
      { payload: data }: PayloadAction<string>,
    ) => ({ ...state, data: { ...state.data, name: data } }),
  },
});

export const { setBookName } = slice.actions;

export default slice.reducer;

export const selectBook = (state: RootState) => state.book.data;
