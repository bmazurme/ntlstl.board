/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import NotFoundError from '../../errors/not-found-error';

import Blocks, { IBlock } from '../../models/block-model';
import Items, { IItem } from '../../models/item-model';

dotEnvConfig();

const addBlock = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.body;
    const blocks = await Blocks.find({ bookId });
    const index = blocks.length;
    const newBlock = await Blocks.create({ index, bookId, name: `BLOCK${index + 1}` });
    blocks.push(newBlock);
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
            item: { value: '0', label: 'Item 1' },
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

const getBlocks = async (req: any, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;
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
            item: { value: '0', label: 'Item 1' },
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

const updateBlock = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id, ...newData } = req.body;
    const options = { new: true };
    const data = await Blocks.findByIdAndUpdate(id, newData, options);

    if (!data) {
      return next(new NotFoundError('Block not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const deleteBlock = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { bookId, index } = req.body;
    const block = await Blocks.findOneAndDelete({ bookId, index });

    if (!block) {
      return next(new NotFoundError('Block not found'));
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
            item: { value: '0', label: 'Item 1' },
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

const renameBlock = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { bookId, index, name } = req.body;
    await Blocks.findOneAndUpdate({ bookId, index }, { name });
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
            item: { value: '0', label: 'Item 1' },
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
    next(err);
  }
};

const setBlocks = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { bookId, data: init } = req.body;

    // Object.keys(init).forEach((k) => init[k].items.forEach((x) => {
    //   x.id, x.index
    // }));
    // await Items.updateMany(
    //   { qty: { $lt: 50 } },
    //   {
    //     $set: { 'size.uom': 'in', status: 'P' },
    //     $currentDate: { lastModified: true },
    //   },
    // );
    // (await Items.find()).forEach

    // const blocks = await Blocks.find({ bookId });
    // const items = await Items.find({ bookId });

    // blocks[bookId].value = data;
    // const data = blocks.reduce((a, x, i) => ({
    //   ...a,
    //   [i]: {
    //     blockId: x._id,
    //     index: x.index,
    //     name: x.name,
    //     items: items.filter((it) => it.blockId.equals(x._id))
    //       .map((it) => ({
    //         id: it._id,
    //         item: { value: '0', label: 'Item 1' },
    //         values: [],
    //         blockId: it.blockId,
    //         bookId: it.blockId,
    //         index: it.index,
    //         result: it.result,
    //       })),
    //   },
    // }), {});

    return res.send(data);
  } catch (err) {
    next(err);
  }
};

export {
  addBlock, getBlocks, updateBlock, deleteBlock, renameBlock, setBlocks,
};
