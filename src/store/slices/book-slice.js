import { createSlice } from '@reduxjs/toolkit';

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState = {
  data: { name: 'Title book', fields: [] },
};

const slice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookName: (
      state,
      { payload: data },
    ) => ({ ...state, data: { ...state.data, name: data.name } }),
  },
});

export const { setBookName } = slice.actions;

export default slice.reducer;

export const selectBook = (state) => state.book.data;
