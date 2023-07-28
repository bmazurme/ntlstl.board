import { Router } from 'express';

import { getMockData, plusMockData } from '../controllers';

const router = Router();

router.get('/mock', getMockData);
router.get('/mock/plus', plusMockData);

export default router;
