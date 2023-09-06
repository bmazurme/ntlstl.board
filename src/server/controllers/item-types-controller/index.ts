/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response, Request } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import ItemTypes from '../../models/item-type-model';

dotEnvConfig();

const addItemType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    const data = await ItemTypes.create({ name, description });

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getItemTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await ItemTypes.find({});

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

export { addItemType, getItemTypes };
