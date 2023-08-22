import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import InputField from '../../components/input-field';
import Button from '../../components/button';
import Footer from '../../components/footer';

import useUser from '../../hooks/use-user';

import { Urls } from '../../utils';

import style from './signin-layout.module.css';

export default function SignInLayout() {
  const userData = useUser();
  const navigate = useNavigate();
  const [errors] = useState({ login: '123456', password: '234567' });
  const links = [
    {
      id: uuidv4(), help: 'Войти по', to: Urls.SIGN.YANDEX, label: 'Yandex',
    },
    {
      id: uuidv4(), help: 'Войти по', to: Urls.SIGN.GITHUB, label: 'GitHub',
    },
  ];

  useEffect(() => {
    if (userData) {
      navigate(Urls.BASE.INDEX);
    }
  }, []);

  return (
    <div className={style.layout}>
      <div className={style.container}>
        <h2 className={style.title}>Вход</h2>
        <form className={style.form}>
          <div className={style.fields}>
            <InputField name="login" type="text" errors={errors} />
            <InputField name="password" type="password" errors={errors} />
          </div>
          <Button type="submit" title="Войти" extraClass={style.button} />
        </form>
        <Footer links={links} />
      </div>
    </div>
  );
}
