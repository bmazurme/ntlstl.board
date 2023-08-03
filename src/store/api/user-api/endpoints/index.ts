import userApi from '..';

const userApiEndpoints = userApi
  .enhanceEndpoints({
    addTagTypes: ['user'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserMe: builder.query<TypeUser, void>({
        query: () => ({
          url: '/api/user',
          method: 'GET',
        }),
        providesTags: ['user'],
      }),
      updateUser: builder.mutation({
        query: (data) => ({
          url: '/api/user',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['user'],
      }),
    }),
  });

export const { useGetUserMeQuery, useUpdateUserMutation } = userApiEndpoints;
export { userApiEndpoints };
