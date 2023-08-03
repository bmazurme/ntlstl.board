import React, { useEffect } from 'react';
import classNames from 'classnames';
// import { motion, AnimatePresence, motion, useCycle } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import Header from './components/header';
import List from './components/list';

import { useAppSelector } from '../../hooks';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { selectCurrentUser } from '../../store/slices';
import { useGetBookByIdMutation } from '../../store/api';

import style from './sidebar.module.css';

export default function Sidebar() {
  const user = useAppSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useLocalStorage('sidebar', false);
  const [getBookById, { isLoading }] = useGetBookByIdMutation();

  const button = {
    handler: () => setIsOpen(!isOpen),
    component: isOpen ? ChevronLeftIcon : ChevronRightIcon,
  };

  useEffect(() => {
    const getData = async () => {
      if (user && 'project' in user && user?.project?.value) {
        try {
          await getBookById(user?.project?.value);
        } catch (e) {
          console.log(e);
        }
      }
    };

    getData();
  }, [user?.project?.value]);

  return (
    <div className={classNames(style.sidebar, { [style.sidebar_open]: isOpen })}>
      <Header isOpen={isOpen} button={button} />
      <List isOpen={isOpen} isLoading={isLoading} />
    </div>
  );
}
