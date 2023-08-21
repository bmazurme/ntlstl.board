import { Router } from 'express';

import { getProjects, addProject, updateProject } from '../../controllers/projects-controller';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.get(UrlsApi.PROJECT.INDEX, getProjects);
router.post(UrlsApi.PROJECT.INDEX, addProject);
router.patch(UrlsApi.PROJECT.INDEX, updateProject);

export default router;
