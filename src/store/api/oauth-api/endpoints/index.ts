import oauthApi from '..';

const oauthApiEndpoints = oauthApi
  .enhanceEndpoints({
    addTagTypes: ['oauth'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getYaToken: builder.mutation({
        query: (data) => ({
          url: '/token',
          method: 'POST',
          body: data.body,
        }),
      }),
    }),
  });

export const { useGetYaTokenMutation } = oauthApiEndpoints;
export { oauthApiEndpoints };
