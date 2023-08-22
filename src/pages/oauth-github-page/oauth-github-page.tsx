import React from 'react';

import OauthGithubLayout from '../../layouts/oauth-github-layout';

import withUser from '../../hocs/with-user';

function OauthGithubPage() {
  return (<OauthGithubLayout />);
}

export default withUser(OauthGithubPage, false);
