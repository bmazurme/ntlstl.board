/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import NotFoundError from '../../errors/not-found-error';

import Blocks from '../../models/block-model';
import Items from '../../models/item-model';

dotEnvConfig();

const addBlock = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.body;
    const blocks = await Blocks.find({ bookId });
    const index = blocks.length;
    const newBlock = await Blocks.create({ index, bookId, name: `BLOCK${index + 1}` });
    blocks.push(newBlock);
    const data = blocks.reduce((a, x, i) => ({
      ...a, [i]: { index: x.index, name: x.name, items: [] },
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

    console.log(items, blocks);

    const data = blocks.reduce((a, x, i) => ({
      ...a,
      [i]: {
        blockId: x._id,
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
    const data = blocks.reduce((a, x, i) => ({
      ...a, [i]: { index: x.index, name: x.name, items: [] },
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
    const data = blocks.reduce((a, x, i) => ({
      ...a, [i]: { index: x.index, name: x.name, items: [] },
    }), {});

    return res.send(data);
  } catch (err) {
    next(err);
  }
};

export {
  addBlock, getBlocks, updateBlock, deleteBlock, renameBlock,
};
