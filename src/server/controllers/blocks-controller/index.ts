/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import {
  getBlocks, addBlock, deleteBlock, renameBlock, setBlocks, updateBlocks,
} from './blocks-controller';

import { blocks } from '../../mocks/db';

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
