/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import {
  getBlocks, addBlock, deleteBlock, renameBlock, setBlocks,
} from './blocks-controller';

import { blocks } from '../../mocks/db';

// const setBlocks = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { bookId, data } = req.body;
//     blocks[bookId].value = data;

//     return res.send(blocks[bookId].value);
//   } catch (err) {
//     next(err);
//   }
// };

const updateBlocks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, currentItem, columnName } = req.body;
    const index = currentItem.currentColumnIndex;
    const item = blocks[bookId].value[index];
    blocks[bookId].value = {
      ...blocks[bookId].value,
      [index]: {
        ...item,
        items: item.items.filter((x: TypeItem) => x.id !== currentItem.id),
      },
      [columnName]: {
        ...blocks[bookId].value[columnName],
        items: [...blocks[bookId].value[columnName].items, currentItem],
      },
    };

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

const setMovedBlock = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      bookId, dragIndex, hoverIndex, //  item, // !!!
    } = req.body;

    const data = blocks[bookId].value;
    const obj: TypeBlock = {};
    const coppiedStateArray = [...Object.keys(data)].map((x) => Number(x));
    coppiedStateArray.splice(hoverIndex, 1, dragIndex);
    coppiedStateArray.splice(dragIndex, 1, hoverIndex);
    coppiedStateArray.forEach((x, i: number) => obj[i] = { ...data[x], index: i });
    blocks[bookId].value = obj;

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

export {
  getBlocks,
  updateBlocks,
  deleteBlock,
  addBlock,
  renameBlock,
  setMovedBlock,
  setBlocks,
};
