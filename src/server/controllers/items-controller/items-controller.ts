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
    await Items.create({
      index, blockId, bookId, result: 0,
    });

    const blocks = await Blocks.find({ bookId });
    const items = await Items.find({ bookId });
    const data = blocks.reduce((a, x, i) => ({
      ...a,
      [i]: {
        index: x.index,
        name: x.name,
        items: items.filter((it) => it.blockId === x._id),
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

const deleteItem = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await Items.findByIdAndDelete(id);

    if (!data) {
      return next(new NotFoundError('Item not found'));
    }

    return res.send({ message: `Item with id '${id}' has been deleted.` });
  } catch (err) {
    return next(err);
  }
};

export {
  addItem, getItems, updateItem, deleteItem,
};
