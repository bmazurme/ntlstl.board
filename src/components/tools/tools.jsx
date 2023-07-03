import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

import Button from '../button';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectBlocks, setBlocks } from '../../store/slices';

import style from './tools.module.css';

export default function Tools() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectBlocks);
  const addBlock = () => {
    const index = Object.keys(items).length;
    const obj = {
      ...items,
      [index]: { index, name: `BLOCK${index + 1}`, items: [] },
    };
    dispatch(setBlocks(obj));
  };

  return (
    <div className={style.tools}>
      <Button icon={PlusIcon} handler={addBlock} title="Add block" />
    </div>
  );
}
