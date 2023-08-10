import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { bookApiEndpoints } from '../api';

type TypeBookState = { data: TypeBook };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeBookState = {
  data: {
    name: '', id: '', projectId: '', typeBook: '',
  },
};

const slice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBook: (
      state,
      { payload: data }: PayloadAction<TypeBook>,
    ) => ({ ...state, data }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        bookApiEndpoints.endpoints.renameBook.matchFulfilled,
        (state, action) => ({
          ...state,
          data: action.payload,
        }),
      )
      .addMatcher(
        bookApiEndpoints.endpoints.renameBook.matchRejected,
        (state, action) => {
          console.log('rejected', state, action);
        },
      );
  },
});

export const { setBook } = slice.actions;

export default slice.reducer;

export const selectBook = (state: RootState) => state.book.data;
