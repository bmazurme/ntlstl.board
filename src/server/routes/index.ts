import { Router } from 'express';

import authRoute from './auth';
import bookRoute from './book';
import mockRoute from './mock';
import notificationRoute from './notification';
import userRoute from './user';
import workplaceRoute from './workplace';

const router = Router();

router.use('/', authRoute);
router.use('/', bookRoute);
router.use('/', mockRoute);
router.use('/', notificationRoute);
router.use('/', userRoute);
router.use('/', workplaceRoute);

export default router;
