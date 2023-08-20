import { Router } from 'express';

import { addItemType, getItemTypes } from '../../controllers/item-types-controller';

const router = Router();

router.post('/item-types', addItemType);
router.get('/item-types', getItemTypes);

export default router;
