import React from 'react';

import Sidebar from '../sidebar';
import Workplace from '../workplace';

import style from './container.module.css';

export default function Container() {
  return (
    <div className={style.container}>
      <Sidebar />
      <Workplace />
    </div>
  );
}
