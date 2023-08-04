import { Router } from 'express';

import authRoute from './auth-route';
import blockRoute from './block-route';
import bookRoute from './book-route';
import projectRoute from './project-route';
import notificationRoute from './notification-route';
import userRoute from './user-route';
import workplaceRoute from './workplace-route';

const router = Router();

router.use('/', authRoute);
router.use('/', blockRoute);
router.use('/', bookRoute);
router.use('/', projectRoute);
router.use('/', notificationRoute);
router.use('/', userRoute);
router.use('/', workplaceRoute);

export default router;
