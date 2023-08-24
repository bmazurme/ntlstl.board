import React from 'react';

import style from './input-field.module.css';

export default function InputField({
  type, name, errors, onChange, value,
}: {
  type: 'text' | 'password';
  name: string;
  value?: string;
  errors: Record<string, string>;
  onChange?: () => void;
}) {

  return (
    <div className={style.inputfield}>
      <input
        type={type}
        className={style.input}
        name={name}
        value={value}
        placeholder={name}
        onChange={onChange}
      />
      {errors[name] &&
        <span className={style.error}>
          {`${errors[name]}`}
        </span>}
    </div>
  );
}
