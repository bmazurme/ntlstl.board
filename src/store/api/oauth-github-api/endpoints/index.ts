import oauthApi from '..';

const oauthApiEndpoints = oauthApi
  .enhanceEndpoints({
    addTagTypes: ['oauthGithub'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getGithubToken: builder.mutation({
        query: (data) => ({
          url: '/oauth/github',
          method: 'POST',
          body: data.body,
        }),
      }),
    }),
  });

export const { useGetGithubTokenMutation } = oauthApiEndpoints;
export { oauthApiEndpoints };
