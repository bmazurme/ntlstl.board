import React from 'react';

import Blocks from '../blocks';
import HeaderBook from '../header-book';
import Tools from '../tools';

import style from './workplace.module.css';

export default function Workplace() {
  return (
    <div className={style.workplace}>
      <HeaderBook />
      <Blocks />
      <Tools />
    </div>
  );
}
