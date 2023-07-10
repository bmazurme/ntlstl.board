import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

type TypePopup = { index: number | null, id: string | null, isOpen: boolean };
type TypePopupState = { data: TypePopup };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypePopupState = {
  data: { index: null, id: null, isOpen: false },
};

const slice = createSlice({
  name: 'itempopup',
  initialState,
  reducers: {
    setItemPopup: (
      state,
      { payload: data }: PayloadAction<TypePopup>,
    ) => ({ ...state, data }),
  },
});

export const { setItemPopup } = slice.actions;

export default slice.reducer;

export const selectItemPopup = (state: RootState) => state.itempopup.data;
