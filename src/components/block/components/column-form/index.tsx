/* eslint-disable no-return-await */
import React from 'react';
import { useParams } from 'react-router';
import { ArchiveBoxXMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

import Buttons from '../../../buttons';

import useFormWithValidation from '../../../../hooks/use-form-with-validation';
import {
  useRemoveBlockMutation, useRenameBlocksMutation, useAddItemMutation,
} from '../../../../store/api';

import style from './column-form.module.css';

type TypeColumnFormProps = {
  index: number;
  title: string;
  blockId: string;
};

export default function ColumnForm({ index, title, blockId }: TypeColumnFormProps) {
  const { bookId } = useParams();
  const { values, handleChange, resetForm } = useFormWithValidation({ name: title });
  const [addItem] = useAddItemMutation();
  const [renameBlock] = useRenameBlocksMutation();
  const [removeBlock] = useRemoveBlockMutation();

  const onAddItem = async () => await addItem({ bookId, index, blockId });
  const onDeleteBlock = async () => await removeBlock({ index, bookId });
  const onRenameBlock = async () => {
    if (values.name !== '') {
      await renameBlock({ index, name: values.name, bookId });
    } else {
      resetForm({ name: title });
    }
  };

  const buttons = [
    { handler: onAddItem, component: PlusIcon },
    { handler: onDeleteBlock, component: ArchiveBoxXMarkIcon },
  ];

  return (
    <form className={style.header}>
      <input
        type="text"
        name="name"
        className={style.title}
        value={values.name}
        onChange={handleChange}
        onBlur={onRenameBlock}
      />
      <Buttons buttons={buttons} />
    </form>
  );
}
