import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

type TypeBook = Record<string, string>;
type TypeBooksState = { data: TypeBook[] };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeBooksState = {
  data: [{ name: 'Test', id: 'test' }],
};

const slice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (
      state,
      { payload: data }: PayloadAction<TypeBook>,
    ) => ({ ...state, data: [...state.data, data] }),
  },
});

export const { setBooks } = slice.actions;

export default slice.reducer;

export const selectBooks = (state: RootState) => state.books.data;
