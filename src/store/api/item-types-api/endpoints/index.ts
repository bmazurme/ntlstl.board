import itemTypesApi from '..';

type TypeItemTypes = { _id: string; name: string; description: string; }[];

const itemTypesApiEndpoints = itemTypesApi
  .enhanceEndpoints({
    addTagTypes: ['itemType'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getItemTypes: builder.query<TypeItemTypes, void>({
        query: () => ({
          url: '/api/item-types',
          method: 'GET',
        }),
        providesTags: ['itemType'],
      }),
      // getBlocks: builder.query<TypeBlock, string | void>({
      //   query: (id) => ({
      //     url: `/api/blocks/${id}`,
      //     method: 'GET',
      //   }),
      //   providesTags: ['blocks'],
      // }),
    }),
  });

export const {
  useGetItemTypesQuery,
} = itemTypesApiEndpoints;
export { itemTypesApiEndpoints };
