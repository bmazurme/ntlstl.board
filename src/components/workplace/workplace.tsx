import React from 'react';

import Blocks from '../blocks';
import WorkplaceHeader from '../workplace-header';
import WorkplaceTools from '../workplace-tools';

import style from './workplace.module.css';
import { useAppSelector } from '../../hooks';
import { selectBookId } from '../../store/slices';

export default function Workplace() {
  const data = useAppSelector(selectBookId);

  return (
    <div className={style.workplace}>
      {data && (
        <>
          <WorkplaceHeader />
          <Blocks />
          <WorkplaceTools />
        </>
      )}
    </div>
  );
}
