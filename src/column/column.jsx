import React from 'react';
import { useDrop } from 'react-dnd';

import ColumnForm from '../components/column-form';

import { getBackgroundColor, TYPE, COLOR } from '../utils';

import style from './column.module.css';

export default function Column({ children, index, title }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [TYPE.ITEM, TYPE.BLOCK],
    drop: () => ({ name: index }),
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
    canDrop: () => true,
  });

  return (
    <div ref={drop} style={{ backgroundColor: getBackgroundColor(isOver, canDrop, COLOR.ITEM) }} className={style.box}>
      <ColumnForm index={index} title={title} />
      <div className={style.items}>{children}</div>
    </div>
  );
}
