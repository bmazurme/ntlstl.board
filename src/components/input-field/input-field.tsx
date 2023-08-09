import React from 'react';

import style from './input-field.module.css';

export default function InputField({ type, name, errors }
  : { type: 'text' | 'password', name: string, errors: Record<string, string> }) {
  return (
    <div className={style.inputfield}>
      <input className={style.input} type={type} placeholder={name} />
      <span className={style.error}>
        {errors[name] && `${errors[name]}`}
      </span>
    </div>
  );
}
