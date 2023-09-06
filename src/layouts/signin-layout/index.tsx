import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Footer from '../../components/footer';

import useUser from '../../hooks/use-user';

import { Urls } from '../../utils';

import style from './signin-layout.module.css';

export default function SignInLayout() {
  const userData = useUser();
  const navigate = useNavigate();
  const links = [
    { id: uuidv4(), to: Urls.SIGN.YANDEX, label: 'Yandex' },
    { id: uuidv4(), to: Urls.SIGN.GITHUB, label: 'GitHub' },
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
        <h3 className={style.description}>Войти с помощью:</h3>
        <Footer links={links} />
      </div>
    </div>
  );
}
