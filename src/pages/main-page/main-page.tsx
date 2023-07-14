import React from 'react';

import Main from '../../layouts/main';

import withUser from '../../hocs/with-user';

function MainPage() {
  return (<Main />);
}

export default withUser(MainPage, false);
