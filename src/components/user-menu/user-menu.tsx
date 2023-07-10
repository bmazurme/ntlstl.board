import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

  const buttons = [
    { handler: toggleBell, component: isAlert ? BellAlertIcon : BellIcon },
    { handler: () => console.log(1), component: BookOpenIcon },
    { handler: toggleDark, component: isDark ? SunIcon : MoonIcon },
    { handler: () => console.log(1), component: UserIcon },
  ];

  return (
    <div className={style.menu}>
      {buttons.map((button) => (<IconButton key={uuidv4()} {...button} />))}
    </div>
  );
}
