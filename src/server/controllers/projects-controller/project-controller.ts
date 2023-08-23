/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response, Request } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import { NotFoundError } from '../../errors';

import Projects from '../../models/project-model';

dotEnvConfig();

const addProject = async ( req: any, res: Response, next: NextFunction) => {
  try {
    const projects = await Projects.find({ userId: req.user._id });
    const project = { label: `Project ${projects.length + 1}` };
    const data = await Projects.create({ ...project, userId: req.user._id });

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getProjects = async ( req: any, res: Response, next: NextFunction) => {
  try {
    const data = await Projects.find({ userId: req.user._id });

    if (!data) {
      return next(new NotFoundError('Project not found'));
    }

    const projects = data.map((p) => ({ value: p._id, label: p.label }));

    return res.status(200).send(projects);
  } catch (err) {
    return next(err);
  }
};

const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, ...newData } = req.body;
    const options = { new: true };
    const data = await Projects.findByIdAndUpdate(id, newData, options);

    if (!data) {
      return next(new NotFoundError('Project not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

export { addProject, getProjects, updateProject };
