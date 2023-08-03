import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

import { options } from '../../mocks/options';

type TypeWorkplace = { value: string; label: string; };
type TypeWorkplaceState = { data: TypeWorkplace };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeWorkplaceState = {
  data: options[0],
};

const slice = createSlice({
  name: 'workplace',
  initialState,
  reducers: {
    setWorkplace: (
      state,
      { payload: data }: PayloadAction<TypeWorkplace>,
    ) => ({ ...state, data }),
  },
});

export const { setWorkplace } = slice.actions;

export default slice.reducer;

export const selectWorkplace = (state: RootState) => state.workplace.data;
