import React from 'react';

import ProjectsLayout from '../../layouts/projects-layout';

import withUser from '../../hocs/with-user';

function ProjectsPage() {
  // throw new Error('...');
  return (<ProjectsLayout />);
}

export default withUser(ProjectsPage, false);
