import React from 'react';

import Container from '../../components/container';
import Workplace from '../../components/workplace';

import style from './main-layout.module.css';

export default function MainLayout() {
  return (
    <div className={style.app}>
      <Container sidebar header children={<Workplace />} />
    </div>
  );
}
