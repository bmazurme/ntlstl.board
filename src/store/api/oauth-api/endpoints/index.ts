// import oauthApi from '..';

// const oauthApiEndpoints = oauthApi
//   .enhanceEndpoints({
//     addTagTypes: ['oauth'],
//   })
//   .injectEndpoints({
//     endpoints: (builder) => ({
//       getYaToken: builder.mutation({
//         query: (data) => ({
//           url: '/api/oauth',
//           method: 'POST',
//           body: data,
//         }),
//         invalidatesTags: ['oauth'],
//       }),
//     }),
//   });

// export const { useGetYaTokenMutation } = oauthApiEndpoints;
// export { oauthApiEndpoints };
