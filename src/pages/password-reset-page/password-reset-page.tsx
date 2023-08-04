import React from 'react';

import PasswordReset from '../../layouts/password-reset-layout';

import withUser from '../../hocs/with-user';

function PasswordResetPage() {
  return (<PasswordReset />);
}

export default withUser(PasswordResetPage, false);
