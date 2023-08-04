import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router';

import Blocks from '../blocks';
import WorkplaceHeader from '../workplace-header';
import WorkplaceTools from '../workplace-tools';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentBook, setCurrentBook, selectBooks } from '../../store/slices';
import { useGetBlocksByIdMutation } from '../../store/api';

import style from './workplace.module.css';

export function Project() {
  const data = useAppSelector(selectCurrentBook);
  return (
    <>
      {data && (
        <>
          <WorkplaceHeader />
          <Blocks />
          <WorkplaceTools />
        </>
      )}
    </>
  );
}

export default function Workplace() {
  const dispatch = useAppDispatch();
  const [blocksById] = useGetBlocksByIdMutation();
  const books = useAppSelector(selectBooks);
  const { bookId } = useParams();
  const book = books?.find((x) => x.id === bookId);

  useEffect(() => {
    const getData = async () => {
      if (book) {
        await blocksById(book.id);
        dispatch(setCurrentBook(book));
      }
    };

    getData();
  }, [book?.id]);

  return (
    <div className={style.workplace}>
      {book && (<Outlet />)}
    </div>
  );
}
