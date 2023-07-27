import { Router } from 'express';

import { getMockData } from '../controllers';

const router = Router();

router.get('/mock', getMockData);

export default router;
