import React from 'react';

import style from './button.module.css';

export default function Button({ icon: Icon, handler, title }) {
  return (
    <button type="button" className={style.button} onClick={handler}>
      {Icon &&
        <div className={style.box}>
          <Icon className="h-6 w-6 text-blue-500" />
        </div>}
      <span>{title}</span>
    </button>
  );
}
