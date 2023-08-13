import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { GroupBase, OptionsOrGroups } from 'react-select';

import { RootState } from '..';

import { modules } from '../../mocks/modules';

export type TypeModule = OptionsOrGroups<string, GroupBase<string>>;

type TypeModulesState = { data: TypeModule[] };

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
      { payload: data }: PayloadAction<TypeModule>,
    ) => ({ ...state, data: [...state.data, data] }),
  },
});

export const { setModules } = slice.actions;

export default slice.reducer;

export const selectModules = (state: RootState) => state.modules.data;
