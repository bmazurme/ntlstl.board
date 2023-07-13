import { createSlice } from '@reduxjs/toolkit';
import { GroupBase, OptionsOrGroups } from 'react-select';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

import { blocks } from '../../mocks/blocks';

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
    setChangeItemColumn: (
      state,
      { payload: data }: PayloadAction<{
         currentItem: TypeItem & { currentColumnIndex: number, id: string },
         columnName: number,
      }>,
    ) => {
      const index = data.currentItem.currentColumnIndex;
      const item = state.data[index];
      return {
      ...state,
      data: {
        ...state.data,
        [index]: {
          ...item,
          items: item.items.filter((x: TypeItem) => x.id !== data.currentItem.id),
        },
        [data.columnName]: {
          ...state.data[data.columnName],
          items: [...state.data[data.columnName].items, data.currentItem],
        },
      },
    }},
    setMovedBlock: (
      state,
      { payload: data }: PayloadAction<{
        dragIndex: number,
        hoverIndex: number,
        item: TypeItem & { currentColumnIndex: number, index: number },
      }>,
    ) => {
      const obj: TypeBlock = {};
      const coppiedStateArray = [...Object.keys(state.data)].map((x) => Number(x));
      coppiedStateArray.splice(data.hoverIndex, 1, data.dragIndex);
      coppiedStateArray.splice(data.dragIndex, 1, data.hoverIndex);
      coppiedStateArray.forEach((x, i: number) => obj[i] = { ...state.data[x], index: i });

      return {
      ...state, data: obj,
    }},
    setMovedCard: (
      state,
      { payload: data }: PayloadAction<{
        dragIndex: number,
        hoverIndex: number,
        item: TypeItem & { currentColumnIndex: number, index: number },
        dragItem: TypeItem,
      }>,
    ) => {
      const coppiedStateArray = [...state.data[data.item.currentColumnIndex].items];
      const prevItem = coppiedStateArray.splice(data.hoverIndex, 1, data.dragItem);
      coppiedStateArray.splice(data.dragIndex, 1, prevItem[0]);
      const arr = coppiedStateArray.filter((x) => x);

      return {
        ...state,
        data: {
          ...state.data,
          [data.item.currentColumnIndex]: { ...state.data[data.item.currentColumnIndex], items: arr }
        },
      }},
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
  setChangeItemColumn,
  setMovedBlock,
  setMovedCard,
} = slice.actions;

export default slice.reducer;

export const selectBlocks = (state: RootState) => state.blocks.data;

//    currentItem: TypeItem & { currentColumnIndex: number, id: string },
