import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import InputField from '../../components/input-field';
import Footer from '../../components/footer';

import { Urls } from '../../utils';

import style from './signin-layout.module.css';

export default function SignInLayout() {
  const [errors] = useState({ login: '123456', password: '234567' });
  const links = [
    {
      id: uuidv4(), help: 'Нет аккаунта?', to: Urls.SIGN.UP, label: 'Зарегистрироваться',
    },
    {
      id: uuidv4(), help: 'Забыли пароль?', to: Urls.PASSWORD.FORGOT, label: 'Восстановить',
    },
    {
      id: uuidv4(), help: 'Войти по', to: Urls.BASE.INDEX, label: 'OAUTH',
    },
  ];

  return (
    <div className={style.layout}>
      <div className={style.container}>
        <h2 className={style.title}>Вход</h2>

        <form className={style.form}>
          <div className={style.fields}>
            <InputField name="login" type="text" errors={errors} />
            <InputField name="password" type="password" errors={errors} />
          </div>
          <button className={style.button} type="submit">Войти</button>
        </form>

        <Footer links={links} />
      </div>
    </div>
  );
}
