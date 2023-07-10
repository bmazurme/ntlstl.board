import React from 'react';
import { RectangleGroupIcon } from '@heroicons/react/24/outline';

import IconButton from '../icon-button';

import style from './logo.module.css';

export default function App() {
  const btn = { handler: () => console.log(1), component: RectangleGroupIcon };

  return (
    <div className={style.logo}>
      <IconButton {...btn} />
    </div>
  );
}
