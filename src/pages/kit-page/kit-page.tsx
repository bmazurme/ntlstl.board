import React from 'react';

import KitLayout from '../../layouts/kit-layout/kit-layout';

import withUser from '../../hocs/with-user';

function KitPage() {
  return (<KitLayout />);
}

export default withUser(KitPage, false);
