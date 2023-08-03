import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

import { items } from '../../mocks/items';

type TypeItem = { value: string; label: string; };
type TypeItemState = { data: TypeItem };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeItemState = {
  data: items[0],
};

const slice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItem: (
      state,
      { payload: data }: PayloadAction<TypeItem>,
    ) => ({ ...state, data }),
  },
});

export const { setItem } = slice.actions;

export default slice.reducer;

export const selectItem = (state: RootState) => state.item.data;
