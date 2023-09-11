import React from 'react';

import ProjectLayout from '../../layouts/project-layout';

import withUser from '../../hocs/with-user';

function ProjectPage() {
  return (<ProjectLayout />);
}

export default withUser(ProjectPage, true);
