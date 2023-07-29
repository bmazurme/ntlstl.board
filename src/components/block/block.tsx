/* eslint-disable no-return-assign */
import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

import Column from './components/column';
import MovableItem from './components/movablel-item';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectBlocks, setMovedBlock, setMovedCard } from '../../store/slices';

import { getBackgroundColor, TYPE, COLOR } from '../../utils';

import style from './block.module.css';

export default function Block({ block }: { block: number; }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const blocks: TypeBlock = useAppSelector(selectBlocks);

  const moveCardHandler = (
    dragIndex: number,
    hoverIndex: number,
    item: TypeItem & { currentColumnIndex: number, index: number },
  ) => {
    const dragItem = blocks[item.currentColumnIndex].items[dragIndex];

    if (dragItem) {
      dispatch(setMovedCard({ dragIndex, hoverIndex, item, dragItem }));
    }
  };

  const returnItemsForColumn = (columnName: number) => blocks[columnName].items
    .map(({
      id, item, values, result,
    }: TypeItem, index: number) => (
      <MovableItem
        key={id}
        id={id}
        currentColumnIndex={columnName}
        values={values}
        index={index}
        item={item}
        result={result}
        moveCardHandler={moveCardHandler}
      />
    ));

  const moveBlockHandler = (
    dragIndex: number,
    hoverIndex: number,
    item: TypeItem & { currentColumnIndex: number, index: number },
  ) => {
    const dragItem = blocks[item.index];

    if (dragItem) {
      dispatch(setMovedBlock({ dragIndex, hoverIndex, item }));
    }
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: TYPE.BLOCK,
    hover(item: TypeItem & {
      currentColumnIndex: number,
      index: number,
    }, monitor: DropTargetMonitor<TypeItem & { currentColumnIndex: number, index: number }, unknown>) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = blocks[block].index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // // Time to actually perform the action
      moveBlockHandler(dragIndex, hoverIndex, item);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
    canDrop: () => true,
  });

  const [{ opacity }, drag] = useDrag({
    type: TYPE.BLOCK,
    item: { index: blocks[block].index, name: blocks[block].name },
    collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.4 : 1 }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={style.block}
      style={{ backgroundColor: getBackgroundColor(isOver, canDrop, COLOR.BLOCK), opacity }}
    >
      <Column index={blocks[block].index} title={blocks[block].name}>
        {returnItemsForColumn(block)}
      </Column>
    </div>
  );
}
