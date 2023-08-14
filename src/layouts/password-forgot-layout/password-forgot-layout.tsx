import React, { useState } from 'react';

import InputField from '../../components/input-field';
import Button from '../../components/button';

import style from './password-forgot-layout.module.css';

export default function PasswordForgotLayout() {
  const [errors] = useState({ email: '123456' });

  return (
    <div className={style.layout}>
      <div className={style.container}>
        <h2 className={style.title}>Сброс пароля</h2>
        <form className={style.form}>
          <div className={style.fields}>
            <InputField name="email" type="text" errors={errors} />
          </div>
          <Button type="submit" title="Сбросить" extraClass={style.button} />
        </form>
      </div>
    </div>
  );
}
