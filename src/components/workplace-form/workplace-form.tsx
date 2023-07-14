import React from 'react';
import { useAppSelector } from '../../hooks';
import { selectBook } from '../../store/slices';

import Settings from '../../layouts/settings';
import { values } from '../../mocks/values';

import style from './workplace-form.module.css';

export default function WorkplaceForm() {
  const { name } = useAppSelector(selectBook);
  return (
    <>
      <h2>{name}</h2>
      <Settings values={values} />
    </>
  );
}
