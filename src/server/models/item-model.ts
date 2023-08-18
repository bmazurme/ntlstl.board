import {
  Schema, Document, model, Model, Types,
} from 'mongoose';

export interface IItem extends Document {
  blockId: Types.ObjectId;
  bookId: Types.ObjectId;
  index: number;
  result: number;
}

export interface ItemModel extends Model<IItem> {
  findItemById: (id: string) => Promise<IItem | undefined>;
}

const ItemSchema = new Schema({
  blockId: {
    type: Types.ObjectId,
    ref: 'block',
    required: true,
  },
  bookId: {
    type: Types.ObjectId,
    ref: 'block',
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
});

export default model<IItem, ItemModel>('Item', ItemSchema);
