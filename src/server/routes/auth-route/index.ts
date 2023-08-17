import { Router } from 'express';

import { logout } from '../../controllers/auth-controller';

// import { UrlsApi } from '../../utils/routers';

const router = Router();

router.post('/logout', logout);

export default router;
