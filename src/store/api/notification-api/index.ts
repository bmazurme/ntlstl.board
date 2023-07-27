// https://github.com/phryneas/cli-mqtt-chatclient/blob/main/src/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setNotification, TypeNotification } from '../../slices';

import { WSS_API } from '../../../utils';

export type Channel = 'all';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['notification'],
  endpoints: (build) => ({
    getNotification: build.query<TypeNotification[], Channel>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        {
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
          dispatch,
        },
      ) {
        // const accessToken = localStorage.getItem('accessToken');
        const url = WSS_API;
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket(url);

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            dispatch(setNotification(data));
            // if (data.channel !== arg) return;
            updateCachedData((draft) => {
              draft.push(data);
            });
          };
          ws.addEventListener('message', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
    }),
  }),
});

export const { useGetNotificationQuery } = notificationApi;
