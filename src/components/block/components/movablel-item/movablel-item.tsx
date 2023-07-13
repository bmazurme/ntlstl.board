import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

import Item from '../../../item';

import { useAppDispatch } from '../../../../hooks';
import { setChangeItemColumn } from '../../../../store/slices';

import { TYPE } from '../../../../utils';

export default function MovableItem({ moveCardHandler, ...props }: TypeMovableItem) {
  const childRef = useRef<HTMLLIElement | null>(null);
  const dispatch = useAppDispatch();

  const changeItemColumn = (
    currentItem: TypeItem & { currentColumnIndex: number, id: string },
    columnName: number,
  ) => {
    if (columnName !== currentItem.currentColumnIndex) {
      dispatch(setChangeItemColumn({ currentItem, columnName }));
    }
  };

  const [, drop] = useDrop({
    accept: TYPE.ITEM,
    hover(
      item: TypeItem & { currentColumnIndex: number, id: string, index: number },
      monitor: DropTargetMonitor<TypeItem & { currentColumnIndex: number, id: string, index: number }, unknown>,
    ) {
      if (!childRef.current) {
        return;
      }
      const dragIndex: number = item.index;
      const hoverIndex: number = props.index;
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
    item: {
      id: props.id,
      item: props.item,
      values: props.values,
      result: props.result,
      currentColumnIndex: props.currentColumnIndex,
    },
    end: (item, monitor) => {
      const dropResult: { name: number } = monitor.getDropResult()!;

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
