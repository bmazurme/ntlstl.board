import React from 'react';

import Container from '../../components/container';

import style from './support-layout.module.css';

function SupportBody() {
  return (
    <h2>Support</h2>
  );
}

export default function Support() {
  return (<Container header children={<SupportBody />} />);
}
