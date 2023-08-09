/* eslint-disable max-len */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

import { blocksApiEndpoints, itemsApiEndpoints } from '../api';

type TypeBlocksState = { data: TypeBlock };

// https://redux-toolkit.js.org/rtk-query/usage/examples
const initialState: TypeBlocksState = { data: {} };

const slice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {},
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
        itemsApiEndpoints.endpoints.removeItem.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.removeItem.matchRejected,
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
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.setMovedItem.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.setMovedItem.matchRejected,
        (state, action) => console.log('rejected', state, action),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.changeItemValues.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.changeItemValues.matchRejected,
        (state, action) => console.log('rejected', state, action),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.changeItemValue.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.changeItemValue.matchRejected,
        (state, action) => console.log('rejected', state, action),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.getItemResult.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.getItemResult.matchRejected,
        (state, action) => console.log('rejected', state, action),
      );
  },
});

export default slice.reducer;
export const selectBlocks = (state: RootState) => state.blocks.data;
