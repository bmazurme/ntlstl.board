import { Router } from 'express';

import {
  deleteItem,
  setMovedItem,
  changeItemValue,
  getItemResult,
  addItem,
} from '../../controllers/items-controller';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.post(UrlsApi.ITEMS.INDEX, addItem);
router.patch(UrlsApi.ITEMS.INDEX, changeItemValue);
router.put(UrlsApi.ITEMS.INDEX, setMovedItem);
router.delete('/items', deleteItem);

router.patch('/items/result', getItemResult);

export default router;
