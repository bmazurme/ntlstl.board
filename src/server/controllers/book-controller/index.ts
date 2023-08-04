/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { blocks } from '../../mocks/db';

let books: TypeBook[] = [{
  name: 'Title book', id: '0', projectId: '0', typeBook: '0',
}];

const getBooks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const arr = books.filter((x) => x.projectId === req.params.id);

    return res.send(arr);
  } catch (err) {
    next(err);
  }
};

const addBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId, typeBook } = req.body;

    books.push({
      id: books.length.toString(),
      name: 'book',
      projectId,
      typeBook,
    });

    blocks.push({
      id: '0',
      value: {
        0: {
          index: 0,
          name: 'BLOCK1',
          items: [],
        },
      },
    });

    return res.send(books.filter((x) => x.projectId === projectId));
  } catch (err) {
    next(err);
  }
};

const renameBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name } = req.body;
    books = books.map((x) => (id === x.id ? { ...x, name } : x));
    const book = books.find((x) => x.id === id);

    return res.send(book);
  } catch (err) {
    next(err);
  }
};

export { getBooks, addBook, renameBook };
