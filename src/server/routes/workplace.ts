import { Router } from 'express';

import {
  getWorkplace,
  renameWorkplace,
  updateWorkplace,
  moveToArchive,
} from '../controllers';

const router = Router();

router.get('/workplace', getWorkplace);
router.patch('/workplace', renameWorkplace);
router.put('/workplace', updateWorkplace);
router.delete('/workplace', moveToArchive);

export default router;
