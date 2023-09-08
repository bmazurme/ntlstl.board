import fieldApi from '..';

type TypeItemValuesChange = {
  index: number;
  id: string;
  values: TypeValue[];
  bookId: string | undefined;
};

const fieldApiEndpoints = fieldApi
  .enhanceEndpoints({
    addTagTypes: ['field'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      changeItemValues: builder.mutation<TypeBlock, TypeItemValuesChange>({
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
