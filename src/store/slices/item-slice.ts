import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

// import { items } from '../../mocks/items';

type TypeItemType = { name: string; description: string; } | null;
type TypeItemTypeState = { data: TypeItemType };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeItemTypeState = {
  data: null,
};

const slice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItem: (
      state,
      { payload: data }: PayloadAction<TypeItemType>,
    ) => ({ ...state, data }),
  },
});

export const { setItem } = slice.actions;

export default slice.reducer;

export const selectItem = (state: RootState) => state.item.data;
