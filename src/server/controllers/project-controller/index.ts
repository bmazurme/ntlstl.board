/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

type TypeProject = { value: string; label: string; };

let projects: TypeProject[] = [{ value: '0', label: 'Project 1' }];

const getProjects = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send(projects);
  } catch (err) {
    next(err);
  }
};

const addProject = (req: Request, res: Response, next: NextFunction) => {
  try {
    projects.push({
      value: (projects.length).toString(),
      label: `Project ${projects.length + 1}`,
    });

    return res.send(projects);
  } catch (err) {
    next(err);
  }
};

const renameProject = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { value, label } = req.body;
    projects = projects.map((x) => (value === x.value ? { ...x, label } : x));
    const book = projects.find((x) => x.value === value);

    return res.send(book);
  } catch (err) {
    next(err);
  }
};

export { getProjects, addProject, renameProject };
