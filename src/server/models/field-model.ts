import {
  Schema, Document, model, Model, Types,
} from 'mongoose';

export interface IField extends Document {
  itemId: Types.ObjectId;
  label: string;
  value: number;
}

export interface FieldModel extends Model<IField> {
  findFieldById: (id: string) => Promise<IField | undefined>;
}

const FieldSchema = new Schema({
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
    // maxlength: 30,
  },
  value: {
    type: Number,
    required: true,
  },
});

export default model<IField, FieldModel>('Field', FieldSchema);
