import { Router } from 'express';

import {
  removeItem,
  setMovedItem,
  changeItemValues,
  changeItemValue,
  getItemResult,
  addItem,
} from '../../controllers/items-controller';

const router = Router();

router.delete('/items', removeItem);
router.patch('/items', setMovedItem);
router.patch('/items/values', changeItemValues);
router.patch('/items/value', changeItemValue);
router.patch('/items/result', getItemResult);
router.post('/items', addItem);

export default router;
