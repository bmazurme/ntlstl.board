const TYPE = {
  BLOCK: 'BLOCK',
  ITEM: 'ITEM',
};

const COLOR = {
  BLOCK: 'rgb(193,248,161)',
  ITEM: 'rgb(188,251,255)',
  VALUE: 'yellow',
};

const Urls = {
  BASE: {
    INDEX: '/projects',
    PROJECT: '/projects/:projectId/:bookId',
  },
  CHART: {
    INDEX: '/chart',
  },
  PASSWORD: {
    FORGOT: '/password/forgot',
    CONFIRM: '/password/:token',
    RESET: '/password',
  },
  PROFILE: {
    INDEX: '/profile',
  },
  SIGN: {
    IN: '/signin',
    UP: '/signup',
  },
  SUPPORT: {
    INDEX: '/support',
  },
  USERS: {
    INDEX: '/users',
  },
  404: '*',
};

export { TYPE, COLOR, Urls };
