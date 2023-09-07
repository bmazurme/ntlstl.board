import React from 'react';

import SignIn from '../../layouts/signin-layout';

import withUser from '../../hocs/with-user';

function SignInPage() {
  return (<SignIn />);
}

export default withUser(SignInPage, false);
