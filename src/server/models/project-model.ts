import {
  Schema, Document, model, Model, Types,
} from 'mongoose';

export interface IProject extends Document {
  label: string;
  userId: Types.ObjectId;
}

export interface ProjectModel extends Model<IProject> {
  findProjectByUser: (id: string) => Promise<IProject | undefined>;
}

const ProjectSchema = new Schema({
  label: {
    type: String,
    required: true,
    minlength: 2,
    // maxlength: 30,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

export default model<IProject, ProjectModel>('Project', ProjectSchema);
