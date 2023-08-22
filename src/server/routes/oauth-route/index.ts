import { Router } from 'express';

import { oauthYaSigninController, oauthGithubSigninController } from '../../controllers/oauth-controller';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.post(UrlsApi.SIGN.OAUTH, oauthYaSigninController);
router.post('/oauth/github', oauthGithubSigninController);

export default router;
