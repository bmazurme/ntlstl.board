import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

import { modules } from '../../mocks/modules';

type TypeModules = { value: string, label: string };
type TypeModulesState = { data: TypeModules[] };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeModulesState = {
  data: modules,
};

const slice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    setModules: (
      state,
      { payload: data }: PayloadAction<TypeModules>,
    ) => ({ ...state, data: [...state.data, data] }),
  },
});

export const { setModules } = slice.actions;

export default slice.reducer;

export const selectModules = (state: RootState) => state.modules.data;
