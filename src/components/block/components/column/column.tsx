import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';

import ColumnForm from '../column-form';

import { getBackgroundColor, TYPE, COLOR } from '../../../../utils';

import style from './column.module.css';

type TypeColumnProps = {
  children: ReactNode;
  index: number;
  title: string;
  blockId: string;
};

export default function Column({
  children, index, title, blockId,
}: TypeColumnProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [TYPE.ITEM, TYPE.BLOCK],
    drop: () => ({ name: index }),
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
    canDrop: () => true,
  });

  return (
    <div
      ref={drop}
      style={{ backgroundColor: getBackgroundColor(isOver, canDrop, COLOR.ITEM) }}
      className={style.box}
    >
      <ColumnForm index={index} title={title} blockId={blockId} />
      <div className={style.items}>{children}</div>
    </div>
  );
}
