/* eslint-disable no-return-await */
import React from 'react';
import { useParams } from 'react-router';
import { PlusIcon } from '@heroicons/react/24/outline';

import Button from '../button';

import { useAddBlockMutation } from '../../store/api';

import style from './workplace-tools.module.css';

export default function WorkplaceTools() {
  const { bookId } = useParams();
  const [addBlocks] = useAddBlockMutation();
  const onAddBlock = async () => await addBlocks({ bookId });

  return (
    <div className={style.tools}>
      <Button icon={PlusIcon} handler={onAddBlock} title="Add block" />
    </div>
  );
}
