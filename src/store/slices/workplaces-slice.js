import { createSlice } from '@reduxjs/toolkit';

import { options } from '../../mocks/options';

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState = {
  data: options,
};

const slice = createSlice({
  name: 'workplaces',
  initialState,
  reducers: {
    setWorkplaces: (
      state,
      { payload: data },
    ) => ({ ...state, data: [ ...state.data, data.item ] }),
  },
});

export const { setWorkplaces } = slice.actions;

export default slice.reducer;

export const selectWorkplaces = (state) => state.workplaces.data;
