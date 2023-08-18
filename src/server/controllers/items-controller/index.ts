/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
// import { v4 as uuidv4 } from 'uuid';

import { addItem, deleteItem } from './items-controller';

import { blocks } from '../../mocks/db';
// import { values as data } from '../../../mocks/values';

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

const changeItemValue = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      bookId, id, item, index,
    } = req.body;
    blocks[bookId].value = {
      ...blocks[bookId].value,
      [index]: {
        ...blocks[bookId].value[index],
        items: [...blocks[bookId].value[index].items]
          .map((x) => (x.id === id
            ? { ...x, item: (item as unknown as { value: string, label: string }) }
            : x)),
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
            result: x.values.reduce((a: number, i: { value: number }) => a + Number(i.value), 0),
          } : x)),
      },
    };

    return res.send(blocks[bookId].value);
  } catch (err) {
    next(err);
  }
};

// const addItem = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { bookId, index } = req.body;
//     const currentItem = blocks[bookId].value[index];
//     blocks[bookId].value = {
//       ...blocks[bookId].value,
//       [index]: {
//         ...currentItem,
//         items: [
//           ...currentItem.items,
//           {
//             id: uuidv4(),
//             item: {
//               value: `${currentItem.items.length}`,
//               label: `Item ${currentItem.items.length + 1}`,
//             },
//             values: data,
//             result: 0,
//           },
//         ],
//       },
//     };

//     return res.send(blocks[bookId].value);
//   } catch (err) {
//     next(err);
//   }
// };

export {
  deleteItem,
  setMovedItem,
  changeItemValues,
  changeItemValue,
  getItemResult,
  addItem,
};
