import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

import { items } from '../../mocks/items';

type TypeItems = { value: string; label: string; }[];
type TypeItemsState = { data: TypeItems };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeItemsState = {
  data: items,
};

const slice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (
      state,
      { payload: data }: PayloadAction<TypeItems>,
    ) => ({ ...state, data }),
  },
});

export const { setItems } = slice.actions;

export default slice.reducer;

export const selectItems = (state: RootState) => state.items.data;
