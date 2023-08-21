import { Router } from 'express';

import { getUserMe, updateUser } from '../../controllers';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.get(UrlsApi.USER.INDEX, getUserMe);
router.patch(UrlsApi.USER.INDEX, updateUser);

export default router;
