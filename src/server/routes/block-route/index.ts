import { Router } from 'express';

import {
  getBlocks,
  updateBlocks,
  removeItem,
  removeBlock,
  addBlock,
  renameBlock,
  setMovedBlock,
} from '../../controllers/block-controller';

const router = Router();

router.get('/blocks/:id', getBlocks);
router.patch('/blocks', updateBlocks);
router.put('/blocks', removeItem);
router.put('/blocks/book', removeBlock);
router.post('/blocks', addBlock);
router.patch('/blocks/rename', renameBlock);
router.patch('/blocks/set-moved-block', setMovedBlock);

export default router;
