import { Router } from 'express';

import mockRoute from './mock';
import notificationRoute from './notification';

const router = Router();

router.use('/', mockRoute);
router.use('/', notificationRoute);

export default router;
