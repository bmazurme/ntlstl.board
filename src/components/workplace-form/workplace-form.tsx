import React from 'react';
import { useAppSelector } from '../../hooks';
import { selectCurrentBook } from '../../store/slices';

import Settings from '../../layouts/settings-layout';
import { values } from '../../mocks/values';

import style from './workplace-form.module.css';

export default function WorkplaceForm() {
  const { name } = useAppSelector(selectCurrentBook)!;
  return (
    <>
      <h2>{name}</h2>
      <Settings values={values} />
    </>
  );
}
