import projectApi from '..';

type TypeProject = { value: string; label: string; };

const projectApiEndpoints = projectApi
  .enhanceEndpoints({
    addTagTypes: ['project'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProjects: builder.query<TypeProject[], void>({
        query: () => ({
          url: '/api/projects',
          method: 'GET',
        }),
        providesTags: ['project'],
      }),
      addProject: builder.mutation<TypeProject, void>({
        query: () => ({
          url: '/api/projects',
          method: 'POST',
        }),
        invalidatesTags: ['project'],
      }),
    }),
  });

export const { useGetProjectsQuery, useAddProjectMutation } = projectApiEndpoints;
export { projectApiEndpoints };
