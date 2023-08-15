/* eslint-disable import/no-extraneous-dependencies */
import {
  Schema, Document, model, Model,
} from 'mongoose';

import validator from 'validator';

// type TypeItem = { value: string; label: string; };
type TypeProject = { userId: string; itemsId: string; };

export interface ProjectModel extends Model<TypeProject> {
  findProjectById: (id: string) => Promise<TypeProject | undefined>;
}

const ProjectSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  projecrtName: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model<TypeProject, ProjectModel>('Project', ProjectSchema);
