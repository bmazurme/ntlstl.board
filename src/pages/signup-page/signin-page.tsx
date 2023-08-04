import React from 'react';

import SignUp from '../../layouts/signup-layout';

import withUser from '../../hocs/with-user';

function SignUpPage() {
  return (<SignUp />);
}

export default withUser(SignUpPage, false);
