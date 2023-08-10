import { Router } from 'express';

import authRoute from './auth-route';
import blocksRoute from './blocks-route';
import itemsRoute from './items-route';
import bookRoute from './book-route';
import oauthRoute from './oauth-route';
import projectRoute from './project-route';
import notificationRoute from './notification-route';
import userRoute from './user-route';
import workplaceRoute from './workplace-route';

const router = Router();

router.use('/', authRoute);
router.use('/', blocksRoute);
router.use('/', itemsRoute);
router.use('/', bookRoute);
router.use('/', oauthRoute);
router.use('/', projectRoute);
router.use('/', notificationRoute);
router.use('/', userRoute);
router.use('/', workplaceRoute);

export default router;
