/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import NotFoundError from '../../errors/not-found-error';

import Blocks from '../../models/block-model';
import Items from '../../models/item-model';

dotEnvConfig();

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

const addItem = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { bookId, index, blockId } = req.body;
    const items = await Items.find({ bookId });
    const item = await Items.create({
      index: items.length, blockId, bookId, result: 0,
    });
    items.push(item);

    const blocks = await Blocks.find({ bookId });

    const data = blocks.reduce((a, x, i) => ({
      ...a,
      [i]: {
        blockId: x._id,
        index: x.index,
        name: x.name,
        items: items.filter((it) => it.blockId.equals(x._id))
          .map((it) => ({
            id: it._id,
            item: { value: '0', label: it._id },
            values: [],
            blockId: it.blockId,
            bookId: it.blockId,
            index: it.index,
            result: it.result,
          })),
      },
    }), {});

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getItems = async (req: any, res: Response, next: NextFunction) => {
  try {
    const item = req.body;
    const data = await Items.find({ blockId: item.blockId });

    if (!data) {
      return next(new NotFoundError('Item not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const updateItem = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id, ...newData } = req.body;
    const options = { new: true };
    const data = await Items.findByIdAndUpdate(id, newData, options);

    if (!data) {
      return next(new NotFoundError('Item not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

// const removeItem = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { id, block, blockId } = req.body;
//     const item = blocks[blockId].value;
//     blocks[blockId].value = {
//       ...item,
//       [block]: {
//         ...item[block],
//         items: item[block].items.filter((x) => x.id !== id),
//       },
//     };

//     return res.send(blocks[blockId].value);
//   } catch (err) {
//     next(err);
//   }
// };

const deleteItem = async (req: any, res: Response, next: NextFunction) => {
  try {
    // const { id } = req.params;
    const { id, bookId } = req.body;
    const item = await Items.findByIdAndDelete(id);

    if (!item) {
      return next(new NotFoundError('Item not found'));
    }

    const blocks = await Blocks.find({ bookId });
    const items = await Items.find({ bookId });

    const data = blocks.reduce((a, x, i) => ({
      ...a,
      [i]: {
        blockId: x._id,
        index: x.index,
        name: x.name,
        items: items.filter((it) => it.blockId.equals(x._id))
          .map((it) => ({
            id: it._id,
            item: { value: '0', label: 'item' },
            values: [],
            blockId: it.blockId,
            bookId: it.blockId,
            index: it.index,
            result: it.result,
          })),
      },
    }), {});

    return res.send(data);
  } catch (err) {
    return next(err);
  }
};

export {
  addItem, getItems, updateItem, deleteItem,
};
