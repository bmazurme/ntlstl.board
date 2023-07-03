import { createSlice } from '@reduxjs/toolkit';

import { modules } from '../../mocks/modules';

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState = {
  data: modules,
};

const slice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    setModules: (
      state,
      { payload: data },
    ) => ({ ...state, data: [ ...state.data, data.item ] }),
  },
});

export const { setModukes } = slice.actions;

export default slice.reducer;

export const selectModules = (state) => state.modules.data;
