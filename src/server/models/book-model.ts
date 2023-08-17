/* eslint-disable import/no-extraneous-dependencies */
import {
  Schema, Document, model, Model,
} from 'mongoose';

export interface IBook extends Document {
  projectId: Schema.Types.ObjectId;
  name: string;
  typeBook: string;
}

export interface BookModel extends Model<IBook> {
  findBookById: (id: string) => Promise<IBook | undefined>;
}

const BookSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'project',
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    // maxlength: 30,
  },
  typeBook: {
    type: String,
    required: true,
    minlength: 1,
    // maxlength: 30,
  },
});

export default model<IBook, BookModel>('Book', BookSchema);
