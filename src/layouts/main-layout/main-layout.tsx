import React from 'react';

import Container from '../../components/container';
import Main from '../../components/main';

import style from './main-layout.module.css';

export default function MainLayout() {
  return (
    <div className={style.app}>
      <Container header children={<Main />} />
    </div>
  );
}
