/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

const getWorkplace = (req: Request, res: Response, next: NextFunction) => {
  const workplace = {
    id: 'id',
    name: 'Workplace Name',
  };

  try {
    return res.send(workplace);
  } catch (err) {
    next(err);
  }
};

const renameWorkplace = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send('renamed');
  } catch (err) {
    next(err);
  }
};

const updateWorkplace = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send('updated');
  } catch (err) {
    next(err);
  }
};

const moveToArchive = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send('moved');
  } catch (err) {
    next(err);
  }
};

export {
  getWorkplace,
  renameWorkplace,
  updateWorkplace,
  moveToArchive,
};
