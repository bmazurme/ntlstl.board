import React from 'react';
import { Link } from 'react-router-dom';

import { Urls } from '../../../../utils';

import style from './footer.module.css';

export default function Footer() {
  return (
    <ul className={style.footer}>
      <li className={style.item}>
        Нет аккаунта?
        <Link to={Urls.SIGN.UP} className={style.link}>Зарегистрироваться</Link>
      </li>
      <li className={style.item}>
        Забыли пароль?
        <Link to={Urls.PASSWORD.FORGOT} className={style.link}>Восстановить</Link>
      </li>
      <li className={style.item}>Войти по</li>
    </ul>
  );
}
