import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import IconButton from '../icon-button';

import style from './buttons.module.css';

export default function Buttons({ buttons }) {
  return (
    <div className={style.buttons}>
      {buttons.map((button) => (
        <IconButton key={uuidv4()} {...button} />
      ))}
    </div>
  );
}
