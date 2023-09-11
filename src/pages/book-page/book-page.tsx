import React from 'react';

import BooksLayout from '../../layouts/book-layout';

import withUser from '../../hocs/with-user';

function BookPage() {
  return (<BooksLayout />);
}

export default withUser(BookPage, false);
