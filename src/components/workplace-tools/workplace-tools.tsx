/* eslint-disable no-return-await */
import React from 'react';
import { useParams } from 'react-router';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useErrorBoundary } from 'react-error-boundary';

import Button from '../button/button';

import { useAddBlockMutation } from '../../store/api';

import style from './workplace-tools.module.css';

export default function WorkplaceTools() {
  const { bookId } = useParams();
  const { showBoundary } = useErrorBoundary();
  const [addBlocks] = useAddBlockMutation();
  const onAddBlock = async () => {
    try {
      await addBlocks({ bookId });
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <div className={style.tools}>
      <Button icon={PlusIcon} handler={onAddBlock} title="Add block" />
    </div>
  );
}
