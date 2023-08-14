import React from 'react';

import Support from '../../components/support';
import Container from '../../components/container';

import style from './support-layout.module.css';

export default function SupportLayout() {
  return (<Container header children={<Support />} />);
}
