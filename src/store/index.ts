/* eslint-disable import/no-extraneous-dependencies */
// https://redux-toolkit.js.org/rtk-query/overview
import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import blocksSlice from './slices/blocks-slice';
import bookSlice from './slices/book-slice';
import booksSlice from './slices/books-slice';
import historySlice from './slices/history-slice';
import itemSlice from './slices/item-slice';
import itemsSlice from './slices/items-slice';
import itemPopupSlice from './slices/item-popup-slice';
import modulesSlice from './slices/modules-slice';
import workplaceSlice from './slices/workplace-slice';
import workplacesSlice from './slices/workplaces-slice';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// import { authApiEndpoints as authApi } from './api/auth-api/endpoints';

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = configureStore({
  reducer: {
    blocks: blocksSlice,
    book: bookSlice,
    books: booksSlice,
    history: historySlice,
    item: itemSlice,
    items: itemsSlice,
    itempopup: itemPopupSlice,
    modules: modulesSlice,
    workplace: workplaceSlice,
    workplaces: workplacesSlice,

    // Add the generated reducer as a specific top-level slice
    // [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      // authApi.middleware,
    ),
  devTools: true,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
