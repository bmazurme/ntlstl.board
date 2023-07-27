import React, { useState, useContext } from 'react';
import {
  UserIcon, MoonIcon, BookOpenIcon, BellIcon, SunIcon, BellAlertIcon,
} from '@heroicons/react/24/outline';

import ThemeContext from '../../context/theme-context';
import { useGetNotificationQuery } from '../../store/api';

import Buttons from '../buttons';

import style from './header-user-menu.module.css';

export default function HeaderUserMenu() {
  const { data = [] } = useGetNotificationQuery('all');
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [isAlert, setIsAlert] = useState(false);
  console.log(data);

  const toggleTheme = () => {
    setIsDark(isDark === 'light' ? 'dark' : 'light');
    localStorage.setItem('data-theme', isDark === 'light' ? 'dark' : 'light');
  };

  const buttons = [
    {
      handler: () => setIsAlert((pre) => !pre),
      component: isAlert || data.length > 0 ? BellAlertIcon : BellIcon,
    },
    {
      handler: () => console.log(1),
      component: BookOpenIcon,
    },
    {
      handler: toggleTheme,
      component: isDark === 'light' ? SunIcon : MoonIcon,
    },
    {
      handler: () => console.log(1),
      component: UserIcon,
    },
  ];

  return (<Buttons buttons={buttons} extraClass={style.menu} />);
}
