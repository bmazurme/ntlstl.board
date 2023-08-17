/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import NotFoundError from '../../errors/not-found-error';

import Books, { IBook } from '../../models/book-model';

dotEnvConfig();

const packBooks = (books: IBook[]) => books.map((b) => ({
  id: b._id,
  projectId: b.projectId,
  name: b.name,
  typeBook: b.typeBook,
}));

const addBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    const book = req.body;
    const newBook = { ...book, name: 'book' };
    await Books.create({ ...newBook });
    const books = await Books.find({ projectId: book.projectId });
    const data = packBooks(books);

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getBooks = async (req: any, res: Response, next: NextFunction) => {
  try {
    const books = await Books.find({ projectId: req.params.id });
    const data = packBooks(books);

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const updateBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id, ...newData } = req.body;
    const options = { new: true };
    const data = await Books.findByIdAndUpdate(id, newData, options);

    if (!data) {
      return next(new NotFoundError('Book not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const deleteBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await Books.findByIdAndDelete(id);

    if (!data) {
      return next(new NotFoundError('Book not found'));
    }

    return res.status(200).send({ message: `Book with id '${id}' has been deleted.` });
  } catch (err) {
    return next(err);
  }
};

const renameBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id, name } = req.body;
    const data = await Books.findByIdAndUpdate(id, { name });

    if (!data) {
      return next(new NotFoundError('Book not found'));
    }

    const book = {
      id: data._id,
      projectId: data.projectId,
      typeBook: data.typeBook,
      name,
    };

    return res.send(book);
  } catch (err) {
    next(err);
  }
};

export {
  addBook, getBooks, updateBook, deleteBook, renameBook,
};
