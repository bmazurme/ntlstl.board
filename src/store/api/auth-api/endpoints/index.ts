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
      signInWitOauthYa: builder.mutation({
        query: (body) => ({
          url: '/api/oauth',
          method: 'POST',
          body,
        }),
      }),
      signInWitOauthGithub: builder.mutation({
        query: (body) => ({
          url: '/api/oauth/github',
          method: 'POST',
          body,
        }),
      }),
      signOut: builder.mutation<void, void>({
        query: () => ({
          url: '/api/logout',
          method: 'POST',
        }),
      }),
      refreshToken: builder.mutation<ResponseToken, Record<string, string>>({
        query: ({ token }) => ({
          url: '/auth/token',
          method: 'POST',
          body: { token },
        }),
      }),
    }),
  });

export const {
  useSignOutMutation,
  useSignInWitOauthYaMutation,
  useSignInWitOauthGithubMutation,
} = authApiEndpoints;
export { authApiEndpoints };
