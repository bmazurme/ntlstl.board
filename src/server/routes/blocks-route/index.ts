import { Router } from 'express';

import {
  getBlocks,
  updateBlocks,
  deleteBlock,
  addBlock,
  renameBlock,
  setBlocks,
} from '../../controllers/blocks-controller';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.post(UrlsApi.BLOCKS.INDEX, addBlock);
router.put(UrlsApi.BLOCKS.INDEX, setBlocks);
router.patch(UrlsApi.BLOCKS.INDEX, updateBlocks);
router.get('/blocks/:id', getBlocks);
router.put('/blocks/book', deleteBlock);
router.patch('/blocks/rename', renameBlock);

export default router;
