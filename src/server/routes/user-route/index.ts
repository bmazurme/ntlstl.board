import { Router } from 'express';

import { getUserMe, updateUser, addUser } from '../../controllers';

const router = Router();

router.post('/user', addUser);
router.get('/user', getUserMe);
router.patch('/user', updateUser);

export default router;
