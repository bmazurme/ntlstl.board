import { Router } from 'express';

import {
  deleteItem,
  setMovedItem,
  changeItemValues,
  changeItemValue,
  getItemResult,
  addItem,
} from '../../controllers/items-controller';

// import { UrlsApi } from '../../utils/routers';

const router = Router();

router.delete('/items', deleteItem);
router.patch('/items', setMovedItem);
router.patch('/items/values', changeItemValues);
router.patch('/items/value', changeItemValue);
router.patch('/items/result', getItemResult);
router.post('/items', addItem);

export default router;
