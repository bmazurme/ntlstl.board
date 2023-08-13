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

import authMiddleware from '../middlewares/auth';

const router = Router();

router.use('/', authRoute);
router.use('/', oauthRoute);
router.use('/', authMiddleware, blocksRoute);
router.use('/', authMiddleware, itemsRoute);
router.use('/', authMiddleware, bookRoute);
router.use('/', authMiddleware, projectRoute);
router.use('/', authMiddleware, notificationRoute);
router.use('/', authMiddleware, userRoute);
router.use('/', authMiddleware, workplaceRoute);

export default router;
