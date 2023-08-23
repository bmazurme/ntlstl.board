import {
  Schema, Document, model, Model, Types,
} from 'mongoose';

export interface IItemResult extends Document {
  itemId: Types.ObjectId;
  label: string;
  value: number;
}

export interface ItemResultModel extends Model<IItemResult> {
  findItemResultById: (id: string) => Promise<IItemResult | undefined>;
}

const ItemResultSchema = new Schema({
  bookId: {
    type: Types.ObjectId,
    ref: 'book',
    required: true,
  },
  itemId: {
    type: Types.ObjectId,
    ref: 'item',
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  value: {
    type: Number,
    required: true,
  },
});

export default model<IItemResult, ItemResultModel>('ItemResult', ItemResultSchema);
