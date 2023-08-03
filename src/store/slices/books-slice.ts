import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { bookApiEndpoints } from '../api/book-api/endpoints';

type TypeBooksState = { data: TypeBook[] };
// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeBooksState = {
  data: [],
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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        bookApiEndpoints.endpoints.getBookById.matchFulfilled,
        (state, action) => ({
          ...state,
          data: action.payload,
        }),
      )
      .addMatcher(
        bookApiEndpoints.endpoints.getBookById.matchRejected,
        (state, action) => {
          console.log('rejected', state, action);
        },
      )
      .addMatcher(
        bookApiEndpoints.endpoints.addBook.matchFulfilled,
        (state, action) => ({
          ...state,
          data: action.payload,
        }),
      )
      .addMatcher(
        bookApiEndpoints.endpoints.addBook.matchRejected,
        (state, action) => {
          console.log('rejected', state, action);
        },
      );
  },
});

export const { setBooks } = slice.actions;

export default slice.reducer;

export const selectBooks = (state: RootState) => state.books.data;
