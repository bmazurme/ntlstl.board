/* eslint-disable import/no-extraneous-dependencies */
import {
  Schema, Document, model, Model,
} from 'mongoose';

import validator from 'validator';

export interface IUser extends Document {
  defaultEmail: string;
  projectId: Schema.Types.ObjectId;
}

export interface UserModel extends Model<IUser> {
  findUserByCredentials: (defaultEmail: string) => Promise<IUser | undefined>;
}

const UserSchema = new Schema({
  defaultEmail: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(defaultEmail: string) {
        return validator.isEmail(defaultEmail);
      },
      defaultEmail: 'Введён некорректный email',
    },
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'project',
    // required: true,
  },
});

export default model<IUser, UserModel>('User', UserSchema);
