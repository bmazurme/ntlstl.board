import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

import { options } from '../../mocks/options';

type TypeWorkplace = { value: string, label: string };
type TypeWorkplacesState = { data: TypeWorkplace[] };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeWorkplacesState = {
  data: options,
};

const slice = createSlice({
  name: 'workplaces',
  initialState,
  reducers: {
    setWorkplaces: (
      state,
      { payload: data }: PayloadAction<TypeWorkplace>,
    ) => ({ ...state, data: [...state.data, data] }),
  },
});

export const { setWorkplaces } = slice.actions;

export default slice.reducer;

export const selectWorkplaces = (state: RootState) => state.workplaces.data;
