import { Router } from 'express';

import { getProjects, addProject, updateProject } from '../../controllers/projects-controller';

// import { UrlsApi } from '../../utils/routers';

const router = Router();

router.get('/projects', getProjects);
router.post('/projects', addProject);
router.patch('/projects', updateProject);

export default router;
