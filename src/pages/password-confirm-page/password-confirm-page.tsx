import React from 'react';

import PasswordConfirm from '../../layouts/password-confirm-layout';

import withUser from '../../hocs/with-user';

function PasswordConfirmPage() {
  return (<PasswordConfirm />);
}

export default withUser(PasswordConfirmPage, false);
