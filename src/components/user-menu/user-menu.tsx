import React, { useState } from 'react';
import {
  UserIcon, MoonIcon, BookOpenIcon, BellIcon, SunIcon, BellAlertIcon,
} from '@heroicons/react/24/outline';

import Buttons from '../buttons';

import style from './user-menu.module.css';

export default function UserMenu() {
  const [isDark, setIsDark] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const buttons = [
    { handler: () => setIsAlert(!isAlert), component: isAlert ? BellAlertIcon : BellIcon },
    { handler: () => console.log(1), component: BookOpenIcon },
    { handler: () => setIsDark(!isDark), component: isDark ? SunIcon : MoonIcon },
    { handler: () => console.log(1), component: UserIcon },
  ];

  return (<Buttons buttons={buttons} extraClass={style.menu} />);
}
