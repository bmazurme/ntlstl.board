import { createSlice } from '@reduxjs/toolkit';

import { options } from '../../mocks/options';

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState = {
  data: options[0],
};

const slice = createSlice({
  name: 'workplace',
  initialState,
  reducers: {
    setWorkplace: (
      state,
      { payload: data },
    ) => ({ ...state, data }),
  },
});

export const { setWorkplace } = slice.actions;

export default slice.reducer;

export const selectWorkplace = (state) => state.workplace.data;
