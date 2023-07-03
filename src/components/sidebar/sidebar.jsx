import React, { useState } from 'react';
import classNames from 'classnames';
import { ChevronRightIcon, ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/outline';

import IconButton from '../icon-button';
import CustomSelect from '../custom-select';
import { selectModules } from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../hooks';

import style from './sidebar.module.css';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const modules = useAppSelector(selectModules);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const button = { handler: toggleOpen, component: isOpen ? ChevronLeftIcon: ChevronRightIcon };
  const addModule = { handler: () => console.log('p'), component: PlusIcon };
  return (
    <div className={classNames(style.sidebar, { [style.sidebar_open]: isOpen })}>
    <div className={style.sidebar_header}>
      {isOpen && 
      <div className={style.buttons}>
       <CustomSelect
          options={modules}
          // onChange={(pr) => dispatch(setWorkplace(pr))}
          // value={project}
        />
        <IconButton {...addModule} />
      </div>
 }
      
      <IconButton {...button} />
    </div>
    <div className={style.container}>
      {isOpen &&<div className={style.item}>Title book</div>}
    </div>
  </div>
  );
}
