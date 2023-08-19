/* eslint-disable import/no-extraneous-dependencies */
import {
  Schema, Document, model, Model, Types,
} from 'mongoose';

export interface IHistory extends Document {
  bookId: Types.ObjectId;
  userId: Types.ObjectId;
  revision: number;
}

export interface HistoryModel extends Model<IHistory> {
  findHistoryById: (id: string) => Promise<IHistory | undefined>;
}

const HistorySchema = new Schema({
  bookId: {
    type: Types.ObjectId,
    ref: 'book',
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
  },
  revision: {
    type: Number,
    required: true,
  },
});

export default model<IHistory, HistoryModel>('History', HistorySchema);
