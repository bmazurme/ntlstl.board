import { Router } from 'express';

// import { oauthYaSigninController } from '../../controllers/oauth-controller';
import oauthYaSigninController from '../../controllers/oauth-controller';

// import { UrlsApi } from '../../utils/routers';

const router = Router();

router.post('/oauth', oauthYaSigninController);

export default router;
