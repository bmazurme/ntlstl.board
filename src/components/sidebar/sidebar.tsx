import React, { useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { ChevronRightIcon, ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/outline';

import IconButton from '../icon-button';
import CustomSelect from '../custom-select';

import {
  selectModules, selectBooks, setBooks, setBookName,
} from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../hooks';

import style from './sidebar.module.css';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const modules = useAppSelector(selectModules) as unknown as OptionsOrGroups<string, GroupBase<string>>;
  const books: Record<string, string>[] = useAppSelector(selectBooks);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const button = { handler: toggleOpen, component: isOpen ? ChevronLeftIcon : ChevronRightIcon };
  const addModule = { handler: () => dispatch(setBooks({ name: 'book', id: books.length.toString() })), component: PlusIcon };

  const [currentBook, setCurrentBook] = useState<Record<string, string> | null>(null);

  const setCurrent = (book: Record<string, string> | null) => {
    setCurrentBook(currentBook?.id === book?.id ? null : book);

    if (book?.name) {
      dispatch(setBookName(book.name));
      console.log(123);
    }
  };

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
          && (<div>
            {books.map((x: Record<string, string>) => (
              <div
                key={uuidv4()}
                onClick={() => setCurrent(x)}
                className={classNames(style.item, { [style.active]: currentBook?.id === x.id })}
              >
                {x.name}
              </div>
            ))}
          </div>)}
      </div>
    </div>
  );
}
