import { Router } from 'express';

import authRoute from './auth-route';
import blocksRoute from './blocks-route';
import itemsRoute from './items-route';
import itemTypesRoute from './item-types-route';
import bookRoute from './book-route';
import oauthRoute from './oauth-route';
import projectRoute from './project-route';
import notificationRoute from './notification-route';
import userRoute from './user-route';
import fieldsRoute from './fields-route';

import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.use('/', oauthRoute);
router.use('/', authRoute);
router.use('/', itemTypesRoute);
router.use('/', authMiddleware, blocksRoute);
router.use('/', authMiddleware, itemsRoute);
router.use('/', authMiddleware, bookRoute);
router.use('/', authMiddleware, projectRoute);
router.use('/', authMiddleware, notificationRoute);
router.use('/', authMiddleware, userRoute);
router.use('/', authMiddleware, fieldsRoute);

export default router;
