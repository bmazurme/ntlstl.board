import blockApi from '..';

const blocksApiEndpoints = blockApi
  .enhanceEndpoints({
    addTagTypes: ['blocks'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBlocks: builder.query<TypeBlock, string | void>({
        query: (id) => ({
          url: `/api/blocks/${id}`,
          method: 'GET',
        }),
        providesTags: ['blocks'],
      }),
      getBlocksById: builder.mutation<TypeBlock, string | void>({
        query: (id) => ({
          url: `/api/blocks/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['blocks'],
      }),
    }),
  });

export const { useGetBlocksQuery, useGetBlocksByIdMutation } = blocksApiEndpoints;
export { blocksApiEndpoints };
