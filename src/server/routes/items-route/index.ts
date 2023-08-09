import { Router } from 'express';

import {
  removeItem,
  setMovedItem,
  changeItemValues,
  changeItemValue,
  getItemResult,
} from '../../controllers/items-controller';

const router = Router();

router.delete('/items', removeItem);
router.patch('/items', setMovedItem);
router.patch('/items/values', changeItemValues);
router.patch('/items/value', changeItemValue);
router.patch('/items/result', getItemResult);

export default router;
