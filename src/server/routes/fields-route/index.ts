import { Router } from 'express';

import { updateFields } from '../../controllers/fields-controller';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.patch(UrlsApi.FIELDS.INDEX, updateFields);

export default router;
