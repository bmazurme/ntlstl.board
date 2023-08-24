import React, { LegacyRef } from 'react';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

import Buttons from '../../../buttons';
import Field from '../../../field';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { selectBlocks, setItemPopup } from '../../../../store/slices';
import { useRemoveItemMutation } from '../../../../store/api';

import style from './item.module.css';

export default function Item({ itemData }: TypeItemData) {
  const {
    index, id, currentColumnIndex, childRef, opacity,
  } = itemData;
  const { bookId } = useParams();
  const [removeItem] = useRemoveItemMutation();
  const dispatch = useAppDispatch();
  const blocks: TypeBlock = useAppSelector(selectBlocks);
  const block = blocks[currentColumnIndex];
  const openPopup = () => dispatch(setItemPopup({ index: currentColumnIndex, id, isOpen: true }));
  const deleteItem = () => removeItem({ block: currentColumnIndex, id, bookId });
  const buttons = [
    { handler: openPopup, component: PencilIcon },
    { handler: deleteItem, component: TrashIcon },
  ];

  return (
    <div ref={childRef as LegacyRef<HTMLDivElement>} className={style.item} style={{ opacity }}>
      <div className={style.data}>
        <span className={style.position}>{index + 1}</span>
        <span className={style.title}>
          {block.items.find((x: TypeItem) => x.id === id)!.item?.label}
        </span>

        {block.items.find((x: TypeItem) => x.id === id)!.values
          .map((value: TypeValue) => (
            <Field key={uuidv4()} label={value.name} value={value.value} />
          ))}

        <span className={style.value}>
          <Field
            label="Result"
            value={`${block.items.find((x: TypeItem) => x.id === id)!.result.toFixed(2)}`}
          />
        </span>
      </div>
      <Buttons buttons={buttons} />
    </div>
  );
}
