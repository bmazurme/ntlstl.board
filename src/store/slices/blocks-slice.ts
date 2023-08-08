/* eslint-disable max-len */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';
import { GroupBase, OptionsOrGroups } from 'react-select';

import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

import { blocksApiEndpoints } from '../api';

type TypeBlocksState = { data: TypeBlock };
type TypeItemValue = { index: number; id: string; item: OptionsOrGroups<string, GroupBase<string>>; }

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeBlocksState = {
  data: {},
};

const slice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
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
          [data.item.currentColumnIndex]: { ...state.data[data.item.currentColumnIndex], items: arr },
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        blocksApiEndpoints.endpoints.getBlocks.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.getBlocks.matchRejected,
        (state, action) => console.log('rejected', state, action),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.getBlocksById.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.getBlocksById.matchRejected,
        (state, action) => console.log('rejected', state, action),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.updateBlocks.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.updateBlocks.matchRejected,
        (state, action) => console.log('rejected', state, action),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.removeItem.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.removeItem.matchRejected,
        (state, action) => console.log('rejected', state, action),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.removeBlock.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.removeBlock.matchRejected,
        (state, action) => console.log('rejected', state, action),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.addBlock.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.addBlock.matchRejected,
        (state, action) => console.log('rejected', state, action),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.renameBlocks.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.renameBlocks.matchRejected,
        (state, action) => console.log('rejected', state, action),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.setMovedBlock.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.setMovedBlock.matchRejected,
        (state, action) => console.log('rejected', state, action),
      );
  },
});

export const {
  changeInputValues, changeItemValue, getResult, setMovedCard,
} = slice.actions;

export default slice.reducer;

export const selectBlocks = (state: RootState) => state.blocks.data;
