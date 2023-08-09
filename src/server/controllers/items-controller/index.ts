/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { blocks } from '../../mocks/db';

const removeItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, block, blockId } = req.body;
    const item = blocks[blockId].value;
    const newData = {
      ...item,
      [block]: { ...item[block], items: item[block].items.filter((x) => x.id !== id) },
    };
    blocks[blockId].value = newData;

    return res.send(blocks[blockId].value);
  } catch (err) {
    next(err);
  }
};

const setMovedItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      bookId, dragIndex, hoverIndex, item, dragItem,
    } = req.body;
    const coppiedStateArray = [...blocks[bookId].value[item.currentColumnIndex].items];
    const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
    coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
    blocks[bookId].value[item.currentColumnIndex] = {
      ...blocks[bookId].value[item.currentColumnIndex],
      items: coppiedStateArray.filter((x) => x),
    };

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

const changeItemValues = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      bookId, index, id, values,
    } = req.body;
    const item = blocks[bookId].value;
    const newData = {
      ...item,
      [index]: {
        ...item[index],
        items: [...item[index].items].map((x) => (x.id === id ? { ...x, values } : x)),
      },
    };
    blocks[bookId].value = newData;

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

const changeItemValue = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      bookId, id, item, index,
    } = req.body;
    const newData = {
      ...blocks[bookId].value,
      [index]: {
        ...blocks[bookId].value[index],
        items: [...blocks[bookId].value[index].items]
          .map((x) => (x.id === id
            ? { ...x, item: (item as unknown as { value: string, label: string }) }
            : x)),
      },
    };
    blocks[bookId].value = newData;

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

const getItemResult = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, id, index } = req.body;
    const newData = {
      ...blocks[bookId].value,
      [index]: {
        ...blocks[bookId].value[index],
        items: [...blocks[bookId].value[index].items]
          .map((x) => (x.id === id ? {
            ...x,
            // some calc
            result: x.values.reduce((a: number, i: { value: number }) => a + Number(i.value), 0),
          } : x)),
      },
    };
    blocks[bookId].value = newData;

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

export {
  removeItem,
  setMovedItem,
  changeItemValues,
  changeItemValue,
  getItemResult,
};
