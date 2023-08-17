import { Router } from 'express';

import { getUserMe, updateUser } from '../../controllers';

// import { UrlsApi } from '../../utils/routers';

const router = Router();

// router.post('/user', addUser);
router.get('/user', getUserMe);
router.patch('/user', updateUser);

export default router;
