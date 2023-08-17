import { Router } from 'express';

import {
  getBlocks,
  updateBlocks,
  deleteBlock,
  addBlock,
  renameBlock,
  setMovedBlock,
} from '../../controllers/blocks-controller';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.get('/blocks/:id', getBlocks);
router.patch('/blocks', updateBlocks);
router.put('/blocks/book', deleteBlock);
router.post('/blocks', addBlock);
router.patch('/blocks/rename', renameBlock);
router.patch('/blocks/set-moved-block', setMovedBlock);

export default router;
