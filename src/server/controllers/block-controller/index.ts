/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { blocks } from '../../mocks/db';

const getBlocks = (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    return res.send(blocks[req.params.id].value);
  } catch (err) {
    next(err);
  }
};

const updateBlocks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, currentItem, columnName } = req.body;
    const index = currentItem.currentColumnIndex;
    const item = blocks[id].value[index];

    const newData = {
      [index]: {
        ...item,
        items: item.items.filter((x: TypeItem) => x.id !== currentItem.id),
      },
      [columnName]: {
        ...blocks[id].value[columnName],
        items: [...blocks[id].value[columnName].items, currentItem],
      },
    };

    blocks[id].value = newData;

    return res.send(blocks[id].value);
  } catch (err) {
    next(err);
  }
};

const removeItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, block, blockId } = req.body;
    const item = blocks[blockId].value;

    const newData = {
      ...item,
      [block]: {
        ...item[block],
        items: item[block].items.filter((x) => x.id !== id),
      },
    };

    blocks[blockId].value = newData;

    return res.send(blocks[blockId].value);
  } catch (err) {
    next(err);
  }
};

const removeBlock = (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { bookId, index } = req.body;
    delete blocks[bookId].value[index];

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

const addBlock = (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { bookId, data } = req.body;
    blocks[bookId].value = data;

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

const renameBlock = (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { bookId, index, name } = req.body;
    const data = {
      ...blocks[bookId].value,
      [index]: { ...blocks[bookId].value[index], name },
    };
    blocks[bookId].value = data;

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

const setMovedBlock = (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const {
      bookId, dragIndex, hoverIndex, item,
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

// setMovedBlock: (
//   state,
//   { payload: data }: PayloadAction<{
//     dragIndex: number,
//     hoverIndex: number,
//     item: TypeItem & { currentColumnIndex: number, index: number },
//   }>,
// ) => {
//   const obj: TypeBlock = {};
//   const coppiedStateArray = [...Object.keys(state.data)].map((x) => Number(x));
//   coppiedStateArray.splice(data.hoverIndex, 1, data.dragIndex);
//   coppiedStateArray.splice(data.dragIndex, 1, data.hoverIndex);
//   coppiedStateArray.forEach((x, i: number) => obj[i] = { ...state.data[x], index: i });

//   return {
//     ...state, data: obj,
//   };
// },

export {
  getBlocks,
  updateBlocks,
  removeItem,
  removeBlock,
  addBlock,
  renameBlock,
  setMovedBlock,
};
