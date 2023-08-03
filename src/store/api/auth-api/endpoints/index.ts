import authApi from '..';

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const authApiEndpoints = authApi
  .enhanceEndpoints({
    addTagTypes: ['auth'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      signUp: builder.mutation({
        query: (data) => ({
          url: '/auth/register',
          method: 'POST',
          body: data,
        }),
      }),
      signIn: builder.mutation({
        query: (body) => ({
          url: '/auth/login',
          method: 'POST',
          body,
        }),
      }),
      signOut: builder.mutation({
        query: (refreshToken) => ({
          url: '/auth/logout',
          method: 'POST',
          body: {
            token: refreshToken,
          },
        }),
      }),
      refreshToken: builder.mutation<ResponseToken, Record<string, string>>({
        query: ({ token }) => ({
          url: '/auth/token',
          method: 'POST',
          body: { token },
        }),
      }),
      getUser: builder.mutation<{ user: TypeUser }, void>({
        query: () => ({
          url: 'auth/user',
          method: 'GET',
        }),
        invalidatesTags: ['auth'],
      }),
    }),
  });

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useRefreshTokenMutation,
  useGetUserMutation,
} = authApiEndpoints;
export { authApiEndpoints };
