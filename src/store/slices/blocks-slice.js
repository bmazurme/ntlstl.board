import { createSlice } from '@reduxjs/toolkit';

import { blocks } from '../../mocks/blocks';

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState = {
  data: blocks,
};

const slice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    setBlocks: (
      state,
      { payload: data },
    ) => ({
      ...state, data,
    }),
    removeBlock: (
      state,
      { payload: data },
    ) => {
      const obj = { ...state.data };
      delete obj[data.index];
      return { ...state, data: obj }
    },
    removeItem: (
      state,
      { payload: data },
    ) => {
      return {
        ...state,
        data: {
          ...state.data,
          [data.block]: {
            ...state.data[data.block],
            items: state.data[data.block].items.filter((x) => x.id !== data.id),
          },
        },
      }
    },
    renameBlock: (
      state,
      { payload: data },
    ) => ({
      ...state,
      data: {
        ...state.data,
        [data.index]: {
          ...state.data[data.index],
          name: data.name,
        }
      },
    }),
    changeInputValues: (
      state,
      { payload: data },
    ) => ({
      ...state,
      data: {
        ...state.data,
        [data.index]: {
          ...state.data[data.index],
          items: [...state.data[data.index].items]
            .map((x) => (x.id === data.id ? { ...x, values: data.values } : x)),
        }
      },
    }),
  },
});

export const {
  setBlocks,
  removeBlock,
  removeItem,
  renameBlock,
  changeInputValues,
} = slice.actions;

export default slice.reducer;

export const selectBlocks = (state) => state.blocks.data;
