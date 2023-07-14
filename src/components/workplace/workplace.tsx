import React from 'react';

import Blocks from '../blocks';
import WorkplaceHeader from '../workplace-header';
import WorkplaceTools from '../workplace-tools';

import style from './workplace.module.css';

export default function Workplace() {
  return (
    <div className={style.workplace}>
      <WorkplaceHeader />
      <Blocks />
      <WorkplaceTools />
    </div>
  );
}
