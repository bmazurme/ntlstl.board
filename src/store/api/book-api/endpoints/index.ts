import bookApi from '..';

const bookApiEndpoints = bookApi
  .enhanceEndpoints({
    addTagTypes: ['book'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBooks: builder.query<TypeBook[], string>({
        query: (id) => ({
          url: `/api/books/${id}`,
          method: 'GET',
        }),
        providesTags: ['book'],
      }),
      getBookById: builder.mutation({
        query: (id) => ({
          url: `/api/books/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['book'],
      }),
      addBook: builder.mutation({
        query: (data: Omit<TypeBook, 'id'>) => ({
          url: '/api/books',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['book'],
      }),
      renameBook: builder.mutation({
        query: (data) => ({
          url: '/api/books',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['book'],
      }),
    }),
  });

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useRenameBookMutation,
  useGetBookByIdMutation,
} = bookApiEndpoints;
export { bookApiEndpoints };
