import React from 'react';

import Blocks from '../blocks';
import Header from '../header';
import Tools from '../tools';

import style from './workplace.module.css';

export default function Workplace() {
  return (
    <div className={style.workplace}>
      <Header />
      <Blocks />
      <Tools />
    </div>
  );
}
