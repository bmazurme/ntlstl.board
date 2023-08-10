const TYPE = {
  BLOCK: 'BLOCK',
  ITEM: 'ITEM',
};

const COLOR = {
  BLOCK: 'rgba(150,252,92,0.8)',
  ITEM: 'rgba(243,224,205,0.8)',
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
  OAUTH: {
    INDEX: 'oauth',
  },
  SIGN: {
    IN: '/signin',
    UP: '/signup',
    OAUTH: 'https://oauth.yandex.ru/authorize?response_type=code&client_id=c709762dfe3e447999beb343da0bee9f',
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
