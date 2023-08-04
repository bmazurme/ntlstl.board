/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector } from '../../../../hooks';
import { selectBooks, selectCurrentUser } from '../../../../store/slices';

import style from './list.module.css';

export default function List({ isOpen, isLoading }
  : { isOpen: boolean; isLoading: boolean; }) {
  const { bookId } = useParams();
  const navigate =  useNavigate();
  const user = useAppSelector(selectCurrentUser)!;
  const books: TypeBook[] = useAppSelector(selectBooks);

  const setCurrent = async (book: TypeBook | null) => {
    if (book?.name) {
      navigate(bookId === book?.id ? '/projects' : `/projects/${user.project!.value}/${book.id}`);
    }
  };

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
                  className={classNames(style.item, { [style.active]: bookId === x.id })}
                >
                  {x.name}
                </li>
              ))}
          </>
        )}
    </ul>
  );
}
