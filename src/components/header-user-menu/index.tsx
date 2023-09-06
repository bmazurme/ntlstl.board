/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserIcon, MoonIcon, BookOpenIcon, BellIcon, SunIcon, BellAlertIcon,
} from '@heroicons/react/24/outline';

import ThemeContext from '../../context/theme-context';
import { useGetNotificationQuery } from '../../store/api';

import Buttons from '../buttons';
import Modal from '../modal';
import Notification from '../../layouts/notification-layout';

import { useModal } from '../../hooks';
import { Urls } from '../../utils';

import style from './header-user-menu.module.css';

export default function HeaderUserMenu() {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data = [] } = useGetNotificationQuery('all');
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [isAlert, setIsAlert] = useState(false);

  const toggleTheme = () => {
    setIsDark(isDark === 'light' ? 'dark' : 'light');
    localStorage.setItem('data-theme', isDark === 'light' ? 'dark' : 'light');
  };

  const openNotification = () => {
    setIsAlert((pre) => !pre);
    openModal();
  };

  const alertIcon = isAlert || data.length > 0 ? BellAlertIcon : BellIcon;
  const darkIcon = isDark === 'dark' ? SunIcon : MoonIcon;
  const goToSupport = () => navigate(Urls.SUPPORT.INDEX, { state: { pathname: location.pathname } });
  const goToProfile = () => navigate(Urls.PROFILE.INDEX, { state: { pathname: location.pathname } });

  const buttons = [
    { handler: openNotification, component: alertIcon },
    { handler: goToSupport, component: BookOpenIcon },
    { handler: toggleTheme, component: darkIcon },
    { handler: goToProfile, component: UserIcon },
  ];

  return (
    <>
      <Buttons buttons={buttons} extraClass={style.menu} />
      {isModalOpen && (<Modal onClose={closeModal} children={<Notification />} />)}
    </>
  );
}
