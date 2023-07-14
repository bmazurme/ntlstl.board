import React, { LegacyRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

import Buttons from '../../../buttons';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { removeItem, selectBlocks, setItemPopup } from '../../../../store/slices';

import style from './item.module.css';

type TypeItemData = {
  itemData: {
    index: number,
    id: string,
    currentColumnIndex: number,
    childRef: unknown,
    opacity: number,
  },
};

export default function Item({ itemData }: TypeItemData) {
  const {
    index, id, currentColumnIndex, childRef, opacity,
  } = itemData;

  const dispatch = useAppDispatch();
  const blocks: TypeBlock = useAppSelector(selectBlocks);
  const block = blocks[currentColumnIndex];
  const openPopup = () => dispatch(setItemPopup({ index: currentColumnIndex, id, isOpen: true }));
  const deleteItem = () => dispatch(removeItem({ block: currentColumnIndex, id }));
  const buttons = [
    { handler: openPopup, component: PencilIcon },
    { handler: deleteItem, component: TrashIcon },
  ];

  return (
    <div ref={childRef as LegacyRef<HTMLDivElement>} className={style.item} style={{ opacity }}>
      <div className={style.data}>
        <span className={style.position}>{index + 1}</span>
        <span className={style.title}>
          {block.items.find((x: TypeItem) => x.id === id)!.item.label}
        </span>
        {block.items.find((x: TypeItem) => x.id === id)!.values
          .map((value: TypeValue) => (
            <span key={uuidv4()} className={style.value}>
              {`${value.name} - ${value.value}`}
            </span>
          ))}
        <span className={style.value}>
          {`Result - ${block.items.find((x: TypeItem) => x.id === id)!.result}`}
        </span>
      </div>
      <Buttons buttons={buttons} />
    </div>
  );
}
