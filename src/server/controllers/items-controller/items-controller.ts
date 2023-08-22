/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response, Request } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import { Types } from 'mongoose';
import NotFoundError from '../../errors/not-found-error';

import Blocks, { IBlock } from '../../models/block-model';
import Items, { IItem } from '../../models/item-model';
import ItemTypes from '../../models/item-type-model';
import Fields, { IField } from '../../models/field-model';

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

const addItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, index, blockId } = req.body;
    const items = await Items.find({ bookId });
    const item = await Items.create({
      index: items.length, blockId, bookId, result: 0,
    });

    const bookSet = [1, 2, 3];
    const bookFields = bookSet.map((x) => ({
      bookId, itemId: item._id, value: 0, name: `field${x}`,
    }));

    await Fields.insertMany(bookFields);
    items.push(item);

    const blocks = await Blocks.find({ bookId });
    const fields = await Fields.find({ bookId });
    const data = await getData(blocks, items, fields);

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getItems = async (req: Request, res: Response, next: NextFunction) => {
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

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
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

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: itemId, bookId } = req.body;
    const item = await Items.findByIdAndDelete(itemId);

    if (!item) {
      return next(new NotFoundError('Item not found'));
    }

    await Fields.deleteMany({ itemId });

    const itemsByBlock = await Items.find({ blockId: item.blockId });
    const itemsBulk = Items.collection.initializeOrderedBulkOp();
    itemsByBlock.sort((a, b) => a.index - b.index).forEach(({ _id }, i) => {
      itemsBulk.find({ _id }).update({ $set: { index: i } });
    });

    if (itemsBulk.batches.length > 0) {
      itemsBulk.execute();
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

const setMovedItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, data: init } = req.body;
    const itemsBulk = Items.collection.initializeOrderedBulkOp();

    Object.keys(init).forEach((key) => {
      init[key].items.forEach(({ id, index }: IItem) => {
        itemsBulk.find({ _id: new Types.ObjectId(id) }).update({ $set: { index } });
      });
    });

    itemsBulk.execute();

    const blocks = await Blocks.find({ bookId });
    const items = await Items.find({ bookId });
    const fields = await Fields.find({ bookId });
    const data = await getData(blocks, items, fields);

    return res.send(data);
  } catch (err) {
    next(err);
  }
};

const changeItemValue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId, itemType, bookId } = req.body;

    await Items.findByIdAndUpdate({ _id: itemId }, { itemType });
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
  addItem, getItems, updateItem, deleteItem, setMovedItem, changeItemValue,
};
