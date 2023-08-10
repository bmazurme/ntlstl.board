import itemsApi from '..';

// type TypeTest = {
//   currentItem: TypeItem & { currentColumnIndex: number, id: string };
//   columnName: number;
//   id: string;
// };

const itemsApiEndpoints = itemsApi
  .enhanceEndpoints({
    addTagTypes: ['blocks'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      removeItem: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/items',
          method: 'DELETE',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
      setMovedItem: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/items',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
      changeItemValues: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/items/values',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
      changeItemValue: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/items/value',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
      getItemResult: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/items/result',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
      addItem: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/items',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
    }),
  });

export const {
  useRemoveItemMutation,
  useSetMovedItemMutation,
  useChangeItemValuesMutation,
  useChangeItemValueMutation,
  useGetItemResultMutation,
  useAddItemMutation,
} = itemsApiEndpoints;
export { itemsApiEndpoints };
