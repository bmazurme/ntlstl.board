/* eslint-disable no-return-await */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
import React, { useRef } from 'react';
import { useParams } from 'react-router';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

import Column from './components/column';
import MoveableItem from './components/moveable-item';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectBlocks, setMovedCard, setMovedBlock } from '../../store/slices';
import { useSetBlocksMutation, useSetMovedItemMutation } from '../../store/api';

import { getBackgroundColor, TYPE, COLOR } from '../../utils';

import style from './block.module.css';

export default function Block({ block }: { block: number; }) {
  const { bookId } = useParams();
  const dispatch = useAppDispatch();
  // const [setMovedBlock] = useSetMovedBlockMutation();
  const [setItems] = useSetMovedItemMutation();
  const [setBlocks] = useSetBlocksMutation();
  const ref = useRef<HTMLDivElement | null>(null);
  const blocks: TypeBlock = useAppSelector(selectBlocks);

  const moveCardHandler = async (
    dragIndex: number,
    hoverIndex: number,
    item: TypeItem & { currentColumnIndex: number, index: number },
  ) => {
    const dragItem = blocks[item.currentColumnIndex].items[dragIndex];

    if (dragItem) {
      dispatch(setMovedCard({
        dragIndex, hoverIndex, item, dragItem,
      }));
    }
  };

  const moveItemDrop = async () => await setItems({ data: blocks, bookId: bookId! });

  const returnItemsForColumn = (columnName: number) => blocks[columnName].items
    .map(({
      id, item, values, result,
    }: TypeItem, index: number) => (
      <MoveableItem
        key={id}
        id={id}
        currentColumnIndex={columnName}
        values={values}
        index={index}
        item={item}
        result={result}
        moveCardHandler={moveCardHandler}
        moveItemDrop={moveItemDrop}
      />
    ));

  const moveBlockHandler = async (
    dragIndex: number,
    hoverIndex: number,
    item: TypeItem & { currentColumnIndex: number, index: number },
  ) => {
    const dragItem = blocks[item.index];

    if (dragItem) {
      dispatch(setMovedBlock({ dragIndex, hoverIndex, item }));
      // await setMovedBlock({
      //   dragIndex, hoverIndex, item, bookId, // item !!!
      // });
    }
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: TYPE.BLOCK,
    async hover(item: TypeItem & {
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
      await moveBlockHandler(dragIndex, hoverIndex, item);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
    async drop(item, monitor) {
      // await moveItemDrop();
      // console.log(123);
      await setBlocks({ data: blocks, bookId: bookId! });
    },
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
      <Column index={blocks[block].index} title={blocks[block].name} blockId={blocks[block].blockId}>
        {returnItemsForColumn(block)}
      </Column>
    </div>
  );
}
