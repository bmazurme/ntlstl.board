import React from 'react';

import style from './icon-button.module.css';

export default function IconButton({ handler, component: Component }) {
  return (
    <button type="button" className={style.button} onClick={handler}>
      <Component className="h-6 w-6 text-blue-500" />
    </button>
  );
}
