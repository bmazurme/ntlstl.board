import { createSlice } from '@reduxjs/toolkit';
import { GroupBase, OptionsOrGroups } from 'react-select';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

import { blocks, TypeBlock, TypeValue } from '../../mocks/blocks';

type TypeBlocksState = { data: TypeBlock };
type TypeItemValue = { index: number, id: string, item: OptionsOrGroups<string, GroupBase<string>> }

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeBlocksState = {
  data: blocks,
};

const slice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    setBlocks: (
      state,
      { payload: data }: PayloadAction<TypeBlock>,
    ) => ({
      ...state, data,
    }),
    removeBlock: (
      state,
      { payload: data }: PayloadAction<{ index: number }>,
    ) => {
      const obj = { ...state.data };
      delete obj[data.index];
      return { ...state, data: obj };
    },
    removeItem: (
      state,
      { payload: data }: PayloadAction<{ block: number, id: string }>,
    ) => ({
      ...state,
      data: {
        ...state.data,
        [data.block]: {
          ...state.data[data.block],
          items: state.data[data.block].items.filter((x) => x.id !== data.id),
        },
      },
    }),
    renameBlock: (
      state,
      { payload: data }: PayloadAction<{ index: number, name: string }>,
    ) => ({
      ...state,
      data: {
        ...state.data,
        [data.index]: {
          ...state.data[data.index],
          name: data.name,
        },
      },
    }),
    changeInputValues: (
      state,
      { payload: data }: PayloadAction<{ index: number, id: string, values: TypeValue[] }>,
    ) => ({
      ...state,
      data: {
        ...state.data,
        [data.index]: {
          ...state.data[data.index],
          items: [...state.data[data.index].items]
            .map((x) => (x.id === data.id ? { ...x, values: data.values } : x)),
        },
      },
    }),
    changeItemValue: (
      state,
      { payload: data }: PayloadAction<TypeItemValue>,
    ) => ({
      ...state,
      data: {
        ...state.data,
        [data.index]: {
          ...state.data[data.index],
          items: [...state.data[data.index].items]
            .map((x) => (x.id === data.id
              ? { ...x, item: (data.item as unknown as { value: string, label: string }) }
              : x)),
        },
      },
    }),
    getResult: (
      state,
      { payload: data }: PayloadAction<{ index: number, id: string }>,
    ) => ({
      ...state,
      data: {
        ...state.data,
        [data.index]: {
          ...state.data[data.index],
          items: [...state.data[data.index].items]
            .map((x) => (x.id === data.id ? {
              ...x,
              // some calc
              result: x.values.reduce((a: number, i: { value: number }) => a + Number(i.value), 0),
            } : x)),
        },
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
  changeItemValue,
  getResult,
} = slice.actions;

export default slice.reducer;

export const selectBlocks = (state: RootState) => state.blocks.data;

// type TypeValue = { name: string; value: string | number; };
