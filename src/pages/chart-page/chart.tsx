import React from 'react';

import Chart from '../../layouts/chart';

import withUser from '../../hocs/with-user';

function ChartPage() {
  return (<Chart />);
}

export default withUser(ChartPage, false);
