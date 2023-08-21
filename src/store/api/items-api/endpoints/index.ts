import itemsApi from '..';

const itemsApiEndpoints = itemsApi
  .enhanceEndpoints({
    addTagTypes: ['items'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      removeItem: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/items',
          method: 'DELETE',
          body: data,
        }),
        invalidatesTags: ['items'],
      }),
      setMovedItem: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/items',
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['items'],
      }),
      changeItemValue: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/items',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['items'],
      }),
      getItemResult: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/items/result',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['items'],
      }),
      addItem: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/items',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['items'],
      }),
    }),
  });

export const {
  useRemoveItemMutation,
  useSetMovedItemMutation,
  useChangeItemValueMutation,
  useGetItemResultMutation,
  useAddItemMutation,
} = itemsApiEndpoints;
export { itemsApiEndpoints };
