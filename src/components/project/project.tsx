import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Card from './components/card';

import { useBooks } from '../../hooks';

import style from './project.module.css';

export default function Project() {
  const books: TypeBook[] = useBooks();

  return (
    <ul className={style.container}>
      {books.map((x) => <Card key={uuidv4()} book={x} />)}
    </ul>
  );
}
