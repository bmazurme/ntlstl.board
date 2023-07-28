import bookApi from '..';

type TypeBook = {
  name: string;
};

const bookApiEndpoints = bookApi
  .enhanceEndpoints({
    addTagTypes: ['book'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBooks: builder.query<TypeBook[], void>({
        query: () => ({
          url: '/api/books',
          method: 'GET',
        }),
        providesTags: ['book'],
      }),
      addBook: builder.mutation({
        query: (data) => ({
          url: '/api/books',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['book'],
      }),
    }),
  });

export const { useGetBooksQuery, useAddBookMutation } = bookApiEndpoints;
export { bookApiEndpoints };
