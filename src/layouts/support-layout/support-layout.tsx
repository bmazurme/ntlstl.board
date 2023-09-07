import React from 'react';

import Support from '../../components/support/support';
import Container from '../../components/container/container';

// import style from './support-layout.module.css';

export default function SupportLayout() {
  return (<Container header children={<Support />} />);
}
