import { Router } from 'express';

import { addItemType, getItemTypes } from '../../controllers/item-types-controller';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.post(UrlsApi.ITEM_TYPES.INDEX, addItemType);
router.get(UrlsApi.ITEM_TYPES.INDEX, getItemTypes);

export default router;
