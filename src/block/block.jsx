import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import Column from '../column';
import MovableItem from '../movablel-item';

import { useAppSelector, useAppDispatch } from '../hooks';
import { selectBlocks, setBlocks } from '../store/slices';

import { getBackgroundColor, TYPE, COLOR } from '../utils';

import style from './block.module.css';

export default function Block({ block }) {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectBlocks);
  const setItems = (data) => dispatch(setBlocks(data));
  const moveCardHandler = (dragIndex, hoverIndex, item) => {
    const dragItem = items[item.currentColumnIndex].items[dragIndex];

    if (dragItem) {
      const coppiedStateArray = [...items[item.currentColumnIndex].items];
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
      coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
      const arr = coppiedStateArray.filter((x) => x);
      setItems({ ...items, [item.currentColumnIndex]: { ...items[item.currentColumnIndex], items: arr } });
    }
  };

  const returnItemsForColumn = (columnName) => items[columnName].items
    .map(({ id, name, values }, index) => (
      <MovableItem
        key={id}
        id={id}
        name={name}
        values={values}
        currentColumnIndex={columnName}
        index={index}
        moveCardHandler={moveCardHandler}
      />
    ));

  const moveBlockHandler = (dragIndex, hoverIndex, item) => {
    const dragItem = items[item.index];

    if (dragItem) {
      const obj = {};
      const coppiedStateArray = [...Object.keys(items)].map((x) => Number(x));
      coppiedStateArray.splice(hoverIndex, 1, dragIndex);
      coppiedStateArray.splice(dragIndex, 1, hoverIndex);
      coppiedStateArray.forEach((x, i) => obj[i] = { ...items[x], index: i });
      setItems(obj);
    }
  };

  const [{ isOver, canDrop}, drop] = useDrop({
    accept: TYPE.BLOCK,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = items[block].index;
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
    item: { index: items[block].index, name: items[block].name },
    collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.4 : 1 }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={style.block} style={{ backgroundColor: getBackgroundColor(isOver, canDrop, COLOR.BLOCK) }}>
      <Column
        index={items[block].index}
        title={items[block].name}
        style={{ opacity }}
      >
        {returnItemsForColumn(block)}
      </Column>
    </div>
  );
}
