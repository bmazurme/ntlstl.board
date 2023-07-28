/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

type TypeBook = { name: string; id: string; };

const books: TypeBook[] = [];

const getBooks = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send(books);
  } catch (err) {
    next(err);
  }
};

const addBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    books.push({
      id: books.length.toString(),
      name: 'book',
    });

    return res.send(books);
  } catch (err) {
    next(err);
  }
};

export { getBooks, addBook };
