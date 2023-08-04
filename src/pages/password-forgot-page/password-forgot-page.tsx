import React from 'react';

import PasswordForgot from '../../layouts/password-forgot-layout';

import withUser from '../../hocs/with-user';

function PasswordForgotPage() {
  return (<PasswordForgot />);
}

export default withUser(PasswordForgotPage, false);
