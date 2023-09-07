import React from 'react';
import classNames from 'classnames';

import style from './field.module.css';

type TypeFieldProps = { label: string; value?: string; type?: 'red'| 'blue' | 'green'; };

export default function Field({ label, value, type }: TypeFieldProps) {
  return (
    <div className={
      classNames(
        style.field,
        { [style.red]: type === 'red' },
        { [style.blue]: type === 'blue' },
        { [style.green]: type === 'green' },
      )
    }
    >
      <span className={style.label}>{label}</span>
      {value && <span className={style.value}>{value}</span>}
    </div>
  );
}
