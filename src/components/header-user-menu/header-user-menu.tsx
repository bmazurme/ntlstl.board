import React, { useState, useContext } from 'react';
import {
  UserIcon, MoonIcon, BookOpenIcon, BellIcon, SunIcon, BellAlertIcon,
} from '@heroicons/react/24/outline';

import ThemeContext from '../../context/theme-context';

import Buttons from '../buttons';

import style from './header-user-menu.module.css';

export default function HeaderUserMenu() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [isAlert, setIsAlert] = useState(false);

  const toggleTheme = () => {
    setIsDark(isDark === 'light' ? 'dark' : 'light');
    localStorage.setItem('data-theme', isDark === 'light' ? 'dark' : 'light');
  };

  const buttons = [
    { handler: () => setIsAlert(!isAlert), component: isAlert ? BellAlertIcon : BellIcon },
    { handler: () => console.log(1), component: BookOpenIcon },
    { handler: toggleTheme, component: isDark === 'light' ? SunIcon : MoonIcon },
    { handler: () => console.log(1), component: UserIcon },
  ];

  return (<Buttons buttons={buttons} extraClass={style.menu} />);
}
