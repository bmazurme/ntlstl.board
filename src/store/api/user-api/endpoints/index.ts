import userApi from '..';

export type TypeUser = {
  name: string;
  email: string;
  active: boolean;
  paid: string;
};

const userApiEndpoints = userApi
  .enhanceEndpoints({
    addTagTypes: ['user'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserMe: builder.query<{ user: TypeUser }, void>({
        query: () => ({
          url: '/api/user',
          method: 'GET',
        }),
      }),
    }),
  });

export const { useGetUserMeQuery } = userApiEndpoints;
export { userApiEndpoints };
