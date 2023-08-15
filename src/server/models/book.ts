/* eslint-disable import/no-extraneous-dependencies */
import {
  Schema, Document, model, Model,
} from 'mongoose';

import validator from 'validator';

type TypeBook = { value: string; label: string; };
// type TypeProject = { userId: string; itemsId: string; };

export interface BookModel extends Model<TypeItem> {
  findItemById: (id: string) => Promise<TypeItem | undefined>;
}

const BookSchema = new Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model<TypeBook, BookModel>('Book', BookSchema);
