/* eslint-disable max-len */
import React, { useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { ChevronRightIcon, ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/outline';

import IconButton from '../icon-button';
import CustomSelect from '../custom-select';
import { selectModules, selectBooks, setBooks } from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../hooks';

import style from './sidebar.module.css';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const modules = useAppSelector(selectModules) as unknown as OptionsOrGroups<string, GroupBase<string>>;
  const books: Record<string, string>[] = useAppSelector(selectBooks);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const button = { handler: toggleOpen, component: isOpen ? ChevronLeftIcon : ChevronRightIcon };
  const addModule = { handler: () => dispatch(setBooks({ name: 'book' })), component: PlusIcon };

  return (
    <div className={classNames(style.sidebar, { [style.sidebar_open]: isOpen })}>
      <div className={style.sidebar_header}>
        {isOpen
          && (
          <div className={style.buttons}>
            <CustomSelect options={modules} />
            <IconButton {...addModule} />
          </div>
          )}
        <IconButton {...button} />
      </div>
      <div className={style.container}>
        {isOpen
          && (
          <div>
            {books.map(() => (<div key={uuidv4()} className={style.item}>Title book</div>))}
          </div>
          )}
      </div>
    </div>
  );
}
