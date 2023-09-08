import blockApi from '..';

type TypeItemBlock = {
  dragIndex: number;
  hoverIndex: number;
  item: TypeItem & { currentColumnIndex: number, index: number };
};
type TypeBlockUpdateProps = {
  bookId: string | undefined;
  columnName?: number;
  currentItem: TypeItem & { currentColumnIndex: number; id: string; columnName?: number; };
};
type TypeBlockRenameProps = { name: string; index: number; bookId: string | undefined; };

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
      updateBlocks: builder.mutation<TypeBlock, TypeBlockUpdateProps>({
        query: (data) => ({
          url: '/api/blocks',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
      removeBlock: builder.mutation<TypeBlock, { index: number; bookId: string | undefined; }>({
        query: (data) => ({
          url: '/api/blocks/book',
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
      setBlocks: builder.mutation<TypeBlock, { bookId: string | undefined; data: TypeBlock; }>({
        query: (data) => ({
          url: '/api/blocks',
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
      addBlock: builder.mutation<TypeBlock, { bookId: string | undefined; }>({
        query: (data) => ({
          url: '/api/blocks',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
      renameBlocks: builder.mutation<TypeBlock, TypeBlockRenameProps>({
        query: (data) => ({
          url: '/api/blocks/rename',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
      setMovedBlock: builder.mutation<TypeBlock, TypeItemBlock>({
        query: (data) => ({
          url: '/api/blocks/set-moved-block',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['blocks'],
      }),
    }),
  });

export const {
  useGetBlocksQuery,
  useGetBlocksByIdMutation,
  useUpdateBlocksMutation,
  useAddBlockMutation,
  useRenameBlocksMutation,
  useRemoveBlockMutation,
  useSetMovedBlockMutation,
  useSetBlocksMutation,
} = blocksApiEndpoints;
export { blocksApiEndpoints };
