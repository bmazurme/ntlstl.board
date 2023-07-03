import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import Item from '../components/item';

import { useAppSelector, useAppDispatch } from '../hooks';
import { selectBlocks, setBlocks } from '../store/slices';

import { TYPE } from '../utils';

export default function MovableItem({ moveCardHandler, ...props }) {
  const childRef = useRef(null);
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectBlocks);
  const setItems = (data) => dispatch(setBlocks(data));
  const changeItemColumn = (currentItem, columnName) => {
    if (columnName.toString() !== currentItem.currentColumnIndex) {
      const index = currentItem.currentColumnIndex;
      const item = items[index];
      const obj = {
        ...items,
        [index]: {
          ...item,
          items: item.items.filter((x) => x.id !== currentItem.id),
        },
        [columnName]: {
          ...items[columnName],
          items: [...items[columnName].items, currentItem],
        },
      };
      setItems(obj)
    }
  };

  const [, drop] = useDrop({
    accept: TYPE.ITEM,
    hover(item, monitor) {
      if (!childRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = childRef.current?.getBoundingClientRect();
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
      moveCardHandler(dragIndex, hoverIndex, item);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: TYPE.ITEM,
    item: { ...props },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name: currName } = dropResult;
        changeItemColumn(item, currName);
      }
    },
    collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.4 : 1 }),
  });

  drag(drop(childRef));

  return (<Item itemData={{ ...props, childRef, opacity }} />);
}
