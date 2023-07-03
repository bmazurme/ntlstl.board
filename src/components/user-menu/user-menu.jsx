import React, { useState } from 'react';

import {
  UserIcon, MoonIcon, BookOpenIcon, BellIcon, SunIcon, BellAlertIcon,
} from '@heroicons/react/24/outline';

import IconButton from '../icon-button';

import style from './user-menu.module.css';

export default function UserMenu() {
  const [isDark, setIsDark] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const toggleDark = () => setIsDark(!isDark);
  const toggleBell = () => setIsAlert(!isAlert);
  const button = { handler: () => console.log(1), component: UserIcon };
  const book = { handler: () => console.log(1), component: BookOpenIcon };
  const theme = { handler: toggleDark, component: isDark ? SunIcon : MoonIcon };
  const bell = { handler: toggleBell, component: isAlert ? BellAlertIcon : BellIcon };


  return (
    <div className={style.menu}>
    <IconButton {...bell} />
    <IconButton {...book} />
    <IconButton {...theme} />
    <IconButton {...button} />
  </div>
  );
}
