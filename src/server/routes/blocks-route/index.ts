import { Router } from 'express';

import {
  getBlocks,
  updateBlocks,
  removeBlock,
  addBlock,
  renameBlock,
  setMovedBlock,
} from '../../controllers/blocks-controller';

const router = Router();

router.get('/blocks/:id', getBlocks);
router.patch('/blocks', updateBlocks);
router.put('/blocks/book', removeBlock);
router.post('/blocks', addBlock);
router.patch('/blocks/rename', renameBlock);
router.patch('/blocks/set-moved-block', setMovedBlock);

export default router;
