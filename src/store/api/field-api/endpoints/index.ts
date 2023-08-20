import fieldApi from '..';

const fieldApiEndpoints = fieldApi
  .enhanceEndpoints({
    addTagTypes: ['field'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      changeItemValues: builder.mutation<TypeBlock, any>({
        query: (data) => ({
          url: '/api/fields',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['field'],
      }),
    }),
  });

export const { useChangeItemValuesMutation } = fieldApiEndpoints;
export { fieldApiEndpoints };
