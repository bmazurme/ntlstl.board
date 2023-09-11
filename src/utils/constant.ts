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
    INDEX: '/',
    PROJECT: {
      BOOK: ':projectId/:bookId',
    },
  },
  PROJECTS: {
    INDEX: '/projects',
    ID: ':projectId',
    BOOK_ID: ':projectId/:bookId',
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
    GITHUB: 'oauth/github',
    YANDEX: 'https://oauth.yandex.ru',
  },
  SIGN: {
    IN: '/signin',
    UP: '/signup',
    YANDEX: 'https://oauth.yandex.ru/authorize?response_type=code&client_id=c709762dfe3e447999beb343da0bee9f',
    GITHUB: 'https://github.com/login/oauth/authorize?client_id=d3a7b43f6b10622202cc',
  },
  SUPPORT: {
    INDEX: '/support',
  },
  USERS: {
    INDEX: '/users',
  },
  KIT: {
    INDEX: '/kit',
  },
  404: '*',
};

export { TYPE, COLOR, Urls };
