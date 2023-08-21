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
    }),
  });

export const { useGetItemTypesQuery } = itemTypesApiEndpoints;
export { itemTypesApiEndpoints };
