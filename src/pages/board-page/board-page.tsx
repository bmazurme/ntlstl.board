import React from 'react';

import BoardLayout from '../../layouts/board-layout';

import withUser from '../../hocs/with-user';

function BoardPage() {
  return (<BoardLayout />);
}

export default withUser(BoardPage, false);
