import React from 'react';

import style from './signin-layout.module.css';

export default function SignInLayout() {
  return (
    <div className={style.layout}>
      <div className={style.container}>
        <h2 className={style.title}>SignIn</h2>

        <form className={style.form}>
          <input />
          <input />
          <button type="submit">button</button>
        </form>

        <ul className={style.footer}>
          <li>Нет аккаунта?</li>
          <li>Забыли пароль?</li>
          <li>Войти по</li>
        </ul>
      </div>
    </div>
  );
}
