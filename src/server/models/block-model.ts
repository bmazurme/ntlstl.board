import {
  Schema, Document, model, Model, Types,
} from 'mongoose';

export interface IBlock extends Document {
  bookId: Types.ObjectId;
  index: number;
  name: string;
}

export interface BlockModel extends Model<IBlock> {
  findBlockById: (id: string) => Promise<IBlock | undefined>;
}

const BlockSchema = new Schema({
  bookId: {
    type: Types.ObjectId,
    ref: 'book',
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

export default model<IBlock, BlockModel>('Block', BlockSchema);
