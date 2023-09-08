import userApi from '..';

const userApiEndpoints = userApi
  .enhanceEndpoints({
    addTagTypes: ['user'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      updateUser: builder.mutation({
        query: (data) => ({
          url: '/api/user',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['user'],
      }),
      getIam: builder.mutation<TypeUser, void>({
        query: () => ({
          url: 'api/user',
          method: 'GET',
        }),
        invalidatesTags: ['user'],
      }),
    }),
  });

export const { useUpdateUserMutation, useGetIamMutation } = userApiEndpoints;
export { userApiEndpoints };
