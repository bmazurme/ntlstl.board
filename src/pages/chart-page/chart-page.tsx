import React from 'react';

import ChartLayout from '../../layouts/chart-layout/chart-layout';

import withUser from '../../hocs/with-user';

function ChartPage() {
  return (<ChartLayout />);
}

export default withUser(ChartPage, false);
