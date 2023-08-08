import React from 'react';
import { useParams } from 'react-router';
import { PlusIcon } from '@heroicons/react/24/outline';

import Button from '../button';

import { useAppSelector } from '../../hooks';
import { selectBlocks } from '../../store/slices';
import { useAddBlockMutation } from '../../store/api';

import style from './workplace-tools.module.css';

export default function WorkplaceTools() {
  const items = useAppSelector(selectBlocks);
  const [setBlocks] = useAddBlockMutation();
  const { bookId } = useParams();

  const addBlock = () => {
    const index = Object.keys(items).length;

    const newBlock = {
      ...items,
      [index]: { index, name: `BLOCK${index + 1}`, items: [] },
    };

    setBlocks({ data: newBlock, bookId });
  };

  return (
    <div className={style.tools}>
      <Button icon={PlusIcon} handler={addBlock} title="Add block" />
    </div>
  );
}
