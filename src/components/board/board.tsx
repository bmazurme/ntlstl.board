import React from 'react';

import Blocks from '../blocks';
import WorkplaceHeader from '../workplace-header';
import WorkplaceTools from '../workplace-tools';

import { useAppSelector } from '../../hooks';
import { selectCurrentBook } from '../../store/slices';

export default function Board() {
  const data = useAppSelector(selectCurrentBook);
  return (
    <>
      {data && (
        <>
          <WorkplaceHeader />
          <Blocks />
          <WorkplaceTools />
        </>
      )}
    </>
  );
}
