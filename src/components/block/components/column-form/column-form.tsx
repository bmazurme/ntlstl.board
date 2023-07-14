import React from 'react';
import { ArchiveBoxXMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';

import Buttons from '../../../buttons';

import useFormWithValidation from '../../../../hooks/use-form-with-validation';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import {
  selectBlocks, setBlocks, renameBlock, removeBlock,
} from '../../../../store/slices';

import { values as data } from '../../../../mocks/values';

import style from './column-form.module.css';

export default function ColumnForm({ index, title }: { index: number, title: string }) {
  const dispatch = useAppDispatch();
  const items: TypeBlock = useAppSelector(selectBlocks);
  const { values, handleChange, resetForm } = useFormWithValidation({ name: title });

  const addItem = () => {
    const currentItem = items[index];
    const obj = {
      ...items,
      [index]: {
        ...currentItem,
        items: [
          ...currentItem.items,
          {
            id: uuidv4(),
            item: {
              value: `${currentItem.items.length}`,
              label: `Item ${currentItem.items.length + 1}`,
            },
            values: data,
            result: 0,
          },
        ],
      },
    };
    dispatch(setBlocks(obj));
  };

  const deleteBlock = () => dispatch(removeBlock({ index }));
  const rename = () => {
    if (values.name !== '') {
      dispatch(renameBlock({ index, name: values.name }));
    } else {
      resetForm({ name: title });
    }
  };

  const buttons = [
    { handler: addItem, component: PlusIcon },
    { handler: deleteBlock, component: ArchiveBoxXMarkIcon },
  ];

  return (
    <form className={style.header}>
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        className={style.title}
        onBlur={rename}
      />
      <Buttons buttons={buttons} />
    </form>
  );
}
