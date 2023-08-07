import React, { useState } from 'react';

import Footer from './components/footer';

import style from './signin-layout.module.css';

export default function SignInLayout() {
  const [errors] = useState({ login: '123456', password: '234567' });

  return (
    <div className={style.layout}>
      <div className={style.container}>
        <h2 className={style.title}>Войти</h2>

        <form className={style.form}>
          <div className={style.boxes}>
            <div className={style.box}>
              <input className={style.input} type="text" />
              <span className={style.error}>
                {errors.login}
              </span>
            </div>
            <div className={style.box}>
              <input className={style.input} type="password" />
              <span className={style.error}>
                {errors.password}
              </span>
            </div>
          </div>
          <button className={style.button} type="submit">Войти</button>
        </form>

        <Footer />
      </div>
    </div>
  );
}
