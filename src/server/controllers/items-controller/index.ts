/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import {
  addItem, deleteItem, setMovedItem, changeItemValue,
} from './items-controller';

import { blocks } from '../../mocks/db';

const changeItemValues = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      bookId, index, id, values,
    } = req.body;
    const item = blocks[bookId].value;
    blocks[bookId].value = {
      ...item,
      [index]: {
        ...item[index],
        items: [...item[index].items].map((x) => (x.id === id ? { ...x, values } : x)),
      },
    };

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

const getItemResult = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, id, index } = req.body;
    blocks[bookId].value = {
      ...blocks[bookId].value,
      [index]: {
        ...blocks[bookId].value[index],
        items: [...blocks[bookId].value[index].items]
          .map((x) => (x.id === id ? {
            ...x,
            result: x.values.reduce((a: number, i: { value: string }) => a + Number(i.value), 0),
          } : x)),
      },
    };

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

export {
  deleteItem,
  setMovedItem,
  changeItemValues,
  changeItemValue,
  getItemResult,
  addItem,
};
