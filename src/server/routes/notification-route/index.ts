import { Router } from 'express';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.get(UrlsApi.NOTIFICATION.INDEX, () => console.log('notification get'));
router.post(UrlsApi.NOTIFICATION.INDEX, () => console.log('notification post'));

export default router;
