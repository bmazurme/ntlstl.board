/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response, Request } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import { Types } from 'mongoose';
import NotFoundError from '../../errors/not-found-error';

import Blocks, { IBlock } from '../../models/block-model';
import Items, { IItem } from '../../models/item-model';
import Fields, { IField } from '../../models/field-model';
import ItemTypes from '../../models/item-type-model';

dotEnvConfig();

const getData = async (blocks: IBlock[], items: IItem[], fields: IField[]) => {
  const itemTypes = await ItemTypes.find({});
  const getItem = (it: IItem) => {
    if (!it.itemType) {
      return { value: 'null', label: '-' };
    }

    const type = itemTypes.find((t) => it.itemType.equals(t._id));

    return { value: type?._id, label: type?.name };
  };

  return blocks
    .sort((a, b) => a.index - b.index)
    .reduce((a, x, i) => ({
      ...a,
      [i]: {
        blockId: x._id,
        index: x.index,
        name: x.name,
        items: items
          .filter((it) => it.blockId.equals(x._id))
          .map((it) => ({
            id: it._id,
            item: it.itemType ? getItem(it) : null,
            values: fields.filter((field) => field.itemId.equals(it._id)),
            blockId: it.blockId,
            bookId: it.blockId,
            index: it.index,
            result: it.result,
          }))
          .sort((b, c) => b.index - c.index),
      },
    }), {});
};

const addBlock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.body;
    const blocks = await Blocks.find({ bookId });
    const index = blocks.length;
    const newBlock = await Blocks.create({ index, bookId, name: `BLOCK${index + 1}` });
    blocks.push(newBlock);
    const items = await Items.find({ bookId });
    const fields = await Fields.find({ bookId });
    const data = await getData(blocks, items, fields);

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getBlocks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;
    const blocks = await Blocks.find({ bookId });
    const items = await Items.find({ bookId });
    const fields = await Fields.find({ bookId });
    const data = await getData(blocks, items, fields);

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const updateBlock = async (req: Request, res: Response, next: NextFunction) => {
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

const deleteBlock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, index } = req.body;
    const block = await Blocks.findOneAndDelete({ bookId, index });

    if (!block) {
      return next(new NotFoundError('Block not found'));
    }

    const blocksBulk = Blocks.collection.initializeOrderedBulkOp();
    const blocksByBlock = await Blocks.find({ bookId: block.bookId });
    blocksByBlock.sort((a, b) => a.index - b.index).forEach(({ _id }, i) => {
      blocksBulk.find({ _id }).update({ $set: { index: i } });
    });

    if (blocksBulk.batches.length > 0) {
      blocksBulk.execute();
    }

    const blocks = await Blocks.find({ bookId });
    const items = await Items.find({ bookId });
    const fields = await Fields.find({ bookId });
    const data = await getData(blocks, items, fields);

    return res.send(data);
  } catch (err) {
    return next(err);
  }
};

const renameBlock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, index, name } = req.body;
    await Blocks.findOneAndUpdate({ bookId, index }, { name });
    const blocks = await Blocks.find({ bookId });
    const items = await Items.find({ bookId });
    const fields = await Fields.find({ bookId });
    const data = await getData(blocks, items, fields);

    return res.send(data);
  } catch (err) {
    next(err);
  }
};

const setBlocks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, data } = req.body;
    const blocksBulk = Blocks.collection.initializeOrderedBulkOp();

    Object.keys(data).forEach((key) => {
      const { blockId } = data[key];
      const { index } = data[key];
      blocksBulk.find({ _id: new Types.ObjectId(blockId) }).update({ $set: { index } });
    });

    if (blocksBulk.batches.length > 0) {
      blocksBulk.execute();
    }

    return res.send(data);
  } catch (err) {
    next(err);
  }
};

const updateBlocks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, currentItem, columnName } = req.body;
    const block = await Blocks.findOne({ bookId, index: columnName });

    if (!block) {
      return next(new NotFoundError('Block not found'));
    }

    await Items.findByIdAndUpdate({ _id: currentItem.id }, { blockId: block.id });
    const blocks = await Blocks.find({ bookId });
    const items = await Items.find({ bookId });
    const fields = await Fields.find({ bookId });
    const data = await getData(blocks, items, fields);

    return res.send(data);
  } catch (err) {
    next(err);
  }
};

export {
  addBlock, getBlocks, updateBlock, deleteBlock, renameBlock, setBlocks, updateBlocks,
};
