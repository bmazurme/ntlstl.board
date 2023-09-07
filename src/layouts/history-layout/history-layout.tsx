import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import useHistory from '../../hooks/use-history';

// import style from './history-layout.module.css';

export default function HistoryLayout() {
  const history = useHistory();
  console.log(history);

  return (
    <>
      <h2>History</h2>
      {history.map((x, i) => (<li key={uuidv4()}>{`State ${i + 1} - ${x.user}`}</li>))}
    </>
  );
}
