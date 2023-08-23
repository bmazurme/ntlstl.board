/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response, Request } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import { Types } from 'mongoose';
import { NotFoundError } from '../../errors';

import Fields, { IField } from '../../models/field-model';
import Items, { IItem } from '../../models/item-model';
import Blocks, { IBlock } from '../../models/block-model';
import ItemTypes from '../../models/item-type-model';

import { getThrottleDiameter } from '../../calcs/throttle';

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

const addField = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const field = req.body;
    const data = await Fields.create({ ...field });

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.body;
    const data = await Fields.find({ itemId });

    if (!data) {
      return next(new NotFoundError('Field not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const updateFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, id: itemId, values } = req.body;

    const fieldsBulk = Fields.collection.initializeOrderedBulkOp();
    (values as unknown as IField[]).forEach(({ _id, value }) => {
      fieldsBulk.find({ _id: new Types.ObjectId(_id) }).update({ $set: { value } });
    });

    if (fieldsBulk.batches.length > 0) {
      fieldsBulk.execute();
    }

    //
    const itemType = 0;

    if (itemType === 0) {
      const name = values[0].value;
      const q = Number(values[1].value);
      const hdr = Number(values[2].value);
      const result = getThrottleDiameter(q, hdr);
      await Items.updateOne({ _id: itemId }, { result });
    }
    //

    const items = await Items.find({ bookId });
    const fields = await Fields.find({ bookId });
    const blocks = await Blocks.find({ bookId });
    const data = await getData(blocks, items, fields);

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const deleteField = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await Fields.findByIdAndDelete(id);

    if (!data) {
      return next(new NotFoundError('Field not found'));
    }

    return res.status(200).send({ message: `Field with id '${id}' has been deleted.` });
  } catch (err) {
    return next(err);
  }
};

export {
  addField, getFields, updateFields, deleteField,
};
