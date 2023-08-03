import { Router } from 'express';

import { getBlocks } from '../../controllers/block-controller';

const router = Router();

router.get('/blocks/:id', getBlocks);

export default router;
