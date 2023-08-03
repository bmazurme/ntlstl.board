/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { selectBooks, setBookId, selectCurrentUser } from '../../../../store/slices';
import { useGetBlocksByIdMutation } from '../../../../store/api';

import style from './list.module.css';

export default function List({ isOpen, isLoading }
  : { isOpen: boolean; isLoading: boolean; }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const books: TypeBook[] = useAppSelector(selectBooks);
  const [currentBook, setCurrentBook] = useState<TypeBook | null>(null);
  const [blocksById] = useGetBlocksByIdMutation();
  const setCurrent = async (book: TypeBook | null) => {
    setCurrentBook(currentBook?.id === book?.id ? null : book);

    if (book?.name) {
      await blocksById(book.id);
      dispatch(setBookId(currentBook?.id === book?.id ? null : book));
    }
  };

  useEffect(() => {
    setCurrent(null);
    dispatch(setBookId(null));
  }, [user?.project?.value]);

  return (
    <ul className={style.container}>
      {isOpen
        && (
          <>
            {isLoading
              ? <div>loading</div>
              : books.map((x: TypeBook) => (
                <li
                  key={uuidv4()}
                  onClick={() => setCurrent(x)}
                  className={classNames(style.item, { [style.active]: currentBook?.id === x.id })}
                >
                  {x.name}
                </li>
              ))}
          </>
        )}
    </ul>
  );
}
