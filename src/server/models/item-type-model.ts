import {
  Schema, Document, model, Model, Types,
} from 'mongoose';

export interface IItemType extends Document {
  itemId: Types.ObjectId;
  name: string;
  valdescriptionue: string;
}

export interface ItemTypeModel extends Model<IItemType> {
  findItemTypeById: (id: string) => Promise<IItemType | undefined>;
}

const ItemTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

export default model<IItemType, ItemTypeModel>('ItemType', ItemTypeSchema);
