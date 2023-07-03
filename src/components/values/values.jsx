import React, { useState, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';

import { getBackgroundColor, COLOR } from '../../utils'

import style from './values.module.css';

function MovableItem({
  name, index, currentColumnName, moveCardHandler, setItems,
}) {
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => prevState.map((e) => ({
      ...e,
      column: e.name === currentItem.name ? columnName : e.column,
    })));
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
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
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: 'Our first type',
    item: { index, name, currentColumnName },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name: currName } = dropResult;

        switch (currName) {
          case 'ALL':
            changeItemColumn(item, 'ALL');
            break;
          case 'ON':
            changeItemColumn(item, 'ON');
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.4 : 1 }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={style.value} style={{ opacity }}>
      {name}
    </div>
  );
}

function Column({ children, className, title }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: () => true,
  });

  return (
    <div ref={drop} className={className} style={{ backgroundColor: getBackgroundColor(isOver, canDrop, COLOR.VALUE) }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default function Values({ values }) {
  const [items, setItems] = useState(values);
  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];
        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };
  const returnItemsForColumn = (columnName) => items
    .filter(({ column }) => column === columnName)
    .map(({ id, column, name }, index) => (
      <MovableItem
        key={id}
        name={name}
        currentColumnName={column}
        setItems={setItems}
        index={index}
        moveCardHandler={moveCardHandler}
      />
    ));
  return (
    <div className={style.values}>
      <Column title={'ALL'} className={style.value1}>
        {returnItemsForColumn('ALL')}
      </Column>
      <Column title={'ON'} className={style.value2}>
        {returnItemsForColumn('ON')}
      </Column>
    </div>
  );
}