import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

import { itemTypesApiEndpoints } from '../api/item-types-api/endpoints';

type TypeItemTypes = { name: string; description: string; }[];
type TypeItemsState = { data: TypeItemTypes };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeItemsState = {
  data: [],
};

const slice = createSlice({
  name: 'itemTypes',
  initialState,
  reducers: {
    setItemTypes: (
      state,
      { payload: data }: PayloadAction<TypeItemTypes>,
    ) => ({ ...state, data }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        itemTypesApiEndpoints.endpoints.getItemTypes.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        itemTypesApiEndpoints.endpoints.getItemTypes.matchRejected,
        (state, action) => console.log('rejected', state, action),
      );
  },
});

export const { setItemTypes } = slice.actions;
export default slice.reducer;
export const selectItemTypes = (state: RootState) => state.itemTypes.data;
