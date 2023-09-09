/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../../../hooks';

import style from './card.module.css';

export default function Card({ book }: { book: TypeBook; }) {
  const navigate = useNavigate();
  const user = useUser()!;

  const onSetCurrent = async () => {
    if (book?.name) {
      navigate(`/projects/${user.projectId}/${book.id}`);
    }
  };

  return (
    <li className={style.card} onClick={() => onSetCurrent()}>
      <h4 className={style.title}>{book.name}</h4>
      <span className={style.title}>type</span>
    </li>
  );
}
