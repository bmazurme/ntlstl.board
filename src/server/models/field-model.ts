import {
  Schema, Document, model, Model,
} from 'mongoose';

export interface IField extends Document {
  itemId: Schema.Types.ObjectId;
  label: string;
  value: number;
}

export interface FieldModel extends Model<IField> {
  findFieldById: (id: string) => Promise<IField | undefined>;
}

const FieldSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'item',
    required: true,
  },
  label: {
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
