import { Router } from 'express';

import { oauthYaSigninController } from '../../controllers/oauth-controller';

const router = Router();

router.post('/oauth', oauthYaSigninController);

export default router;
