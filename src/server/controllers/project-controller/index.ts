/* eslint-disable max-len */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { projects } from '../../mocks/db';

const getProjects = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = '0';
    const { items } = projects[userId];

    return res.send(items);
  } catch (err) {
    next(err);
  }
};

const addProject = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = '0';
    projects[userId].items.push({
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
    const userId = '0';
    projects[userId].items = projects[userId].items.map((x) => (value === x.value ? { ...x, label } : x));
    const book = projects[userId].items.find((x) => x.value === value);

    return res.send(book);
  } catch (err) {
    next(err);
  }
};

export { getProjects, addProject, renameProject };
