import React from 'react';

import useBook from '../../hooks/use-book';

import Settings from '../../layouts/settings-layout/settings-layout';

// import style from './workplace-form.module.css';

export default function WorkplaceForm() {
  const { name } = useBook()!;

  return (
    <>
      <h2>{name}</h2>
      <Settings values={[]} />
    </>
  );
}
