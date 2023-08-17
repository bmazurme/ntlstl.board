/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import NotFoundError from '../../errors/not-found-error';

import Fields from '../../models/field-model';

dotEnvConfig();

const addField = async (req: any, res: Response, next: NextFunction) => {
  try {
    const field = req.body;
    const data = await Fields.create({ ...field });

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getFields = async (req: any, res: Response, next: NextFunction) => {
  try {
    const field = req.body;
    const data = await Fields.find({ itemId: field.itemId });

    if (!data) {
      return next(new NotFoundError('Field not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const updateField = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id, ...newData } = req.body;
    const options = { new: true };
    const data = await Fields.findByIdAndUpdate(id, newData, options);

    if (!data) {
      return next(new NotFoundError('Field not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const deleteField = async (req: any, res: Response, next: NextFunction) => {
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
  addField, getFields, updateField, deleteField,
};
