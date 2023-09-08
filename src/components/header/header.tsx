import React from 'react';

import Logo from '../logo/logo';
import HeaderUserMenu from '../header-user-menu';
import HeaderMenu from '../header-menu';

import style from './header.module.css';

export default function Header() {
  return (
    <div className={style.header}>
      <Logo />
      <HeaderMenu />
      <HeaderUserMenu />
    </div>
  );
}
