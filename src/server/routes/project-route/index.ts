import { Router } from 'express';

import { getProjects, addProject, renameProject } from '../../controllers/project-controller';

const router = Router();

router.get('/projects', getProjects);
router.post('/projects', addProject);
router.patch('/projects', renameProject);

export default router;
